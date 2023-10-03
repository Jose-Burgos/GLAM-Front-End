import * as Sb from '~/supabase/types/supabase.tables';
import { Session, PostgrestResponse } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { UUID } from 'crypto';
// import type { PostgrestFilterBuilder } from "@supabase/postgrest-js"

// Tendría que agregar pagination a esto probablemente. Y filtering.
export async function getAnimals() {
  const { data, error }: PostgrestResponse<Sb.Animal> = await supabase
    .from('animals')
    .select('*, species (name)');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function deleteAnimal(animalID: String) {
  const { error } = await supabase.from('animals').delete().eq('id', animalID)
  if(error){
    throw new Error(error.message)
  }
}

export async function  upsertAnimal(animal : Sb.Animal) {
  let { error } = await supabase.from('animals').upsert(animal)
  if (error) {
    throw new Error(error.message)
  }
}

export async function getAnimalById(id: string){
  const {data, error} = await supabase.from('animals').select('*').eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  else{
    console.log(data);
    return data[0];
  }
}

async function currentUser(
  profileType: Sb.ProfileType
): Promise<Sb.Profile<typeof profileType> | null> {
  const session = await verifySession();
  if (!session) {
    throw new Error('No active session found');
  }

  let tablePublic: Sb.TableName;
  let tablePrivate: Sb.TableName;
  if (profileType === 'RegularUser') {
    tablePublic = 'users';
    tablePrivate = 'private_user_info';
  } else {
    tablePublic = 'organizations';
    tablePrivate = 'private_org_info';
  }

  const { data: publicData, error } = await supabase
    .from(tablePublic)
    .select('*')
    .eq('id', session.user.id);

  if (error) {
    throw new Error(error.message);
  } else if (publicData[0]) {
    const { data: privateData, error } = await supabase
      .from(tablePrivate)
      .select('*');
    // .eq('id', session.user.id);

    if (error) {
      throw new Error(error.message);
    } else if (!privateData[0]) {
      throw new Error(
        `This shouldn't have happened. No private info found for the ${profileType}`
      );
    }
    return { public: publicData[0], private: privateData[0] };
  } else {
    return null;
  }
}

// Hacelo con generics en vez de repetir todo el código dos veces
export async function getCurrentUser(): Promise<{
  profile: Sb.Profile<Sb.ProfileType>;
  type: Sb.ProfileType;
}> {
  const session = await verifySession();
  if (!session) {
    throw new Error('No active session found');
  }

  const regularUserProfile = await currentUser('RegularUser');
  if (regularUserProfile) {
    return { profile: regularUserProfile, type: 'RegularUser' };
  }

  const orgProfile = await currentUser('Organization');
  if (orgProfile) {
    return { profile: orgProfile, type: 'Organization' };
  }

  // No debería pasar nunca esto.
  throw new Error(
    `No regular user or organization account information found for user: ${session.user.id}`
  );
}

export async function userSignUp({
  email,
  password,
  username,
  firstName: first_name,
  lastName: last_name,
  identification,
}: Sb.UserSignupInfo) {
  const profile_type: Sb.ProfileType = 'RegularUser';
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        first_name,
        last_name,
        identification,
        profile_type,
      },
    },
  });

  if (error) {
    // console.log('Error: ', error);
    throw new Error(error.message);
  }

  // This is an ugly hack necessary because supabase is stupid...
  // (See https://github.com/supabase/supabase-js/issues/296)
  let existingAccount = false;
  if (data?.user?.identities?.length === 0) {
    existingAccount = true;
  }
  // data.session should be null when email verifaction is active
  return { data: data.user, existingAccount };
}

export async function orgSignUp({ email, password, name }: Sb.OrgSignupInfo) {
  const profile_type: Sb.ProfileType = 'Organization';
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_type,
      },
    },
  });

  if (error) {
    // console.log('Error: ', error);
    throw new Error(error.message);
  }

  // This is an ugly hack necessary because supabase is stupid...
  // (See https://github.com/supabase/supabase-js/issues/296)
  let existingAccount = false;
  if (data?.user?.identities?.length === 0) {
    existingAccount = true;
  }
  // data.session should be null when email verifaction is active
  return { data: data.user, existingAccount };
}

export async function login({ email, password }: Sb.LoginInfo): Promise<{
  session: Session;
  profile: Sb.Profile<Sb.ProfileType>;
  type: Sb.ProfileType;
}> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log('Error: ', error);
    throw new Error(error.message);
  }

  const { profile, type } = await getCurrentUser();

  return { session: data.session, profile, type };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log('Logout error: ', error);
    throw new Error(error.message);
  }
  console.log('Logout successful');
}

export async function sendForgotPassEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  console.log('Data: ', data);
  console.log('Error: ', error);
  return data;
}

/// ////////////////////////////////////////////////////////////////////////////////////////
// Todo esto probablemente se cambie cuando implementen el routing porque ni idea como
// funca por ahora
/// ////////////////////////////////////////////////////////////////////////////////////////

export async function verifySession() {
  // supabase.auth.onAuthStateChange((event, session) => {
  //   console.log('On verifySession():', event, session)
  //   if (event == 'SIGNED_IN') {
  //     alert('Already signed in')
  //     // Redirect to home page
  //   }
  // });
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.log('Error: ', sessionError);
    throw new Error(sessionError.message);
  } else if (sessionData.session) {
    return sessionData.session;
  }
  return null;
}

// I can add a callback if we need to use the data.user object outside of this function
export async function askNewPassOnReset() {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event == 'PASSWORD_RECOVERY') {
      console.log('On askNewPassOnReset(): ', event, session);
      const newPassword = prompt(
        'What would you like your new password to be?'
      );

      // Esto es por el prompt. Cuando se haga con un form ya agregan el required attribute
      // al input y cualquier otro requerimiento que se pueda checkear fácilmente en el front
      // y listo. Después además en el back se pueden agregar checkeos extra.
      if (!newPassword) {
        throw new Error("Password can't be empty");
      }

      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.log('Error: ', error);
        throw new Error(error.message);
      }
      alert('Clave modificada correctamente');
      console.log('Data: ', data);
    }
  });
}

export async function getPublicUserData() {
  return supabase.from('users').select('*');
}

declare global {
  interface Window {
    supabase: any;
  }
}
// window.supabase = {
//   verifySession,
//   getAnimals,
//   currentUser,
//   getCurrentUser,
//   login,
//   logout,
//   supabase,
// };

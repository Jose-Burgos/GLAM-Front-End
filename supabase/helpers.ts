import { supabase } from './supabaseClient';
import {
  Animal,
  RegularUser,
  Organization,
  ProfileType,
  UserInfo,
  LoginInfo,
  OrgInfo,
} from '~/supabase/types/supabase.tables';
import { Session, PostgrestResponse } from '@supabase/supabase-js';
// import type { PostgrestFilterBuilder } from "@supabase/postgrest-js"

export async function getAnimals() {
  const { data, error, status }: PostgrestResponse<Animal> = await supabase
    .from('animals')
    .select('*, species (name)');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}


export async function getCurrentUser(): Promise<{
  profile: RegularUser | Organization;
  type: ProfileType;
}> {
  const session = await verifySession();
  if (!session) {
    throw new Error('No active session found');
    
  }

  const {
    data: regularUser,
    error: userError,
  }: PostgrestResponse<RegularUser> = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id);
  if (userError) {
    throw new Error(userError.message);
  } else if (regularUser[0]) {
    return {
      profile: regularUser[0],
      type: 'RegularUser',
    };
  }

  const {
    data: organization,
    error: orgError,
  }: PostgrestResponse<Organization> = await supabase
    .from('organizations')
    .select('*')
    .eq('id', session.user.id);
  if (orgError) {
    throw new Error(orgError.message);
  } else if (organization[0]) {
    return {
      profile: organization[0],
      type: 'Organization',
    };
  }

  // No debería pasar nunca esto.
  throw new Error(
    'No regular user or organization account information found for user: ' +
      session.user.id
  );
}

export async function userSignUp({
  email,
  password,
  username,
  firstName: first_name,
  lastName: last_name,
  identification,
}: UserInfo) {
  const profile_type: ProfileType = 'RegularUser'
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

export async function orgSignUp({ email, password, name }: OrgInfo) {
  const profile_type: ProfileType = 'Organization'
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

export async function login({ email, password }: LoginInfo): Promise<{
  session: Session;
  profile: RegularUser | Organization;
  type: ProfileType;
}> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const { profile, type } = await getCurrentUser();

  if (error) {
    console.log('Error: ', error);
    throw new Error(error.message);
  }

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

///////////////////////////////////////////////////////////////////////////////////////////
// Todo esto probablemente se cambie cuando implementen el routing porque ni idea como
// funca por ahora
///////////////////////////////////////////////////////////////////////////////////////////

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

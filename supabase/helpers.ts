import * as Sb from '~/supabase/types/supabase.tables';
import { PostgrestResponse, User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { HelperFunctions } from './helpers.d';

const helpers: HelperFunctions = {
  // Tendría que agregar pagination a esto probablemente. Y filtering.
  getAnimals: async () => {
    const { data, error }: PostgrestResponse<Sb.Animal> = await supabase
      .from('animals')
      .select('*, species (name)');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  deleteAnimal: async (animalID) => {
    const { error } = await supabase
      .from('animals')
      .delete()
      .eq('id', animalID);
    if (error) {
      throw new Error(error.message);
    }
  },

  upsertAnimal: async (animal) => {
    let { error } = await supabase.from('animals').upsert(animal);
    if (error) {
      throw new Error(error.message);
    }
  },

  getAnimalById: async (id) => {
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .eq('id', id);
    if (error) {
      throw new Error(error.message);
    } else {
      console.log(data);
      return data[0];
    }
  },

  getCurrentUser: async () => {
    const session = await helpers.getSession();
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
  },

  getCurrentUserId: async () => {
    const session = await helpers.getSession()
    return session?.user.id || null
  },

  userSignUp: async (signupInfo) => {
    const profile_type: Sb.ProfileType = 'RegularUser';
    const { data, error } = await supabase.auth.signUp({
      email: signupInfo.email,
      password: signupInfo.password,
      options: {
        data: {
          username: signupInfo.username,
          first_name: signupInfo.firstName,
          last_name: signupInfo.lastName,
          identification: signupInfo.identification,
          profile_type,
        },
      },
    });

    if (error) {
      // console.log('Error: ', error);
      throw new Error(error.message);
    }

    // data.session should be null when email verifaction is active
    return { data: data.user, existingAccount: accountExists(data.user) };
  },

  orgSignUp: async ({ email, password, name }) => {
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

    // data.session should be null when email verifaction is active
    return { data: data.user, existingAccount: accountExists(data.user) };
  },

  login: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Error: ', error);
      throw new Error(error.message);
    }

    const { profile, type } = await helpers.getCurrentUser();

    return { session: data.session, profile, type };
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log('Logout error: ', error);
      throw new Error(error.message);
    }
    console.log('Logout successful');
  },

  sendForgotPassEmail: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.log('Error: ', error);
      throw new Error(error.message);
    }
  },

  getSession: async () => {
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
  },

  /// ////////////////////////////////////////////////////////////////////////////////////////
  // Todo esto probablemente se cambie cuando implementen el routing porque ni idea como
  // funca por ahora
  /// ////////////////////////////////////////////////////////////////////////////////////////

  // I can add a callback if we need to use the data.user object outside of this function
  askNewPassOnReset: () => {
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
  },
};

export default helpers;

async function currentUser(
  profileType: Sb.ProfileType
): Promise<Sb.Profile<typeof profileType> | null> {
  const session = await helpers.getSession();
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

declare global {
  interface Window {
    supabase: any;
  }
}
window.supabase = {
  ...helpers,
  supabase,
};

function accountExists(user: User | null): boolean {
  // This is an ugly hack necessary because supabase is stupid...
  // (See https://github.com/supabase/supabase-js/issues/296)
  return user?.identities?.length === 0;
}

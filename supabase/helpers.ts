import * as Sb from '~/supabase/types/supabase.tables';
import { PostgrestResponse, User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { HelperFunctions } from './helpers.d';
import { v4 as uuidv4 } from 'uuid';


const helpers: HelperFunctions = {
  supabase,
  // Tendría que agregar pagination a esto probablemente. Y filtering.
  getAnimals: async () => {
    const { data, error }: PostgrestResponse<Sb.Animal> = await supabase
      .from('animals')
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  getAnimalsByOrg: async (orgId: string) => {
    const { data, error }: PostgrestResponse<Sb.Animal> = await supabase
      .from('animals')
      .select('*')
      .eq('org_id', orgId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  deleteAnimal: async (animalID) => {
    console.log("Deleting animal with ID: ", animalID);
    const { error } = await supabase
      .from('animals')
      .delete()
      .eq('id', animalID);
    if (error) {
      throw new Error(error.message);
    }
  },

  upsertAnimal: async (animal: Sb.Animal) => {
    console.log("Animal:");
    console.log(animal);
    console.log("Animal:");
    console.log(animal);
    const { error } = await supabase.from('animals').upsert(animal);
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
      // console.log(data);
      return data[0];
    }
  },

  getCurrentUser: async () => {
    const session = await helpers.getSession();
    console.log("Session data:", session); // Log the session data to check its content
    
    if (!session) {
      throw new Error('No active session found');
    }

    // Determine user profile type based on session data or other identifiable criteria
    let profileType: 'RegularUser' | 'Organization' | null = null;

    // Example logic to determine profile type (this can be adjusted as per your app's logic)
    const { data: publicData, error } = await supabase
      .from('users')  // Or 'organizations' if you can check which table to expect based on session info
      .select('*')
      .eq('user_id', session.user.id);  // Check if it's a RegularUser or an Organization

    if (error) {
      throw new Error(error.message);
    }

    if (publicData.length > 0) {
      profileType = 'RegularUser';
    } else {
      // Now check if it's an organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', session.user.id);

      if (orgError) {
        throw new Error(orgError.message);
      }

      if (orgData.length > 0) {
        profileType = 'Organization';
      }
    }

    if (!profileType) {
      throw new Error('Unable to determine profile type for this user.');
    }

    // Now, fetch the correct profile data based on the determined type
    const userProfile = await currentUser(profileType);
    
    if (userProfile) {
      console.log(`${profileType} profile found:`, userProfile);
      return { profile: userProfile, type: profileType };
    }
  
    // This should never happen under normal circumstances
    throw new Error(
      `No account information found for user: ${session.user.id}`
    );
  },

  

  getCurrentUserId: async () => {
    const session = await helpers.getSession();
    if (!session) {
      throw new Error('No logged in user');
    }
    return session.user.id;
  },

  userSignUp: async (signupInfo) => {
    const profile_type: Sb.ProfileType = 'RegularUser';



    // Step 1: Sign up the user with Supabase Auth
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

    const existingAccount = await accountExists(data.user);
    if (existingAccount) {
      throw new Error('Account already exists with this email.');
    }
    if (error) {
      // If there's an error during sign-up, throw it
      throw new Error(error.message);
    }

    // Step 3: Insert user data into the table
    const userData = {
      user_id: data.user?.id || '', // Use the user ID from Supabase Auth
      username: signupInfo.username,
      first_name: signupInfo.firstName,
      last_name: signupInfo.lastName,
      identification: signupInfo.identification,
      email: signupInfo.email, 
    };

    const { error: userTableError } = await supabase.from('users').insert([userData]);

    if (userTableError) {
      console.error('Error inserting user into the users table:', userTableError);
      throw new Error(userTableError.message);
    }

    // Step 4: Return the user data and account existence status
    return { data: data.user, existingAccount };
  },


  orgSignUp: async (signupInfo) => {
    const profile_type: Sb.ProfileType = 'Organization';



    // Step 1: Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: signupInfo.email,
      password: signupInfo.password,
      options: {
        data: {
          username: signupInfo.name,
          email: signupInfo.email,
          profile_type,
        },
      },
    });


    const existingAccount = await accountExists(data.user);
    if (existingAccount) {
      throw new Error('Account already exists with this email.');
    }
    if (error) {
      // If there's an error during sign-up, throw it
      throw new Error(error.message);
    }

    const userData = {
      id: data.user?.id || '', // Use the user ID from Supabase Auth
      name: signupInfo.name,
      email: signupInfo.email, 
      address: signupInfo.address,
    };

    const { error: userTableError } = await supabase.from('organizations').insert([userData]);

    if (userTableError) {
      console.error('Error inserting user into the users table:', userTableError);
      throw new Error(userTableError.message);
    }

    // Step 4: Return the user data and account existence status
    return { data: data.user, existingAccount };
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
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
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

  requestAdoption: async (animalId) => {
    const { data: animal, error: animalSelectError } = await supabase
      .from('animals')
      .select('*')
      .eq('id', animalId)
      .single();

    if (animalSelectError) {
      throw new Error(animalSelectError.message);
    } else if (!animal) {
      throw new Error(`Animal with id ${animalId} not found`);
    }

    const userId = await helpers.getCurrentUserId();

    const { data, error: requestSelectError } = await supabase
      .from('adoption_requests')
      .select('*')
      .eq('user_id', userId)
      .eq('animal_id', animalId);

    if (requestSelectError) {
      throw new Error(requestSelectError.message);
    } else if (data.length > 0) {
      throw new Error(
        `User has already requested adoption for animal ${animalId}`
      );
    }

    const { error: requestInsertionError } = await supabase
      .from('adoption_requests')
      .insert({
        user_id: userId,
        animal_id: animalId,
        org_id: animal.org_id,
        state_id: Sb.RequestStates.pending,
      });

    if (requestInsertionError) {
      throw new Error(requestInsertionError.message);
    }
  },

  getUserAdoptionRequests: async () => {
    const id = await helpers.getCurrentUserId();
    const requests = await getAdoptionRequests('RegularUser', id);
    return requests;
  },

  getOrgAdoptionRequests: async () => {
    const id = await helpers.getCurrentUserId();
    const requests = await getAdoptionRequests('Organization', id);
    return requests;
  },

  cancelAdoptionRequest: async (requestId) => {
    await supabase
      .from('adoption_requests')
      .update({ state_id: Sb.RequestStates.cancelled })
      .eq('id', requestId);
  },

  reactivateAdoptionRequest: async (requestId) => {
    await supabase
      .from('adoption_requests')
      .update({ state_id: Sb.RequestStates.pending })
      .eq('id', requestId);
  },

  getOrganizations: async () => {
    const { data, error } = await supabase.from('organizations').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  getSpecies: async () => {
    const { data, error } = await supabase.from('species').select('id, name');
    if (error) {
      throw new Error(error.message);
    }
    console.log("Species data requested: ");
    console.log(data);
    console.log("Species data requested: ");
    console.log(data);
    return data;
  },

  deleteImage: async (imageName) => {
    const userId = await helpers.getCurrentUserId();
    const { error } = await supabase.storage
      .from('animal-pictures-orgs')
      .remove([userId + '/' + imageName]);
    if (error) {
      throw new Error(error.message);
    }
  },

  uploadImage: async (file) => {
    // let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from('animals-pictures')
      .upload(helpers.getCurrentUserId() + '/' + uuidv4(), file);

    if (data) {
      // if we got an image
      helpers.getImages(); // refresh images
    } else {
      throw new Error(error.message);
    }
  },

  submitInKindDonation: async (donationData: Sb.InKindDonation) => {
    const { error } = await supabase.from('in_kind_donations').insert({
      ong: donationData.ong,
      type: donationData.type,
      description: donationData.description,
      quantity: donationData.quantity,
      availability: donationData.availability,
      user: donationData.user,
    });
    if (error) {
      throw new Error(error.message);
    }
    return;
  },

  getInKindDonations: async () => {
    const id = await helpers.getCurrentUserId();
    // console.log(id);
    const { data, error } = await supabase
      .from('in_kind_donations')
      .select('*')
      .eq('ong', id as String);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  getImages: async () => {
    const userId = await helpers.getCurrentUserId();
    const { data, error } = await supabase
      .storage
      .from('animals-pictures')
      .list(userId);
    if (error) {
      throw new Error(error.message);
    } else {
      return data.map((element) => ({
        url: 'https://svyzokdesnbggpplkaxn.supabase.co/storage/v1/object/public/animals-pictures/' +
          userId +
          '/' +
          element.name,
        name: userId + '/' + element.name,
      }));
    }
  },
  getUsernameById: async (userId: string) => {
    console.log("Fetching username for userId:", userId);  // Log the userId you're using
    const { data, error } = await supabase
      .from('users')
      .select('username, user_id')  // Select only 'username' and 'user_id'
      .eq('user_id', userId)  // Only fetch the RegularUser with matching user_id
      .single();  

    if (error) {
      console.error("Error fetching username:", error.message);  // Log the error message
      throw new Error(error.message);  // Rethrow or handle error
    }

    if (!data) {
      console.error(`No data found for user with ID: ${userId}`);
      throw new Error(`User with ID ${userId} not found`);
    }
  
    console.log("Data found:", data);  // Log the returned data

    // Check if it's a RegularUser (i.e., has user_id)
    if ('user_id' in data) {
      return data.username;  // Return the username for RegularUser
    }

    // If it's not a RegularUser (i.e., it's an Organization), throw an error
    throw new Error('Only RegularUser can have a username');
    },

    createAdoptionRequest: async (animalId: string, description: string) => {
      // Get the current logged-in user’s ID, email, and username
      console.log("Getting current user.");
      const user = await helpers.getCurrentUser();
      console.log("User acquired.");
      
      if (user.type !== 'RegularUser') {
          throw new Error("Only RegularUsers can make adoption requests.");
      }
      
      const userId = user.profile.private.user_id;  // Get the user's ID from their profile
      const email = user.profile.public.email;
      console.log("Getting username by ID");
      
      // Ensure that we're calling getUsernameById only for RegularUser
      const username = await helpers.getUsernameById(user.profile.private.user_id);
    
      // Fetch the animal's data (org_id)
      const { data: animal, error: animalError } = await supabase
        .from('animals')
        .select('org_id')
        .eq('id', animalId)
        .single();
    
      if (animalError) {
        throw new Error(animalError.message);
      }
    
      // Insert a new adoption request
      const { error: insertError } = await supabase
        .from('adoption_requests')
        .insert({
          animal_id: animalId,
          org_id: animal.org_id,
          user_email: email,      // Insert the logged-in user's email
          user_name: username,  // Insert the logged-in user's username
          description: description  // The description provided for the adoption request
        });
    
      if (insertError) {
        throw new Error(insertError.message);
      }
    
      return { message: 'Adoption request created successfully' };
    },

    getRequestsByUser: async (username: string) => {
      const { data, error } = await supabase
        .from('adoption_requests')
        .select('*')
        .eq('user_name', username);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },

    getNameById: async (id: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('username')
        .eq('user_id', id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data.username;
    },

    getOrgAdoptionRequestsForDashboard: async (): Promise<Request[]> => {
      console.log("Getting current user for adoption requests.");
      const user = await helpers.getCurrentUser();
      if (user.type !== 'Organization') {
          throw new Error("Only organizations can view their adoption requests.");
      }
    
      const orgId = user.profile.private.id; // Assuming 'id' in private profile corresponds to org_id
      const { data, error } = await supabase
        .from('adoption_requests')
        .select('*')
        .eq('org_id', orgId); // Filter by the organization ID
    
      if (error) {
        throw new Error(error.message);
      }
      else{
        console.log("Data returned: ", data);
      }
    
      return data as Request[];
    },

    // Helper function to delete the adoption request from the database
  deleteRequest: async (requestId: string) => {
  const { error } = await supabase
    .from('adoption_requests')
    .delete()
    .eq('request_id', requestId);

  if (error) {
    throw new Error(error.message);
  }
}

    
  
  

  // getAllImages: async () => {
  //   const userId = await helpers.getCurrentUserId();
  //   const { data, error } = await supabase
  //     .storage
  //     .from('animals-pictures')
  //     .list();
  //   if (error) {
  //     throw new Error(error.message);
  //   } else {
  //     return data.map((element) => ({
  //       url: 'https://svyzokdesnbggpplkaxn.supabase.co/storage/v1/object/public/animals-pictures/' +
  //         userId +
  //         '/' +
  //         element.name,
  //       name: userId + '/' + element.name,
  //     }));
  //   }
  // }

  //supabase: undefined
};

export default helpers;
export {supabase};

// Local functions that shouldn't be exported go here

async function currentUser(
  profileType: Sb.ProfileType
): Promise<Sb.Profile<typeof profileType> | null> {
  const session = await helpers.getSession();
  if (!session) {
    throw new Error('No active session found');
  }
  console.log("Profile Type:", profileType);
  let tablePublic: Sb.TableName;
  let tablePrivate: Sb.TableName;
  let publicIdColumn: string;

  // Determine the table and column names based on the profileType
  if (profileType === 'RegularUser') {
    console.log("Current user is regular");
    tablePublic = 'users';
    tablePrivate = 'users';
    publicIdColumn = 'user_id'; // RegularUser uses 'user_id'
  } else if (profileType === 'Organization') {
    console.log("Current user is an org");
    tablePublic = 'organizations';
    tablePrivate = 'organizations';
    publicIdColumn = 'id'; // Organization uses 'id'
  } else {
    throw new Error('Invalid profile type');
  }

  // Query the public table (users or organizations) based on the profile type
  const { data: publicData, error } = await supabase
    .from(tablePublic)
    .select('*')
    .eq(publicIdColumn, session.user.id);  // Use the correct column for the profile type

  if (error) {
    throw new Error(error.message);
  } else if (publicData[0]) {
    // Only query the private data table if the user is authorized
    if (profileType === 'RegularUser') {
      const { data: privateData, error: privateError } = await supabase
        .from(tablePrivate)
        .select('*')
        .eq('user_id', session.user.id);  // Access private user data for RegularUser

      if (privateError) {
        throw new Error(privateError.message);
      } else if (!privateData[0]) {
        throw new Error('Private info not found for RegularUser');
      }

      return { public: publicData[0], private: privateData[0] };
    }

    if (profileType === 'Organization') {
      const { data: privateData, error: privateError } = await supabase
        .from(tablePrivate)
        .select('*')
        .eq('id', session.user.id);  // Access private org data for Organization

      if (privateError) {
        throw new Error(privateError.message);
      } else if (!privateData[0]) {
        throw new Error('Private info not found for Organization');
      }

      return { public: publicData[0], private: privateData[0] };
    }
  } 

  // Return null if no user data is found
  return null;
}









function accountExists(user: User | null): boolean {
  // This is an ugly hack necessary because supabase is stupid...
  // (See https://github.com/supabase/supabase-js/issues/296)
  return user?.identities?.length === 0;
}





declare global {
  interface Window {
    supabase: any;
  }
}
// Check if code is running on the client-side before using 'window'
if (typeof window !== 'undefined') {
  window.supabase = {
    ...helpers,
    supabase,
  };
}

import * as Sb from '~/supabase/types/supabase.tables';
import { PostgrestResponse, User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import { HelperFunctions } from './helpers.d';
import { v4 as uuidv4 } from 'uuid';

const helpers: HelperFunctions = {
  // Tendría que agregar pagination a esto probablemente. Y filtering.
  getAnimals: async () => {
    const { data, error }: PostgrestResponse<Sb.Animal> = await supabase
      .from('animals')
      .select('*, species(*)');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  getOrgAnimals: async () => {
    const { data, error }: PostgrestResponse<Sb.Animal> = await supabase
      .from('animals')
      .select('*, species(*)')
      .eq('org_id', await helpers.getCurrentUserId());
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

  upsertAnimal: async (animal: Sb.Animal) => {
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
    const session = await helpers.getSession();
    if (!session) {
      // throw new Error('No logged in user');
      console.log('No logged in user')
      return ''
    }
    return session.user.id;
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
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.log('Error: ', sessionError);
      // throw new Error(sessionError.message);
    } 
    else if (sessionData.session) {
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

  requestAdoption: async (animalId, requestForm) => {
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

    // const { error: requestFormInsertionError } = await supabase
    //   .from('adoption_request_form')
    //   .insert({
    //     request_id: 
    //   });

    // if (requestFormInsertionError) {
    //   throw new Error(requestFormInsertionError.message);
    // }
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
    const { data, error } = await supabase
      .from('organizations')
      .select('*, name');
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
    return data;
  },

  // getImages: async () => {
  //   const userId = await helpers.getCurrentUserId();
  //   const path = `${userId}/pics`;
  //   const { data, error } = await supabase.storage
  //     .from('animal-pictures-orgs')
  //     .list(path);
  //   if (error) {
  //     throw new Error(error.message);
  //   } else {
  //     return data.map((animals) => helpers.getImagesByAnimalId(animals.name));
  //   }
  // },

  // getAllUserImages: async () => {
  //   const userId = await helpers.getCurrentUserId();
  //   const path = `${userId}/pics`;
  //   const { data, error } = await supabase.storage
  //     .from('animal-pictures-orgs')
  //     .list(path);
  //   if (error) {
  //     throw new Error(error.message);
  //   } else {
  //     return data.map((animals) => ({
  //       pictures: helpers.getImagesByAnimalId(animals.name),
  //       profilePicture: helpers.getProfilePictureByAnimalId(animals.name),
  //     }));
  //   }
  // },

  // getImagesByAnimalId: async (animalId) => {
  //   const userId = await helpers.getCurrentUserId();
  //   const path = `${userId}/pics/${animalId}`;
  //   const { data, error } = await supabase.storage
  //     .from('animal-pictures-orgs')
  //     .list(path);

  //   if (error) {
  //     throw new Error(error.message);
  //   } else {
  //     return data.map(
  //       (imgData) =>
  //         `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animal-pictures-orgs/${userId}/pics/${animalId}/${imgData.name}`
  //     );
  //   }
  // },

  // getProfilePictureByAnimalId: async (animalId) => {
  //   const userId = await helpers.getCurrentUserId();
  //   const path = `${userId}/profile-pics/${animalId}`;
  //   const { data, error } = await supabase.storage
  //     .from('animal-pictures-orgs')
  //     .list(path);
  //   if (error) {
  //     throw new Error(error.message);
  //   } else {
  //     return data.map(
  //       (imgData) =>
  //         `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animal-pictures-orgs/${userId}/profile-pics/${animalId}/${imgData.name}`
  //     );
  //   }
  // },

  // deleteImage: async (animalId, imageId) => {
  //   const userId = await helpers.getCurrentUserId();
  //   const { data, error } = await supabase.storage
  //     .from('animal-pictures-orgs')
  //     .remove([`${userId}/pics/${animalId}/${imageId}`]);
  //   if (error) {
  //     throw new Error(error.message);
  //   } else {
  //     return helpers.getAllUserImages();
  //   }
  // },

  // deleteAllImages: async (animalId) => {
  //   const userId = await helpers.getCurrentUserId();
  //   deleteProfilePic(animalId);
  //   const { data: images, error } = await supabase.storage
  //       .from('animal-pictures-orgs')
  //       .list(`${userId}/pics/${animalId}`);

  //       if (error){
  //           throw new Error(error.message);
  //       }

  //       // Iterate through the list of images and delete each one
  //       const deletionPromises = images.map(async (image) => {
  //       const { error: deleteError } = await supabase.storage
  //           .from('animal-pictures-orgs')
  //           .remove([`${userId}/pics/${animalId}/${image.name}`]);
  //           if (deleteError) {
  //               throw new Error(deleteError);
  //           }
  //           });

  //       // Wait for all deletion promises to complete
  //       await Promise.all(deletionPromises);

  //       // After deleting all images, you can return the updated list of user images
  //       return helpers.getAllUserImages();
  // },

  // deleteProfilePic: async (animalId) => {
  //   const userId = await helpers.getCurrentUserId();
  //   const { data: images, error } = await supabase.storage
  //     .from('animal-pictures-orgs')
  //     .list(`${userId}/profile-pics/${animalId}`);

  //   if (error) {
  //     throw new Error(error.message);
  //   }

  //   // Iterate through the list of images and delete each one
  //     const deletionPromises = images.map(async (image) => {
  //       const { error: deleteError } = await supabase.storage
  //         .from('animal-pictures-orgs')
  //         .remove([`${userId}/profile-pics/${animalId}/${image.name}`]);
  //       if (deleteError) {
  //           throw new Error(deleteError);
  //       }
  //     });

  //     // Wait for all deletion promises to complete
  //     await Promise.all(deletionPromises);

  //     // After deleting all images, you can return the updated list of user images
  //     return helpers.getAllUserImages();
  // },

  // uploadImage: async (file, animalId) => {
  //   // let file = e.target.files[0];

  //   // let f: FileBody;
  //   const userId = await helpers.getCurrentUserId();
  //   const { data, error } = await supabase.storage
  //     .from('animal-pictures-orgs')
  //     .upload(`${userId}/pics/${animalId}/${imageId}/${uuidv4()}`, file);
  //   if (error) {
  //     throw new Error(error.message);
  //   } else {
  //     return helpers.getAllUserImages();
  //   }
  // },

  // uploadProfilePicture: async (file, animalId) => {
  //   const userId = await helpers.getCurrentUserId();
  //   deleteProfilePic(animalId);
  //   const { data, error } = await supabase.storage
  //     .from('animal-pictures-orgs')
  //     .upload(`${userId}/profile-pics/${animalId}/${imageId}/${uuidv4()}`,file);
  //   if (error) {
  //     throw new Error(error.message);
  //   } else {
  //     return helpers.getAllUserImages();
  //   }
  // },

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
      .eq('ong', id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
};

export default helpers;

// Local functions that shouldn't be exported go here

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

function accountExists(user: User | null): boolean {
  // This is an ugly hack necessary because supabase is stupid...
  // (See https://github.com/supabase/supabase-js/issues/296)
  return user?.identities?.length === 0;
}

async function getAdoptionRequests(
  profileType: Sb.ProfileType,
  id: string
): Promise<Sb.AdoptionRequest[]> {
  const col: Sb.TableColumn<'adoption_requests'> =
    profileType === 'RegularUser' ? 'user_id' : 'org_id';
  const { data, error } = await supabase
    .from('adoption_requests')
    .select('*')
    .eq(col, id);
  if (error) {
    throw new Error(error.message);
  }

  return data;
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

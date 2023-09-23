import { supabase } from './supabaseClient';
import { Animal, UserInfo, LoginInfo } from '~/supabase/types/supabase.tables';
import { PostgrestResponse } from '@supabase/supabase-js';
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

export async function userSignUp({
  email,
  password,
  username,
  firstName: first_name,
  lastName: last_name,
  identification,
}: UserInfo) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        first_name,
        last_name,
        identification,
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

export async function login({ email, password }: LoginInfo) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log('Error: ', error);
    throw new Error(error.message);
  }

  // data.session should be null when email verifaction is active
  return { data };
}

export async function resetPass(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: '/pass-forgot',
  });
  console.log('Data: ', data);
  console.log('Error: ', error);
  return data;
}

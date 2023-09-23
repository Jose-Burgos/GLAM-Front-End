import { supabase } from './supabaseClient';
import { Animal, UserInfo } from '~/supabase/types/supabase.tables';
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
  lastLast: last_name,
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
    throw new Error(error.message);
  }
  // data.session should be null when email verifaction is active
  return data.user;
}

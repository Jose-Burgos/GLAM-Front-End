import { supabase } from './supabaseClient'
import { Animal } from '~/supabase/types/supabase.tables'
import { PostgrestResponse } from '@supabase/supabase-js'
// import type { PostgrestFilterBuilder } from "@supabase/postgrest-js"

export async function getAnimals() {
  const { data, error, status }: PostgrestResponse<Animal> = await supabase.from('animals').select('*, species (name)')
  if (error) {
    throw new Error(error.message)
  }
  return data
}

interface UserInfo {
  username: string
  first_name: string
  last_name: string
  identification: string
  email: string
  password: string
}
export async function userSignUp({
  email,
  password,
  username,
  first_name,
  last_name,
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
  })
  if (error) {
    throw new Error(error.message)
  }
  return data
}

import { supabase } from './supabaseClient'
import { Animal } from '../types/supabase.tables'
import { PostgrestResponse } from '@supabase/supabase-js'
// import type { PostgrestFilterBuilder } from "@supabase/postgrest-js"

export async function selectAnimals(): Promise<PostgrestResponse<Animal>> {
  return supabase.from('animals').select('*, species (name)')
}

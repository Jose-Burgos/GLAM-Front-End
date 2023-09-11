import { supabase } from './supabaseClient'
import { Animal } from '../types/supabase.tables'
import { PostgrestResponse } from '@supabase/supabase-js'

export async function selectAnimals(): Promise<PostgrestResponse<Animal>> {
  return supabase.from('animals').select('*, species (name)')
}

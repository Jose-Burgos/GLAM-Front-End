import { Database } from './supabase'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Animal = Tables<'animals'> & {
   species: Tables<'species'>
}

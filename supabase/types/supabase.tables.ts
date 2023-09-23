import { Database } from './supabase';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type Animal = Tables<'animals'> & {
  species: Tables<'species'>;
};

export type RegularUser = Tables<'users'>;
export type Organization = Tables<'organizations'>;
export type ProfileType = 'RegularUser' | 'Organization';

export interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  identification: string;
  email: string;
  password: string;
}

export interface OrgInfo {
  name: string;
  email: string;
  password: string;
}

export interface LoginInfo {
  // phone?: string;
  email: string;
  password: string;
}

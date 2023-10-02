import { Database } from './supabase';

export type TableName = keyof Database['public']['Tables'];

export type Table<T extends TableName> = Database['public']['Tables'][T]['Row'];

export type Animal = Table<'animals'> & {
  species: Table<'species'>;
};

export type OrgType = 'Organization';
export type UserType = 'RegularUser';
export type ProfileType = UserType | OrgType;
export interface Profile<T> {
  public: T extends OrgType ? Table<'organizations'> : Table<'users'>;
  private: T extends OrgType
    ? Table<'private_org_info'>
    : Table<'private_user_info'> | null;
}

// export type RegularUserPublic = Tables<'users'>;
// export type RegularUserPrivate = Tables<'private_user_info'>;
// export type OrganizationPublic = Tables<'organizations'>;
// export type OrganizationPrivate = Tables<'private_org_info'>;

export interface UserSignupInfo {
  username: string;
  firstName: string;
  lastName: string;
  identification: string;
  email: string;
  password: string;
}

export interface OrgSignupInfo {
  name: string;
  email: string;
  password: string;
}

export interface LoginInfo {
  // phone?: string;
  email: string;
  password: string;
}

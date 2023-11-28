import { Database } from './supabase';

export type TableName = keyof Database['public']['Tables'];
export type TableColumn<T extends TableName> =
  keyof Database['public']['Tables'][T]['Row'];

export type Table<T extends TableName> = Database['public']['Tables'][T]['Row'];

export type Animal = Table<'animals'> & {
  species: Table<'species'>;
};

export type Request = Table<'adoption_requests'>;

export type OrgType = 'Organization';
export type UserType = 'RegularUser';
export type ProfileType = UserType | OrgType;
export interface Profile<T> {
  public: T extends OrgType ? Table<'organizations'> : Table<'users'>;
  private: T extends OrgType
    ? Table<'private_org_info'>
    : Table<'private_user_info'>;
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

// Esto es una cagada así hardcodeado, cuando se haga desde el back en express se puede mejorar
export enum RequestStates {
  pending = 1,
  accepted = 2,
  rejected = 3,
  cancelled = 4,
}

export type AdoptionRequest = Table<'adoption_requests'>;

export type SpeciesData = Table<'species'>;

export type Org = Table<'organizations'>;

export interface InKindDonation {
  ong : string;
  type : string;
  description : string;
  quantity : number;
  availability : string;
  user : string;
}
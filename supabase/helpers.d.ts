import * as Sb from './types/supabase.tables';
import { Session, PostgrestResponse } from '@supabase/supabase-js';

// Por alguna razón este import tira error aunque en helpers.ts esté exactamente igual y funque bien...
// import * as Sb from '~/supabase/types/supabase.tables';

export interface HelperFunctions {
  getAnimals: () => Promise<Sb.Animal[]>;
  deleteAnimal: (animalID: String) => Promise<void>;
  upsertAnimal: (animal: Sb.Animal) => Promise<void>;
  getAnimalById: (id: string) => Promise<Animal>;
  getCurrentUser: () => Promise<{
    profile: Sb.Profile<Sb.ProfileType>;
    type: Sb.ProfileType;
  }>;
  getCurrentUserId: () => Promise<string>;
  userSignUp: (signupInfo: Sb.UserSignupInfo) => Promise<{
    data: User | null;
    existingAccount: boolean;
  }>;
  orgSignUp: (signupInfo: Sb.OrgSignupInfo) => Promise<{
    data: User | null;
    existingAccount: boolean;
  }>;
  login: (loginInfo: Sb.LoginInfo) => Promise<{
    session: Session;
    profile: Sb.Profile<Sb.ProfileType>;
    type: Sb.ProfileType;
  }>;
  logout: () => Promise<void>;
  sendForgotPassEmail: (email: string) => Promise<void>;
  getSession: () => Promise<Session | null>;
  askNewPassOnReset: () => void;
  requestAdoption: (animalId: string) => void;
  getUserAdoptionRequests: () => Promise<Sb.AdoptionRequest[]>;
  getOrgAdoptionRequests: () => Promise<Sb.AdoptionRequest[]>;
  cancelAdoptionRequest: (requestId: string) => void;
  reactivateAdoptionRequest: (requestId: string) => void;
  getOrganizations: () => Promise<Sb.Org[]>;
  getSpecies: () => Promise<Sb.SpeciesData[]>;
}

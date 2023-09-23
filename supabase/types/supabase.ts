export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      animals: {
        Row: {
          age: number | null;
          back_length: number;
          breed: string | null;
          health_rating: number;
          height: number;
          id: string;
          inserted_at: string;
          name: string;
          org_id: string;
          rescue_date: string | null;
          sex: boolean;
          species_id: number;
          temporary_home_id: string | null;
          temporary_home_until: string | null;
          updated_at: string;
          vaccinated: boolean | null;
          weight: number;
        };
        Insert: {
          age?: number | null;
          back_length: number;
          breed?: string | null;
          health_rating?: number;
          height: number;
          id?: string;
          inserted_at?: string;
          name: string;
          org_id: string;
          rescue_date?: string | null;
          sex: boolean;
          species_id: number;
          temporary_home_id?: string | null;
          temporary_home_until?: string | null;
          updated_at?: string;
          vaccinated?: boolean | null;
          weight: number;
        };
        Update: {
          age?: number | null;
          back_length?: number;
          breed?: string | null;
          health_rating?: number;
          height?: number;
          id?: string;
          inserted_at?: string;
          name?: string;
          org_id?: string;
          rescue_date?: string | null;
          sex?: boolean;
          species_id?: number;
          temporary_home_id?: string | null;
          temporary_home_until?: string | null;
          updated_at?: string;
          vaccinated?: boolean | null;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'animals_org_id_fkey';
            columns: ['org_id'];
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'animals_species_id_fkey';
            columns: ['species_id'];
            referencedRelation: 'species';
            referencedColumns: ['id'];
          },
        ];
      };
      asdf: {
        Row: {
          created_at: string;
          date: string | null;
          health_rating: number;
          height: number;
          id: string;
          sex: boolean;
          sp_id: number;
          temporary_home_until: string | null;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          health_rating?: number;
          height: number;
          id?: string;
          sex: boolean;
          sp_id: number;
          temporary_home_until?: string | null;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          health_rating?: number;
          height?: number;
          id?: string;
          sex?: boolean;
          sp_id?: number;
          temporary_home_until?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'asdf_sp_id_fkey';
            columns: ['sp_id'];
            referencedRelation: 'species';
            referencedColumns: ['id'];
          },
        ];
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          reputation: number | null;
        };
        Insert: {
          id: string;
          name: string;
          reputation?: number | null;
        };
        Update: {
          id?: string;
          name?: string;
          reputation?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'organizations_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      species: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          first_name: string;
          id: string;
          identification: string;
          last_name: string;
          reputation: number | null;
          username: string;
        };
        Insert: {
          first_name: string;
          id: string;
          identification: string;
          last_name: string;
          reputation?: number | null;
          username: string;
        };
        Update: {
          first_name?: string;
          id?: string;
          identification?: string;
          last_name?: string;
          reputation?: number | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

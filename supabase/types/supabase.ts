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
          adopted: boolean;
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
          adopted?: boolean;
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
          adopted?: boolean;
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
      organizations: {
        Row: {
          id: string;
          name: string;
          email: string;
          address: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          address: string;
        };
        Update: {
          id?: string;
          name?: string;
          email: string;
          address: string;
        };
        Relationships: [
          {
            foreignKeyName: 'organizations_id_fkey';
            columns: ['id'];
            referencedRelation: 'private_org_info';
            referencedColumns: ['id'];
          },
        ];
      };
      private_org_info: {
        Row: {
          id: string;
          
        };
        Insert: {
          id: string;
        };
        Update: {
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'private_org_info_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      private_user_info: {
        Row: {
          first_name: string;
          user_id: string;
          identification: string | null;
          last_name: string;
        };
        Insert: {
          first_name: string;
          user_id: string;
          identification?: string | null;
          last_name: string;
        };
        Update: {
          first_name?: string;
          user_id?: string;
          identification?: string | null;
          last_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'private_user_info_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
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
          user_id: string;
          username: string;
          first_name: string;
          last_name: string;
          identification: string;
          email: string;
        };
        Insert: {
          user_id: string;
          username: string;
          first_name: string;
          last_name: string;
          identification: string;
          email: string;
        };
        Update: {
          user_id?: string;
          username?: string;
          first_name?: string;
          last_name?: string;
          identification?: string;
          email?: string;
        };
      };
      requests: {
        Row: {
          request_id: string; // UUID
          animal_id: number;  // INT8
          org_id: string;     // UUID
          user_email: string; // TEXT
          user_name: string;  // TEXT
          description: string; // TEXT
        };
        Insert: {
          animal_id: number;  // INT8
          org_id: string;     // UUID
          user_email: string; // TEXT
          user_name: string;  // TEXT
          description: string; // TEXT
        };
        Update: {
          request_id?: string;  // UUID
          animal_id?: number;   // INT8
          org_id?: string;      // UUID
          user_email?: string;  // TEXT
          user_name?: string;   // TEXT
          description?: string; // TEXT
        };
        Relationships: [
          {
            foreignKeyName: 'requests_animal_id_fkey',
            columns: ['animal_id'],
            referencedRelation: 'animals',
            referencedColumns: ['id'],
          },
          {
            foreignKeyName: 'requests_org_id_fkey',
            columns: ['org_id'],
            referencedRelation: 'organizations',
            referencedColumns: ['id'],
          },
          {
            foreignKeyName: 'requests_user_email_fkey',
            columns: ['user_email'],
            referencedRelation: 'users',
            referencedColumns: ['email'],
          },
          {
            foreignKeyName: 'requests_user_name_fkey',
            columns: ['user_name'],
            referencedRelation: 'users',
            referencedColumns: ['username'],
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

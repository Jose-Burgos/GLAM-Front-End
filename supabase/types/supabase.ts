export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      adoption_requests: {
        Row: {
          animal_id: string
          finalized_at: string | null
          id: string
          org_id: string
          requested_at: string
          state_id: number
          user_id: string
        }
        Insert: {
          animal_id: string
          finalized_at?: string | null
          id?: string
          org_id: string
          requested_at?: string
          state_id: number
          user_id: string
        }
        Update: {
          animal_id?: string
          finalized_at?: string | null
          id?: string
          org_id?: string
          requested_at?: string
          state_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "adoption_requests_animal_id_fkey"
            columns: ["animal_id"]
            isOneToOne: false
            referencedRelation: "animals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adoption_requests_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adoption_requests_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "request_states"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adoption_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      animals: {
        Row: {
          adopted: boolean
          age: number | null
          back_length: number
          breed: string | null
          health_rating: number
          height: number
          id: string
          inserted_at: string
          name: string
          org_id: string
          profile_pic: string | null
          rescue_date: string | null
          sex: boolean
          species_id: number
          temporary_home_id: string | null
          temporary_home_until: string | null
          updated_at: string
          vaccinated: boolean | null
          weight: number
        }
        Insert: {
          adopted?: boolean
          age?: number | null
          back_length?: number
          breed?: string | null
          health_rating?: number
          height?: number
          id?: string
          inserted_at?: string
          name?: string
          org_id: string
          profile_pic?: string | null
          rescue_date?: string | null
          sex: boolean
          species_id: number
          temporary_home_id?: string | null
          temporary_home_until?: string | null
          updated_at?: string
          vaccinated?: boolean | null
          weight?: number
        }
        Update: {
          adopted?: boolean
          age?: number | null
          back_length?: number
          breed?: string | null
          health_rating?: number
          height?: number
          id?: string
          inserted_at?: string
          name?: string
          org_id?: string
          profile_pic?: string | null
          rescue_date?: string | null
          sex?: boolean
          species_id?: number
          temporary_home_id?: string | null
          temporary_home_until?: string | null
          updated_at?: string
          vaccinated?: boolean | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "animals_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "animals_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "species"
            referencedColumns: ["id"]
          }
        ]
      }
      organizations: {
        Row: {
          id: string
          name: string
          reputation: number | null
        }
        Insert: {
          id: string
          name: string
          reputation?: number | null
        }
        Update: {
          id?: string
          name?: string
          reputation?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "private_org_info"
            referencedColumns: ["id"]
          }
        ]
      }
      private_org_info: {
        Row: {
          id: string
          idk_something_private: string | null
        }
        Insert: {
          id: string
          idk_something_private?: string | null
        }
        Update: {
          id?: string
          idk_something_private?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "private_org_info_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      private_user_info: {
        Row: {
          first_name: string
          id: string
          identification: string | null
          last_name: string
        }
        Insert: {
          first_name: string
          id: string
          identification?: string | null
          last_name: string
        }
        Update: {
          first_name?: string
          id?: string
          identification?: string | null
          last_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "private_user_info_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      regions: {
        Row: {
          alpha_2: string
          alpha_3: string
          country_code: string
          intermediate_region: string | null
          intermediate_region_code: string | null
          iso_3166_2: string
          name: string
          region: string
          region_code: string | null
          sub_region: string | null
          sub_region_code: string | null
        }
        Insert: {
          alpha_2: string
          alpha_3: string
          country_code: string
          intermediate_region?: string | null
          intermediate_region_code?: string | null
          iso_3166_2: string
          name: string
          region: string
          region_code?: string | null
          sub_region?: string | null
          sub_region_code?: string | null
        }
        Update: {
          alpha_2?: string
          alpha_3?: string
          country_code?: string
          intermediate_region?: string | null
          intermediate_region_code?: string | null
          iso_3166_2?: string
          name?: string
          region?: string
          region_code?: string | null
          sub_region?: string | null
          sub_region_code?: string | null
        }
        Relationships: []
      }
      species: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          adoption_ban_until: string | null
          id: string
          region: string | null
          reputation: number | null
          username: string
        }
        Insert: {
          adoption_ban_until?: string | null
          id: string
          region?: string | null
          reputation?: number | null
          username: string
        }
        Update: {
          adoption_ban_until?: string | null
          id?: string
          region?: string | null
          reputation?: number | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "private_user_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_region_fkey"
            columns: ["region"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["alpha_3"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

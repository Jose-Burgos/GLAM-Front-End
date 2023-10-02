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
      animals: {
        Row: {
          age: number | null
          back_length: number
          breed: string | null
          health_rating: number
          height: number
          id: string
          inserted_at: string
          name: string
          org_id: string
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
          age?: number | null
          back_length: number
          breed?: string | null
          health_rating?: number
          height: number
          id?: string
          inserted_at?: string
          name: string
          org_id: string
          rescue_date?: string | null
          sex: boolean
          species_id: number
          temporary_home_id?: string | null
          temporary_home_until?: string | null
          updated_at?: string
          vaccinated?: boolean | null
          weight: number
        }
        Update: {
          age?: number | null
          back_length?: number
          breed?: string | null
          health_rating?: number
          height?: number
          id?: string
          inserted_at?: string
          name?: string
          org_id?: string
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
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "animals_species_id_fkey"
            columns: ["species_id"]
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
          id: string
          region: string | null
          reputation: number | null
          username: string
        }
        Insert: {
          id: string
          region?: string | null
          reputation?: number | null
          username: string
        }
        Update: {
          id?: string
          region?: string | null
          reputation?: number | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "private_user_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_region_fkey"
            columns: ["region"]
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

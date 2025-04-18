export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about_page: {
        Row: {
          content_en: Json
          content_ka: Json
          id: string
          updated_at: string
        }
        Insert: {
          content_en: Json
          content_ka: Json
          id?: string
          updated_at?: string
        }
        Update: {
          content_en?: Json
          content_ka?: Json
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          content_en: string
          content_ka: string
          created_at: string
          id: string
          is_published: boolean
          meta_description_en: string | null
          meta_description_ka: string | null
          slug: string
          title_en: string
          title_ka: string
          updated_at: string
        }
        Insert: {
          content_en: string
          content_ka: string
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description_en?: string | null
          meta_description_ka?: string | null
          slug: string
          title_en: string
          title_ka: string
          updated_at?: string
        }
        Update: {
          content_en?: string
          content_ka?: string
          created_at?: string
          id?: string
          is_published?: boolean
          meta_description_en?: string | null
          meta_description_ka?: string | null
          slug?: string
          title_en?: string
          title_ka?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          client: string | null
          completion_date: string | null
          created_at: string | null
          description_en: string
          description_ka: string
          full_description_en: string
          full_description_ka: string
          id: string
          image_url: string
          location: string | null
          title_en: string
          title_ka: string
          updated_at: string | null
        }
        Insert: {
          category: string
          client?: string | null
          completion_date?: string | null
          created_at?: string | null
          description_en: string
          description_ka: string
          full_description_en: string
          full_description_ka: string
          id?: string
          image_url: string
          location?: string | null
          title_en: string
          title_ka: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          client?: string | null
          completion_date?: string | null
          created_at?: string | null
          description_en?: string
          description_ka?: string
          full_description_en?: string
          full_description_ka?: string
          id?: string
          image_url?: string
          location?: string | null
          title_en?: string
          title_ka?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description_en: string
          description_ka: string
          full_description_en: string
          full_description_ka: string
          id: string
          image_url: string
          title_en: string
          title_ka: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_en: string
          description_ka: string
          full_description_en: string
          full_description_ka: string
          id?: string
          image_url: string
          title_en: string
          title_ka: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_en?: string
          description_ka?: string
          full_description_en?: string
          full_description_ka?: string
          id?: string
          image_url?: string
          title_en?: string
          title_ka?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      special_pages: {
        Row: {
          content_en: string
          content_ka: string
          hero_subtitle_en: string | null
          hero_subtitle_ka: string | null
          hero_title_en: string
          hero_title_ka: string
          id: string
          meta_description_en: string | null
          meta_description_ka: string | null
          updated_at: string
        }
        Insert: {
          content_en: string
          content_ka: string
          hero_subtitle_en?: string | null
          hero_subtitle_ka?: string | null
          hero_title_en: string
          hero_title_ka: string
          id: string
          meta_description_en?: string | null
          meta_description_ka?: string | null
          updated_at?: string
        }
        Update: {
          content_en?: string
          content_ka?: string
          hero_subtitle_en?: string | null
          hero_subtitle_ka?: string | null
          hero_title_en?: string
          hero_title_ka?: string
          id?: string
          meta_description_en?: string | null
          meta_description_ka?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio_en: string
          bio_ka: string
          created_at: string | null
          email: string | null
          id: string
          image_url: string
          linkedin_url: string | null
          name_en: string
          name_ka: string
          order_index: number
          title_en: string
          title_ka: string
          updated_at: string | null
        }
        Insert: {
          bio_en: string
          bio_ka: string
          created_at?: string | null
          email?: string | null
          id?: string
          image_url: string
          linkedin_url?: string | null
          name_en: string
          name_ka: string
          order_index?: number
          title_en: string
          title_ka: string
          updated_at?: string | null
        }
        Update: {
          bio_en?: string
          bio_ka?: string
          created_at?: string | null
          email?: string | null
          id?: string
          image_url?: string
          linkedin_url?: string | null
          name_en?: string
          name_ka?: string
          order_index?: number
          title_en?: string
          title_ka?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const

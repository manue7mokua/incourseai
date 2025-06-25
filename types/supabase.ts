export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      courses: {
        Row: {
          code: string | null
          created_at: string
          description: string | null
          id: string
          instructor: string
          lms_id: string | null
          lms_provider: string | null
          name: string
          semester: string | null
          updated_at: string
          year: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          instructor: string
          lms_id?: string | null
          lms_provider?: string | null
          name: string
          semester?: string | null
          updated_at?: string
          year?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          instructor?: string
          lms_id?: string | null
          lms_provider?: string | null
          name?: string
          semester?: string | null
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          course_id: string
          enrolled_at: string
          id: string
          status: string | null
          user_id: string
        }
        Insert: {
          course_id: string
          enrolled_at?: string
          id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          course_id?: string
          enrolled_at?: string
          id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          canvas_id: string | null
          course_id: string | null
          created_at: string
          id: string
          module_item_id: string | null
          name: string
          size: number
          type: string | null
          updated_at: string
          url: string | null
        }
        Insert: {
          canvas_id?: string | null
          course_id?: string | null
          created_at?: string
          id?: string
          module_item_id?: string | null
          name: string
          size?: number
          type?: string | null
          updated_at?: string
          url?: string | null
        }
        Update: {
          canvas_id?: string | null
          course_id?: string | null
          created_at?: string
          id?: string
          module_item_id?: string | null
          name?: string
          size?: number
          type?: string | null
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_module_item_id_fkey"
            columns: ["module_item_id"]
            isOneToOne: false
            referencedRelation: "module_items"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_deck_modules: {
        Row: {
          deck_id: string
          module_id: string
        }
        Insert: {
          deck_id: string
          module_id: string
        }
        Update: {
          deck_id?: string
          module_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_deck_modules_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "flashcard_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flashcard_deck_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_decks: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          items_count: number | null
          name: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          items_count?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          items_count?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_decks_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_items: {
        Row: {
          answer: string
          created_at: string
          deck_id: string
          id: string
          position: number | null
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          deck_id: string
          id?: string
          position?: number | null
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          deck_id?: string
          id?: string
          position?: number | null
          question?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_items_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "flashcard_decks"
            referencedColumns: ["id"]
          },
        ]
      }
      module_items: {
        Row: {
          course_id: string
          created_at: string
          id: string
          lms_content_id: string | null
          lms_id: string | null
          module_id: string
          name: string
          position: number | null
          type: string
          updated_at: string
          url: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          lms_content_id?: string | null
          lms_id?: string | null
          module_id: string
          name: string
          position?: number | null
          type: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          lms_content_id?: string | null
          lms_id?: string | null
          module_id?: string
          name?: string
          position?: number | null
          type?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "module_items_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "module_items_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          items_count: number | null
          lms_id: string | null
          name: string
          position: number | null
          prerequisites: Json | null
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          items_count?: number | null
          lms_id?: string | null
          name: string
          position?: number | null
          prerequisites?: Json | null
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          items_count?: number | null
          lms_id?: string | null
          name?: string
          position?: number | null
          prerequisites?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          answers: Json | null
          completed_at: string
          id: string
          quiz_id: string
          score: number
          total_questions: number
          user_id: string
        }
        Insert: {
          answers?: Json | null
          completed_at?: string
          id?: string
          quiz_id: string
          score?: number
          total_questions?: number
          user_id: string
        }
        Update: {
          answers?: Json | null
          completed_at?: string
          id?: string
          quiz_id?: string
          score?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_modules: {
        Row: {
          module_id: string
          quiz_id: string
        }
        Insert: {
          module_id: string
          quiz_id: string
        }
        Update: {
          module_id?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_modules_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_option: number
          created_at: string
          explanation: string | null
          id: string
          options: Json
          position: number | null
          question: string
          quiz_id: string
          updated_at: string
        }
        Insert: {
          correct_option: number
          created_at?: string
          explanation?: string | null
          id?: string
          options?: Json
          position?: number | null
          question: string
          quiz_id: string
          updated_at?: string
        }
        Update: {
          correct_option?: number
          created_at?: string
          explanation?: string | null
          id?: string
          options?: Json
          position?: number | null
          question?: string
          quiz_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          items_count: number | null
          name: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          items_count?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          items_count?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_api_keys: {
        Row: {
          api_base_url: string | null
          created_at: string
          encrypted_api_key: string
          id: string
          is_active: boolean | null
          lms_provider: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_base_url?: string | null
          created_at?: string
          encrypted_api_key: string
          id?: string
          is_active?: boolean | null
          lms_provider: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_base_url?: string | null
          created_at?: string
          encrypted_api_key?: string
          id?: string
          is_active?: boolean | null
          lms_provider?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

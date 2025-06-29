import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'student' | 'admin';
          created_at: string;
          last_login: string;
          progress: any;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: 'student' | 'admin';
          created_at?: string;
          last_login?: string;
          progress?: any;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'student' | 'admin';
          created_at?: string;
          last_login?: string;
          progress?: any;
        };
      };
    };
  };
}
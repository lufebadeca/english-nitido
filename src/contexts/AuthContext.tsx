import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { User, AuthContextType } from '../types';
import { ProgressManager } from '../utils/progressUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    
    // If user profile doesn't exist, create it from auth data
    if (!data) {
      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser?.user?.email) return null;

      const newUserData = {
        id: userId,
        email: authUser.user.email,
        name: authUser.user.user_metadata?.name || authUser.user.email.split('@')[0],
        role: 'student',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        progress: ProgressManager.getProgress()
      };

      const { error: insertError } = await supabase
        .from('users')
        .insert(newUserData);

      if (insertError) {
        console.error('Failed to create user profile:', insertError);
        return null;
      }

      setUser({
        id: newUserData.id,
        email: newUserData.email,
        name: newUserData.name,
        role: newUserData.role as 'student' | 'admin',
        createdAt: newUserData.created_at,
        lastLogin: newUserData.last_login,
        progress: newUserData.progress,
      });

      return newUserData;
    }

    setUser({
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      createdAt: data.created_at,
      lastLogin: data.last_login,
      progress: data.progress ?? ProgressManager.getProgress(),
    });

    return data;
  };



  const resolveUser = async (session: any | null) => {
    if (!session?.user) {
      setUser(null);
      setAuthReady(true);
      return;
    }

    try {
      await loadUserProfile(session.user.id);
    } finally {
      setAuthReady(true);
    }
  };

  useEffect(() => {
    let active = true;

    const resolveSession = async (session: Session | null) => {
      setLoading(true);

      try {
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error(e);
        setUser(null);
      } finally {
        if (active) {
          //console.log('✅ AUTH RESOLVED');
          setLoading(false); // 🔑 THIS WAS MISSING
        }
      }
    };

    // initial restore
    supabase.auth.getSession().then(({ data }) => {
      if (active) resolveSession(data.session);
    });

    // auth events
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        if (active) resolveSession(session);
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);



  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // The auth state change listener will handle loading and user state
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // Store name in user metadata
        }
      }
    });

    if (error) throw error;

    if (data.user?.id) {
      // Call the Edge Function to create the user profile with admin privileges
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-user-profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.session?.access_token || ""}`,
            },
            body: JSON.stringify({
              userId: data.user.id,
              email,
              name,
            }),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          console.error("Failed to create user profile:", error);
          throw new Error(error.error || "Failed to create user profile");
        }
      } catch (err) {
        console.error("Error calling create-user-profile function:", err);
        // Continue anyway - the profile will be created on first login
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

   const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    authReady
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
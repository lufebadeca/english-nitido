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
    if (!data) return null;

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
  setLoading(true); // Start loading
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // The auth state change listener will handle the rest
  } catch (error) {
    console.error('Sign in error:', error);
    setLoading(false); // Make sure to reset loading on error
    throw error;
  }
};

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email,
          name,
          role: 'student',
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          progress: ProgressManager.getProgress()
        });

      if (profileError) throw profileError;
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
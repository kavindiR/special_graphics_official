'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, getAuthToken, getUserData, setAuthToken, setUserData, removeAuthToken, removeUserData, AuthResponse } from '@/lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  refreshUser: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      const storedUser = getUserData();

      if (token && storedUser) {
        setUser(storedUser);
        // Optionally verify token with backend
        try {
          const response = await authApi.getCurrentUser();
          if (response.success && response.data?.user) {
            setUser(response.data.user);
            setUserData(response.data.user);
          } else {
            // Token is invalid, clear auth
            removeAuthToken();
            removeUserData();
            setUser(null);
          }
        } catch (error) {
          // If verification fails, clear auth
          removeAuthToken();
          removeUserData();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const signUp = useCallback(async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authApi.signUp({ name, email, password });
      
      if (response.success && response.data) {
        setAuthToken(response.data.token);
        setUserData(response.data.user);
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, error: response.error || response.message || 'Sign up failed' };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }, []);

  const signIn = useCallback(async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authApi.signIn({ email, password });
      
      if (response.success && response.data) {
        setAuthToken(response.data.token);
        setUserData(response.data.user);
        setUser(response.data.user);
        return { success: true };
      } else {
        return { success: false, error: response.error || response.message || 'Sign in failed' };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  }, []);

  const signOut = useCallback(() => {
    authApi.signOut();
    setUser(null);
    router.push('/auth');
  }, [router]);

  const refreshUser = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await authApi.getCurrentUser();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setUserData(response.data.user);
      } else {
        signOut();
      }
    } catch (error) {
      signOut();
    }
  }, [signOut]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    refreshUser,
  };
}


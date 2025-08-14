'use client';

import { api } from '@/lib/axios';
import { APIResponse } from '@/shared/types/api';
import { LoginResponse, SignUpResponse } from '@/shared/types/auth';
import { Session } from '@/shared/types/session';
import { useState } from 'react';

// Token management
const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
  },

  clearTokens: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  },

  isAuthenticated: (): boolean => {
    return !!tokenManager.getAccessToken();
  },
};

// Sign-up input type
export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Sign-in input type
export interface SignInInput {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (input: SignUpInput): Promise<Session | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: APIResponse<SignUpResponse> = await api.post(
        '/auth/sign-up',
        input
      );

      if (response.success && response.data) {
        const { session, accessToken, refreshToken } = response.data;
        tokenManager.setTokens(accessToken, refreshToken);
        return session;
      } else {
        // This is an expected API error response, not an exception
        setError(response.message || 'Registration failed');
        return null;
      }
    } catch (err: any) {
      // This is for unexpected errors (network issues, etc.)
      console.error('Unexpected error during registration:', err);
      const errorMessage =
        err.message || 'An error occurred during registration';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (input: SignInInput): Promise<Session | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response: APIResponse<LoginResponse> = await api.post(
        '/auth/sign-in',
        input
      );

      if (response.success && response.data) {
        const { session, accessToken, refreshToken } = response.data;
        tokenManager.setTokens(accessToken, refreshToken);
        return session;
      } else {
        // This is an expected API error response, not an exception
        setError(response.message || 'Sign in failed');
        return null;
      }
    } catch (err: any) {
      // This is for unexpected errors (network issues, etc.)
      console.error('Unexpected error during sign in:', err);
      const errorMessage = err.message || 'An error occurred during sign in';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = (): void => {
    tokenManager.clearTokens();
    // Optionally redirect to sign-in page
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/sign-in';
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    isLoading,
    error,
    isAuthenticated: tokenManager.isAuthenticated(),
  };
};

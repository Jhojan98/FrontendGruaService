import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { clearAuthToken, getAuthToken, getMe, login, patchMe, setAuthToken } from '../lib/api';
import { ApiError, UpdateMePayload, UserMe } from '../types';

interface AuthContextValue {
  token: string | null;
  user: UserMe | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isSubmitting: boolean;
  error: string | null;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
  updateMe: (payload: UpdateMePayload, profileImageFile?: File | null) => Promise<UserMe>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getAuthToken());
  const [user, setUser] = useState<UserMe | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    clearAuthToken();
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const refreshMe = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
      setError(null);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        logout();
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unexpected error loading your profile');
      }
      throw err;
    }
  }, [logout]);

  const loginWithCredentials = useCallback(async (email: string, password: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await login({ email, password });
      setAuthToken(response.access_token);
      setToken(response.access_token);
      const me = await getMe();
      setUser(me);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unexpected error while signing in');
      }
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const updateMe = useCallback(
    async (payload: UpdateMePayload, profileImageFile?: File | null) => {
      setIsSubmitting(true);
      setError(null);
      try {
        const updated = await patchMe(payload, profileImageFile);
        setUser(updated);
        return updated;
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          logout();
        }
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unexpected error while saving your profile');
        }
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [logout],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const me = await getMe();
        if (!cancelled) {
          setUser(me);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof ApiError && err.status === 401) {
            logout();
          } else if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Unexpected error loading your profile');
          }
        }
      } finally {
        if (!cancelled) {
          setIsInitializing(false);
        }
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [token, logout]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isInitializing,
      isSubmitting,
      error,
      loginWithCredentials,
      logout,
      refreshMe,
      updateMe,
      clearError,
    }),
    [token, user, isInitializing, isSubmitting, error, loginWithCredentials, logout, refreshMe, updateMe, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}

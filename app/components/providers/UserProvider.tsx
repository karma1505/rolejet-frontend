'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Matches the shape returned by the FastAPI /auth/google endpoint
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  google_id: string;
  created_at: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signOut: () => void;
  isLoading: boolean;
  loginWithCredential: (token: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'rolejet-user';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUserState(JSON.parse(saved));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const loginWithCredential = useCallback(async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: token }),
      });

      if (!res.ok) throw new Error(`Auth failed: ${res.status}`);

      const data = await res.json();
      console.log("Authenticated successfully:", data);

      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Backend auth error:", error);
    }
  }, [setUser]);

  return (
    <UserContext.Provider value={{ user, setUser, signOut, isLoading, loginWithCredential }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

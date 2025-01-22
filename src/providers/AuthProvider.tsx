"use client"

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { SessionProvider, useSession } from "next-auth/react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {}, 
});

const getIsLoggedIn = (): boolean => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem("isLoggedIn");
    return storedValue === "true"; // converts "true" string back to boolean
  }
  return false;
};

const setIsLoggedInLocal = (value: boolean) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("isLoggedIn", value ? "true" : "false");
  }
};

const getUserEmail = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userEmail");
  }
  return null;
};

const setUserEmail = (email: string | null) => {
  if (typeof window !== "undefined") {
    if (email) {
      localStorage.setItem("userEmail", email);
    } else {
      localStorage.removeItem("userEmail");
    }
  }
};

const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getIsLoggedIn());

  useEffect(() => {
    const authenticated = status === "authenticated";
    setIsLoggedIn(authenticated);
    setIsLoggedInLocal(authenticated); 

    if (authenticated && session?.user?.email) {
      setUserEmail(session.user.email);
    } else {
      setUserEmail(null);
    }
  }, [status, session]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </SessionProvider>
  );
};

export default AuthProvider;

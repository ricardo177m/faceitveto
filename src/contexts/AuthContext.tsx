"use client";

import getSession from "@/lib/getSession";
import { createContext, useEffect, useState } from "react";

export interface AuthContextData {
  isLogged: boolean;
  user: Session | null;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthContextProvider({
  children,
  ...props
}: AuthContextProviderProps) {
  const [user, setUser] = useState<Session | null>(null);

  const fetchSession = async () => {
    const user = await getSession();
    setUser(user);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged: !!user, user }} {...props}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

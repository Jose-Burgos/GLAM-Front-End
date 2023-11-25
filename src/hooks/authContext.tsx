'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import HelperFunctions from '~/supabase/helpers';

interface AuthContextProps {
  isLoggedIn: boolean;
  logOut: () => void;
  logIn: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextProps>({
  isLoggedIn: false,
  logOut: () => {},
  logIn: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const session = await HelperFunctions.getSession();
      const loggedIn = !!session;
      setIsLoggedIn(loggedIn);
    };
    checkIfLoggedIn();
  }, []);

  const logOut = () => {
    HelperFunctions.logout();
    setIsLoggedIn(false);
    router.push('/');
  };

  const logIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ logIn, isLoggedIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

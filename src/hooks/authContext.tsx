'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import HelperFunctions from '~/supabase/helpers';

interface AuthContextProps {
  isLoggedIn: boolean;
  logOut: () => void;
  logIn: () => void;
  type: string; // deberían usar algo tipo `type: 'ong' | 'user'` mejor.
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextProps>({
  isLoggedIn: false,
  logOut: () => {},
  logIn: () => {},
  type: '',
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [type, setType] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const session = await HelperFunctions.getSession();
      if (session?.user.user_metadata.profile_type === 'Organization') {
        setType('ong');
      } else {
        setType('user');
      }
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
    <AuthContext.Provider value={{ logIn, isLoggedIn, logOut, type }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

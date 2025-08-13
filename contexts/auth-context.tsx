'use client';

import { createContext, useState } from 'react';

interface Context {
  accessToken: string | null;
  refreshToken: string | null;
}

const AuthContext = createContext<Context>({
  accessToken: null,
  refreshToken: null,
});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

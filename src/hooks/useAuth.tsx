import api from "@/services/api";
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

interface AuthState {
  name: string;
  username: string;
  token: string;
  signedIn: boolean;
}

interface AuthContextData {
  authData: AuthState;
  signOut: () => void;
  signIn: ({ username, password }: SignInRequest) => Promise<void>;
}

interface SignInRequest {
  username: string;
  password: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [storage, setStorage] = useState<Storage | undefined>(undefined);
  const [data, setData] = useState<AuthState>({} as AuthState);

  const signOut = useCallback(() => {
    if (storage)
      storage.removeItem('auth');

    setData({} as AuthState);
  }, [storage]);

  const signIn = useCallback(async ({ username, password }: SignInRequest) => {
    const response = await api.post('api/signIn', {
      username,
      password,
    });
    const { data } = response;
    const authData = {
      ...data,
      signedIn: true
    };

    if (storage)
      storage.setItem('auth', JSON.stringify(authData));

    api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

    setData(authData);
  }, [storage, api, storage]);

  useEffect(() => {
    setStorage(localStorage);
  }, []);

  useEffect(() => {
    if (!!storage) {
      const authData = storage.getItem('auth');

      if (authData) {
        const parsedData = JSON.parse(authData);
        api.defaults.headers['Authorization'] = `Bearer ${parsedData.token}`;
        setData(parsedData)
      }
    }
  }, [storage, api])

  return (
    <AuthContext.Provider value={{ authData: data, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must br used within an AuthProvider');
  }
  return context;
}

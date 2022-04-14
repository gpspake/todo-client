import React, { useEffect, useState } from 'react';
import { Auth0Provider, GetTokenSilentlyOptions } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosRequestConfig } from 'axios';

type AuthProviderProps = { children: React.ReactNode }

const AxiosInterceptorContext = React.createContext<{ isTokenSet: boolean }>({ isTokenSet: false });

const AuthContext = React.createContext<{
  isTokenSet: boolean,
  isAuthenticated: boolean,
  isLoading: boolean,
  getAccessTokenSilently?: (opts?: GetTokenSilentlyOptions) => Promise<any>
}>({
  isTokenSet: false,
  isAuthenticated: false,
  isLoading: true,
});

const setAxiosTokenInterceptor = async (accessToken: string): Promise<void> => {
  axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });
};

const AxiosInterceptorProvider = ({ children }: AuthProviderProps) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isTokenSet, setIsTokenSet] = useState(false);

  useEffect(() => {
    const getAccessToken = async () => {
      const audience = import.meta.env.VITE_AUTH0_AUDIENCE as string;
      const accessToken = await getAccessTokenSilently({ audience });
      await setAxiosTokenInterceptor(accessToken);
      setIsTokenSet(true);
    };
    getAccessToken();
  }, [getAccessTokenSilently]);

  return (
    <AxiosInterceptorContext.Provider value={{ isTokenSet }}>
      {children}
    </AxiosInterceptorContext.Provider>
  );
};

const CommonAuthProvider = ({ children }: AuthProviderProps) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const { isTokenSet } = useAxiosInterceptor();
  const value = { isTokenSet, isLoading, isAuthenticated, getAccessTokenSilently };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAxiosInterceptor = () => {
  const context = React.useContext(AxiosInterceptorContext);
  if (context === undefined) {
    throw new Error('useAxiosInterceptor must be used within an AxiosInterceptorProvider');
  }
  return context;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a CommonAuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
      redirectUri={window.location.origin}
      audience={import.meta.env.VITE_AUTH0_AUDIENCE as string}
    >
      <AxiosInterceptorProvider>
        <CommonAuthProvider>
          {children}
        </CommonAuthProvider>
      </AxiosInterceptorProvider>
    </Auth0Provider>
  );
}
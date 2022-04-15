import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const AxiosInterceptorContext = React.createContext<{ isTokenSet: boolean }>({ isTokenSet: false });

const setAxiosTokenInterceptor = async (accessToken: string): Promise<void> => {
  axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (accessToken) {
      if(config.headers) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      } else {
        config.headers = {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    }
    return config;
  });
};

export const useAxiosInterceptor = () => {
  const context = React.useContext(AxiosInterceptorContext);
  if (context === undefined) {
    throw new Error('useAxiosInterceptor must be used within an AxiosInterceptorProvider');
  }
  return context;
};

type AxiosInterceptorProviderProps = { children: React.ReactNode }

export const AxiosInterceptorProvider = ({ children }: AxiosInterceptorProviderProps) => {
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

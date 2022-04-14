import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { AxiosInterceptorProvider } from './AxiosInterceptorProvider';
import { CommonAuthProvider, useAuth } from './CommonAuthProvider';

type AuthProviderProps = { children: React.ReactNode }

export { useAuth }

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

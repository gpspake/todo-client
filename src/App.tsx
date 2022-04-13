import React, { useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Nav} from "./components/Nav";
import {Main} from "./components/Main";
import { useAuth0 } from '@auth0/auth0-react';
import axios, {AxiosRequestConfig} from 'axios';

const setAxiosTokenInterceptor = async (accessToken: string): Promise<void> => {
  axios.interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  })
}

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const getAccessToken = async () => {
      const audience = import.meta.env.VITE_AUTH0_AUDIENCE as string
      const accessToken = await getAccessTokenSilently({ audience });
      await setAxiosTokenInterceptor(accessToken);
    };
    getAccessToken();
  }, [getAccessTokenSilently]);

  if (isLoading === undefined && isAuthenticated === undefined) return <div>Loading...</div>

  return (
    <Router>
      <Nav/>
      {!isLoading && isAuthenticated && <Main/>}
    </Router>
  );
}

export default App;

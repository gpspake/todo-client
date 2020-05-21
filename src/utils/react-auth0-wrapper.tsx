import React, { useState, useEffect, useContext } from 'react'
import createAuth0Client, { Auth0ClientOptions } from '@auth0/auth0-spa-js'
import axios from 'axios'

interface Auth0ProviderProps extends Auth0ClientOptions {
  onRedirectCallback?: (appState: any) => void;
  children: React.ReactNode;
  initOptions?: Auth0ClientOptions;
}

export interface ContextValue {
  isAuthenticated?: boolean;
  user?: any;
  loading?: boolean;
  popupOpen?: boolean;
  loginWithPopup: (params: any) => void;
  handleRedirectCallback?: () => void;
  getIdTokenClaims?: (...p: any) => void;
  loginWithRedirect?: (...p: any) => void;
  getTokenSilently?: (...p: any) => void;
  getTokenWithPopup?: (...p: any) => void;
  logout?: (...p: any) => void;
}

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState(
    {}, 
    document.title, 
    window.location.pathname
  )

export const Auth0Context = React.createContext<ContextValue>({
  isAuthenticated: false,
  user: {},
  loading: true,
  popupOpen: false,
  loginWithPopup: (params: any) => {},
  handleRedirectCallback: () => {},
  getIdTokenClaims: (...p: any) => {},
  loginWithRedirect: (...p: any) => {},
  getTokenSilently: (...p: any) => {},
  getTokenWithPopup: (...p: any) => {},
  logout: (...p: any) => {}
})
export const useAuth0 = () => useContext(Auth0Context)

const setAxiosTokenInterceptor = async (accessToken: string): Promise<void> => {
  axios.interceptors.request.use(async config => {
    const requestConfig = config
    if (accessToken) {
      requestConfig.headers.common.Authorization = `Bearer ${accessToken}`
    } 
    return requestConfig
  })
}

export const Auth0Provider = (
  {
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    ...initOptions
  }: Auth0ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [auth0Client, setAuth0] = useState()
  const [loading, setLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)
  
  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions)
      setAuth0(auth0FromHook)

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      auth0FromHook.isAuthenticated().then(
        async authenticated => {
          setIsAuthenticated(authenticated)
          if (authenticated) {
            auth0FromHook.getUser().then(
              auth0User => {
                setUser(auth0User)
              }
            )
            const token = await auth0FromHook.getTokenSilently()
            setAxiosTokenInterceptor(token).then(
              () => {setLoading(false)}
            )
          }
        }
      )

      
    }
    initAuth0().catch()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const loginWithPopup = async () => {
    setPopupOpen(true)
    try {
      await auth0Client.loginWithPopup()
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }

    const auth0User = await auth0Client.getUser()
    setUser(auth0User)
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setLoading(true)
    await auth0Client.handleRedirectCallback()
    const auth0User = await auth0Client.getUser()
    setLoading(false)
    setIsAuthenticated(true)
    setUser(auth0User)
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p: any) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p: any) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p: any) => auth0Client.getTokensWithPopup(...p),
        logout: (...p: any) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
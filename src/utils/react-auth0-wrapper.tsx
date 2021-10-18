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
  isLoading?: boolean;
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
  isLoading: true,
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
  const [isLoading, setIsLoading] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions)
      // @ts-ignore
      setAuth0(auth0FromHook)

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      auth0FromHook.isAuthenticated().then(
        async authenticated => {
          // @ts-ignore
          setIsAuthenticated(authenticated)
          if (authenticated) {
            auth0FromHook.getUser().then(
              auth0User => {
                // @ts-ignore
                setUser(auth0User)
              }
            )
            const token = await auth0FromHook.getTokenSilently()
            setAxiosTokenInterceptor(token).then(
              () => {setIsLoading(false)}
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
      // @ts-ignore
      await auth0Client.loginWithPopup()
    } catch (error) {
      console.error(error)
    } finally {
      setPopupOpen(false)
    }

    // @ts-ignore
    const auth0User = await auth0Client.getUser()
    setUser(auth0User)
    // @ts-ignore
    setIsAuthenticated(true)
  }

  const handleRedirectCallback = async () => {
    setIsLoading(true)
    // @ts-ignore
    await auth0Client.handleRedirectCallback()
    // @ts-ignore
    const auth0User = await auth0Client.getUser()
    setIsLoading(false)
    // @ts-ignore
    setIsAuthenticated(true)
    setUser(auth0User)
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        // @ts-ignore
        getIdTokenClaims: (...p: any) => auth0Client.getIdTokenClaims(...p),
        // @ts-ignore
        loginWithRedirect: (...p: any) => auth0Client.loginWithRedirect(...p),
        // @ts-ignore
        getTokenSilently: (...p: any) => auth0Client.getTokenSilently(...p),
        // @ts-ignore
        getTokenWithPopup: (...p: any) => auth0Client.getTokensWithPopup(...p),
        // @ts-ignore
        logout: (...p: any) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}
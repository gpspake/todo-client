import { useContext } from 'react'
import { Auth0Context } from './react-auth0-wrapper'

export const useAuth0 = () => useContext(Auth0Context)
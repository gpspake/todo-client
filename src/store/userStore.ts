import { createContext } from 'react'

interface IUserContext {
  token: string
}

const userContext: IUserContext = {
  token: ''
}

export const UserContext = createContext(userContext)
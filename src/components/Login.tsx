import React from 'react'
import { useAuth0 } from '../utils/hooks'

export default function Login() {
  const { loginWithRedirect } = useAuth0()

  const loginHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (loginWithRedirect) {
      return loginWithRedirect()
    }
  }

  return (
    <button
      onClick={loginHandler}
      className="bg-transparent text-white hover:bg-teal-600 hover:bg-teal-600 py-2 px-4 border border-white rounded font-light rounded ml-auto"
      type="button"
    >
      Login
    </button>
  )
}

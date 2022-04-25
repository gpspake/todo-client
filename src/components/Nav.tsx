import React from 'react'
import { Link } from 'react-router-dom'
import { ProfileIcon } from './ProfileIcon'
import Login from './Login'
import { useAuth0 } from '@auth0/auth0-react';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Nav = () => {
  const { isAuthenticated, logout, isLoading, user } = useAuth0()

  const logoutHandler = () => {
    if (logout) {
      return logout({ returnTo: window.location.origin })
    }
  }

  return (
    <nav className="flex items-center justify-between bg-teal-500 p-6 h-20">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="inline-flex">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
            />
          </svg>
          <span className="text-xl tracking-tight">
            <span className="font-thin">Todo</span><span className="font-semibold">lu</span>
          </span>
        </Link>
      </div>

      <div className="w-full block flex-grow flex items-center w-auto">
        {isLoading && (
          <FontAwesomeIcon
            size="2x"
            icon={faCircleNotch}
            spin
            className={`transition-all duration-200 text-slate-50 ml-auto opacity-50`}
          />
        )}
        {!isLoading && !isAuthenticated && <Login />}
        {!isLoading && isAuthenticated && (
          <div className="ml-auto">
            {user && (
              <ProfileIcon>
                <div className="bg-white absolute rounded border right-0 mr-4 p-4 text-center shadow-lg z-10">
                  <img
                    className="h-20 rounded-full mx-auto"
                    src={user.picture}
                    alt=""
                  />
                  <p className="text-gray-800 text-lg capitalize mt-4">{user.nickname}</p>
                  <p className="text-gray-600 font-light">{user.email}</p>
                  <button
                    type="button"
                    onClick={logoutHandler}
                    className="bg-transparent text-gray-700 hover:bg-gray-100 py-2 px-4 border border-gray-300 rounded mt-4 font-light"
                  >
                    Sign out
                  </button>
                </div>
              </ProfileIcon>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

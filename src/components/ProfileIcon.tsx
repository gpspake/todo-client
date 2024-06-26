import React, { useState } from 'react'
import { ProfileInformation } from './ProfileInformation'
import { useAuth0 } from '@auth0/auth0-react';

export const ProfileIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth0()

  return (
    <>
      <button
        type="button"
        onClick={() => {setOpen(true)}}
        className="transition-all duration-200 ease-in-out  inline-block text-sm leading-none rounded-full text-white hover:border-teal-600 border-2 border-transparent hover:text-teal-500 lg:mt-0"
      >
        {user && <img className="h-10 rounded-full" src={user.picture || ""} alt="" />}
      </button>

      {open && (
        <ProfileInformation onClose={() => {setOpen(false)}}>
          {children}
        </ProfileInformation>
      )}
    </>
  )
}

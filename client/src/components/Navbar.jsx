import React from 'react'
import { useClerk, UserButton, useUser } from "@clerk/react";

const Navbar = () => {

  const { openSignIn } = useClerk()
  const { user } = useUser()

return (
  <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
    <h1 className="text-xl font-semibold text-gray-900">EduCore</h1>

    {
      user ? (
        <UserButton />
      ) : (
        <button
          onClick={() => openSignIn()}
          className="text-sm font-medium text-white bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          Create Account
        </button>
      )
    }
  </div>
)

}

export default Navbar
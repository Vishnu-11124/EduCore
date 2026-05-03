import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">EduCore</h1>
      </div>
      <div>
        <button className="text-sm font-medium text-white bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Navbar
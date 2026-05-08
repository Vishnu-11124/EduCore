import React, { use, useContext, useState } from "react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const { isEducator } = useContext(AppContext)

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <h1 onClick={() => navigate('/')} className="text-xl font-semibold text-gray-900">EduCore</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <>
              <button onClick={() => navigate('/educator')} className="text-gray-700 hover:text-emerald-600">
                {
                  isEducator ? "Educator Dashboard" : "Become Educator"
                }
              </button>
              <Link
                to="/my-enrollments"
                className="text-gray-700 hover:text-emerald-600"
              >
                My Enrollments
              </Link>
            </>
          )}

          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="text-sm font-medium text-white bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Create Account
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4">
          {user && (
            <>
              <button onClick={() => navigate('/educator')} className="text-gray-700 hover:text-emerald-600">
                {
                  isEducator ? "Educator Dashboard" : "Become Educator"
                }
              </button>
              <Link
                to="/my-enrollments"
                className="text-gray-700 hover:text-emerald-600"
              >
                My Enrollments
              </Link>
            </>
          )}

          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="w-full text-sm font-medium text-white bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Create Account
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
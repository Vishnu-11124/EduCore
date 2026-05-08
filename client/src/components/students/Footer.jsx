import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        
        {/* Logo & Description */}
        <div>
          <h1
            onClick={() => navigate('/')}
            className="text-3xl font-bold text-white cursor-pointer"
          >
            EduCore
          </h1>

          <p className="mt-4 text-gray-400 leading-relaxed">
            Learn something new every day and expand your knowledge with
            expertly designed online courses.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            Company
          </h2>

          <ul className="mt-4 space-y-3">
            <li>
              <Link to="/" className="hover:text-emerald-400 transition">
                Home
              </Link>
            </li>

            <li>
              <Link to="/" className="hover:text-emerald-400 transition">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/" className="hover:text-emerald-400 transition">
                Contact Us
              </Link>
            </li>

            <li>
              <Link to="/" className="hover:text-emerald-400 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            Subscribe to our newsletter
          </h2>

          <p className="mt-4 text-gray-400">
            Stay updated with our latest news and offers.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 outline-none focus:border-emerald-500"
            />

            <button className="bg-emerald-600 hover:bg-emerald-700 transition px-6 py-3 rounded-xl text-white font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center text-sm text-gray-500">
          Copyright 2026 EduCore. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
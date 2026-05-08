import React from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100">

      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-300/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">

        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-emerald-100 text-sm font-medium text-emerald-700"
        >
          🚀 Learn Smarter, Grow Faster
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-gray-900"
        >
          Empower Your Future With{" "}
          <span className="text-emerald-600 relative inline-block">
            Courses
            <span className="absolute left-0 bottom-1 w-full h-3 bg-emerald-200/60 -z-10 rounded"></span>
          </span>{" "}
          Designed For You
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed"
        >
          Learn from world-class instructors and gain real-world skills with
          expertly crafted courses tailored to your career goals.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <SearchBar />
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xl font-bold text-gray-900">4.8★</p>
            <span className="text-sm text-gray-500">Average Rating</span>
          </div>

          <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xl font-bold text-gray-900">10K+</p>
            <span className="text-sm text-gray-500">Active Students</span>
          </div>

          <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xl font-bold text-gray-900">500+</p>
            <span className="text-sm text-gray-500">Premium Courses</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
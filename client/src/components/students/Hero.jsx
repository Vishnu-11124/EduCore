import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        
        {/* Optional Tagline */}
        <span className="inline-block mb-4 px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
          Learn Smarter 🚀
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Empower your future with{" "}
          <span className="text-emerald-600">
            courses designed to fit your choice
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          We bring together world-class instructors and cutting-edge curriculum
          to create an unparalleled learning experience.
        </p>

        {/* Subtle stats / trust signals */}
        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-500">
          <span>⭐ 4.8 Rating</span>
          <span>10K+ Students</span>
          <span>500+ Courses</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
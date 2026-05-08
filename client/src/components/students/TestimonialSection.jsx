import React from 'react'
import { motion } from 'framer-motion'
import { dummyTestimonial } from '../../assets/assets'

const TestimonialSection = () => {
  return (
    <div className="py-20 px-6 md:px-16 lg:px-24 bg-gray-50">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-gray-800">Testimonials</h2>

        <p className="mt-4 text-gray-600 text-lg">
          Here are what our learners have to say about their journey with EduCore
        </p>
      </motion.div>

      {/* Testimonial Cards */}
      <div className="grid gap-8 mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {dummyTestimonial.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt="user"
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
              />

              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {testimonial.name}
                </h1>

                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mt-5 text-yellow-400 text-lg">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(testimonial.rating) ? '★' : '☆'}
                </span>
              ))}
            </div>

            {/* Feedback */}
            <p className="mt-4 text-gray-600 leading-relaxed">
              "{testimonial.feedback}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection
import React from 'react'
import Hero from '../../components/students/Hero'
import CourseSection from '../../components/students/CourseSection'
import TestimonialSection from '../../components/students/TestimonialSection'
import Footer from '../../components/students/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <CourseSection />
      <TestimonialSection />
      <Footer />
    </div>
  )
}

export default Home

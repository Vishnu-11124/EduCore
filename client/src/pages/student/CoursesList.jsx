import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/students/SearchBar'
import CourseCard from '../../components/students/CourseCard'
import { AppContext } from '../../context/AppContext'
import Footer from '../../components/students/Footer'

const CoursesList = () => {

  const { allCourses } = useContext(AppContext)

  const [searchParams] = useSearchParams()

  const searchInput = searchParams.get("search") || ""

  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(() => {

    if (allCourses.length > 0) {

      // Show all courses if search is empty
      if (!searchInput.trim()) {
        setFilteredCourse(allCourses)
        return
      }

      const filtered = allCourses.filter((course) =>
        course.courseTitle
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      )

      setFilteredCourse(filtered)
    }

  }, [allCourses, searchInput])

  return (
    <>
    <div className='px-4 md:px-10 py-6'>

      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

        <div>
          <h1 className='text-3xl font-bold text-gray-800'>
            Course List
          </h1>

          <p className='text-gray-500 mt-1'>
            Explore all available courses
          </p>
        </div>

        <div className='w-full md:w-[450px]'>
          <SearchBar data={searchInput} />
        </div>

      </div>

      <hr className='my-6 border-gray-200' />

      {/* Courses */}
      {
        filteredCourse.length > 0 ? (

          <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>

            {
              filteredCourse.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                />
              ))
            }

          </div>

        ) : (

          <div className='flex items-center justify-center py-20'>

            <p className='text-lg text-gray-500'>
              No courses found
            </p>

          </div>

        )
      }
    
    </div>
    <Footer />
    </>
    
  )
}

export default CoursesList
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { BookOpen, Users, DollarSign, Calendar } from 'lucide-react'

const MyCourses = () => {
  const { allCourses } = useContext(AppContext)
  const [courses, setCourses] = useState(allCourses)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-sm text-gray-400 mt-0.5">Track your published courses and earnings</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {[
                    { label: "No" },
                    { label: "Course", icon: <BookOpen size={13} /> },
                    { label: "Earnings", icon: <DollarSign size={13} /> },
                    { label: "Students", icon: <Users size={13} /> },
                    { label: "Published On", icon: <Calendar size={13} /> },
                  ].map(({ label, icon }) => (
                    <th key={label} className="text-left px-5 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {icon}{label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 text-sm py-12">
                      No courses found.
                    </td>
                  </tr>
                ) : (
                  courses.map((course, index) => {
                    const earnings = Math.floor(
                      course.enrolledStudents.length *
                      (course.coursePrice - (course.coursePrice - course.discount * (course.coursePrice / 100)))
                    )

                    return (
                      <tr key={course._id} className="hover:bg-gray-50/50 transition-colors">

                        {/* No */}
                        <td className="px-5 py-4 text-gray-400 font-medium w-12">
                          {index + 1}
                        </td>

                        {/* Course */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={course?.courseThumbnail}
                              alt={course?.courseTitle}
                              className="w-14 h-10 rounded-lg object-cover shrink-0 bg-gray-100"
                            />
                            <span className="font-semibold text-gray-800 line-clamp-2 max-w-xs">
                              {course?.courseTitle}
                            </span>
                          </div>
                        </td>

                        {/* Earnings */}
                        <td className="px-5 py-4">
                          <span className="font-semibold text-emerald-600">
                            ${earnings.toLocaleString()}
                          </span>
                        </td>

                        {/* Students */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                              <Users size={13} className="text-blue-500" />
                            </div>
                            <span className="font-semibold text-gray-700">
                              {course.enrolledStudents.length.toLocaleString()}
                            </span>
                          </div>
                        </td>

                        {/* Published On */}
                        <td className="px-5 py-4 text-gray-500">
                          {new Date(course.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCourses
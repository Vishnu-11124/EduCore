import { useState } from "react"
import { dummyStudentEnrolled } from "../../assets/assets"
import { Users, BookOpen, Calendar } from "lucide-react"

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(dummyStudentEnrolled)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students Enrolled</h1>
          <p className="text-sm text-gray-400 mt-0.5">Overview of all students across your courses</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {[
                    { label: "No" },
                    { label: "Student", icon: <Users size={13} /> },
                    { label: "Course Title", icon: <BookOpen size={13} /> },
                    { label: "Date", icon: <Calendar size={13} /> },
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
                {enrolledStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 text-sm py-12">
                      No students enrolled yet.
                    </td>
                  </tr>
                ) : (
                  enrolledStudents.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">

                      {/* No */}
                      <td className="px-5 py-4 text-gray-400 font-medium w-12">
                        {index + 1}
                      </td>

                      {/* Student */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {student?.student?.imageUrl ? (
                            <img
                              src={student?.student?.imageUrl}
                              alt={student?.student?.name}
                              className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-100"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center uppercase shrink-0">
                              {student?.student?.name?.charAt(0)}
                            </div>
                          )}
                          <span className="font-semibold text-gray-800">
                            {student?.student?.name}
                          </span>
                        </div>
                      </td>

                      {/* Course Title */}
                      <td className="px-5 py-4">
                        <span className="bg-violet-50 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                          {student?.courseTitle}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-gray-500">
                        {new Date(student?.purchaseDate).toLocaleDateString()}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default StudentsEnrolled
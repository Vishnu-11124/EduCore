import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Line } from "rc-progress";
import Footer from "../../components/students/Footer";

const MyEntrollments = () => {
  const { enrolledCourses, calculateCourseDuration } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [progressArray, setProgressArray] = useState([
    {
      lectureCompleted: 2,
      totalLectures: 4,
    },
    {
      lectureCompleted: 5,
      totalLectures: 10,
    },
    {
      lectureCompleted: 8,
      totalLectures: 12,
    },
    {
      lectureCompleted: 1,
      totalLectures: 6,
    },
    {
      lectureCompleted: 7,
      totalLectures: 9,
    },
    {
      lectureCompleted: 3,
      totalLectures: 5,
    },
    {
      lectureCompleted: 10,
      totalLectures: 15,
    },
    {
      lectureCompleted: 4,
      totalLectures: 8,
    },
  ]);

  const handleViewVideo = (id) => {
    navigate(`/player/${id}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 md:px-10 lg:px-20 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            My Enrollments
          </h1>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">No</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Completed
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {enrolledCourses.map((course, index) => {
                  const progress = progressArray[index]
                    ? (progressArray[index].lectureCompleted /
                        progressArray[index].totalLectures) *
                      100
                    : 0;

                  return (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-5 text-gray-600 font-medium">
                        {index + 1}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={course.courseThumbnail}
                            alt=""
                            className="w-24 h-16 object-cover rounded-lg"
                          />

                          <div className="w-full">
                            <p className="font-semibold text-gray-800 mb-2 line-clamp-1">
                              {course.courseTitle}
                            </p>

                            <div className="flex items-center gap-3">
                              <Line
                                strokeWidth={4}
                                percent={progress}
                                trailWidth={4}
                                strokeColor="#3B82F6"
                                className="rounded-full"
                              />

                              <p className="text-sm text-gray-500 min-w-fit">
                                {Math.floor(progress)}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {calculateCourseDuration(course)}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {progressArray[index] &&
                          `${progressArray[index].lectureCompleted}/${progressArray[index].totalLectures}`}{" "}
                        <span className="text-sm text-gray-400">
                          Lectures
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() => handleViewVideo(course?._id)}
                          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            progress === 100
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {progress === 100
                            ? "Completed"
                            : "Continue Learning"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {enrolledCourses.length === 0 && (
              <div className="py-20 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">
                  No Enrollments Yet
                </h2>

                <p className="text-gray-500">
                  Start learning by enrolling in a course.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyEntrollments;
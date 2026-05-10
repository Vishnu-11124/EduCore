import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { ChevronDown, Currency, Play, Star } from "lucide-react";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/students/Footer";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isEntrolled, setIsEnrolled] = useState(false);

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
  } = useContext(AppContext);

  useEffect(() => {
    if (allCourses.length > 0) {
      const course = allCourses.find((c) => c._id === id);
      setCourseData(course);
    }
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSection((prev) => {
      return {
        ...prev,
        [index]: !prev[index],
      };
    });
  };

  return (
  <div className="bg-gray-50 min-h-screen">
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 grid lg:grid-cols-3 gap-8 lg:gap-12">
      
      {/* Left */}
      <div className="lg:col-span-2 order-2 lg:order-1">

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {courseData?.courseTitle}
        </h1>

        <div
          className="mt-5 text-gray-600 leading-7 text-sm sm:text-base"
          dangerouslySetInnerHTML={{
            __html: courseData?.courseDescription.slice(0, 200),
          }}
        />

        {/* Rating */}
        <div className="mt-6 flex flex-wrap items-center gap-3">

          <p className="font-semibold text-gray-800">
            {calculateRating(courseData)}
          </p>

          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={18}
                fill={
                  index < Math.floor(calculateRating(courseData))
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <p className="text-sm text-gray-500">
            ({courseData?.courseRatings?.length || 0} ratings)
          </p>

          <p className="text-sm text-gray-500">
            {courseData?.enrolledStudents?.length || 0} students
          </p>

        </div>

        <p className="mt-4 text-gray-700 text-sm sm:text-base">
          Course by{" "}
          <span className="font-medium text-emerald-600">
            {courseData?.educator}
          </span>
        </p>

        {/* Course Structure */}
        <div className="mt-10">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

            <h2 className="text-2xl font-bold text-gray-900">
              Course Content
            </h2>

            {/* <p className="text-sm text-gray-500">
              {calculateNoOfLectures(courseData)} lectures •{" "}
              {calculateCourseDuration(courseData)}
            </p> */}

          </div>

          <div className="space-y-4">

            {courseData?.courseContent.map((chapter, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >

                {/* Chapter Header */}
                <div
                  onClick={() => toggleSection(index)}
                  className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-gray-50 transition-all"
                >

                  <div className="flex items-start gap-3">

                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 mt-1 ${
                        openSection[index] ? "rotate-180" : ""
                      }`}
                    />

                    <div>

                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {chapter.chapterTitle}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {chapter.chapterContent.length} lessons •{" "}
                        {calculateChapterTime(chapter)}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Lectures */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSection[index] ? "max-h-[600px]" : "max-h-0"
                  }`}
                >

                  <ul className="border-t border-gray-100">

                    {chapter?.chapterContent.map((lecture, index) => (
                      <li
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 border-b border-gray-100 last:border-none"
                      >

                        <div className="flex items-start gap-3">

                          <Play
                            size={18}
                            className="text-emerald-600 mt-1"
                          />

                          <div>

                            <p className="text-gray-800 font-medium text-sm sm:text-base">
                              {lecture.lectureTitle}
                            </p>

                            {lecture?.isPreviewFree && (
                              <span className="inline-block mt-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                Preview
                              </span>
                            )}

                          </div>

                        </div>

                        <p className="text-sm text-gray-500 whitespace-nowrap">
                          {humanizeDuration(
                            lecture.lectureDuration * 60 * 1000,
                            {
                              units: ["h", "m"],
                              round: true,
                            }
                          )}
                        </p>

                      </li>
                    ))}

                  </ul>

                </div>

              </div>
            ))}

          </div>

          {/* Description */}
          <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6">

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Course Description
            </h3>

            <div
              className="text-gray-600 leading-7 text-sm sm:text-base"
              dangerouslySetInnerHTML={{
                __html: courseData?.courseDescription,
              }}
            />

          </div>

        </div>

      </div>

      {/* Right */}
      <div className="order-1 lg:order-2">

        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm lg:sticky lg:top-24">

          <img
            src={courseData?.courseThumbnail}
            alt="course thumbnail"
            className="w-full h-56 sm:h-72 lg:h-56 object-cover"
          />

          <div className="p-5 sm:p-6">

            <div className="flex items-center gap-2 text-red-500 font-medium mb-4">
              <span>⏰ 5 days</span>
              <span className="text-gray-600">left at this price!</span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3 mb-5">

              <p className="text-3xl font-bold text-gray-900">
                $
                {(
                  courseData?.coursePrice -
                  (courseData?.discount * courseData?.coursePrice) / 100
                ).toFixed(2)}
              </p>

              <p className="text-gray-400 line-through text-lg">
                ${courseData?.coursePrice.toFixed(2)}
              </p>

              <p className="bg-emerald-100 text-emerald-700 text-sm font-medium px-2 py-1 rounded-md">
                {courseData?.discount}% OFF
              </p>

            </div>

            <p className="text-sm text-gray-500 mb-6">
              {calculateNoOfLectures(courseData)} lectures •{" "}
              {calculateCourseDuration(courseData)}
            </p>

            {/* Button */}
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition-all">
              {isEntrolled ? "Go to Course" : "Enroll Now"}
            </button>

            {/* Includes */}
            <div className="mt-8">

              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                What's in the course?
              </h3>

              <ul className="space-y-3 text-sm text-gray-600">

                <li>• Lifetime access with free updates.</li>

                <li>• Access on mobile and TV.</li>

                <li>• Downloadable resources and source code.</li>

                <li>• Step-by-step project walkthroughs.</li>

                <li>• Certificate of completion.</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

    <Footer />

  </div>
);
};

export default CourseDetails;

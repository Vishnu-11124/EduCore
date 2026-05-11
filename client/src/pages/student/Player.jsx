import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { ChevronDown, Play } from "lucide-react";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/students/Footer";
import Rating from "../../components/students/Rating";

const Player = () => {
  const { enrolledCourses, calculateChapterTime } =
    useContext(AppContext);

  const { courseId } = useParams();

  const courseData = enrolledCourses.find(
    (c) => c._id === courseId
  );

  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const toggleSection = (index) => {
    setOpenSection((prev) => {
      return {
        ...prev,
        [index]: !prev[index],
      };
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">

          {/* Top */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {courseData?.courseTitle}
            </h1>

            <p className="text-gray-500 mt-3 max-w-3xl">
              Continue your learning journey and complete your course lectures.
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left */}
            <div className="lg:col-span-2 space-y-6">

              {/* Course Structure */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Course Structure
                  </h2>

                  <p className="text-sm text-gray-500">
                    {courseData?.courseContent.length} Chapters
                  </p>
                </div>

                <div className="space-y-4">
                  {courseData?.courseContent.map((chapter, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-2xl overflow-hidden"
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
                          openSection[index]
                            ? "max-h-[600px]"
                            : "max-h-0"
                        }`}
                      >

                        <ul className="border-t border-gray-100">

                          {chapter?.chapterContent.map(
                            (lecture, lectureIndex) => (
                              <li
                                key={lectureIndex}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 border-b border-gray-100 last:border-none"
                              >

                                <div className="flex items-start gap-3">

                                  <div className="bg-blue-100 p-2 rounded-full">
                                    <Play
                                      size={16}
                                      className="text-blue-600"
                                    />
                                  </div>

                                  <div>

                                    <p className="text-gray-800 font-medium text-sm sm:text-base">
                                      {lecture.lectureTitle}
                                    </p>

                                    {lecture?.lectureUrl && (
                                      <span
                                        onClick={() =>
                                          setPlayerData({
                                            ...lecture,
                                            chapter: index + 1,
                                            lecture: lectureIndex + 1,
                                          })
                                        }
                                        className="inline-block mt-2 cursor-pointer text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition"
                                      >
                                        Watch Lecture
                                      </span>
                                    )}

                                  </div>

                                </div>

                                <p className="text-sm text-gray-500 whitespace-nowrap">
                                  {humanizeDuration(
                                    lecture.lectureDuration *
                                      60 *
                                      1000,
                                    {
                                      units: ["h", "m"],
                                      round: true,
                                    }
                                  )}
                                </p>

                              </li>
                            )
                          )}

                        </ul>

                      </div>

                    </div>
                  ))}
                </div>

              </div>

              {/* Rating */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6">

                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Rate this Course
                </h2>

                <div className="flex items-center gap-3">
                  <Rating initialRating={0}/>
                </div>

              </div>

            </div>

            {/* Right */}
            <div className="lg:sticky lg:top-24 h-fit">

              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

                {playerData ? (
                  <div>

                    <YouTube
                      videoId={
                        playerData?.lectureUrl
                          .split("/")
                          .pop()
                      }
                      iframeClassName="w-full aspect-video"
                    />

                    <div className="p-5">

                      <p className="text-sm text-blue-600 font-medium mb-2">
                        Chapter {playerData.chapter} • Lecture{" "}
                        {playerData.lecture}
                      </p>

                      <h3 className="text-lg font-semibold text-gray-800 leading-snug">
                        {playerData.lectureTitle}
                      </h3>

                      <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition">
                        Mark as Completed
                      </button>

                    </div>

                  </div>
                ) : (
                  <div>

                    <img
                      src={courseData?.courseThumbnail}
                      alt=""
                      className="w-full aspect-video object-cover"
                    />

                    <div className="p-6">

                      <h3 className="text-xl font-bold text-gray-800">
                        Start Learning
                      </h3>

                      <p className="text-gray-500 mt-3 text-sm leading-relaxed">
                        Select any lecture from the course structure
                        to start watching the course videos.
                      </p>

                    </div>

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Player;
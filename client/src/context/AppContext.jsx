import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from '@clerk/clerk-react'

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([])

  // fetch all courses and set to state
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const calculateRating = (course) => {
    // Prevent errors when course is null/undefined
    if (!course || !course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }

    const totalRating = course.courseRatings.reduce(
      (sum, item) => sum + item.rating,
      0,
    );

    return (totalRating / course.courseRatings.length).toFixed(1);
  };


// Chapter duration
const calculateChapterTime = (chapter) => {

  if (!chapter || !chapter.chapterContent) return "0m";

  const totalMinutes = chapter.chapterContent.reduce(
    (total, lecture) => total + lecture.lectureDuration,
    0
  );

  return humanizeDuration(totalMinutes * 60 * 1000, {
    units: ["h", "m"],
    round: true,
  });
};

// Course duration
const calculateCourseDuration = (course) => {

  if (!course || !course.courseContent) return "0m";

  const totalMinutes = course.courseContent.reduce((chapterTotal, chapter) => {

    const chapterMinutes = chapter.chapterContent.reduce(
      (lectureTotal, lecture) =>
        lectureTotal + lecture.lectureDuration,
      0
    );

    return chapterTotal + chapterMinutes;

  }, 0);

  return humanizeDuration(totalMinutes * 60 * 1000, {
    units: ["h", "m"],
    round: true,
  });
};

// Total lectures
const calculateNoOfLectures = (course) => {

  if (!course || !course.courseContent) return 0;

  return course.courseContent.reduce(
    (total, chapter) =>
      total + chapter.chapterContent.length,
    0
  );
};

const fetchEnrolledCourses = async () => {
  setEnrolledCourses(dummyCourses)
}

  useEffect(() => {
    fetchAllCourses();
    fetchEnrolledCourses()
  }, [allCourses]);

  const logToken = async () => {
    console.log("Id: ", await getToken())
    console.log(user)
  }

  useEffect(() => {
    if(user) {
      logToken()
    }
  },[user])

  const value = {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    isEducator,
    setIsEducator,
    enrolledCourses, fetchEnrolledCourses
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

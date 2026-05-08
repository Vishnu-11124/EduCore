import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [allCourses, setAllCourses] = useState([]);
  const [ isEducator, setIsEducator ] = useState(true)

  // fetch all courses and set to state
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) return 0;

    const totalRating = course.courseRatings.reduce(
      (sum, item) => sum + item.rating,
      0,
    );

    return (totalRating / course.courseRatings.length).toFixed(1);
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    allCourses,
    calculateRating,
    isEducator, setIsEducator
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

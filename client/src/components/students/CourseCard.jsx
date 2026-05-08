import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const CourseCard = ({ course }) => {
  const { calculateRating } = useContext(AppContext);

  const discountedPrice = (
    course.coursePrice -
    (course.coursePrice * course.discount) / 100
  ).toFixed(2);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => scrollTo(0, 0)}
      className="block w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="w-full aspect-video overflow-hidden bg-gray-100">
        <img
          src={course.courseThumbnail}
          alt="course"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        
        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2">
          {course.courseTitle}
        </h3>

        {/* Instructor */}
        <p className="mt-2 text-sm text-gray-500">
          By GreatStack
        </p>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <p className="font-medium text-gray-800">
            {calculateRating(course)}
          </p>

          <div className="flex items-center text-yellow-400 text-sm">
            {[...Array(5)].map((_, index) =>
              index < Math.floor(calculateRating(course)) ? (
                <span key={index}>★</span>
              ) : (
                <span key={index}>☆</span>
              )
            )}
          </div>

          <p className="text-sm text-gray-500">
            ({course.courseRatings.length} ratings)
          </p>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          <p className="text-2xl font-bold text-emerald-600">
            ${discountedPrice}
          </p>

          <p className="text-gray-400 line-through text-sm">
            ${course.coursePrice}
          </p>

          <span className="ml-auto bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
            {course.discount}% OFF
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
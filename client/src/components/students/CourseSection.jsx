import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
            Top Courses
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Learn From The{" "}
            <span className="text-emerald-600">Best Instructors</span>
          </h2>

          <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
            Join thousands of students who have transformed their careers with
            our expertly designed and industry-focused courses.
          </p>
        </motion.div>

        {/* Course Cards */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {allCourses.slice(0, 4).map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <Link
            to="/course-list"
            onClick={() => scrollTo(0, 0)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 text-white font-medium px-8 py-4 rounded-2xl shadow-lg hover:shadow-emerald-200"
          >
            View All Courses
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseSection;
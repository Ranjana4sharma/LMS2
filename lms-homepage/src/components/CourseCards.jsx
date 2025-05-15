import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaUsers, FaBookOpen } from "react-icons/fa";
import courses from "../Data/courses"; // Importing course data

const CourseCards = () => {
  return (
    <section className="bg-[#D3D3D3] text-gray-900 py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <p className="text-[#2DD4BF] uppercase font-semibold tracking-wide">
          Top-Selling Courses
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
          Level Up Your Coding Skills
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Whether you're looking to switch to a career in tech or advance in
          your current role, these courses provide the knowledge and experience
          you need to succeed.
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <Link to={`/course/${course.id}`} key={course.id}>
            <div className="bg-white rounded-lg overflow-hidden shadow-md transform transition-all hover:scale-105 cursor-pointer hover:shadow-xl">
              <div className="h-40 bg-gray-300 flex justify-center items-center">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#2DD4BF]">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{course.description}</p>

                {/* Star Ratings */}
                <div className="flex items-center mt-3">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      className={`text-yellow-400 ${
                        index < Math.floor(course.rating) ? "" : "opacity-30"
                      }`}
                    />
                  ))}
                </div>

                {/* Price & Students */}
                <div className="flex justify-between items-center mt-4">
                  <div className="text-xl font-bold text-gray-900">
                    {course.price}{" "}
                    <span className="text-gray-500 line-through text-sm">
                      {course.originalPrice}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <FaUsers className="mr-1" />
                    {course.students} Students
                  </div>
                </div>

                {/* Lectures Count */}
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                  <FaBookOpen className="mr-2" />
                  {course.lectures} Lectures
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CourseCards;

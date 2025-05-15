import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import courses from "../Data/courses"; // Import course data

const CourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate(); // Programmatic navigation

  // Convert ID to a number (since URL params are strings)
  const course = courses.find((c) => String(c.id) === id);

  // Redirect if the course is not found
  useEffect(() => {
    if (!course) {
      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    }
  }, [course, navigate]);

  // If the course is not found, show an error message before redirecting
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h2 className="text-3xl font-bold">Course Not Found!</h2>
        <p className="text-gray-400 mt-2">Redirecting to the homepage...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#D3D3D3] text-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side - Course Image */}
        <div className="w-full md:w-1/2">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <p className="text-center text-gray-700 font-semibold mt-3">
            {course.title}
          </p>
        </div>

        {/* Right Side - Course Details */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900">{course.title}</h2>
          <p className="mt-4 text-gray-600">{course.description}</p>

          {/* Ratings & Learners */}
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg">
              <span className="text-blue-400">👥</span>
              <p>{course.students} Learners</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg">
              <span className="text-yellow-400">⭐</span>
              <p>{course.rating} ({course.reviews} Ratings)</p>
            </div>
          </div>

          {/* Price & Lectures */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold">{course.price} 
              <span className="text-gray-400 line-through ml-2 text-sm">{course.originalPrice}</span>
            </p>
            <p className="text-gray-400">Lectures: {course.lectures}</p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg">
              Enroll Now
            </button>
            <button className="bg-white text-blue-600 border border-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100">
              Download Curriculum
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;

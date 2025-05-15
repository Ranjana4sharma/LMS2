import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WelcomeSection = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 text-white py-16 flex flex-col items-center text-center px-6">
      {/* Animated Welcome Text */}
      <motion.h1
        className="text-5xl font-extrabold text-yellow-400 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to RGMN Academy
      </motion.h1>

      {/* Motto with Fade-in Effect */}
      <motion.p
        className="mt-4 text-lg max-w-2xl text-gray-300 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Empowering learners with high-quality courses and hands-on experiences to shape a bright future.
      </motion.p>

      {/* Call-to-Action Button (Navigates to Explore Courses) */}
      <motion.button
        className="mt-6 px-6 py-3 bg-yellow-400 text-indigo-900 font-bold rounded-full text-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/explore-courses")}
      >
        Explore Courses
      </motion.button>
    </div>
  );
};

export default WelcomeSection;

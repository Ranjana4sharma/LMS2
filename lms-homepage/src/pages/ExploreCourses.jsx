import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExploreCourses = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setLoading(false);
      });
  }, []);

  const handleVideoClick = (videoSrc, index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
      }
    });
    setSelectedVideo(`http://localhost:4000${videoSrc}`);
  };

  return (
    <div className="container mx-auto py-10 px-4 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 drop-shadow-lg mb-8"
      >
        Explore Courses
      </motion.h1>

      {loading ? (
        <div className="text-center text-blue-600 text-2xl font-bold">
          Loading videos...
        </div>
      ) : (
        <>
          {/* React Videos Section */}
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center text-blue-700 mb-6 drop-shadow-md hover:scale-105 transition-transform duration-300"
          >
            🚀 React Videos
          </motion.h2>

          <div className="space-y-10">
            {videos
              .filter((video) => {
                const lowerTitle = video.title.toLowerCase();
                return lowerTitle.includes("react") && !lowerTitle.includes("javascript") && !lowerTitle.includes("js");
              })
              .map((video, index) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row bg-white border border-blue-300 shadow-lg rounded-2xl p-6 gap-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Thumbnail */}
                  <div
                    className="md:w-1/2 cursor-pointer rounded-lg overflow-hidden relative group border-2 border-blue-400"
                    onClick={() => handleVideoClick(video.videoPath, index)}
                  >
                    <img
                      src={`http://localhost:4000${video.thumbnail}`}
                      alt="Thumbnail"
                      className="w-full h-56 object-cover rounded-lg border border-gray-400"
                    />
                  </div>

                  {/* Video Details */}
                  <div className="md:w-1/2 flex flex-col justify-center p-4">
                    <h3 className="text-2xl font-bold text-blue-900 mb-2 hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed italic hover:scale-105 transition-transform duration-300">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* JavaScript Videos Section */}
          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center text-yellow-600 mt-12 mb-6 drop-shadow-md hover:scale-105 transition-transform duration-300"
          >
            ⚡ JavaScript Videos
          </motion.h2>

          <div className="space-y-10">
            {videos
              .filter((video) => {
                const lowerTitle = video.title.toLowerCase();
                return lowerTitle.includes("javascript") || lowerTitle.includes("js");
              })
              .map((video, index) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row bg-white border border-yellow-300 shadow-lg rounded-2xl p-6 gap-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Thumbnail */}
                  <div
                    className="md:w-1/2 cursor-pointer rounded-lg overflow-hidden relative group border-2 border-yellow-400"
                    onClick={() => handleVideoClick(video.videoPath, index)}
                  >
                    <img
                      src={`http://localhost:4000${video.thumbnail}`}
                      alt="Thumbnail"
                      className="w-full h-56 object-cover rounded-lg border border-gray-400"
                    />
                  </div>

                  {/* Video Details */}
                  <div className="md:w-1/2 flex flex-col justify-center p-4">
                    <h3 className="text-2xl font-bold text-yellow-900 mb-2 hover:text-yellow-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed italic hover:scale-105 transition-transform duration-300">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </>
      )}

      {/* Video Popup */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
          >
            <div className="relative bg-white p-6 rounded-2xl w-full md:w-3/4 lg:w-1/2 max-w-screen-lg shadow-2xl border-2 border-gray-300">
              <button
                className="absolute top-2 right-2 text-gray-800 text-2xl hover:text-red-500 transition-colors"
                onClick={() => setSelectedVideo(null)}
              >
                ✖
              </button>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <video
                  ref={(el) => videoRefs.current.push(el)}
                  src={selectedVideo}
                  controls
                  className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-lg border border-gray-400"
                  onClick={(e) => e.target.requestFullscreen && e.target.requestFullscreen()}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExploreCourses;

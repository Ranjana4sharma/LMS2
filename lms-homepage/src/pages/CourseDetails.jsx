import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ExploreCourses = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/videos");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Back
      </button>

      <h1 className="text-3xl font-bold text-center mb-6">React Courses</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {videos.slice(0, 2).map((video) => (
          <div key={video._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{video.title}</h3>
            <p className="text-gray-600">{video.description}</p>
            <button
              onClick={() => setSelectedVideo(video)}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded"
            >
              Watch Video
            </button>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button onClick={() => setSelectedVideo(null)} className="absolute top-2 right-2 text-gray-700">
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedVideo.title}</h2>
            <video controls className="w-full">
              <source src={`http://localhost:4000/${selectedVideo.filePath}`} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreCourses;

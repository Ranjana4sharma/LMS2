import React, { useState, useEffect } from "react";

// Sample comments
const comments = [
  { name: "Alia Sharma", comment: "Great course!", rating: 5, course: "React" },
  { name: "Mohit Goyal", comment: "Very helpful.", rating: 4, course: "JavaScript" },
  { name: "Priya Verma", comment: "Loved the explanations!", rating: 5, course: "CSS" },
  { name: "Ayushi sikarwarr", comment: "Needs more exercises.", rating: 3, course: "HTML" },
  { name: "Neha Pathak", comment: "Best learning platform!", rating: 5, course: "Advanced JS" },
  { name: "Nandini Shrivastav", comment: "Very interactive and fun.", rating: 4, course: "Python" },
];

// Typing effect hook
const useTypingEffect = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayText(""); // Reset before typing
    const interval = setInterval(() => {
      setDisplayText((prev) => text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayText;
};

const StudentExperience = () => {
  const [index, setIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  // Handle next slide
  const handleNext = () => {
    setIsSliding(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 3) % comments.length);
      setIsSliding(false);
    }, 300);
  };

  return (
    <div className="bg-gray-100 py-12 px-6 w-full">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Student Experiences</h2>

      {/* Comments Container - Full Width */}
      <div className="overflow-hidden w-full flex justify-center">
        <div
          className={`flex gap-8 transition-transform duration-500 w-full ${
            isSliding ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          {/* Display 3 comments at a time, each taking 1/3rd width */}
          {comments.slice(index, index + 3).map((comment, i) => (
            <div key={i} className="bg-white shadow-lg rounded-lg p-6 w-1/3 min-h-[180px] transition-all">
              <h3 className="text-xl font-semibold">{comment.name}</h3>
              <p className="text-gray-600 mt-4">
                {useTypingEffect(comment.comment, 50)}
              </p>
              <p className="text-sm text-gray-500 mt-2">Course: {comment.course}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button - Centered */}
      <div className="mt-8 flex justify-center">
        <button
          className="bg-blue-600 text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          onClick={handleNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StudentExperience;

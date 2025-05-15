import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import CourseDropdown from "./CourseDropdown";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [signupData, setSignupData] = useState({ name: "", email: "", role: "" });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupContinue = () => {
    if (signupData.name && signupData.email && signupData.role) {
      const rolePath = signupData.role === "learner" ? "user" : signupData.role.toLowerCase();
      navigate(`/signup/${rolePath}`, { state: signupData });
      setIsSignupModalOpen(false); // Close modal after selection
    }
  };

  return (
    <>
      {/* Blur Background when Modal is Open */}
      <div className={`${isSignupModalOpen ? "blur-sm" : ""}`}>
        <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            LMS
          </Link>

          {/* Search Bar */}
          <div className="relative w-1/3 md:w-1/2">
            <input
              type="text"
              placeholder="Search for courses..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {/* "All Courses" Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                All Courses ▼
              </button>
              {isDropdownOpen && <CourseDropdown />}
            </div>

            {/* Sign Up & Login */}
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Sign Up
            </button>
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <FaBars className="text-gray-700 text-xl" />
          </button>
        </nav>
      </div>

      {/* Signup Modal */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96 relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsSignupModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleSignupChange}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleSignupChange}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md"
              required
            />
            <select
              name="role"
              onChange={handleSignupChange}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="learner">Learner</option>
              <option value="examiner">Examiner</option>
              <option value="trainer">Trainer</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={handleSignupContinue}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

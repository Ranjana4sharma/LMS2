import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { registerExaminer } from "../services/api";
import examImage from "../assets/exam.jpg";

const ExaminerSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    organizationName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await registerExaminer(formData);
      setSuccess(response.data.message);

      // ✅ Redirect to Login Page after 2 seconds
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 p-4 relative overflow-hidden">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg text-center transform transition duration-300 hover:scale-105 relative z-10 border border-gray-400">
        <div className="flex justify-center mb-4">
          <img src={examImage} alt="Exam Illustration" className="w-24 h-24 object-cover rounded-full border-4 border-gray-700 shadow-xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Examiner Signup</h2>
        {error && <p className="text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}
        {success && <p className="text-green-500 bg-green-100 p-2 rounded-md">{success}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700 bg-gray-200 shadow-md" />
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700 bg-gray-200 shadow-md" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700 bg-gray-200 shadow-md" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700 bg-gray-200 shadow-md" />
          <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700 bg-gray-200 shadow-md" />
          
          <select name="gender" onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700 bg-gray-200 shadow-md">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
          <input type="text" name="organizationName" placeholder="Organization Name" onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-700 bg-gray-200 shadow-md" />
          
          <button type="submit" className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold p-3 rounded-lg hover:opacity-90 transition-all shadow-xl">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExaminerSignup;

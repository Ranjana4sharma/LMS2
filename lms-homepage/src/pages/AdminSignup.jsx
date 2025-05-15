import React, { useState } from "react";
import { registerAdmin } from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    securityQuestion: "What is your favorite color?",
    securityAnswer: "",
    role: "admin",
    profileImage: null, // ✅ Profile Image Field
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
  };

  // ✅ Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAdminData((prev) => ({
      ...prev,
      profileImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    Object.keys(adminData).forEach((key) => {
      formData.append(key, adminData[key]);
    });

    try {
      const response = await registerAdmin(formData); // ✅ Sending FormData
      alert(response.data.message || "Admin registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Admin Registration Error:", error);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#4C3B4D] to-[#A67B5B] p-6">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-xl p-8 w-full max-w-2xl border border-yellow-500 transition-all duration-300 hover:border-yellow-300">
        <h2 className="text-4xl font-semibold text-center text-yellow-400 mb-6">Admin Signup</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="fullName" placeholder="Full Name" value={adminData.fullName} onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 bg-gray-50" />
            <input type="text" name="username" placeholder="Username" value={adminData.username} onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 bg-gray-50" />
            <input type="email" name="email" placeholder="Email" value={adminData.email} onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 bg-gray-50" />
            <input type="password" name="password" placeholder="Password" value={adminData.password} onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 bg-gray-50" />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={adminData.phoneNumber} onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 bg-gray-50" />
          </div>

          {/* ✅ Profile Image Upload Field */}
          <div>
            <label className="block text-gray-300 font-medium">Profile Image:</label>
            <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} required className="mt-2 p-2 border rounded-md bg-gray-50 w-full" />
          </div>

          <div>
            <select name="securityQuestion" value={adminData.securityQuestion} onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 bg-gray-50 w-full">
              <option value="What is your favorite color?">What is your favorite color?</option>
              <option value="What is your pet's name?">What is your pet's name?</option>
              <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            </select>
            <input type="text" name="securityAnswer" placeholder="Security Answer" value={adminData.securityAnswer} onChange={handleChange} required className="mt-2 p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 bg-gray-50 w-full" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-400 transition-all shadow-lg">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../services/api";

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    profilePicture: null,
    dob: "",
    gender: "",
    email: "",
    phoneNumber: "",
    qualification: "",
    interest: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim().toLowerCase(), // Trim and convert to lowercase where applicable
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      toast.success("Registration Successful!", { position: "top-right" });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/animation.jpg')", backgroundColor: "#e1bee7" }}>
      <div className="bg-purple-200 p-10 rounded-lg shadow-xl w-4/5 flex border-4 border-purple-700">
        <form className="w-full grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <label className="text-gray-900 font-semibold w-1/3">Full Name:</label>
            <input
              className="border-2 border-purple-500 p-2 outline-none focus:border-purple-700 w-2/3 rounded-lg shadow-sm bg-purple-100 text-gray-800"
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-900 font-semibold w-1/3">Username:</label>
            <input
              className="border-2 border-purple-500 p-2 outline-none focus:border-purple-700 w-2/3 rounded-lg shadow-sm bg-purple-100 text-gray-800"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-900 font-semibold w-1/3">Email:</label>
            <input
              className="border-2 border-purple-500 p-2 outline-none focus:border-purple-700 w-2/3 rounded-lg shadow-sm bg-purple-100 text-gray-800"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-900 font-semibold w-1/3">Phone Number:</label>
            <input
              className="border-2 border-purple-500 p-2 outline-none focus:border-purple-700 w-2/3 rounded-lg shadow-sm bg-purple-100 text-gray-800"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-900 font-semibold w-1/3">Date of Birth:</label>
            <input
              className="border-2 border-purple-500 p-2 outline-none focus:border-purple-700 w-2/3 rounded-lg shadow-sm bg-purple-100 text-gray-800"
              type="date"
              name="dob"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-900 font-semibold w-1/3">Gender:</label>
            <select
              className="border-2 border-purple-500 p-2 outline-none focus:border-purple-700 w-2/3 rounded-lg shadow-sm bg-purple-100 text-gray-800"
              name="gender"
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-900 font-semibold w-1/3">Qualification:</label>
            <input
              className="border-2 border-purple-500 p-2 outline-none focus:border-purple-700 w-2/3 rounded-lg shadow-sm bg-purple-100 text-gray-800"
              type="text"
              name="qualification"
              placeholder="Qualification"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-900 font-semibold w-1/3">Interests:</label>
            <input
              className="border-2 border-purple-500 p-2 outline-none focus:border-purple-700 w-2/3 rounded-lg shadow-sm bg-purple-100 text-gray-800"
              type="text"
              name="interest"
              placeholder="Interests"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-900 font-semibold w-1/3">Password:</label>
            <input
              className="border-2 border-purple-500 p-2 outline-none focus:border-purple-700 w-2/3 rounded-lg shadow-sm bg-purple-100 text-gray-800"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-gray-900 font-semibold w-1/3">Profile Picture:</label>
            <input
              className="border-2 border-purple-500 p-2 outline-none focus:border-purple-700 w-2/3 rounded-lg shadow-sm bg-purple-100 text-gray-800"
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          <button className="col-span-2 mt-4 bg-purple-700 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform shadow-lg" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;

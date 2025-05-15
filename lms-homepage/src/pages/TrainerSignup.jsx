import { useState } from "react";
import { registerTrainer } from "../services/api";
import { useNavigate } from "react-router-dom";

const TrainerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    professionalTitle: "",
    organizationName: "",
    organizationAddress: "",
    totalExperience: "",
    careerDescription: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await registerTrainer(formData);
      setSuccess(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#A23E48] via-[#3B7A78] to-[#F4E3C1] animate-gradient p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl border-2 border-[#6E272D]">
        <h2 className="text-3xl font-semibold text-center text-[#6E272D] mb-6">Trainer Signup</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]" />
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]" />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]" />
            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]" />
            <select name="gender" onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type="text" name="professionalTitle" placeholder="Professional Title" onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]" />
            <input type="text" name="organizationName" placeholder="Organization Name" onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]" />
            <input type="text" name="organizationAddress" placeholder="Organization Address" onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]" />
            <input type="number" name="totalExperience" placeholder="Total Experience (Years)" onChange={handleChange} required className="p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]" />
          </div>
          <textarea name="careerDescription" placeholder="Career Description & Biography" onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[#3B7A78] bg-[#F4E3C1]"></textarea>
          <button type="submit" className="w-full bg-gradient-to-r from-[#A23E48] to-[#3B7A78] text-white p-3 rounded-md hover:from-[#3B7A78] hover:to-[#F4E3C1] transition-all shadow-md">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default TrainerSignup;

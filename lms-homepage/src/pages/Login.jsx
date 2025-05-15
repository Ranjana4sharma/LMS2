import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../services/api";
import backgroundImage from "../assets/coding.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "", role: "user" }); // ✅ Role added
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(formData); // ✅ Role now included in API call
      const { token, role, isApproved, userId } = response.data;

      if (role === "trainer" && isApproved !== true) {
        toast.error("Admin approval is required before login.", { position: "top-right" });
        setLoading(false);
        return;
      }

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", userId);
        toast.success("Login Successful!", { position: "top-right", autoClose: 2000 });
      }

      if (role === "trainer" && isApproved) {
        setShowPopup(true);
        setTimeout(() => navigate("/trainer-dashboard"), 3000);
        return;
      }

      const roleRedirects = {
        admin: "/admin/dashboard",
        user: "/user-dashboard",
        examiner: "/examiner-dashboard",
        trainer: "/trainer-dashboard"
      };

      setTimeout(() => navigate(roleRedirects[role] || "/"), 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex w-4/5 max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-2/5 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold">Welcome Back!</h2>
          <p className="mt-4 text-lg">Log in to continue your learning journey.</p>
        </div>
        <div className="w-3/5 p-10">
          <h3 className="text-2xl font-semibold text-gray-700">Login</h3>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input className="border-gray-300 border-2 rounded-lg p-2 w-full" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input className="border-gray-300 border-2 rounded-lg p-2 w-full" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            
            {/* ✅ Role Selection Dropdown */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border-gray-300 border-2 rounded-lg p-2 w-full"
              required
            >
              <option value="user">Learner</option>
              <option value="examiner">Examiner</option>
              <option value="trainer">Trainer</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" disabled={loading} className={`w-full py-2 px-4 rounded-lg transition-all 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Approval Granted ✅</h2>
            <p className="text-gray-600">Your trainer account has been approved! You can now upload courses and exams.</p>
            <button 
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" 
              onClick={() => setShowPopup(false)}
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute"; 
import AuthProvider from "./context/AuthContext"; 
import Navbar from "./components/Navbar";
import WelcomeSection from "./components/WelcomeSection";
import AnimatedCardSlider from "./components/AnimatedCardSlider";
import RoleSection from "./components/RoleSection";
import CourseCards from "./components/CourseCards";
import StudentExperience from "./components/StudentExperience";
import Footer from "./components/Footer";
import ExploreCourses from "./pages/ExploreCourses";
import UserSignup from "./pages/UserSignup";
import ExaminerSignup from "./pages/ExaminerSignup";
import TrainerSignup from "./pages/TrainerSignup";
import AdminSignup from "./pages/AdminSignup";  // ✅ Added Admin Signup
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import AdminDashboard from "./pages/AdminDashboard"; // ✅ Added Admin Dashboard
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseDetails from "./components/CourseDetails";

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ Added ToastContainer */}
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={
            <>
              <WelcomeSection />
              <AnimatedCardSlider />
              <RoleSection />
              <CourseCards />
              <StudentExperience />
              <Footer />
            </>
          }/>
          <Route path="/explore-courses" element={<ExploreCourses />} />
          <Route path="/signup/user" element={<UserSignup />} />
          <Route path="/signup/examiner" element={<ExaminerSignup />} />
          <Route path="/signup/trainer" element={<TrainerSignup />} />
          <Route path="/signup/admin" element={<AdminSignup />} /> {/* ✅ Admin Signup */}
          <Route path="/login" element={<Login />} />
          <Route path="/explore-courses" element={<ExploreCourses />} />
          <Route path="/course/:id" element={<CourseDetails />} />

          {/* ✅ Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["user", "examiner", "trainer"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* ✅ Protected Admin Route */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

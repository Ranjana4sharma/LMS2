import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Authentication Routes (No Changes)
export const registerUser = (userData) => api.post("/api/auth/user/register", userData);
export const registerExaminer = (examinerData) => api.post("/api/auth/examiner/register", examinerData);
export const registerTrainer = (trainerData) => api.post("/api/trainers/register", trainerData);
export const registerAdmin = (adminData) => api.post("/api/admin/register", adminData);

export const loginUser = (loginData) => api.post("/api/auth/login", loginData); // ✅ Single login for all roles

// ✅ Trainer Routes
export const approveTrainer = (trainerId) => api.put(`/api/admin/trainer/approve/${trainerId}`); // ✅ Fixed route
export const getTrainerProfile = (trainerId) => api.get(`/api/trainers/profile/${trainerId}`);
export const updateTrainerProfile = (trainerData) => api.put("/api/trainers/profile", trainerData);

// ✅ Exam Routes
export const getExams = () => api.get("/api/exams");
export const submitExam = (examData) => api.post("/api/exams/submit", examData);
export const getExamAttempts = () => api.get("/api/exams/attempts");
export const downloadSyllabus = (examId) => 
  api.get(`/api/exams/syllabus/${examId}`, { responseType: "blob" }); // ✅ Fixed for file downloads
export const getExaminerProgress = () => api.get("/api/exams/progress");
export const reattemptExam = (examData) => api.post("/api/exams/reattempt", examData);

// ✅ User Routes
export const getUserProfile = () => api.get("/api/users/profile");
export const updateUserProfile = (userData) => api.put("/api/users/profile", userData);

// ✅ Admin Routes
export const addRemoveCourse = (courseData) => api.post("/api/admin/course", courseData);
export const approveExam = (examId) => api.post(`/api/admin/exam/approve/${examId}`);
export const blockUser = (userId) => api.put(`/api/admin/user/block/${userId}`);
export const changeAdminPassword = (passwordData) => api.put("/api/admin/change-password", passwordData);
export const editExam = (examId, examData) => api.put(`/api/admin/exam/edit/${examId}`, examData);
export const deleteExam = (examId) => api.delete(`/api/admin/exam/delete/${examId}`);
export const monitorExamSubmissions = () => api.get("/api/admin/exam-submissions");
export const issueCertificate = (userId, courseId) => api.post(`/api/admin/certificate/${userId}/${courseId}`);
export const verifyExamResults = (userId, examId) => api.get(`/api/admin/verify-exam/${userId}/${examId}`);

export default api;

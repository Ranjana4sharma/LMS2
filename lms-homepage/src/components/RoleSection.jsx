import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";
import roleImage from "../assets/algo.png";

const RoleSection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setShowModal(true); // Show the modal when a role is selected
  };

  const handleSignup = () => {
    if (selectedRole === "Learner") navigate("/signup/user");
    else if (selectedRole === "Examiner") navigate("/signup/examiner");
    else if (selectedRole === "Trainer") navigate("/signup/trainer");
  };

  const handleLogin = () => {
    navigate(`/login?role=${selectedRole.toLowerCase()}`); // Pass role as a query parameter
  };

  return (
    <section className="role-section">
      <div className="role-container">
        {/* Left Side - Image */}
        <div className="role-image">
          <img src={roleImage} alt="Learning" />
        </div>

        {/* Right Side - Text & Buttons */}
        <div className="role-content">
          <h2>Empower Your Learning Journey</h2>
          <p>Join us to explore new skills, evaluate knowledge, or guide others in their educational path.</p>
          <div className="role-buttons">
            <button className="role-btn" onClick={() => handleRoleClick("Learner")}>Learner</button>
            <button className="role-btn" onClick={() => handleRoleClick("Examiner")}>Examiner</button>
            <button className="role-btn" onClick={() => handleRoleClick("Trainer")}>Trainer</button>
          </div>
        </div>
      </div>

      {/* Modal for Signup/Login Selection */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedRole} Account</h3>
            <p>Do you want to sign up or log in?</p>
            <button className="modal-btn" onClick={handleSignup}>Sign Up</button>
            <button className="modal-btn" onClick={handleLogin}>Log In</button>
            <button className="modal-close" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default RoleSection;

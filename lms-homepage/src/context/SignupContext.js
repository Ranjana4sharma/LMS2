import { createContext, useState, useEffect } from "react";

export const SignupContext = createContext(); // ✅ Export the context

const SignupProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "", // You will store the role here (Admin, Trainer, Learner, etc.)
  });

  // Optionally: Use localStorage to persist Name, Email, and Role if required
  useEffect(() => {
    const storedData = localStorage.getItem("signupData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const updateUserData = (newData) => {
    setUserData((prevData) => ({ ...prevData, ...newData }));
    localStorage.setItem("signupData", JSON.stringify({ ...userData, ...newData }));
  };

  const clearUserData = () => {
    setUserData({ name: "", email: "", role: "" });
    localStorage.removeItem("signupData");
  };

  return (
    <SignupContext.Provider value={{ userData, updateUserData, clearUserData }}>
      {children}
    </SignupContext.Provider>
  );
};

export default SignupProvider; // ✅ Make sure this is the last line and properly exported

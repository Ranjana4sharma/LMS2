require("dotenv").config(); // Load environment variables
const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGJjZmRjYzlmMWE3NGZkM2M0MDIxMyIsImlhdCI6MTc0MjUwMjU4MywiZXhwIjoxNzQzMTA3MzgzfQ.AanP_cns2LlBsGTMgFVLBGm36VmkRRl-xmHm4fqT27w"; // Replace with your generated token

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
  console.log("✅ Token is valid:", decoded);
} catch (error) {
  console.error("❌ Invalid token:", error.message);
}

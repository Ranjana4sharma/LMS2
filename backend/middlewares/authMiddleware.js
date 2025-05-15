const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRole = "admin") => {
  return async (req, res, next) => {
    console.log("🔹 Verifying token using JWT_SECRET:", process.env.JWT_SECRET);

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("❌ No token provided");
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
      console.log("🔹 Token received:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("🔹 Decoded Token:", decoded);

      // Check if the user has the required role
      if (decoded.role !== requiredRole) {
        console.log(`❌ Only ${requiredRole}s can access this route`);
        return res.status(403).json({ message: `Only ${requiredRole}s can access this route` });
      }

      req.user = decoded;
      console.log("✅ Authorized, proceeding with action.");
      next();

    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.log("❌ Token expired");
        return res.status(401).json({ message: "Token expired, please log in again" });
      }

      if (error.name === "JsonWebTokenError") {
        console.log("❌ Invalid token");
        return res.status(401).json({ message: "Invalid token, authorization denied" });
      }

      console.log("❌ Token verification failed:", error.message);
      res.status(401).json({ message: "Invalid token, authorization denied" });
    }
  };
};

module.exports = authMiddleware;

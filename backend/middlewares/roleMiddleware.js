const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      console.log("❌ Unauthorized: No user or role found in request");
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    // Log only if not in production
    if (process.env.NODE_ENV !== "production") {
      console.log(`🔹 Checking Role-Based Access Control`);
      console.log(`🔹 User Role: ${req.user.role} | Allowed Roles: ${allowedRoles.join(", ")}`);
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.log("❌ Forbidden: User does not have required permissions");
      return res.status(403).json({
        message: "Forbidden: You do not have the required permissions",
        requiredRoles: allowedRoles,
        userRole: req.user.role,
      });
    }

    console.log("✅ Access granted");
    next();
  };
};

module.exports = roleMiddleware;

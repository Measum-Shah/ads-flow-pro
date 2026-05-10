/**
 * Role-based access control middleware.
 * Usage: role("admin")  or  role("admin", "super_admin")
 * Always use AFTER the auth middleware.
 */
const role = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions"
      });
    }

    next();
  };
};

export default role;
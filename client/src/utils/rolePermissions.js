import { USER_ROLES } from "./constants";

export const ROUTE_ACCESS = {
  CLIENT: [USER_ROLES.CLIENT],
  MODERATOR: [
    USER_ROLES.MODERATOR,
    USER_ROLES.ADMIN,
    USER_ROLES.SUPER_ADMIN,
  ],
  ADMIN: [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN],
};

export const getDefaultDashboardByRole = (role) => {
  if (role === USER_ROLES.CLIENT) {
    return "/client/dashboard";
  }

  if (role === USER_ROLES.MODERATOR) {
    return "/moderator/dashboard";
  }

  if (role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN) {
    return "/admin/dashboard";
  }

  return "/";
};

export const canAccessRoute = (userRole, allowedRoles = []) => {
  return allowedRoles.includes(userRole);
};
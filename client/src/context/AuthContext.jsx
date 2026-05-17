import { createContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../api/auth.api";
import { TOKEN_KEY, USER_KEY } from "../utils/constants";
import { getApiError } from "../utils/errorHandler";

export const AuthContext = createContext(null);

const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [authLoading, setAuthLoading] = useState(true);

  const isAuthenticated = Boolean(token && user);

  const saveAuthData = (authData) => {
    const receivedToken = authData?.token || authData?.data?.token;
    const receivedUser = authData?.user || authData?.data?.user;

    if (receivedToken) {
      localStorage.setItem(TOKEN_KEY, receivedToken);
      setToken(receivedToken);
    }

    if (receivedUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(receivedUser));
      setUser(receivedUser);
    }

    return {
      token: receivedToken,
      user: receivedUser,
    };
  };

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      return saveAuthData(response);
    } catch (error) {
      throw new Error(getApiError(error, "Login failed."));
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      return saveAuthData(response);
    } catch (error) {
      throw new Error(getApiError(error, "Registration failed."));
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setToken(null);
  };

  const restoreSession = async () => {
    const savedToken = localStorage.getItem(TOKEN_KEY);

    if (!savedToken) {
      setAuthLoading(false);
      return;
    }

    try {
      const response = await getCurrentUser();
      const currentUser = response?.user || response?.data?.user || response?.data;

      if (currentUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
        setUser(currentUser);
      }
    } catch {
      logout();
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role,
        authLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
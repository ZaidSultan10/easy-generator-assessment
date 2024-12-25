import React, { createContext, useState, useContext, ReactNode } from "react";

import Cookies from "js-cookie";

// Define types for the context
type AuthContextType = {
  isAccessToken: string;
  login: (accessToken: string) => void;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the type for the AuthProvider props
interface AuthProviderProps {
  children: ReactNode; // This allows 'children' prop to be passed into AuthProvider
}

// Create a provider component to wrap the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAccessToken, setAccessToken] = useState<string>("");

  const login = (accessToken: string) => {
    setAccessToken(accessToken);
    Cookies.set("accessToken", accessToken, { expires: 7, secure: true });
  };

  return (
    <AuthContext.Provider value={{ isAccessToken, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

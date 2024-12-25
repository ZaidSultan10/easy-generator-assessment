import React, { createContext, useState, useContext } from "react";

import Cookies from "js-cookie";
import { AuthContextType, AuthProviderProps } from "../interfaces/authTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

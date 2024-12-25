import { ReactNode } from "react";

export interface AuthContextType {
  isAccessToken: string;
  login: (accessToken: string) => void;
}

export interface AuthProviderProps {
  children: ReactNode; // This allows 'children' prop to be passed into AuthProvider
}

import React from "react";

export const AuthContext = React.createContext<AuthContextData>({
  isLoading: true,
  accessToken: null,
  refreshToken: null,
  signIn: async (): Promise<void> => {},
  signOut: async (): Promise<void> => {}
} as AuthContextData);

export interface AuthState {
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextActions {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface AuthContextData extends AuthState, AuthContextActions {}

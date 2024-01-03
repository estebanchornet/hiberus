import * as SecureStore from "expo-secure-store";
import { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { loginAsync } from "../services/AuthenticationService";
import { queryClient, queryClientPersister } from "../services/QueryService";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./AuthConstants";
import {
  AuthContext,
  AuthContextActions,
  AuthContextData
} from "./AuthContext";
import authReducer from "./AuthReducer";

export default function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    accessToken: null,
    refreshToken: null
  });

  useEffect(() => {
    async function initialize(): Promise<void> {
      let accessToken: string | null = null;
      let refreshToken: string | null = null;

      try {
        accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
        refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN);
      } finally {
        dispatch({
          type: "RESTORE_TOKEN",
          accessToken: accessToken,
          refreshToken: refreshToken
        });
      }
    }

    initialize();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const response = await loginAsync(email, password);

    await SecureStore.setItemAsync(ACCESS_TOKEN, response.accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN, response.refreshToken);

    dispatch({
      type: "SIGN_IN",
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
    });
  }, []);

  const signOut = useCallback(async () => {
    try {
      await queryClientPersister.removeClient();
      queryClient.clear();
    } finally {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN);

      dispatch({
        type: "SIGN_OUT",
        accessToken: null,
        refreshToken: null
      });
    }
  }, []);

  const authContext: AuthContextActions = useMemo(
    () => ({
      signIn,
      signOut
    }),
    [signIn, signOut]
  );

  return (
    <AuthContext.Provider value={{ ...state, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Authentication context is required");
  return context;
}

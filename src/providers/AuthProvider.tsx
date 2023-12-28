import * as SecureStore from "expo-secure-store";
import { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import {
  AuthContext,
  AuthContextActions,
  AuthContextData,
  AuthState
} from "./AuthContext";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./IdentityConstants";

export default function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, {
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
    //TODO: Call API sign in const response = await loginAsync(userIdentifier, password);

    // TODO: Adapt fake tokens with API response
    await SecureStore.setItemAsync(ACCESS_TOKEN, "Access token");
    await SecureStore.setItemAsync(REFRESH_TOKEN, "Refresh token");

    dispatch({
      type: "SIGN_IN",
      accessToken: "Access token",
      refreshToken: "Refresh token"
    });
  }, []);

  const signOut = useCallback(async () => {
    try {
      // TODO: To be checked if we use react query
      //   await queryClientPersister.removeClient();
      //   queryClient.clear();
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

function reducer(
  prevState: AuthState,
  action: {
    type: string;
    accessToken: string | null;
    refreshToken: string | null;
  }
): AuthState {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        isLoading: false
      };
    case "SIGN_IN":
      return {
        ...prevState,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        accessToken: null,
        refreshToken: null
      };
    default:
      return prevState;
  }
}

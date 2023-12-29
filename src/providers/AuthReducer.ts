import { AuthState } from "./AuthContext";

export default function authReducer(
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

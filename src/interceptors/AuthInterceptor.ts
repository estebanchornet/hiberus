import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { ACCESS_TOKEN } from "../providers/AuthConstants";
import { usersApiAxiosInstance } from "../services/clients/IdentityClientFactory";

export default function AuthInterceptor({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    usersApiAxiosInstance.interceptors.request.use(async (request) => {
      const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }

      return request;
    });

    // Normally, we should manage refreshing the token, but the provided API does not include it
    // We could use createAuthRefreshInterceptor from axios-auth-refresh for that.
  }, []);

  return children as React.ReactElement;
}

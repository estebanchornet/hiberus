import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import { userQueryKey } from "./QueryService";
import { usersApiAxiosInstance } from "./clients/IdentityClientFactory";

export function useUser() {
  return useQuery({ queryKey: [userQueryKey], queryFn: getUser });
}

async function getUser() {
  const requestConfig: AxiosRequestConfig = {
    method: "GET",
    url: `${Constants.expoConfig?.extra?.userApiAddress}/me`,
    headers: {
      Accept: "*/*",
      "content-type": "application/x-www-form-urlencoded"
    }
  };
  const response = await usersApiAxiosInstance.request<User>(requestConfig);

  return response.data;
}

export interface User {
  email: string;
  name: string;
  surname: string;
  id: string;
}

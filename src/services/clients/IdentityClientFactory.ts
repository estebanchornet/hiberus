import axios, { AxiosInstance } from "axios";
import Constants from "expo-constants";
import { IdentityClient } from "./IdentityClient";

export const identityClientAxiosInstance: AxiosInstance = axios.create();
export const usersApiAxiosInstance: AxiosInstance = axios.create();

const identityClient = new IdentityClient(
  Constants.expoConfig?.extra?.identityAddress,
  identityClientAxiosInstance
);

class IdentityClientFactory {
  create(): IdentityClient {
    return identityClient;
  }
}

export const identityClientFactory: IdentityClientFactory =
  new IdentityClientFactory();

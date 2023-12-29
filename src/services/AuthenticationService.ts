import { useMutation } from "@tanstack/react-query";
import { identityClientFactory } from "./clients/IdentityClientFactory";

export async function loginAsync(email: string, password: string) {
  const identityClient = identityClientFactory.create();
  const response = await identityClient.RequestResourceOwnerPasswordAsync(
    email,
    password
  );

  return response;
}

export function useRegisterAsync() {
  return useMutation({
    mutationFn: (registerInfo: IRegisterInfo) => registerAsync(registerInfo)
  });
}

async function registerAsync(registerInfo: IRegisterInfo): Promise<void> {
  const identityClient = identityClientFactory.create();
  await identityClient.RegisterAsync(registerInfo);
}

export interface IRegisterInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

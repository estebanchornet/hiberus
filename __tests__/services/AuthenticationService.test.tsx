import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import nock from "nock";
import { ReactNode } from "react";
import {
  IRegisterInfo,
  loginAsync,
  useRegisterAsync
} from "../../src/services/AuthenticationService";
import {
  IdentityClient,
  TokenResponse
} from "../../src/services/clients/IdentityClient";
import { identityClientFactory } from "../../src/services/clients/IdentityClientFactory";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity
    },
    mutations: {
      retry: false,
      gcTime: Infinity
    }
  }
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("../../src/services/clients/IdentityClientFactory");

describe("AuthenticationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call RequestResourceOwnerPasswordAsync on loginAsync and login", async () => {
    const email = "test@example.com";
    const password = "testPassword";
    const mockResponse = {
      accessToken: "mockAccessToken",
      refreshToken: "mockRefreshToken",
      tokenType: "Bearer"
    };

    const mockIdentityClient = new IdentityClient();
    jest
      .spyOn(mockIdentityClient, "RequestResourceOwnerPasswordAsync")
      .mockResolvedValueOnce(mockResponse);

    jest
      .spyOn(identityClientFactory, "create")
      .mockReturnValueOnce(mockIdentityClient);

    let response: TokenResponse;
    await act(async () => {
      response = await loginAsync(email, password);
    });

    await waitFor(() => {
      expect(
        mockIdentityClient.RequestResourceOwnerPasswordAsync
      ).toHaveBeenCalledWith(email, password);
      expect(response).toEqual(mockResponse);
    });
  });

  it("should fail login with invalid password or email", async () => {
    const email = "test@example.com";
    const password = "wrongPassword";

    const mockIdentityClient = new IdentityClient();
    jest
      .spyOn(mockIdentityClient, "RequestResourceOwnerPasswordAsync")
      .mockImplementationOnce(() => {
        throw new Error("Invalid password");
      });

    jest
      .spyOn(identityClientFactory, "create")
      .mockReturnValueOnce(mockIdentityClient);

    await act(async () => {
      await expect(
        async () => await loginAsync(email, password)
      ).rejects.toThrow("Invalid password");
    });
  });

  it("should call RegisterAsync on registerAsync and register a user", async () => {
    const registerInfo: IRegisterInfo = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123"
    };

    const mockIdentityClient = new IdentityClient();
    jest
      .spyOn(mockIdentityClient, "RegisterAsync")
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(identityClientFactory, "create")
      .mockReturnValueOnce(mockIdentityClient);

    const { result } = renderHook(() => useRegisterAsync(), {
      wrapper
    });

    nock("https://api.com").post("/sign-up").reply(200);

    await act(async () => {
      await result.current.mutateAsync(registerInfo);
    });

    await waitFor(() => {
      expect(mockIdentityClient.RegisterAsync).toHaveBeenCalledWith(
        registerInfo
      );
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it("should throw error user exists on RegisterAsync", async () => {
    const registerInfo: IRegisterInfo = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123"
    };

    const mockIdentityClient = new IdentityClient();
    jest
      .spyOn(mockIdentityClient, "RegisterAsync")
      .mockImplementationOnce(() => {
        throw new Error("User already exists");
      });

    jest
      .spyOn(identityClientFactory, "create")
      .mockReturnValueOnce(mockIdentityClient);

    const { result } = renderHook(() => useRegisterAsync(), {
      wrapper
    });

    await act(async () => {
      await expect(
        async () => await result.current.mutateAsync(registerInfo)
      ).rejects.toThrow("User already exists");
    });
  });
});

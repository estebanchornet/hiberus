import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import {
  IRegisterInfo,
  loginAsync,
  useRegisterAsync
} from "../../src/services/AuthenticationService";
import { IdentityClient } from "../../src/services/clients/IdentityClient";
import { identityClientFactory } from "../../src/services/clients/IdentityClientFactory";

// Mock the actual implementation of IdentityClient
jest.mock("../../src/services/clients/IdentityClientFactory");

// TODO: Check await calls

describe("AuthenticationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call RequestResourceOwnerPasswordAsync on loginAsync", async () => {
    const email = "test@example.com";
    const password = "testPassword";
    const mockResponse = {
      accessToken: "mockAccessToken",
      refreshToken: "mockRefreshToken",
      tokenType: "Bearer"
    };

    // Mock the implementation of IdentityClient
    const mockIdentityClient = new IdentityClient();
    jest
      .spyOn(mockIdentityClient, "RequestResourceOwnerPasswordAsync")
      .mockResolvedValueOnce(mockResponse);

    // Mock the create method of identityClientFactory
    jest
      .spyOn(identityClientFactory, "create")
      .mockReturnValueOnce(mockIdentityClient);

    const response = await loginAsync(email, password);

    expect(response).toEqual(mockResponse);
    waitFor(() =>
      expect(
        mockIdentityClient.RequestResourceOwnerPasswordAsync
      ).toHaveBeenCalledWith(email, password)
    );
  });

  it("should call RegisterAsync on registerAsync", async () => {
    const registerInfo: IRegisterInfo = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123"
    };

    // Mock the implementation of IdentityClient
    const mockIdentityClient = new IdentityClient();
    jest
      .spyOn(mockIdentityClient, "RegisterAsync")
      .mockResolvedValueOnce(undefined);

    // Mock the create method of identityClientFactory
    jest
      .spyOn(identityClientFactory, "create")
      .mockReturnValueOnce(mockIdentityClient);

    const Wrapper = ({ children }) => (
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useRegisterAsync(), {
      wrapper: Wrapper
    });

    await act(async () => {
      await result.current.mutateAsync(registerInfo);
    });

    await waitFor(() => {
      expect(mockIdentityClient.RegisterAsync).toHaveBeenCalledWith(
        registerInfo
      );
    });
  });
});

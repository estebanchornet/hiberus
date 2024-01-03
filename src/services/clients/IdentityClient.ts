import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import { IRegisterInfo } from "../AuthenticationService";

export class IdentityClient {
  private readonly instance: AxiosInstance;
  private readonly baseUrl?: string;

  constructor(baseUrl?: string, instance?: AxiosInstance) {
    this.instance = instance ?? axios.create();
    this.baseUrl = baseUrl;
  }

  // Normally, we should use OAuth2.0 protocol & ResourceOwnerPassword flow,
  // With scopes, clientId & clientSecret if using ClientCredentials flow
  public async RequestResourceOwnerPasswordAsync(
    email: string,
    password: string
  ): Promise<TokenResponse> {
    const url = this.baseUrl + "/log-in";

    const requestConfig: AxiosRequestConfig = {
      method: "POST",
      url: url,
      headers: {
        Accept: "*/*",
        "content-type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify({
        email: email,
        password: password
      })
    };

    const response = await this.instance.request<TokenResponse>(requestConfig);
    return response.data;
  }

  public async RegisterAsync(registerInfo: IRegisterInfo) {
    const url = this.baseUrl + "/sign-up";

    const requestConfig: AxiosRequestConfig = {
      method: "POST",
      url: url,
      headers: {
        Accept: "*/*",
        "content-type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify({
        name: registerInfo.firstName,
        surname: registerInfo.lastName,
        email: registerInfo.email,
        password: registerInfo.password
      })
    };

    await this.instance.request(requestConfig);
  }
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

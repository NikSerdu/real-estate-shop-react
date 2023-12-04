import Cookies from "js-cookie";
import { getAccessToken, getRefreshToken } from "../api/api.helper";
import { instance } from "../api/api.interceptor";
import { ILogin, IRegister, IUserWithTokens } from "../types/auth.interface";
import { IResponse, ITokensResponse } from "../types/response.interface";

export const AuthService = {
  async register(data: IRegister) {
    const response = await instance<IResponse>({
      url: `/authenticate/register`,
      method: "POST",
      data,
    });
    return response.data;
  },
  async login(data: ILogin) {
    const response = await instance<IUserWithTokens>({
      url: `/authenticate/login`,
      method: "POST",
      data,
    });
    if (response.data.userId) {
      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);
    }
    const { accessToken, refreshToken, ...rest } = response.data;
    localStorage.setItem("user", JSON.stringify(rest));
    return rest;
  },
  async logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("user");
  },

  async getNewTokens() {
    console.log("раз");

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    const data = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    console.log(data);
    const response = await instance<ITokensResponse>({
      url: `/authenticate/refresh-token`,
      method: "POST",
      data,
    });
    if (response.data.accessToken && response.data.refreshToken) {
      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);
      return response;
    }
  },
};

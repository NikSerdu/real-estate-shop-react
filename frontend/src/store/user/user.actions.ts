import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth.service";
import { ILogin, IRegister, IUser } from "../../types/auth.interface";
import { IResponse, ITokensResponse } from "../../types/response.interface";

export const register = createAsyncThunk<IResponse, IRegister>(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.register(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<IUser, ILogin>(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const response = await AuthService.login(data);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  AuthService.logout();
});

export const checkAuth = createAsyncThunk<ITokensResponse>(
  "auth/refresh-token",
  async (_, thunkApi) => {
    try {
      const response = await AuthService.getNewTokens();
      //@ts-ignore
      return response.data;
    } catch (error) {
      console.log(error);
      thunkApi.dispatch(logout());
      return thunkApi.rejectWithValue(error);
    }
  }
);

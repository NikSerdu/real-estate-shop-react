import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../../utils/getFromLocalStorage";
import { checkAuth, login, logout, register } from "./user.actions";
import { IInitialState } from "./user.interface";

const initialState: IInitialState = {
  user: getFromLocalStorage("user"),
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

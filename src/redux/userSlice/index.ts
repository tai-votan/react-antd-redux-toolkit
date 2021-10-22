import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { TUserLogin } from "models/user";
import requestClient from "utils/request";
import ENDPOINT from "endpoint";

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (params: TUserLogin) =>
    requestClient(ENDPOINT.USER_LOGIN, {
      method: "POST",
      data: params,
    })
);

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      localStorage.setItem("accessToken", payload?.data?.token || "");
      return payload?.data;
    });
  },
});

export const selectUser = ({ user }: RootState) => user;

export default userSlice.reducer;

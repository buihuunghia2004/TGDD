import axiosInstance from "~/config/axiosInstance"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const loginAPI = createAsyncThunk(
  "/auth/admin/login",
  async (data) => {
    const response = await axiosInstance.post('/auth/admin/login', data)
    console.log('data',response);
    const {accessToken} = response
    sessionStorage.setItem('accessToken', accessToken)
    return response
  }
)

export const logout = createAsyncThunk(
  console.log("logout")
)

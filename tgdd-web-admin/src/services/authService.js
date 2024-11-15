import axiosInstance from "~/config/axiosInstance"
import { createAsyncThunk } from "@reduxjs/toolkit"
export const login = createAsyncThunk(
  "auth/login",
  async (data) => {
    const response = await axiosInstance.post('/auth/login', data)
    console.log('data',response.data);
    const {accessToken} = response.data
    sessionStorage.setItem('accessToken', accessToken)
    return response.data
  }
)

export const logout = createAsyncThunk(
  console.log("logout")
)

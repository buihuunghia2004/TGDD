import axiosInstance from "~/config/axiosInstance"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllaAdminAPI = createAsyncThunk(
  "/admins",
  async ({currentPage,limit}) => {
    const response = await axiosInstance.get(`/admins?page=${currentPage}&limit=${limit}`)    
    return response
  }
)
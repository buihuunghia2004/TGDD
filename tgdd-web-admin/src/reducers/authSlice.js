import { createSlice } from '@reduxjs/toolkit'
import { loginAPI, logout } from '../services/authService'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    data:{
      accessToken: sessionStorage.getItem('accessToken'),
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAPI.pending, (state, action) => {
        state.loading = true
      })
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.loading = false
      })
      // .addCase(logout.pending, (state, action) => {
      //   state.user = action.payload
      // })
      // .addCase(logout.fulfilled, (state, action) => {
      //   state.user = null
      // })
      // .addCase(logout.rejected, (state, action) => {
      
      // })
  }
})

export default authSlice.reducer


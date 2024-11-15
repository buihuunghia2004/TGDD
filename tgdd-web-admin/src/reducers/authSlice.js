import { createSlice } from '@reduxjs/toolkit'
import { login, logout } from '../services/authService'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = null
      })
      .addCase(login.rejected, (state, action) => {
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


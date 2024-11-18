import { createSlice } from '@reduxjs/toolkit'
import { loginThunk, logout } from '../services/authService'

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
    builder.addCase(loginThunk.pending, (state, action) => {
        state.loading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(loginThunk.rejected, (state, action) => {
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


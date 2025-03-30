import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetail: {},
  userToken: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserDetail: (state, action) => {
      state.userDetail = action.payload
    },
    userToken: (state, action) => {
      state.userToken = action.payload
    },
    logout: (state) => {
      state.userDetail = {}
      state.userToken = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUserDetail,userToken,logout } = userSlice.actions

export default userSlice.reducer
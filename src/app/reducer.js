import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profile: {},
    notification:{},
    timer:''
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
//   lists of functions that can update the redux states
  reducers: {
    dispatchProfile: (state, action) => {
        state.profile = action.payload
    },
    dispatchNotification: (state, action) => {
      state.notification = action.payload
  },
    dispatchTimer: (state, action) => {
      state.timer = action.payload
  }
  },
 
})

// Action creators are generated for each case reducer function
export const { dispatchProfile, dispatchNotification,dispatchTimer } = counterSlice.actions

export default counterSlice.reducer
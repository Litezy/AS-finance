import { createSlice } from '@reduxjs/toolkit'
import { CLEAR_ROOMID } from './action'

const initialState = {
  profile: {},
  notification: {},
  timer: '',
  messages: [],
  roomid:'',
  chats: '',
  adminprofile:''
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
    },
    dispatchMessages: (state, action) => {
      state.messages = action.payload
    },
    dispatchAdminProfile: (state, action) => {
      state.adminprofile = action.payload
    },
    dispatchRoomid: (state, action) => {
      switch (action.type) {
        case CLEAR_ROOMID:
          return {
            ...state,
            roomid: null, 
          };
        default:
          return state;
      }
    },
    dispatchChats: (state, action) => {
      state.chats = action.payload
    },
  },

})

// Action creators are generated for each case reducer function
export const { dispatchProfile, dispatchNotification, dispatchTimer, dispatchMessages,dispatchRoomid,dispatchChats,dispatchAdminProfile } = counterSlice.actions

export default counterSlice.reducer
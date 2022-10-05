import { configureStore } from '@reduxjs/toolkit'
import studentReducer from '../slices/studentSlice'
import rangeReducer from '../slices/rangeSlice'
import messageReducer from '../slices/messageSlice'
import userSlice from '../slices/userSlice'
export default configureStore({
  reducer: {
      student: studentReducer,
      range: rangeReducer,
      message: messageReducer,
      user: userSlice
  }
})
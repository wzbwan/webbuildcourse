import { configureStore } from '@reduxjs/toolkit'
import studentReducer from '../slices/studentSlice'
import rangeReducer from '../slices/rangeSlice'
import messageReducer from '../slices/messageSlice'
import userSlice from '../slices/userSlice'
import rankSlice from '../slices/rankSlice'
export default configureStore({
  reducer: {
      student: studentReducer,
      range: rangeReducer,
      message: messageReducer,
      user: userSlice,
      rank: rankSlice
  }
})
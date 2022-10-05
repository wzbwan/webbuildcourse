import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'

const initialState = {

}

export const fetchMessage = createAsyncThunk('message/fetchMessage', async () => {
  const response = await client.get('/api/messages')
  return response.data
})

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMessage.fulfilled, (state, action) => {
      // console.log("fetch message: ",action.payload)
      if (action.payload.data?.length > 0) {
        return action.payload.data[0].attributes  
      }else{
        return {}
      }
      
    })
  },
})

export default messageSlice.reducer

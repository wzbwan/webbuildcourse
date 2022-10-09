import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'
import qs from 'qs'


const initialState = []

export const rank = createAsyncThunk('rank/rank', async () => {
  const response = await client.post(`/rank`)
  return response.data
})


const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(rank.fulfilled, (state, action) => {
      return action.payload.sort((a,b)=>b.amount-a.amount)
    })
  }
})

export default rankSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'
import qs from 'qs'
import moment from 'moment'

const query = qs.stringify({
  populate:{
    students: {
      count:true
    }
  }
}, {
  encodeValuesOnly: true,
});
const initialState = []

export const fetchRanges = createAsyncThunk('student/fetchRanges', async () => {
  const response = await client.get(`/api/ranges?${query}`)
  return response.data
})

export const checkRange = createAsyncThunk('student/check', async (rangeid) => {
  const response = await client.get(`/api/ranges/${rangeid}?${query}`)
  return response.data
})

const rangeSlice = createSlice({
  name: 'ranges',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRanges.fulfilled, (state, action) => {
      
      if (action.payload.data.length > 0) {
        // console.log("fetch ranges: ",action.payload.data)  
        return action.payload.data.sort((a,b)=>{
          const aDate = a.attributes.date
          const bDate = b.attributes.date
          let a_ = moment(aDate).add(a.attributes.time=="上午"?12:18,'h')
          let b_ = moment(bDate).add(b.attributes.time=="上午"?12:18,'h')
          return moment.duration(a_.diff(b_)).asSeconds()
        })
      }else{
        return action.payload.data
      }
    })
  },
})

export default rangeSlice.reducer

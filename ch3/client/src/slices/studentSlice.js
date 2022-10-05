import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'
import qs from 'qs'

const initialState = {

}

export const fetchStudent = createAsyncThunk('student/fetchStudent', async ({name,idnumber,examid}) => {
  const query = qs.stringify({
    filters: {
      name: {
        $eq: name
      },
      idnumber: {
        $eq: idnumber
      },
      examid: {
        $eq: examid
      }
    },
    populate:{
      range:{
        fields:['date','time']
      }
    }
  }, {
    encodeValuesOnly: true,
  });
  const response = await client.get(`/api/students?${query}`)
  return response.data
})

export const appointmentStudent = createAsyncThunk('student/appointment', async ({stdid,rangeid}) => {
  const response = await client.put(`/api/students/${stdid}`,{data:{range:rangeid}})
  return response.data
})

export const queryAppointment = createAsyncThunk('student/query', async (examid) => {
  const query = qs.stringify({
    filters: {
      examid: {
        $eq: examid
      }
    },
    populate:{
      range:{
        fields:['date','time']
      }
    }
  }, {
    encodeValuesOnly: true,
  });
  const response = await client.get(`/api/students?${query}`)
  return response.data
})

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchStudent.fulfilled, (state, action) => {
      return action.payload
    }).addCase(queryAppointment.fulfilled, (state, action) => {
      // console.log('queryAppointment:',action.payload)
      if (action.payload.data.length > 0) {
        return action.payload.data[0]
      }else{
        return {
          id: -1,
          attributes:{
            name: '未找到',
            examid: '未找到',
            idnumber: '未找到'
          }
        }
      }
      
    })
  },
})

export default studentSlice.reducer

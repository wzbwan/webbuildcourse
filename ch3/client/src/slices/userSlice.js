import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../api/client'
import qs from 'qs'

const initialState = {
  loginState: -1,
  username: '',
  user:{
    name: ''
  }
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

const fakelogin = async () => {
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}

export const login = createAsyncThunk('user/login', async ({username, password})=>{
    const resposne = await client.post(`/login`,{username,password})
    return resposne.data
})

export const bet = createAsyncThunk('user/bet', async ({sid, betData}) => {
  const response = await client.post(`/bet`,{sid,betData})
  return response.data
})

const userSlice = createSlice({
  name: 'user',
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
    .addCase(login.fulfilled, (state, action) => {
      return {loginState:action.payload.status, user:action.payload.user}
    })
    .addCase(bet.fulfilled, (state, action) => {
      return {...state,user:{...state.user,amount:action.payload.amount}}
    })
  },
})

export default userSlice.reducer

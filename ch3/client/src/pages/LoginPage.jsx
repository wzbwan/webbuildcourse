import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../slices/userSlice'
import "./LoginPage.css"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)
  return (
    <div className='loginMain'>
      <div className='loginLeft'>
        <img className='loginLeftImage' 
        alt=""
        src="https://images.unsplash.com/photo-1664844819758-76e686faf12e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60" />
      </div>
      <div className='loginRight'>
        <h1>Welcome Back</h1>
        
        <input  placeholder='type your user name' className='loginInput' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        <input  placeholder='type your password' className='loginInput' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <button className='loginBtn' onClick={async ()=>{
          const loginresponse = await dispatch(login({username,password})).unwrap()
          if (loginresponse.status === 1) {
            navigate('/')
          }else{
            alert("用户名或密码错误")
          }
        }}>LOG IN</button>
        <div className='signup-and-forgetpassword'>
          <Link>SIGN UP</Link>|<Link>FORGET PASSWORD</Link>
        </div>
      </div>
      
    </div>
  )
}

export default LoginPage
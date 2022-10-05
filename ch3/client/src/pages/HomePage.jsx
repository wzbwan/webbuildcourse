import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import icons from './icons'
import "./HomePage.css"

function HomePage() {
  const user = useSelector(state=>state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if (user.loginState === -1) {
      navigate('/login')
    }
  },[user])
  return <div className="home-container">
    <div className="home-header">
      <img width='100%' src="https://images.unsplash.com/photo-1592398191627-25b41eeaa398?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtYmxpbmd8ZW58MHx8MHx8&auto=format&fit=crop" />
      <div className='home-header-content' style={{top:window.innerWidth * 0.2}}>
        <h1 className='home-header-content-title'>Huhhot Gambling</h1>
      </div>
    </div>
    <div className="home-content">
      <h2>主页的内容</h2>
      {icons.map((icon)=><Link key={icon} to="/game"><img className='icon' src={icon}/></Link>)}
    </div>
    
  </div>
}

export default HomePage
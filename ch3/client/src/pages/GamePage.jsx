import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import RankPanel from '../components/RankPanel'
import SpeedGame from '../components/SpeedGame'
import "./GamePage.css"

function GamePage() {
  const {user} = useSelector(state=>state.user)
  const [rankVisible, setRankVisible] = useState(true)
  const dispatch = useDispatch()

  return (<div className="game-container">
    <img width="100%" className='img' src="https://images.unsplash.com/photo-1592398191853-bfc54477c4d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGdhbWJsaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop" />
    <div className='game-content-container'>
      <div>
        <div>
          <h1 style={{color:'white'}}>你好{user.name}，欢迎回来，玩的开心！ <Link to="/"><span style={{color:'blue'}}>返回首页</span></Link></h1>
         
        </div>
      </div>
      <div className={rankVisible?'game-box-continer-rank-visible':'game-box-container'}>
        <SpeedGame />
      </div>
      
      <RankPanel handleClose={()=>{setRankVisible(!rankVisible)}} visible={rankVisible} />
      
    </div>
  </div>)
}

export default GamePage
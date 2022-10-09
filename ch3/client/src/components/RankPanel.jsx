import { useEffect } from 'react'
import { rank } from '../slices/rankSlice'
import { useSelector, useDispatch } from 'react-redux'
import "./RankPanel.css"
let timer

function RankItem(props) {
  const {name, sid, amount} = props.std
  const isSelf = props.isSelf
  const row = props.row
  return (
    <div className={isSelf?"rank-self-item":"rank-others-item"}>
      <h4 className='rank-item-h4'>{row}{` `}{`${name}`}</h4>
      <h4 className='rank-item-h4'>{`${amount}`}</h4>
    </div>
  )
}

function RankPanel(props) {
  const {user} = useSelector(state=>state.user)
  const ranks = useSelector(state=>state.rank)
  const { visible } = props
  const dispatch = useDispatch()
  useEffect(()=>{
    timer = setInterval(() => {
      dispatch(rank())
    }, 3000);
    return () => {
      clearInterval(timer)
    }
  },[])
  return <div className={visible?'rank-container':'rank-container-close'}>
    {visible?<div className='rank-content-container'>
      {ranks.map((std,index)=><RankItem key={std.sid} std={std} row={index+1} isSelf={user.sid===std.sid} />)}
    </div>:null}
    <button className={visible?'rank-visible-btn':'rank-visible-btn-close'} onClick={()=>{props.handleClose()}}>{visible?">>":"<<"}</button>
    
  </div>
}

export default RankPanel
import {useEffect, useState} from 'react'
import { bet } from '../slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import "./SpeedGame.css"
let timer
const base = 100
function RecordCell (props) {
  const {order, number, bet, double, result} = props.data
  return (
    <div className='record-cell-container'>
      <span style={{width:40}}>{order}.</span>
      <span style={{width:60}}>{number}</span>
      <span style={{width:60}}>{bet}</span>
      <span style={{width:40}}>{double}</span>
      <span style={{width:100}}>{result}</span>
    </div>
  )
}


function SpeedGame() {
  const [timeLeft, setTimeLeft] = useState(30)
  const [betData, setBetData] = useState(0)
  const [betDouble, setBetDouble] = useState(1)
  const [controlOff, setControlOff] = useState(false)
  const [preNums, setPreNums] = useState([])
  const [record, setRecord] = useState([])
  const {user} = useSelector(state=>state.user)
  const dispatch = useDispatch()

  const getNameByBet = (b) => {
    let name = '未选择'
    if (b === 1) {
      name = '单'
    }else if (b === 2) {
      name = '双'
    }else if (b===3) {
      name = '大'
    }else if (b === 4){
      name = '小'
    }
    return name
  }
  const judgeBig = (array) => {
    let bigCount = 0
    if (array[0]>3) {
      bigCount += 1
    }
    if (array[1]>3) {
      bigCount += 1
    }
    if (array[2]>3) {
      bigCount += 1
    }
    return bigCount > 1
  }

  const judgeEven = (array) => {
    let evenCount = 0
    if (array[0]%2===0) {
      evenCount += 1
    }
    if (array[1]%2===0) {
      evenCount += 1
    }
    if (array[2]%2===0) {
      evenCount += 1
    }
    return evenCount > 1
  }

  const calBet = () => {
    
    let array = []
    const r1 = Math.random() * 6
    const r2 = Math.random() * 6
    const r3 = Math.random() * 6
    array.push(Math.ceil(r1))
    array.push(Math.ceil(r2))
    array.push(Math.ceil(r3))
    setPreNums(pren=>{
      return array
    })
    let result = 0
    if (controlOff) {
      console.log("betData:",betData)
      console.log("betDouble:",betDouble)
      if (betData === 1) {
        if (judgeEven(array)) {
          result -= base * betDouble
        }else{
          result += base * betDouble
        }
      }else if (betData === 2) {
        if (judgeEven(array)) {
          result += base * betDouble
        }else{
          result -= base * betDouble
        }
      }else if (betData === 3) {
        if (judgeBig(array)) {
          result += base * betDouble
        }else{
          result -= base * betDouble
        }
      }else{
        if (judgeBig(array)) {
          result -= base * betDouble
        }else{
          result += base * betDouble
        }
      }
      dispatch(bet({sid:user.sid, betData:result}))
    }
    
    setRecord(r=>{
      return r.concat([{
        result:result,
        number:array[0]*100+array[1]*10+array[2],
        bet: controlOff?getNameByBet(betData):'未下注',
        double:controlOff?betDouble:"",
        order:r.length
      }])
    })
    setControlOff(control=>{
      return false
    })
    setBetData(n=>0)
    setBetDouble(d=>1)
  }
  useEffect(()=>{
    timer = setInterval(() => {
        setTimeLeft(item=>{
          if (item <= 1) {
            calBet()
            return 30
          }else{
            return item - 1
          }
        })
    }, 1000);
    return ()=>{
      clearInterval(timer)
    }
  },[betData,betDouble,record,preNums,timeLeft])
  return <div className='speed-game-box'>
      <div className='speed-game-box-bg'></div>
      <div className='speed-game-title-container'>
      <h2>{timeLeft}秒后开奖</h2>
      </div>
      <div className='speed-game-content-container'>
        <div className='speed-game-controller-container'>
          <h3>上期开奖号码：{preNums.map((n,index)=><span key={index}>{n}{` `}</span>)}</h3>
          <div className='speed-game-controller-bet-types'>
            <button className={betData===1?'speed-game-betTypeBtn-selected':'speed-game-betTypeBtn'} disabled={controlOff} onClick={()=>{setBetData(1)}}>单</button>
            <button className={betData===2?'speed-game-betTypeBtn-selected':'speed-game-betTypeBtn'} disabled={controlOff} onClick={()=>{setBetData(2)}}>双</button>
            <button className={betData===3?'speed-game-betTypeBtn-selected':'speed-game-betTypeBtn'} disabled={controlOff} onClick={()=>{setBetData(3)}}>大</button>
            <button className={betData===4?'speed-game-betTypeBtn-selected':'speed-game-betTypeBtn'} disabled={controlOff} onClick={()=>{setBetData(4)}}>小</button>
          </div>
          
          <div className='speed-game-controller-doubles'>
            <button className="speed-game-bet-double-btn" disabled={controlOff} onClick={()=>{
              setBetDouble(item=>{
                return item>10?item-10:item
              })
            }}>-10</button>
            <button className="speed-game-bet-double-btn" disabled={controlOff} onClick={()=>{
              setBetDouble(item=>{
                return item>1?item-1:1
              })
            }}>-1</button>
            <span>{betDouble}</span>
            <button className="speed-game-bet-double-btn" disabled={controlOff} onClick={()=>{
              setBetDouble(item=>{
                return item<user.amount/100?item+1:item
              })
            }}>+1</button>
            <button className="speed-game-bet-double-btn" disabled={controlOff} onClick={()=>{
              setBetDouble(item=>{
                return user.amount/100 - item > 10?item+10:item
              })
            }}>+10</button>
          </div>
          <div className='speed-game-controller-bet'>
            <button className='speed-game-bet-btn' disabled={controlOff || betData===0} onClick={()=>{
              if (user.amount - betDouble * 100 >= 0) {
                setControlOff(true)  
              }else{
                alert("您的余额不足，请联系客服充值。")
              }
            }}>下注</button>
          </div>
        </div>
        
        <div className='speed-game-record-container'>
          <h3>往期开奖记录</h3>

          <div className='speed-game-record-content'>
            <RecordCell data={{order:'期数',number:'号码',bet:'下注',double:'加倍',result:'结果'}}/>
            {record.concat([]).reverse().map(r=>
              <RecordCell key={r.order} data={r} />
            )}
          </div>
          
        </div>
      </div>
      <div className='speed-game-amount-container'>
        <h3>当前余额：{betData===0?user.amount:user.amount-betDouble*100}</h3>
      </div>
  </div>
}

export default SpeedGame
import { useState } from "react";

export default function Home() {
  const [innerTimers, setInnerTimers] = useState([])
  const [timer, setTimer] = useState(0)
  const [timers, setTimers] = useState([])

  const onChangeTimer = (e) => {
    setTimer(e.target.value)
  }

  const onKeyUpTimer = (e) => {
    if(e.key !== "Enter") return

    if ( timer > 60 || timer < 1){
      alert("시간은 1~60 사이")
      return
    }

    if(e.key === "Enter"){
      let count = timer
      setTimers((prev) => [...prev, count])
      setInnerTimers((prev) => [...prev, count])
      
      const individualTimer = setInterval(()=>{
        let index = timers.length
        setInnerTimers((prev) => {
          prev[index] = prev[index] - 1
          return prev
        })
        
        console.log(count, innerTimers)
        count === 0 && clearInterval(individualTimer)

        count--
      },1000)
    }
  }

  const onClickClear = () => {
    setTimers([])
  }

  return (
    <div>
      <input type="number" min={1} max={60} onChange={onChangeTimer} onKeyUp={onKeyUpTimer}/>
      <ul>
        {innerTimers.map((el,idx) => (
        <li key={idx}>timer{idx}:{el}</li>
      ))}
      </ul>
      <button onClick={onClickClear}>모두 종료</button>
    </div>
    
  );
}

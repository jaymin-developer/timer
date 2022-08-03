import { useState } from "react";

export default function Home() {
  const [timers, setTimers] = useState([]);

  const onKeyUpTimer = (e) => {
    const timer = e.target.value;
    if (timer > 60) e.target.value = 60;
    if (timer < 1) e.target.value = 1;
    if (e.key !== "Enter") return;

    if (timer > 60 || timer < 1) {
      alert("시간은 1~60 사이");
      return;
    }

    if (e.key === "Enter") {
      let count = timer;
      setTimers((prev) => [...prev, count]);

      const individualTimer = setInterval(() => {
        let index = timers.length;
        setTimers((prev) => {
          prev[index] = count;

          return [...prev];
        });

        count--;
        count === 0 && clearInterval(individualTimer);
      }, 1000);
    }
  };

  const onClickClear = () => {
    setTimers([]);
  };

  return (
    <div>
      <input type="number" min={1} max={60} onKeyUp={onKeyUpTimer} />
      <ul>
        {timers.map((el, idx) => (
          <li key={idx}>
            timer{idx}:{el}
          </li>
        ))}
      </ul>
      <button onClick={onClickClear}>모두 종료</button>
    </div>
  );
}

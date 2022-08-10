import { useState } from "react";

export default function Home() {
  const [timers, setTimers] = useState([]);

  // 타이머 시작
  const onKeyUpStartTimer = (e) => {
    const timer = e.target.value;
    // Enter 외 키 예외처리
    if (e.key !== "Enter") return;

    // 타이머 시간 설정, 예외처리
    if (timer > 60 || timer < 1) {
      alert("시간은 1 ~ 60 사이로 설정부탁드립니다.");
      return;
    }

    // Enter일 때 타이머 실행
    if (e.key === "Enter") {
      let count = timer;
      setTimers((prev) => [...prev, count]);

      // 개별 타이머 실행
      const individualTimer = setInterval(() => {
        let index = timers.length;

        setTimers((prev) => {
          console.log(index);
          prev[index] = count;

          // 얕은 복사로 다른 배열
          return [...prev];
        });

        // 카운트 감소
        count--;

        // 카운트 0일 때 개별 타이머 중단
        count === 0 && clearInterval(individualTimer);
      }, 1000);
    }
  };

  // 타이머 리스트 제거
  const onClickClearAll = () => {
    setTimers([]);
  };

  return (
    <div>
      <input type="number" min={1} max={60} onKeyUp={onKeyUpStartTimer} />
      <ul>
        {timers.map((el, idx) => (
          <li key={idx}>
            timer{idx + 1}:{el}
          </li>
        ))}
      </ul>
      <button onClick={onClickClearAll}>모두 종료</button>
    </div>
  );
}

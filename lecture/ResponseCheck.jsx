import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("게임을 시작하려면 클릭하세요");
  const [result, setResult] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");

      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("클릭하세요!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      // 성급하게 체크
      startTime.current = null;
      clearTimeout(timeout.current);
      alert("부정 출발 노노!");
      setState("waiting");
      setMessage("초록색이 되면 클릭하세요");
    } else if (state === "now") {
      // 반응속도 체크
      endTime.current = new Date();

      setState("waiting");
      setMessage("게임을 시작하려면 클릭하세요");
      setResult(prevResult => [...prevResult, endTime.current - startTime.current]);
      console.log(result);
    }
  };

  const onReset = () => {
    setResult([]);
    alert("기록이 초기화되었습니다");
  };

  const renderAverage = () => {
    return result.length < 1 ? null : (
      <>
        <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
      <button onClick={onReset}>Reset</button>
    </>
  );
};
export default ResponseCheck;

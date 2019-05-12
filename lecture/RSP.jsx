import React, { useRef, useState, useEffect, memo } from "react";

const rspCoords = {
  바위: "0",
  가위: "-300px",
  보: "-614px"
};

const scores = {
  바위: 1,
  가위: 0,
  보: -1
};

const computerChoise = imgCoord => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = memo(() => {
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);

  const interval = useRef(); // setInterval 핸들러

  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할(완벽하게 같은 건 아님)
    console.log("시작");
    interval.current = setInterval(changeHand, 100);
    // console.log(result, score, imgCoord);
    return () => {
      // componentWillUnmount 역할
      clearInterval(interval.current);
      console.log("끝");
    };
  }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = choice => e => {
    clearInterval(interval.current);
    console.log("click");
    console.log(e.target);
    console.log(choice);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoise(imgCoord)];
    const calScore = myScore - cpuScore;
    if (calScore === 0) {
      setResult("draw");
    } else if ([1, -2].includes(calScore)) {
      setResult("win");
      setScore(prevScore => prevScore + 1);
    } else if ([-1, 2].includes(calScore)) {
      setResult("lose");
      setScore(prevScore => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://data.ac-illust.com/data/thumbnails/96/967fe28683728ebbbc0909a568251119_t.jpeg) ${imgCoord} 0`
        }}
      />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 당신의 점수는: {score}점 입니다.</div>
    </>
  );
});

export default RSP;

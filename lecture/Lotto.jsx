import React, { Component, memo } from "react";
import "./Ball";

function getWinNumbers() {
  console.log("getNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

// Hooks가 아닙니다 (useEffect, useState 등이 사용되지 않았기 때문)
// 함수형 컴포넌트 입니다
// const Ball = memo(({ number }) => {
//   let background;
//   if (number <= 10) {
//     background = "red";
//   } else if (number <= 20) {
//     background = "orange";
//   } else if (number <= 30) {
//     background = "yellow";
//   } else if (number <= 40) {
//     background = "blue";
//   } else {
//     background = "green";
//   }
//   return (
//     <>
//       <div className="ball" style={{ background }}>
//         {number}
//       </div>
//     </>
//   );
// });

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자
    winBalls: [],
    bonus: null, // 보너스
    redo: false
  };
  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="resultContainer">
          {winBalls.map(v => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스 숫자</div>
        {bonus && <Ball number={bonus} />}
        <button onClick={redo ? onClickRedo : () => {}}>한번 더!</button>
      </>
    );
  }
}

export default Lotto;

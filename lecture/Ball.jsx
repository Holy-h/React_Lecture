import React, { memo } from "react";

// Hooks가 아닙니다 (useEffect, useState 등이 사용되지 않았기 때문)
// 함수형 컴포넌트 입니다
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }
  return (
    <>
      <div className="ball" style={{ background }}>
        {number}
      </div>
    </>
  );
});

export default Ball;

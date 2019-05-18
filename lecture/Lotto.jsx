import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from "react";
import Ball from "./Ball";

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

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers); // 추첨 숫자(당첨 숫자 + 보너스)
  const [winBalls, setWinBalls] = useState([]); // 당첨 숫자
  const [bonus, setBonus] = useState(null); // 보너스
  const [redo, setRedo] = useState(false); // 다시 시작 버튼 클릭
  const timeouts = useRef([]);

  const startLotto = useCallback(() => {
    console.log("startLotto");
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls(prevWinBalls => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
    }, 7000);
  }, [winNumbers]);

  useEffect(() => {
    console.log("useEffect - componentDidMount");
    setRedo(false);
    // timeouts.current = [];
    startLotto();
    return () => {
      console.log("useEffect - componentWillUnmount");
      timeouts.current.forEach(v => clearTimeout(v));
    };
  }, [timeouts.current]);

  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(true);

    timeouts.current = [];
  }, [winNumbers]);

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
      {bonus && <button onClick={onClickRedo}>한번 더!</button>}
    </>
  );
};

export default Lotto;

import React, { useRef, useState, memo } from "react";
import Try from "./Try";

function getNumbers() {
  // 겹치지 않는 숫자 4개를 랜덤하게 뽑는 함수
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

const NumberBaseball = memo(() => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState(""); // input
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]); // push 쓰면 안됨
  const inputRef = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    console.log(result, value, answer, tries);
    if (value.split("").length < 4) {
      alert("숫자 4개를 입력하세요");
      setValue("");
      return null;
    }

    if (value == answer.join("")) {
      // 정답

      setResult("홈런");
      setValue("");
      setTries(prevTries => {
        return [...prevTries, { try: value, result: "홈런!!" }];
      });

      alert("게임을 다시 시작합니다");

      setValue("");
      setAnswer(getNumbers());
      setTries([]);
    } else {
      // 틀림
      const answerArray = value.split("").map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번 이상 틀림
        setResult(`10번 넘게 틀렸습니다. 답은 ${answer.join(",")}였습니다!`);

        alert("게임을 다시 시작합니다");

        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      } else {
        // 10번 이내로 틀림
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }

        setTries(prevTries => {
          return [
            ...prevTries,
            {
              try: value,
              result: `${strike} 스트라이크, ${ball} 볼`
            }
          ];
        });

        alert("다시 도전!");

        setValue("");
      }
    }
    inputRef.current.focus();
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} maxLength={4} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          // v = {try: ~~, result: ~~}
          <Try key={`${i + 1}차 시도: `} tryInfo={v} />
        ))}
      </ul>
    </>
  );
});

export default NumberBaseball;

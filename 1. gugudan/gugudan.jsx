const React = require("react");
const { useState, useRef } = React;

const Gugudan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [answer, setAnswer] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [correct, setCorrect] = useState(0);
  const inputRef = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      Correct: {
        correct;
      }
      setResult("정답");
      setValue(prevValue => {
        setAnswer(prevValue);
        return "";
      });
      // setAnswer(value);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setCorrect(prevCorrect => prevCorrect + 1);
    } else {
      setResult("오답!");
      setValue("");
    }
    inputRef.current.focus();
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };
  // console.log("랜더링 함수는 언제 실행되나");
  return (
    <>
      <div>
        {first} 곱하기 {second}는?
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={onChangeInput}
        />
        <button type="submit">입력</button>
      </form>
      <div>{result}</div>
      <div>정답 횟수: {correct}</div>
      <div>이전 정답: {answer}</div>
    </>
  );
};

module.exports = Gugudan;

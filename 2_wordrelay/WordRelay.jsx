const React = require("react");
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState("꽁치");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("정답");
      setWord(value);
      setValue("");
    } else {
      setResult("틀렸음!");
      setValue("");
    }
    inputRef.current.focus();
  };

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>제시어: {word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">입력</label>
        <input id="wordInput" className="wordInput" ref={inputRef} type="text" value={value} onChange={onChangeInput} />
        <button type="submit">클릭</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;

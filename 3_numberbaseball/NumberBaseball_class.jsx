import React, { Component } from "react";
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

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "", //input
    answer: getNumbers(), // ex) [1,3,5,7]
    tries: [] //시도 횟수 // push를 쓰면 안됩니다.
  };

  onSubmitForm = e => {
    e.preventDefault();
    const { value, answer, tries } = this.state;
    if (value.split("").length < 4) {
      alert("숫자 4개를 입력하세요");
      this.setState({
        value: ""
      });
      return null;
    }
    if (value == answer.join("")) {
      // 정답
      this.setState(prevState => {
        return {
          result: "홈런",
          value: "",
          tries: [...prevState.tries, { try: value, result: "홈런!!" }]
        };
      });
      alert("게임을 다시 시작합니다");
      this.setState({
        result: "",
        value: "",
        answer: getNumbers(),
        tries: []
      });
    } else {
      // 틀림
      const answerArray = value.split("").map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // 10번 이상 틀림
        this.setState({
          result: `10번 넘게 틀렸습니다. 답은 ${answer.join(",")}였습니다!`
        });
        alert("게임을 다시 시작합니다");
        this.setState({
          result: "",
          value: "",
          answer: getNumbers(),
          tries: []
        });
      } else {
        // 10번 이내로 틀림
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }
        this.setState(prevState => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: value,
                result: `${strike} 스트라이크, ${ball} 볼`
              }
            ]
          };
        });
        alert("다시 도전!");
        this.setState({
          value: ""
        });
      }
    }
  };

  onChangeInput = e => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={value} onChange={this.onChangeInput} />
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
  }
}

export default NumberBaseball;

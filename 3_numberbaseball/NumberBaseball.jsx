import React, { Component } from "react";
import Try from "./Try";

function getNumbers() {
  // 겹치지 않는 숫자 4개를 랜덤하게 뽑는 함수
}

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "", //input
    answer: getNumbers(),
    tries: [] //시도 횟수
  };

  onSubmitForm = e => {
    e.preventDefault();
  };

  onChangeInput = e => {};

  fruits = [
    { fruit: "사과", taste: "맛있다", id: 1 },
    { fruit: "귤", taste: "달다", id: 2 }
  ];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button>입력</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.fruits.map((a, i) => (
            <Try value={a} index={i} key={a.fruit + a.taste} />
          ))}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;

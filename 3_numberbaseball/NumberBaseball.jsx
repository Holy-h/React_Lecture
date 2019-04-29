import React, { Component } from "react";

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
          {["사과", "바나나", "배", "딸기", "양파", "포도"].map(a => {
            return <li>{a}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;

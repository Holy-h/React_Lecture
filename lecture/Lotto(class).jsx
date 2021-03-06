import React, { Component, memo } from "react";
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

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자
    winBalls: [],
    bonus: null, // 보너스
    redo: false
  };

  timeouts = [];

  startLotto = () => {
    console.log("startLotto");
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState(prevState => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]]
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: false
      });
    }, 7000);
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.startLotto();
  }

  // Timeout 정리 (메모리 누수 방지)
  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.timeouts.forEach(v => {
      clearTimeout(v);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.redo) {
      this.setState({
        redo: false
      });
      this.timeouts = [];
      console.log("componentDidUpdate");
      this.startLotto();
    }
  }

  onClickRedo = () => {
    console.log("onClickRedo");
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: true
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus } = this.state;
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
        {bonus && <button onClick={this.onClickRedo}>한번 더!</button>}
      </>
    );
  }
}

export default Lotto;

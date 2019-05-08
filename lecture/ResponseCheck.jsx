import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting", // waiting, ready, now
    message: "게임을 시작하려면 클릭하세요",
    result: [],
  };

  // 변하지만 렌더링이 다시 일어나지 않아도 되는 아이들
  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      this.setState({
        state: "ready", // 빨간 화면
        message: "초록색이 되면 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now", // 초록 화면
          message: "클릭하세요!",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초 ~ 3초 랜덤
    } else if (state === "ready") {
      // 성급하게 체크
      this.startTime = null;
      clearTimeout(this.timeout);
      alert("부정 출발 노노!");
      this.setState({
        state: "waiting",
        message: "초록색이 되면 클릭하세요",
      });
    } else if (state === "now") {
      // 반응속도 체크
      this.endTime = new Date();
      this.setState(prevState => {
        return {
          state: "waiting",
          message: "게임을 시작하려면 클릭하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
      console.log(result);
    }
  };

  renderAverage = () => {
    const { result } = this.state;
    return result.length < 1 ? null : (
      <>
        <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>Reset</button>
      </>
    );
  };

  onReset = () => {
    this.setState({
      result: [],
    });
    alert("기록이 초기화되었습니다");
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;

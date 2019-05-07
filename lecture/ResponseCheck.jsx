import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "게임을 시작하려면 클릭하세요",
    result: []
  };

  onClickScreen = () => {
    console.log("클릭");
  };

  renderAverage = () => {
    this.state.result.length === 0 ? null : (
      <div>평균시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
    );
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

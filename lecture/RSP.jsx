import React, { Component } from "react";

// 클래스의 경우
// comstructor -> render -> ref -> componentDidMount
// (setState/props 변경) -> shouldComponentUpdate -> render -> componentDidUpdate
//(부모 Component가 자식 Component를 없앨 때) -> componentWillUnmount -> render

const rspCoords = {
  바위: "0",
  가위: "-300px",
  보: "-614px"
};

const scores = {
  바위: 1,
  가위: 0,
  보: -1
};

const computerChoise = imgCoord => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

class RSP extends Component {
  state = {
    result: "",
    score: 0,
    imgCoord: "0"
  };

  interval; // setInterval을 다룰 수 있도록 핸들러 사용

  componentDidMount() {
    this.interval = setInterval(this.changeHand, 100);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    console.log("ComponentDidMount", imgCoord, rspCoords.가위);
    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위
      });
    } else if (imgCoord === rspCoords.가위) {
      console.log("setState");
      this.setState({
        imgCoord: rspCoords.보
      });
    } else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위
      });
    }
  };

  onClickBtn = choice => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    console.log("click");
    const myScore = scores[choice];
    const cpuScore = scores[computerChoise(imgCoord)];
    const calScore = myScore - cpuScore;
    if (calScore === 0) {
      this.setState({
        result: "draw"
      });
    } else if ([1, -2].includes(calScore)) {
      this.setState(prevState => {
        return {
          result: "win",
          score: prevState.score + 1
        };
      });
    } else if ([-1, 2].includes(calScore)) {
      this.setState(prevState => {
        return {
          result: "lose",
          score: prevState.score - 1
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://data.ac-illust.com/data/thumbnails/96/967fe28683728ebbbc0909a568251119_t.jpeg) ${imgCoord} 0`
          }}
        />
        <div>
          <button
            id="rock"
            className="btn"
            onClick={() => this.onClickBtn("바위")}
          >
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={() => this.onClickBtn("가위")}
          >
            가위
          </button>
          <button
            id="paper"
            className="btn"
            onClick={() => this.onClickBtn("보")}
          >
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 당신의 점수는: {score}점 입니다.</div>
      </>
    );
  }
}

export default RSP;

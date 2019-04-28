const React = require("react");
const { Component } = require("react");

class WordRelay extends Component {
  state = {
    word: "클릭이요",
    value: "",
    result: ""
  };

  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState(prevState => {
        return {
          result: "정답",
          word: prevState.value,
          value: ""
        };
      });
    } else {
      this.setState({
        result: "틀렸어요!"
      });
    }
    this.input.focus();
  };

  onChangeInput = e => {
    this.setState({
      value: e.target.value
    });
  };

  input;

  onRefInput = c => {
    this.input = c;
  };

  render() {
    return (
      <>
        {this.state.word}
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
            type="text"
            placeholder="입력하세요"
          />
          <button type="submit">클릭</button>
        </form>
        {this.state.result}
      </>
    );
  }
}

module.exports = WordRelay;

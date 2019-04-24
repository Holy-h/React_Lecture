const React = require("react");
const { Component } = require("react");

class WordRelay extends Component {
  state = {
    text: "Hello, webpack"
  };
  render() {
    return <div>{this.state.text}</div>;
  }
}

module.exports = WordRelay;

import React, { Component } from "react";

class Try extends Component {
  render() {
    return (
      <li key={this.props.value.id}>
        <h1>{this.props.index}</h1>
        <b>{this.props.value.fruit}</b> - {this.props.value.taste}
        <div>컨텐츠</div>
        <div>컨텐츠</div>
        <div>컨텐츠</div>
        <div>컨텐츠</div>
        <div>컨텐츠</div>
        <div>컨텐츠</div>
        <div>컨텐츠</div>
      </li>
    );
  }
}

export default Try;

import React, { memo, PureComponent } from "react";

// PureComponent 사용법
// class Try extends PureComponent {
//   constructor(props) {
//     super(props);
//     // 다른 동작
//     this.state = {
//       result: this.props.tryInfo.result,
//       try: this.props.tryInfo.try
//     };
//   }

//   render() {
//     const { tryInfo } = this.props;
//     return (
//       <li>
//         <div>{this.state.try}</div>
//         <div>{this.state.result}</div>
//       </li>
//     );
//   }
// }

const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;

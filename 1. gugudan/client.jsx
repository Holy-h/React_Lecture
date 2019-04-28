const React = require("react");
const ReactDom = require("react-dom");

const Gugudan = require("./gugudan");

ReactDom.render(
  <div>
    <Gugudan />
  </div>,
  document.querySelector("#root")
);

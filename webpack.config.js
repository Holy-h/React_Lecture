const path = require("path");

const config = {
  name: "wordrelay-setting",
  mode: "development", // 실서비스: production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"]
  },

  entry: {
    app: "./client.jsx"
  }, // 입력

  output: {
    path: path.join(__dirname, "dist"), // __dirname(현재 폴더) + /dist
    filename: "app.js"
  } // 출력
};

module.exports = config;

const path = require("path");

const config = {
  name: "wordrelay-setting",
  mode: "development", // 실서비스: production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"]
  },

  entry: {
    app: path.join(__dirname, "2_wordrelay", "client")
  }, // 입력

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, "2_wordrelay", "dist"), // __dirname(현재 폴더) + /dist
    filename: "app.js"
  } // 출력
};

module.exports = config;

const path = require("path");

const config = {
  name: "wordrelay-setting",
  mode: "development", // 실서비스: production
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"]
  },

  entry: {
    app: "./client"
  }, // 입력

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"] // browserslist
                },
                debug: true
              }
            ],
            ["@babel/preset-react"]
          ],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, "dist"), // __dirname(현재 폴더) + /dist
    filename: "[name].js"
  } // 출력
};

module.exports = config;

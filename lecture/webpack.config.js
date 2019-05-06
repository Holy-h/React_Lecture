const path = require("path");

const config = {
  name: "numberbaseball-setting",
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
          plugins: ["@babel/plugin-proposal-class-properties", "react-hot-loader/babel"]
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, "dist"), // __dirname(현재 폴더) + /dist
    filename: "[name].js",
    publicPath: "/dist/" // webpack-dev-server 설정(가상 경로 express.static)
  } // 출력
};

module.exports = config;

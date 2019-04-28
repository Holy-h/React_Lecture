const path = require("path");
const webpack = require("webpack");

const config = {
  mode: "development", // production
  devtool: "eval", // hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: {
    app: "./client"
  },
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
          plugins: []
        }
      }
    ]
  },
  // plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist")
  }
};

module.exports = config;

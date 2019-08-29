const path = require("path");
const APP_PATH = path.resolve(__dirname, "src");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const base = require("./webpack.config.base");

module.exports = {
  entry: {
    main: path.join(APP_PATH, "index.tsx")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(APP_PATH, "index.html"),
      favicon: path.join(APP_PATH, "favicon.ico")
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  ...base
};

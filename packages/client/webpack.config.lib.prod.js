const path = require("path");
const APP_PATH = path.resolve(__dirname, "src");
const base = require("./webpack.config.base");
const PUB_PATH = path.join(__dirname, "/../server/dist/wwwroot");

module.exports = {
  entry: {
    globe: path.join(APP_PATH, "globe.ts")
  },
  output: {
    filename: "[name].js",
    libraryTarget: "amd",
    path: PUB_PATH
  },
  ...base,
  externals: [
    /^lodash$/,
    /^single-spa$/,
    /^react$/,
    /^react\/lib.*/,
    /^react-dom$/,
    /.*react-dom.*/,
    /^rxjs\/?.*$/,
    /^prime$/,
  ],
};

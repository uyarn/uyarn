const path = require("path");
const webpack = require("webpack");
const baseConfig = require("./base");
const defaultSettings = require("./default");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

const config = Object.assign({}, baseConfig, {
  entry: [
    "webpack-dev-server/client?http://127.0.0.1:" + defaultSettings.port,
    "webpack/hot/only-dev-server",
    "./client/index",
  ],
  cache: false,
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "../dist/assets"),
    port: defaultSettings.port,
    noInfo: false,
    historyApiFallback: true,
    open: true,
  },
  mode: "development",
  devtool: "eval-source-map",
  output: {
    filename: "bundle.js",
  },
  // 配置dev环境下的plugins
  plugins: [
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      title: "Uyarn",
      template: path.join(__dirname, "../client/index.ejs"),
      filename: path.join(__dirname, "../dist/index.html"),
    }),
    new MiniCssExtractPlugin({
      path: path.join(__dirname, "../dist"),
      filename: "css/[name].css",
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: defaultSettings.getDefaultModules(),
});

module.exports = config;

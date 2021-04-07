const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Analyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const baseConfig = require("./base");
const defaultSettings = require("./default");

let config = Object.assign({}, baseConfig, {
  entry: {
    app: path.join(__dirname, "../client/index.js"),
  },
  cache: false,
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "assets/js/[name].[hash:8].js",
  },
  mode: "production",
  // 配置生产环境下的plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Uyarn",
      template: path.join(__dirname, "../client/index.ejs"),
      filename: path.join(__dirname, "../dist/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new Analyzer({
      analyzerMode: "disabled",
      generateStatsFile: true,
      statsOptions: { source: false },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: "~",
      cacheGroups: {
        //缓存组，将所有加载模块放在缓存里面一起分割打包
        vendors: {
          //自定义打包模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
          filename: "assets/js/vendors.js",
        },
        default: {
          //默认打包模块
          priority: -20,
          reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
          filename: "assets/js/common.js",
        },
      },
    },
  },
  module: defaultSettings.getDefaultModules(),
});

module.exports = config;

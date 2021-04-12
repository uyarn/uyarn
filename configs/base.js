let defaultSettings = require("./default");
let webpack = require("webpack");

let additionalPaths = [];

module.exports = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        additionalPaths: additionalPaths,
        debug: true,
        port: defaultSettings.port,
      },
    }),
  ],
  devtool: "eval",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@/components": `${defaultSettings.srcPath}/components`,
      "@/statics": `${defaultSettings.srcPath}/statics`,
      "@/consts": `${defaultSettings.srcPath}/consts`,
      "@/apis": `${defaultSettings.srcPath}/apis`,
      "@/http": `${defaultSettings.srcPath}/http`,
      config:
        `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
      "react/lib/ReactMount": "react-dom/lib/ReactMount",
    },
  },
  module: {},
};

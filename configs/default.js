const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const srcPath = path.join(__dirname, "../client");
const defaultPort = 3000;

function getDefaultModules() {
  return {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
        loader:
          "url-loader?limit=8192&name=assets/images/[hash:8].[name].[ext]",
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader:
          "file-loader?limit=2048&name=assets/videos/[hash:8].[name].[ext]",
      },
      {
        test: /\.ts(x)$/,
        include: path.join(__dirname, "../client"),
        loader: ["awesome-typescript-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: path.join(__dirname, "../client"),
      },
    ],
  };
}

module.exports = {
  srcPath,
  publicPath: "./assets/",
  port: defaultPort,
  getDefaultModules: getDefaultModules,
};

// webpack.config.js
const path = require("path");
const { merge } = require("webpack-merge");
const baseWebpack = require("./default.config");

const devWebpack = {
  mode: "production",
  entry: {
    content: path.resolve(__dirname, "../src/content/index.js"),
    background: path.resolve(__dirname, "../src/background/index.js"),
  },
  output: {
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "",
    clean: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {  //拆分第三方库（通过npm|yarn安装的库）
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          priority: -10
      }
      }
    }
  }
};

module.exports = merge(baseWebpack, devWebpack);

// webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css到单独文件的插件
const { VueLoaderPlugin } = require("vue-loader/dist/index");

module.exports = {
  entry: {
    popup: path.resolve(__dirname, "../src/popup/main.js"),
    content: path.resolve(__dirname, "../src/content/main.js"),
    background: path.resolve(__dirname, "../src/background/index.js"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    modules: ["node_modules", "*"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].[contenthash:8].css",
      chunkFilename: "./css/[id].[contenthash:8].css",
    }),
    new VueLoaderPlugin(), //new一个实例
  ],
};

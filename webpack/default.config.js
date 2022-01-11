// webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css到单独文件的插件
const { VueLoaderPlugin } = require("vue-loader/dist/index");

module.exports = {
  entry: {
    background: path.resolve(__dirname, "../src/background/index.ts"),
    content: path.resolve(__dirname, "../src/content/main.ts"),
    popup: path.resolve(__dirname, "../src/popup/main.ts"),
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
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            // 指定特定的ts编译配置，为了区分脚本的ts配置
            // 注意这里的路径问题，按照自己项目来配置
            configFile: path.resolve(__dirname, "../tsconfig.json"),
            appendTsSuffixTo: [/\.vue$/],
            /* 只做语言转换，而不做类型检查, 这里如果不设置成TRUE，就会HMR 报错 */
            transpileOnly: true,
          },
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

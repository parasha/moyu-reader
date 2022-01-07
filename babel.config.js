module.exports = {
  presets: [["@babel/preset-env", {}]],
  plugins: [
    "@babel/plugin-transform-regenerator",
    "@babel/plugin-transform-runtime",
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
      "vant",
    ],
  ],
};

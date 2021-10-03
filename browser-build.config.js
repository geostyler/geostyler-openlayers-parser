const TerserPlugin = require('terser-webpack-plugin');
require("@babel/polyfill");

module.exports = {
  entry: [
    "@babel/polyfill",
    "./src/OlStyleParser.ts"
  ],
  mode: 'production',
  target: 'es5',
  output: {
    filename: "olStyleParser.js",
    path: __dirname + "/browser",
    library: "GeoStylerOpenlayersParser",
    chunkFormat: "array-push"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  optimization: {
    minimizer: [
      new TerserPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: {
          loader: 'babel-loader'
        },
      }
    ]
  }
};

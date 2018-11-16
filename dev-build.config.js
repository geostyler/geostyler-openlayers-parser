const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
require("@babel/polyfill");

module.exports = {
  entry: "./src/OlStyleParser.ts",
  output: {
    filename: "olStyleParser.js",
    path: __dirname + "/browser",
    library: "GeoStylerOpenlayersParser"
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.ts$/,
        include: /src/,
        loader: "awesome-typescript-loader"
      },
    ]
  },
  externals: [
    {
      'ol/style/style': 'ol.style.Style',
      'ol/style': 'ol.style',
      'ol/style/image': 'ol.style.Image',
      'ol/style/stroke': 'ol.style.Stroke',
      'ol/style/text': 'ol.style.Text',
      'ol/style/circle': 'ol.style.Circle',
      'ol/style/icon': 'ol.style.Icon',
      'ol/style/regularshape': 'ol.style.RegularShape',
      'ol/style/fill': 'ol.style.Fill',
      'ol/map': 'ol.Map',
      'ol/source/tilewms': 'ol.source.TileWMS',
      'ol/source/imagewms': 'ol.source.ImageWMS',
      'ol/layer/group': 'ol.layer.Group',
      'ol/layer/base': 'ol.layer.Base',
      'ol/proj': 'ol.proj'
    }
  ],
  plugins: [
  ]
};

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
      'ol/style/Style': 'ol.style.Style',
      'ol/style': 'ol.style',
      'ol/style/Image': 'ol.style.Image',
      'ol/style/Stroke': 'ol.style.Stroke',
      'ol/style/Text': 'ol.style.Text',
      'ol/style/Circle': 'ol.style.Circle',
      'ol/style/Icon': 'ol.style.Icon',
      'ol/style/RegularShape': 'ol.style.RegularShape',
      'ol/style/Fill': 'ol.style.Fill',
      'ol/Map': 'ol.Map',
      'ol/source/TileWMS': 'ol.source.TileWMS',
      'ol/source/ImageWMS': 'ol.source.ImageWMS',
      'ol/layer/Group': 'ol.layer.Group',
      'ol/layer/Base': 'ol.layer.Base',
      'ol/proj': 'ol.proj'
    }
  ],
  plugins: [
  ]
};

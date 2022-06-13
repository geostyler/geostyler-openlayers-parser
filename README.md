# geostyler-openlayers-parser

[![Greenkeeper badge](https://badges.greenkeeper.io/geostyler/geostyler-openlayers-parser.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/geostyler/geostyler-openlayers-parser.svg?branch=master)](https://travis-ci.org/geostyler/geostyler-openlayers-parser)
[![Coverage Status](https://coveralls.io/repos/github/geostyler/geostyler-openlayers-parser/badge.svg?branch=master)](https://coveralls.io/github/geostyler/geostyler-openlayers-parser?branch=master)

[GeoStyler Style](https://github.com/geostyler/geostyler) Parser implementation for OpenLayers styles

### How to use

The example below shows how to take a raw GeoStyler style, use the OpenLayersParser to parse the style into
an OpenLayers style, and then apply it to an OpenLayers vector layer.

ES6:
```js
import OpenLayersParser from "geostyler-openlayers-parser";
import OlLayerVector from "ol/layer/Vector";

const pointSimplePoint = {
  name: "OL Style",
  rules: [
    {
      name: "OL Style Rule 0",
      symbolizers: [
        {
          kind: "Mark",
          wellKnownName: "circle",
          color: "#FF0000",
          radius: 6
        }
      ]
    }
  ]
};

const parser = new OpenLayersParser();
const layer = new OlLayerVector();

parser
  .writeStyle(pointSimplePoint)
  .then(({output: olStyle}) => layer.setStyle(olStyle))
  .catch(error => console.log(error));
```

Browser:

```js
var pointSimplePoint = {
  name: "OL Style", rules: [{
    name: "OL Style Rule 0",
    symbolizers: [{
      kind: "Mark",
      wellKnownName: "circle",
      color: "#FF0000",
      radius: 6
    }]
  }]
};
var vectorLayer = new ol.layer.Vector();
var parser = new GeoStylerOpenlayersParser.OlStyleParser(ol);
parser.writeStyle(pointSimplePoint)
.then(function(style) {
    if (style.errors) {
      console.log(style.errors);
    } else {
      vectorLayer.setStyle(style.output);
    }
});
```

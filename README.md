# geostyler-openlayers-parser

[![Coverage Status](https://coveralls.io/repos/github/geostyler/geostyler-openlayers-parser/badge.svg?branch=master)](https://coveralls.io/github/geostyler/geostyler-openlayers-parser?branch=master)
[![License](https://img.shields.io/github/license/geostyler/geostyler-openlayers-parser)](https://github.com/geostyler/geostyler-openlayers-parser/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/geostyler-openlayers-parser.svg)](https://www.npmjs.com/package/geostyler-openlayers-parser)

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

## <a name="funding"></a>Funding & financial sponsorship

Maintenance and further development of this code can be funded through the
[GeoStyler Open Collective](https://opencollective.com/geostyler). All contributions and
expenses can transparently be reviewed by anyone; you see what we use the donated money for.
Thank you for any financial support you give the GeoStyler project 💞


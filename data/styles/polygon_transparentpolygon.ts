import { Style } from 'geostyler-style';

const polygonTransparentPolygon: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Fill',
        color: '#000080',
        opacity: 0.5,
        outlineColor: '#ffffff',
        outlineDasharray: [10, 15],
        outlineOpacity: 0.7,
        outlineWidth: 2
      }]
    }
  ]
};

export default polygonTransparentPolygon;

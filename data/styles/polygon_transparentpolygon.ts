import { Style } from 'geostyler-style';

const polygonTransparentPolygon: Style = {
  type: 'Fill',
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule',
      symbolizer: {
        kind: 'Fill',
        color: '#000080',
        opacity: 0.5,
        outlineColor: '#FFFFFF'
      }
    }
  ]
};

export default polygonTransparentPolygon;

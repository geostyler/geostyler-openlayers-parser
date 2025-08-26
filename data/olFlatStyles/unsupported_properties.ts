import { FlatStyleLike } from 'ol/style/flat';

const unsupportedProperties: FlatStyleLike = [
  // 'zoom' operator
  {
    filter: ['>=', ['zoom'], 10],
    style: {
      'stroke-color': '#000000',
      'stroke-width': 3,
    }
  }
];

export default unsupportedProperties;

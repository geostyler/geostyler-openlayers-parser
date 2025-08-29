import { FlatStyleLike } from 'ol/style/flat';

const unsupportedProperties: FlatStyleLike = [
  {
    style: [
      {
        'fill-color': '#F1337F'
      },
      {
        'icon-src': 'peter.png'
      }
    ]
  },
  {
    style: {
      'text-offset-x': 0,
      'text-offset-y': 0,
      'text-placement': 'line',
      'text-stroke-width': 0
    }
  }
];

// FIXME: find a way to report these and test it
const unsupportedOlFlatProperties: FlatStyleLike = [
  // 'zoom' operator is not supported
  {
    filter: ['>=', ['zoom'], 10],
    style: {
      'stroke-color': '#000000',
      'stroke-width': 3,
    }
  },
];

export { unsupportedProperties as default, unsupportedOlFlatProperties };

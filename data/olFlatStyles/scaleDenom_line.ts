import { FlatStyleLike } from 'ol/style/flat';

const dpi = 25.4 / 0.28;
const inchesPerMeter = 39.37;
const scale = ['*', ['resolution'], inchesPerMeter * dpi];

const scaleDenomLine: FlatStyleLike = [{
  filter: ['all', ['>=', scale, 0], ['<', scale, 500]],
  style: {
    'stroke-color': '#000000',
    'stroke-width': 3,
    'stroke-line-dash': [1, 2, 3, 4],
    'stroke-line-cap': 'round',
    'stroke-line-join': 'miter',
    'stroke-line-dash-offset': 5
  }
}];

export default scaleDenomLine;
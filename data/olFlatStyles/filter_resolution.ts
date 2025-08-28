import { FlatStyleLike } from 'ol/style/flat';

const dpi = 25.4 / 0.28;
const inchesPerMeter = 39.37;
const scale = ['*', ['resolution'], inchesPerMeter * dpi];

const filterSimpleFilter: FlatStyleLike = [
  {
    filter: ['>=', scale, 1000 * inchesPerMeter * dpi],
    style: {
      'circle-radius': 10,
      'circle-fill-color': '#FF0000'
    }
  }
];

export default filterSimpleFilter;

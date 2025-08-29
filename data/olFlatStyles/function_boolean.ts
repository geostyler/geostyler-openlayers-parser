import { FlatStyleLike } from 'ol/style/flat';

const functionBoolean: FlatStyleLike = [
  {
    filter: [
      'between',
      ['get', 'testprop'], 0, 1
    ],
    style: {
      'circle-radius': 10,
      'circle-fill-color': '#FF0000'
    }
  }, {
    style: {
      'circle-radius': 6,
      'circle-fill-color': '#FF0000'
    }
  }
];

export default functionBoolean;

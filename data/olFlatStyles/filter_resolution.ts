import { FlatStyleLike } from 'ol/style/flat';

const filterSimpleFilter: FlatStyleLike = [
  {
    filter: [
      '>=',
      ['resolution'],
      1000
    ],
    style: {
      'circle-radius': 10,
      'circle-fill-color': '#FF0000'
    }
  }
];

export default filterSimpleFilter;

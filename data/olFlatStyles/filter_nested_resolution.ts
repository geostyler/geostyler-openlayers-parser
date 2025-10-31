import { FlatStyleLike } from 'ol/style/flat';

const filterSimpleFilter: FlatStyleLike = [
  {
    filter: ['all',
      ['>=', ['resolution'], 1000],
      ['<', ['resolution'], 5000],
    ],
    style: {
      'circle-radius': 10,
      'circle-fill-color': '#FF0000'
    }
  }
];

export default filterSimpleFilter;

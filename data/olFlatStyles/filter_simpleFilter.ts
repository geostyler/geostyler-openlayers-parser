import { Rule } from 'ol/style/flat';

const filterSimpleFilter: Rule[] = [
  {
    filter: [
      '==',
      'Name',
      'Bonn'
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

export default filterSimpleFilter;

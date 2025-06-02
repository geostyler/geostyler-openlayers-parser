import { Rule } from 'ol/style/flat';

const filterNestedFilter: Rule[] = [
  {
    filter: [
      'all',
      ['==', ['get', 'state'], 'germany'],
      [
        'any',
        ['>=', ['get', 'population'], 100000],
        ['<', ['get', 'population'], 200000]
      ],
      [
        '!',
        ['==', ['get', 'name'], 'Schalke']
      ]
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

export default filterNestedFilter;

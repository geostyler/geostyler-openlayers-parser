import { FlatStyleLike } from 'ol/style/flat';

const filterComparisonPropertyFunction: FlatStyleLike = [
  {
    filter: [
      '&&',
      [
        '>=',
        ['get', 'value'], ['get', 'min']

      ],
      [
        '<=',
        ['get', 'value'],
        ['get', 'max']
      ]
    ],
    style: {
      'text-value': 'between min and max',
    }
  },
  {
    filter: [
      '>',
      ['get', 'value'],
      ['get', 'max']
    ],
    style: {
      'text-value': 'above max'
    }

  },
  {
    filter: [
      '<',
      ['get', 'value'],
      ['get', 'min']
    ],
    style: {
      'text-value': 'below min',
    }
  }
];

export default filterComparisonPropertyFunction;

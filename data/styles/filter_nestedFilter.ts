import { Style } from 'geostyler-style';

const filterNestedFilter: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      filter: [
        '&&',
        ['==', 'state', 'germany'],
        [
          '||',
          ['>=', 'population', 100000],
          ['<', 'population', 200000]
        ],
        [
          '!',
          ['==', 'name', 'Schalke']
        ]
      ],
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'Circle',
        color: '#FF0000',
        radius: 10
      }]
    }, {
      name: 'OL Style Rule 1',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'Circle',
        color: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default filterNestedFilter;

import { Style } from 'geostyler-style';

const filterInvalidFilter: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      filter: [
        '&&',
        'germany',
        [
          '||',
          ['>=', 'population', 100000],
          '&&'
        ],
        []
      ],
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#FF0000',
        radius: 10
      }]
    }, {
      name: 'OL Style Rule 1',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default filterInvalidFilter;

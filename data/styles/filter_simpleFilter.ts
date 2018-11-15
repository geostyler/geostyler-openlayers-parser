import { Style } from 'geostyler-style';

const filterSimpleFilter: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      filter: [
        '==',
        'Name',
        'Bonn'
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

export default filterSimpleFilter;

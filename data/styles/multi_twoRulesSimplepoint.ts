import { Style } from 'geostyler-style';

const multiTwoRulesSimplepoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#FF0000',
        radius: 6
      }]
    },
    {
      name: 'OL Style Rule 1',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#FF1111',
        radius: 4
      }]
    }
  ]
};

export default multiTwoRulesSimplepoint;

import { Style } from 'geostyler-style';

const multiTwoRulesSimplepoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizer: [{
        kind: 'Mark',
        wellKnownName: 'Circle',
        color: '#FF0000',
        radius: 6
      }]
    },
    {
      name: 'OL Style Rule 1',
      symbolizer: [{
        kind: 'Mark',
        wellKnownName: 'Circle',
        color: '#FF1111',
        radius: 4
      }]
    }
  ]
};

export default multiTwoRulesSimplepoint;

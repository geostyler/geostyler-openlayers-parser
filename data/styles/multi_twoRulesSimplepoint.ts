import { Style } from 'geostyler-style';

const multi_twoRulesSimplepoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizer: [{
        kind: 'Circle',
        color: '#FF0000',
        radius: 6
      }]
    },
    {
      name: 'OL Style Rule 1',
      symbolizer: [{
        kind: 'Circle',
        color: '#FF1111',
        radius: 4
      }]
    }
  ]
};

export default multi_twoRulesSimplepoint;

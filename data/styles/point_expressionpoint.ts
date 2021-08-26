import { Style } from 'geostyler-style';

const pointExpressionPoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        color: {
          type: 'literal',
          value: '#333333'
        },
        radius: 6
      }]
    }
  ]
};

export default pointExpressionPoint;

import { Style } from 'geostyler-style';

const scaleDenomLine: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      scaleDenominator: {
        min: 0,
        max: 500
      },
      symbolizers: [{
        kind: 'Line',
        color: '#000000',
        width: 3,
        dasharray: [1, 2, 3, 4],
        cap: 'round',
        join: 'miter',
        dashOffset: 5
      }]
    }
  ]
};

export default scaleDenomLine;

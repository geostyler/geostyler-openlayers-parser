import { Style } from 'geostyler-style';

const lineSimpleLine: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
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

export default lineSimpleLine;

import { Style } from 'geostyler-style';

const lineSimpleLine: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Line',
        graphicStroke: {
          kind: 'Mark',
          wellKnownName: 'square',
          color: '#000000',
          radius: 5
        },
        dasharray: [20, 10]
      }]
    }
  ]
};

export default lineSimpleLine;

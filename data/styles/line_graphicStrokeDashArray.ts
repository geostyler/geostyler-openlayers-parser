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
          radius: 10,
          rotate: 45,
        },
        dasharray: [1, 2, 3, 4]
      }]
    }
  ]
};

export default lineSimpleLine;

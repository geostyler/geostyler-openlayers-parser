import { Style } from 'geostyler-style';

const pointSimpleTriangle: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizer: [{
        kind: 'Mark',
        wellKnownName: 'Triangle',
        color: '#FF0000',
        radius: 6,
        points: 3,
        angle: 0,
        rotate: 0
      }]
    }
  ]
};

export default pointSimpleTriangle;

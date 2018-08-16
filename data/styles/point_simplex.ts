import { Style } from 'geostyler-style';

const pointSimpleX: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizer: [{
        kind: 'Mark',
        wellKnownName: 'X',
        color: '#FF0000',
        radius: 6,
        points: 4,
        angle: 45,
        radius2: 0,
        rotate: 0
      }]
    }
  ]
};

export default pointSimpleX;

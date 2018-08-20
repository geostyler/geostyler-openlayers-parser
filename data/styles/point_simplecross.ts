import { Style } from 'geostyler-style';

const pointSimpleCross: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'Cross',
        color: '#FF0000',
        radius: 6,
        points: 4,
        angle: 0,
        radius2: 0,
        rotate: 0
      }]
    }
  ]
};

export default pointSimpleCross;

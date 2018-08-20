import { Style } from 'geostyler-style';

const pointSimpleStar: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'Star',
        color: '#FF0000',
        radius: 6,
        points: 5,
        radius2: 2,
        angle: 0,
        rotate: 0
      }]
    }
  ]
};

export default pointSimpleStar;

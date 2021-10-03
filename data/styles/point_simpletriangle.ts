import { Style } from 'geostyler-style';

const pointSimpleTriangle: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'triangle',
        color: '#FF0000',
        radius: 6,
        rotate: 0,
        offset: [10, 20]
      }]
    }
  ]
};

export default pointSimpleTriangle;

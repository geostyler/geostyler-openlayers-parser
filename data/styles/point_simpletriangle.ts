import { Style } from 'geostyler-style';

const pointSimpleTriangle: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'triangle',
        strokeColor: '#FF0000',
        radius: 6,
        offset: [10, 20]
      }]
    }
  ]
};

export default pointSimpleTriangle;

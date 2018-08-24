import { Style } from 'geostyler-style';

const pointSimpleDot: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'shape://dot',
        color: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default pointSimpleDot;

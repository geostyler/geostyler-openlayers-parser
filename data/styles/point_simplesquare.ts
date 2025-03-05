import { Style } from 'geostyler-style';

const pointSimpleSquare: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'square',
        strokeColor: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default pointSimpleSquare;

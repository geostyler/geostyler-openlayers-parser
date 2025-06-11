import { Style } from 'geostyler-style';

const pointSimpleHorline: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'shape://horline',
        strokeColor: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default pointSimpleHorline;

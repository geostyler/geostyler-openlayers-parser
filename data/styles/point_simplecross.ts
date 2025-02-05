import { Style } from 'geostyler-style';

const pointSimpleCross: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'cross',
        strokeColor: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default pointSimpleCross;

import { Style } from 'geostyler-style';

const pointSimpleOffset: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        strokeColor: '#FF0000',
        radius: 6,
        offset: [1, 1]
      }]
    }
  ]
};

export default pointSimpleOffset;

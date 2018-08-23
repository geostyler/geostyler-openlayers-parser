import { Style } from 'geostyler-style';

const pointSimpleBackSlash: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'shape://backslash',
        color: '#FF0000',
        radius: 6,
        rotate: 0
      }]
    }
  ]
};

export default pointSimpleBackSlash;

import { Style } from 'geostyler-style';

const functionMarkSymbolizer: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'cross',
        strokeColor: '#FF0000',
        radius: {
          name: 'add',
          args: [3, 2]
        }
      }]
    }
  ]
};

export default functionMarkSymbolizer;

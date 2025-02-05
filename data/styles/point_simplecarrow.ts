import { Style } from 'geostyler-style';

const pointSimpleCarrow: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'shape://carrow',
        strokeColor: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default pointSimpleCarrow;

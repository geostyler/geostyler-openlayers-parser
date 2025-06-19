import { Style } from 'geostyler-style';

const pointSimplePlus: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'shape://plus',
        strokeColor: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default pointSimplePlus;

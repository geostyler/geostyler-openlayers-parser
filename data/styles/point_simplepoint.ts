import { Style } from 'geostyler-style';

const pointSimplePoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizer: [{
        kind: 'Mark',
        wellKnownName: 'Circle',
        color: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default pointSimplePoint;

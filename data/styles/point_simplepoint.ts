import { Style } from 'geostyler-style';

const pointSimplePoint: Style = {
  type: 'Point',
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule',
      symbolizer: {
        kind: 'Circle',
        color: '#FF0000',
        radius: 6
      }
    }
  ]
};

export default pointSimplePoint;

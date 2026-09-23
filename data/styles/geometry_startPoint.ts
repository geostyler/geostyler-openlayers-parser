import { Style } from 'geostyler-style';

const geometry_startPoint: Style = {
  name: 'Geometry Start Point',
  rules: [{
    name: '',
    symbolizers: [{
      kind: 'Line',
      geometry: {
        name: 'startPoint',
        args: [{
          name: 'property',
          args: ['geometry']
        }]
      }
    }]
  }]
};

export default geometry_startPoint;

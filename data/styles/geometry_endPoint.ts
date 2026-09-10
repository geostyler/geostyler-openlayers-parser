import { Style } from 'geostyler-style';

const geometry_endPoint: Style = {
  name: 'Geometry End Point',
  rules: [{
    name: '',
    symbolizers: [{
      kind: 'Line',
      geometry: {
        name: 'endPoint',
        args: [{
          name: 'property',
          args: ['geometry']
        }]
      }
    }]
  }]
};

export default geometry_endPoint;

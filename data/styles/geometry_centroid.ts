import { Style } from 'geostyler-style';

const geometry_centroid: Style = {
  name: 'Geometry Centroid',
  rules: [{
    name: '',
    symbolizers: [{
      kind: 'Fill',
      geometry: {
        name: 'centroid',
        args: [{
          name: 'property',
          args: ['geometry']
        }]
      }
    }]
  }]
};

export default geometry_centroid;

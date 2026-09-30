import { Style } from 'geostyler-style';

const geometry_property: Style = {
  name: 'Geometry Property',
  rules: [{
    name: '',
    symbolizers: [{
      kind: 'Mark',
      wellKnownName: 'square',
      geometry: {
        name: 'property',
        args: ['geom']
      }
    }]
  }]
};

export default geometry_property;

import { Style } from 'geostyler-style';

const pointOpaquePoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        color: '#00FF00',
        fillOpacity: 0,
        radius: 6
      }]
    }
  ]
};

export default pointOpaquePoint;

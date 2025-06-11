import { Style } from 'geostyler-style';

const pointSimpleStar: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'star',
        color: '#00FF00',
        fillOpacity: 0,
        strokeColor: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default pointSimpleStar;

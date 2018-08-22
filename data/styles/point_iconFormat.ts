import { Style } from 'geostyler-style';

const pointSimplePoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Icon',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/67/OpenLayers_logo.svg',
        format: 'image/svg+xml',
        size: 0.1,
        opacity: 0.5,
        rotate: 45
      }]
    }
  ]
};

export default pointSimplePoint;

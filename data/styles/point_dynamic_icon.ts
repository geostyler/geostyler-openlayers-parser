import { Style } from 'geostyler-style';

const pointDynamicIconPoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Icon',
        image: '{{path}}',
      }]
    }
  ]
};

export default pointDynamicIconPoint;

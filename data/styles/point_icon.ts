import { Style } from 'geostyler-style';

const pointIconPoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Icon',
        image: 'https://avatars1.githubusercontent.com/u/1849416?s=460&v=4',
        opacity: 0.5,
        rotate: 45,
        size: 12,
        offset: [10, 20]
      }]
    }
  ]
};

export default pointIconPoint;

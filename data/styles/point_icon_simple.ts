import { Style } from 'geostyler-style';

const pointSimplePoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Icon',
        image: 'https://avatars1.githubusercontent.com/u/1849416?s=460&v=4',
        rotate: 45,
        offset: [10, 20]
      }]
    }
  ]
};

export default pointSimplePoint;

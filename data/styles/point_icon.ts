import { Style } from 'geostyler-style';

const pointSimplePoint: Style = {
  name: 'OL Icon Style',
  rules: [
    {
      name: 'OL Style Rule',
      symbolizer: [{
        kind: 'Icon',
        image: 'https://avatars1.githubusercontent.com/u/1849416?s=460&v=4',
        size: 0.1,
        opacity: 0.5,
        rotate: 45
      }]
    }
  ]
};

export default pointSimplePoint;
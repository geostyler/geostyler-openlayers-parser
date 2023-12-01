import { Style } from 'geostyler-style';

const pointSpritePoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Icon',
        image: {
          source: 'https://testurl.com/sprites/mysprite',
          position: [20, 20],
          size: [10, 10]
        },
        size: 10
      }]
    }
  ]
};

export default pointSpritePoint;

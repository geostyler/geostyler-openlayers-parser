import { Style } from 'geostyler-style';

const multi_simplelineLabel: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizer: [{
        kind: 'Line',
        color: '#000000',
        width: 3,
        dasharray: [1, 2, 3, 4]
      },
      {
        kind: 'Text',
        color: '#000000',
        field: 'name',
        font: ['Arial'],
        size: 12,
        offset: [0, 5]
      }]
    }
  ]
};

export default multi_simplelineLabel;

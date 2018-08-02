import { Style } from 'geostyler-style';

const multi_simplelineSimplepoint: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule',
      symbolizer: [{
        kind: 'Line',
        color: '#000000',
        width: 3,
        dasharray: [1, 2, 3, 4]
      },{
        kind: 'Circle',
        color: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default multi_simplelineSimplepoint;

import { Style } from 'geostyler-style';

const multiSimplefillSimpleline: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizer: [{
        kind: 'Fill',
        color: '#FF0000',
        opacity: undefined,
        outlineColor: undefined
      }, {
        kind: 'Line',
        color: '#FF0000',
        width: 5,
        dasharray: null,
        opacity: undefined
      }]
    }
  ]
};

export default multiSimplefillSimpleline;

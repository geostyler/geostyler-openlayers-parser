import { Style } from 'geostyler-style';

const lineSimpleLine: Style = {
  type: 'Line',
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule',
      symbolizer: {
        kind: 'Line',
        color: '#000000',
        width: 3
      }
    }
  ]
};

export default lineSimpleLine;

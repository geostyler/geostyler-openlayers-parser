import OlStyle from 'ol/style/style';
import OlStyleRegularshape from 'ol/style/regularshape';
import { Style } from 'geostyler-style';

const pointSimpleSquare: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizer: [{
        kind: 'Mark',
        wellKnownName: 'Square',
        color: '#FF0000',
        radius: 6,
        points: 4,
        angle: 45,
        rotate: 0
      }]
    }
  ]
};

export default pointSimpleSquare;

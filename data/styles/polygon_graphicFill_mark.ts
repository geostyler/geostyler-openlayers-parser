import { Style } from 'geostyler-style';

const polygonGraphicFillMark: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Fill',
        graphicFill: {
          kind: 'Mark',
          wellKnownName: 'circle'
        }
      }]
    }
  ]
};

export default polygonGraphicFillMark;

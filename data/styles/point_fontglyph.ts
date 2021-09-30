import { Style } from 'geostyler-style';

const pointFontglyph: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'ttf://My Font Name#0x7c',
        color: '#FF0000',
        radius: 12,
        rotate: 0,
        strokeColor: '#112233',
        offset: [10, 20]
      }]
    }
  ]
};

export default pointFontglyph;

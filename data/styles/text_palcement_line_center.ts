import { Style } from 'geostyler-style';

const textStyle: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Text',
        placement:'line-center',
        allowOverlap: undefined,
        fontStyle: undefined,
        fontWeight: undefined,
        color: '#333',
        label: 'name',
        font: undefined,
        size: undefined,
        offset: [0,0],
        haloColor: undefined,
        haloWidth: 5,
        rotate: undefined
      }]
    }
  ]
};

export default textStyle;

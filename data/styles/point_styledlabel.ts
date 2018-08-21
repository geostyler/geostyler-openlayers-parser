import { Style } from 'geostyler-style';

const pointStyledLabel: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule',
      symbolizers: [{
        kind: 'Text',
        color: '#000000',
        field: 'name',
        font: ['Arial'],
        size: 12,
        offset: [0, 5],
        haloColor: '#000000',
        haloWidth: 5,
        rotate: 45
      }]
    }
  ]
};

export default pointStyledLabel;

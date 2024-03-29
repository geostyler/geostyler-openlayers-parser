import { Style } from 'geostyler-style';

const pointStyledLabel: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Text',
        allowOverlap: undefined,
        fontStyle: undefined,
        fontWeight: undefined,
        color: '#000000',
        label: 'name',
        font: ['Arial'],
        size: 12,
        offset: [0, 5],
        haloColor: '#000000',
        haloWidth: 5,
        rotate: 45,
        placement: 'point'
      }]
    }
  ]
};

export default pointStyledLabel;

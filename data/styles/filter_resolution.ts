import { Style } from 'geostyler-style';

const dpi = 25.4 / 0.28;
const inchesPerMeter = 39.37;

const filterSimpleFilter: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      scaleDenominator: {
        min: 1000 * inchesPerMeter * dpi
      },
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#FF0000',
        radius: 10
      }]
    }
  ]
};

export default filterSimpleFilter;

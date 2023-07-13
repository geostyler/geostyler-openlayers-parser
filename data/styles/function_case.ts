import { Style } from 'geostyler-style';

const functionCase: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#FF0000',
        radius: {
          name: 'case',
          args: [
            {
              case: {
                name: 'lessThanOrEqualTo',
                args: [
                  {
                    name: 'property',
                    args: ['population']
                  },
                  50000
                ]
              },
              value: 2
            },
            {
              case: {
                name: 'lessThanOrEqualTo',
                args: [
                  {
                    name: 'property',
                    args: ['population']
                  },
                  1000000
                ]
              },
              value: 5
            },
            10
          ]
        }
      }]
    }
  ]
};

export default functionCase;

import {Fproperty, Style} from 'geostyler-style';

const value: Fproperty = {
  name: 'property',
  args: [
    'value'
  ]
};

const min: Fproperty = {
  name: 'property',
  args: [
    'min'
  ]
}

const max: Fproperty = {
  name: 'property',
  args: [
    'max'
  ]
}

const filterComparisonPropertyFunction: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'between min and max',
      filter: [
        '&&',
        [
          '>=',
          value, min

        ],
        [
          '<=',
          value,
          max
        ]
      ],
      symbolizers: [
        {
          kind: 'Text',
          label: 'between min and max',
        }
      ]
    },
    {
      name: 'above max',
      filter: [
        '>',
        value,
        max
      ],
      symbolizers: [
        {
          kind: 'Text',
          label: 'above max'
        }
      ]
    },
    {
      name: 'below min',
      filter: [
        '<',
        value,
        min
      ],
      symbolizers: [
        {
          kind: 'Text',
          label: 'below min',
        }
      ]
    }
  ]
}

export default filterComparisonPropertyFunction;

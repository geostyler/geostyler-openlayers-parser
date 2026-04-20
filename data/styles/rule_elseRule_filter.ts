import { Style } from 'geostyler-style';

const ruleElseRuleFilter: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      filter: [
        '==',
        'Name',
        'Bonn'
      ],
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#FF0000',
        radius: 10
      }]
    }, {
      name: 'OL Style Rule 1',
      elseRule: true,
      filter: [
        '==',
        'Name',
        'Cologne'
      ],
      symbolizers: [{
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#FF0000',
        radius: 6
      }]
    }
  ]
};

export default ruleElseRuleFilter;

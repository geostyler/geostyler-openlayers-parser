import { Style } from 'geostyler-style';

const unsupportedProperties: Style = {
  name: 'OL Style',
  rules: [
    {
      name: 'OL Style Rule 0',
      symbolizers: [{
        kind: 'Fill',
        color: '#F1337F',
        opacity: 0.5
      }, {
        kind: 'Icon',
        image: 'peter.png',
        anchor: 'bottom-left'
      }]
    },
    {
      name: 'Text placement line-center',
      symbolizers: [{
        kind: 'Text',
        placement: 'line-center' // this gets converted to 'line' in OL Style; partial support
      }]
    },
    {
      name: 'Mark symbolizer used as graphic fill',
      symbolizers: [{
        kind: 'Fill',
        graphicFill: {
          kind: 'Mark',
          wellKnownName: 'circle'
        }
      }]
    },
    {
      name: 'Dynamic icon path',
      symbolizers: [{
        kind: 'Icon',
        image: '{{path}}',
      }]
    }
  ]
};

export default unsupportedProperties;

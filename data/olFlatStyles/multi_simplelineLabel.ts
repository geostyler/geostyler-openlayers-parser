import { FlatStyle } from 'ol/style/flat';

const multiSimplelineLabel: FlatStyle = {
  'stroke-color': '#000000',
  'stroke-width': 3,
  'stroke-line-dash': [1, 2, 3, 4],
  'text-fill-color': '#000000',
  'text-value': ['get', 'name'],
  'text-font': 'normal normal 12px Arial',
  'text-offset-x': 0,
  'text-offset-y': 5,
};


export default multiSimplelineLabel;

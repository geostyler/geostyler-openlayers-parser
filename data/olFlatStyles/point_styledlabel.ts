import { FlatStyle } from 'ol/style/flat';

const pointStyledLabel: FlatStyle = {
  'text-value': '{{name}}',
  'text-font': 'normal normal 12px Arial',
  'text-fill-color': '#000000',
  'text-stroke-color': '#000000',
  'text-stroke-width': 5,
  'text-offset-x': 0,
  'text-offset-y': 5,
  'text-rotation': 45,
  'text-placement': 'point',
};

export default pointStyledLabel;

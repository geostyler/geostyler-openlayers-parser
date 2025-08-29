import { FlatStyle } from 'ol/style/flat';

const functionNestedFillSymbolizer: FlatStyle = {
  'fill-color': '#F1337F',
  'stroke-width': ['max', Math.PI, ['+', 3, 2]],
};

export default functionNestedFillSymbolizer;

import { FlatStyle } from 'ol/style/flat';

const functionCase: FlatStyle = {
  'circle-fill-color': '#FF0000',
  'circle-radius': ['case', ['<=', ['get', 'population'], 50000, 2, ['<=', ['get', 'population'], 1000000], 5, 10],]
};

export default functionCase;

import { FlatStyleLike } from 'ol/style/flat';

const dpi = 25.4 / 0.28;
const inchesPerMeter = 39.37;
const scale = ['*', ['resolution'], inchesPerMeter * dpi];

const pointSimplePoint: FlatStyleLike =[
  {
    filter: ['all',
      ['==', ['get', 'NAME'], 'New York'],
      ['!',
        ['>', ['get', 'POPULATION'], 100000]
      ],
      ['>=', scale, 10000],
      ['<', scale, 20000]
    ],
    style: {
      'circle-fill-color': '#FF0000',
      'circle-stroke-color': '#000000',
      'circle-stroke-width': 2,
      'circle-radius': 6
    }
  }
];

export default pointSimplePoint;

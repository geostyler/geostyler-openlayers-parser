import OlStyle from 'ol/style/style';
import OlStyleStroke from 'ol/style/stroke';

const olSimpleLine = new OlStyle({
  stroke: new OlStyleStroke({
    color: '#000000',
    width: 3,
    lineDash: [1, 2, 3, 4],
    lineCap: 'round',
    lineJoin: 'miter'
  })
});

export default olSimpleLine;

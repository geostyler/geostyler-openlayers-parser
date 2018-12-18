import OlStyle from 'ol/style/Style';
import OlStyleStroke from 'ol/style/Stroke';

const olSimpleLine = new OlStyle({
  stroke: new OlStyleStroke({
    color: '#000000',
    width: 3,
    lineDash: [1, 2, 3, 4],
    lineCap: 'round',
    lineJoin: 'miter',
    lineDashOffset: 5
  })
});

export default olSimpleLine;

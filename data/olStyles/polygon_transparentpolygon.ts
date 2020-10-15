import OlStyle from 'ol/style/Style';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyleFill from 'ol/style/Fill';

const olPolygonTransparentPolygon = new OlStyle({
  stroke: new OlStyleStroke({
    color: 'rgba(255,255,255,0.7)',
    lineDash: [10, 15],
    width: 2
  }),
  fill: new OlStyleFill({
    color: 'rgba(0,0,128,0.5)'
  })
});

export default olPolygonTransparentPolygon;

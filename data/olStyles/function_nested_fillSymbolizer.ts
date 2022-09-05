import OlStyle from 'ol/style/Style';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';

const olPolygonSimple = new OlStyle({
  fill: new OlStyleFill({
    color: '#F1337F',
  }),
  stroke: new OlStyleStroke({
    width: 5
  })
});

export default olPolygonSimple;

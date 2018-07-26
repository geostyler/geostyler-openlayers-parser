import OlStyle from 'ol/style/style';
import OlStyleStroke from 'ol/style/stroke';
import OlStyleFill from 'ol/style/fill';

const olPolygonTransparentPolygon = new OlStyle({
  stroke: new OlStyleStroke({
    color: '#FFFFFF'
  }),
  fill: new OlStyleFill({
    color: 'rgba(0,0,128,0.5)'
  })
});

export default olPolygonTransparentPolygon;

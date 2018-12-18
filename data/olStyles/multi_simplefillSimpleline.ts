import OlStyle from 'ol/style/Style';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyleFill from 'ol/style/Fill';

const olSimpleFill = new OlStyle({
  fill: new OlStyleFill({
    color: '#FF0000'
  })
});

const olSimpleLine = new OlStyle({
  stroke: new OlStyleStroke({
    color: '#FF0000',
    width: 5
  })
});

export default [olSimpleFill, olSimpleLine];

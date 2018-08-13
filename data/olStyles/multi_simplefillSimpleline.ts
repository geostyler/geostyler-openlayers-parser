import OlStyle from 'ol/style/style';
import OlStyleStroke from 'ol/style/stroke';
import OlStyleFill from 'ol/style/fill';

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

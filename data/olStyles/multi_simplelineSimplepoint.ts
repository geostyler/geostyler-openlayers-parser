import OlStyle from 'ol/style/style';
import OlStyleStroke from 'ol/style/stroke';
import OlStyleCircle from 'ol/style/circle';
import OlStyleFill from 'ol/style/fill';

const olSimpleLine = new OlStyle({
  stroke: new OlStyleStroke({
    color: '#000000',
    width: 3,
    lineDash: [1, 2, 3, 4]
  })
});

const olSimplePoint = new OlStyle({
  image: new OlStyleCircle({
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default [olSimpleLine, olSimplePoint];

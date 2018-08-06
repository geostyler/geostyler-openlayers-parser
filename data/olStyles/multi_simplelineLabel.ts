import OlStyle from 'ol/style/style';
import OlStyleStroke from 'ol/style/stroke';
import OlStyleCircle from 'ol/style/circle';
import OlStyleFill from 'ol/style/fill';
import OlStyleText from 'ol/style/text';

const olSimpleLine = new OlStyle({
  stroke: new OlStyleStroke({
    color: '#000000',
    width: 3,
    lineDash: [1, 2, 3, 4]
  })
});

const olStyledLabel = new OlStyle({
  text: new OlStyleText({
    font: 'normal 12px',
    text: 'GeoStyler', // feature.get('name'),
    fill: new OlStyleFill({
      color: '#000000'
    }),
    stroke: new OlStyleStroke({
      color: '#000000'
    }),
    offsetX: 0,
    offsetY: 5
  }) 
});

export default [olSimpleLine, olStyledLabel];

import OlStyle from 'ol/style/Style';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyleFill from 'ol/style/Fill';
import OlStyleText from 'ol/style/Text';

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
    text: 'GeoStyler',
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

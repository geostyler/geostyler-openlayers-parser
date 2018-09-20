import OlStyleText from 'ol/style/text';
import OlStyleStroke from 'ol/style/stroke';
import OlStyleFill from 'ol/style/fill';
import OlStyle from 'ol/style/style';

const olPointStyledLabel = new OlStyle({
  text: new OlStyleText({
    text: 'name',
    fill: new OlStyleFill({
      color: '#000000'
    }),
    stroke: new OlStyleStroke({
      color: '#000000',
      width: 5
    }),
    offsetX: 0,
    offsetY: 5,
    rotation: Math.PI / 4,
    font: '12px Arial'
  })
});

export default olPointStyledLabel;

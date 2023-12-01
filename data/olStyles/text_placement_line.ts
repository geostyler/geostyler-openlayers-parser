import OlStyleText from 'ol/style/Text';
import OlStyle from 'ol/style/Style';
import OlStyleStroke from 'ol/style/Stroke';
const olTextPlacementStyle = new OlStyle({
  text: new OlStyleText({
    text: 'name',
    placement:'line',
    stroke: new OlStyleStroke({
      width: 5
    })
  })
});

export default olTextPlacementStyle;

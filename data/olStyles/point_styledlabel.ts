import OlStyleText from 'ol/style/Text';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyleFill from 'ol/style/Fill';

const olPointStyledLabel = (feature: ol.Feature, res: number) => {
  return new OlStyleText({
    // textAlign: align == '' ? undefined : align,
    // textBaseline: baseline,
    font: 'normal 12px',
    text: 'GeoStyler', // feature.get('name'),
    fill: new OlStyleFill({
      color: '#000000'
    }),
    stroke: new OlStyleStroke({
      color: '#000000',
      width: 5
    }),
    offsetX: 0,
    offsetY: 5,
    rotation: Math.PI / 4
  });
};

export default olPointStyledLabel;

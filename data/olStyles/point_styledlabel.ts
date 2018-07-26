import OlStyleText from 'ol/style/text';
import OlStyleStroke from 'ol/style/stroke';
import OlStyleFill from 'ol/style/fill';

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
      color: '#000000'
    }),
    offsetX: 0,
    offsetY: 5
  }); 
};

export default olPointStyledLabel;

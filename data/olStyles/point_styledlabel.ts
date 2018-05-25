import * as ol from 'openlayers';

const olPointStyledLabel = (feature: ol.Feature, res: number) => {
  return new ol.style.Text({
    // textAlign: align == '' ? undefined : align,
    // textBaseline: baseline,
    font: 'normal 12px',
    text: 'GeoStyler', // feature.get('name'),
    fill: new ol.style.Fill({
      color: '#000000'
    }),
    stroke: new ol.style.Stroke({
      color: '#000000'
    }),
    offsetX: 0,
    offsetY: 5
  }); 
};

export default olPointStyledLabel;

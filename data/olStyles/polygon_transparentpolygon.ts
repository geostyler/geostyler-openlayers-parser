import * as ol from 'openlayers';

const olPolygonTransparentPolygon = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: '#FFFFFF'
  }),
  fill: new ol.style.Fill({
    color: 'rgba(0,0,128,0.5)'
  })
});

export default olPolygonTransparentPolygon;

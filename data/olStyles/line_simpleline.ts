import * as ol from 'openlayers';

const olSimpleLine = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: '#000000',
    width: 3,
    lineDash: [1, 2, 3, 4]
  })
});

export default olSimpleLine;

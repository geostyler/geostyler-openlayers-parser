import * as ol from 'openlayers';

const olSimplePoint = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#FF0000'
    })
  })
});

export default olSimplePoint;

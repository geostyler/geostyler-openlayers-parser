import OlStyle from 'ol/style/Style';
import OlStyleRegularshape from 'ol/style/RegularShape';
import OlStyleFill from 'ol/style/Fill';

const olSimpleSlash = new OlStyle({
  image: new OlStyleRegularshape({
    points: 2,
    angle: 2 * Math.PI - (Math.PI / 4),
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimpleSlash;

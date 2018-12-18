import OlStyle from 'ol/style/Style';
import OlStyleRegularshape from 'ol/style/RegularShape';
import OlStyleFill from 'ol/style/Fill';

const olSimpleOarrow = new OlStyle({
  image: new OlStyleRegularshape({
    points: 3,
    angle: Math.PI / 2,
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimpleOarrow;

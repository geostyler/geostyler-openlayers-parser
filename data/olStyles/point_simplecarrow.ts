import OlStyle from 'ol/style/style';
import OlStyleRegularshape from 'ol/style/regularshape';
import OlStyleFill from 'ol/style/fill';

const olSimpleCarrow = new OlStyle({
  image: new OlStyleRegularshape({
    points: 3,
    angle: Math.PI / 2,
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimpleCarrow;

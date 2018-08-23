import OlStyle from 'ol/style/style';
import OlStyleRegularshape from 'ol/style/regularshape';
import OlStyleFill from 'ol/style/fill';

const olSimpleVertline = new OlStyle({
  image: new OlStyleRegularshape({
    points: 2,
    angle: 0,
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimpleVertline;

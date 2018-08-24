import OlStyle from 'ol/style/style';
import OlStyleRegularshape from 'ol/style/regularshape';
import OlStyleFill from 'ol/style/fill';

const olSimpleHorline = new OlStyle({
  image: new OlStyleRegularshape({
    points: 2,
    angle: Math.PI / 2,
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimpleHorline;

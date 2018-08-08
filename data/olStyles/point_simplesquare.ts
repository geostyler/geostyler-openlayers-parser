import OlStyle from 'ol/style/style';
import OlStyleRegularshape from 'ol/style/regularshape';
import OlStyleFill from 'ol/style/fill';

const olSimpleSquare = new OlStyle({
  image: new OlStyleRegularshape({
    points: 4,
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimpleSquare;

import OlStyle from 'ol/style/style';
import OlStyleRegularshape from 'ol/style/regularshape';
import OlStyleFill from 'ol/style/fill';

const olSimpleX = new OlStyle({
  image: new OlStyleRegularshape({
    points: 4,
    radius: 6,
    radius2: 0,
    angle: Math.PI / 4,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimpleX;

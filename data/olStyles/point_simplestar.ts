import OlStyle from 'ol/style/style';
import OlStyleRegularshape from 'ol/style/regularshape';
import OlStyleFill from 'ol/style/fill';

const olSimpleStar = new OlStyle({
  image: new OlStyleRegularshape({
    points: 5,
    radius: 6,
    radius2: 2,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimpleStar;

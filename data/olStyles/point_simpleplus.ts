import OlStyle from 'ol/style/style';
import OlStyleRegularshape from 'ol/style/regularshape';
import OlStyleFill from 'ol/style/fill';

const olSimplePlus = new OlStyle({
  image: new OlStyleRegularshape({
    points: 4,
    radius: 6,
    radius2: 0,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimplePlus;

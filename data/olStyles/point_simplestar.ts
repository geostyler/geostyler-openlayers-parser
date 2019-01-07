import OlStyle from 'ol/style/Style';
import OlStyleRegularshape from 'ol/style/RegularShape';
import OlStyleFill from 'ol/style/Fill';

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

import OlStyle from 'ol/style/Style';
import OlStyleRegularshape from 'ol/style/RegularShape';
import OlStyleFill from 'ol/style/Fill';

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

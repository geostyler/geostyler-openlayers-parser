import OlStyle from 'ol/style/Style';
import OlStyleRegularshape from 'ol/style/RegularShape';
import OlStyleFill from 'ol/style/Fill';

const olSimpleTriangle = new OlStyle({
  image: new OlStyleRegularshape({
    points: 3,
    radius: 6,
    displacement: [10, 20],
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimpleTriangle;

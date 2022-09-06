import OlStyle from 'ol/style/Style';
import OlStyleRegularshape from 'ol/style/RegularShape';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';

const olFunctionMark = new OlStyle({
  image: new OlStyleRegularshape({
    points: 4,
    radius: Math.PI,
    radius2: 0,
    fill: new OlStyleFill({
      color: '#FF0000'
    }),
    stroke: new OlStyleStroke({
      color: '#000'
    })
  })
});

export default olFunctionMark;

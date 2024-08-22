import OlStyle from 'ol/style/Style';
import OlStyleCircle from 'ol/style/Circle';
import OlStyleFill from 'ol/style/Fill';

const olSimplePoint = new OlStyle({
  image: new OlStyleCircle({
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    }),
    displacement: [1,1]
  })
});

export default olSimplePoint;

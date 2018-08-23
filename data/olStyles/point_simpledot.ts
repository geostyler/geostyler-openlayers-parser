import OlStyle from 'ol/style/style';
import OlStyleCircle from 'ol/style/circle';
import OlStyleFill from 'ol/style/fill';

const olSimpleDot = new OlStyle({
  image: new OlStyleCircle({
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export default olSimpleDot;

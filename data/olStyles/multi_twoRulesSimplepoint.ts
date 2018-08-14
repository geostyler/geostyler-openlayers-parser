import OlStyle from 'ol/style/style';
import OlStyleCircle from 'ol/style/circle';
import OlStyleFill from 'ol/style/fill';

const olSimplePoint1 = new OlStyle({
  image: new OlStyleCircle({
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

const olSimplePoint2 = new OlStyle({
  image: new OlStyleCircle({
    radius: 4,
    fill: new OlStyleFill({
      color: '#FF1111'
    })
  })
});

export default [[olSimplePoint1], [olSimplePoint2]];

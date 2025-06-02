import OlStyle from 'ol/style/Style';
import OlStyleIcon  from 'ol/style/Icon';
import { getPointSvg } from '../../src/Util/OlSvgPoints';
import { getEncodedSvg } from '../../src/Util/OlSvgUtil';

let svg = getPointSvg({
  kind: 'Mark',
  wellKnownName: 'circle',
  color: '#FF0000',
  radius: 6
});

const olSimplePoint1 = new OlStyle({
  image: new OlStyleIcon({
    src: getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

svg = getPointSvg({
  kind: 'Mark',
  wellKnownName: 'circle',
  color: '#FF1111',
  radius: 4
});

const olSimplePoint2 = new OlStyle({
  image: new OlStyleIcon({
    src: getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

export default [[olSimplePoint1], [olSimplePoint2]];

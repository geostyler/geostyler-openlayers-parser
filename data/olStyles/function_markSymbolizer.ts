import OlStyle from 'ol/style/Style';
import OlStyleIcon  from 'ol/style/Icon';
import { getEncodedSvg } from '../../src/Util/OlSvgUtil';
import { getPointSvg } from '../../src/Util/OlSvgPoints';

let svg = getPointSvg({
  kind: 'Mark',
  wellKnownName: 'cross',
  strokeColor: '#FF0000',
  radius: Math.PI
});

const olFunctionMark = new OlStyle({
  image: new OlStyleIcon({
    src: getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

export default olFunctionMark;

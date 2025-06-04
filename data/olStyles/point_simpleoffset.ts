import OlStyle from 'ol/style/Style';
import OlStyleIcon  from 'ol/style/Icon';
import { getPointSvg } from '../../src/Util/OlSvgPoints';
import { getEncodedSvg } from '../../src/Util/OlSvgUtil';

const svg = getPointSvg({
  kind: 'Mark',
  wellKnownName: 'circle',
  strokeColor: '#FF0000',
  radius: 6
});

const olSimplePoint = new OlStyle({
  image: new OlStyleIcon({
    src: getEncodedSvg(svg),
    crossOrigin: 'anonymous',
    displacement: [1,1]
  })
});

export default olSimplePoint;

import OlStyle from 'ol/style/Style';
import OlStyleIcon  from 'ol/style/Icon';
import OlStyleUtil from '../../src/Util/OlStyleUtil';
import { getShapeSvg } from '../../src/Util/OlSvgPoints';

let svg = getShapeSvg('circle', {
  fill: '#FF0000',
  dimensions: 12
});

const olSimplePoint1 = new OlStyle({
  image: new OlStyleIcon({
    src: OlStyleUtil.getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

svg = getShapeSvg('circle', {
  fill: '#FF1111',
  dimensions: 8
});

const olSimplePoint2 = new OlStyle({
  image: new OlStyleIcon({
    src: OlStyleUtil.getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

export default [[olSimplePoint1], [olSimplePoint2]];

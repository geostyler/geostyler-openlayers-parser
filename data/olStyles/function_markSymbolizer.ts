import OlStyle from 'ol/style/Style';
import OlStyleIcon  from 'ol/style/Icon';
import OlStyleUtil from '../../src/Util/OlStyleUtil';
import { getShapeSvg } from '../../src/Util/OlSvgPoints';

let svg = getShapeSvg('cross', {
  stroke: '#FF0000',
  dimensions: Math.PI * 2
});

const olFunctionMark = new OlStyle({
  image: new OlStyleIcon({
    src: OlStyleUtil.getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

export default olFunctionMark;

import OlStyle from 'ol/style/Style';
import OlStyleIcon  from 'ol/style/Icon';
import OlStyleUtil from '../../src/Util/OlStyleUtil';
import { getShapeSvg, removeDuplicateShapes } from '../../src/Util/OlSvgPoints';

const shape = removeDuplicateShapes('cross');

const svg = getShapeSvg(shape, {
  stroke: '#FF0000',
  dimensions: 12
});

const olSimpleCross = new OlStyle({
  image: new OlStyleIcon({
    src: OlStyleUtil.getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

export default olSimpleCross;

import OlStyle from 'ol/style/Style';
import OlStyleIcon  from 'ol/style/Icon';
import OlStyleUtil from '../../src/Util/OlStyleUtil';
import { getShapeSvg } from '../../src/Util/OlSvgPoints';

let svg = getShapeSvg('circle', {
  fill: '#FF0000',
  dimensions: 4
});

export const olCase1 = new OlStyle({
  image: new OlStyleIcon({
    src: OlStyleUtil.getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

svg = getShapeSvg('circle', {
  fill: '#FF0000',
  dimensions: 10
});

export const olCase2 = new OlStyle({
  image: new OlStyleIcon({
    src: OlStyleUtil.getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

svg = getShapeSvg('circle', {
  fill: '#FF0000',
  dimensions: 20
});

export const olCase3 = new OlStyle({
  image: new OlStyleIcon({
    src: OlStyleUtil.getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

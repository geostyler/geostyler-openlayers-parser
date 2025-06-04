import OlStyle from 'ol/style/Style';
import OlStyleIcon  from 'ol/style/Icon';
import { getPointSvg } from '../../src/Util/OlSvgPoints';
import { getEncodedSvg } from '../../src/Util/OlSvgUtil';

const svg = getPointSvg({
  kind: 'Mark',
  wellKnownName: 'shape://carrow',
  strokeColor: '#FF0000',
  radius: 6
});

const olSimpleCarrow = new OlStyle({
  image: new OlStyleIcon({
    src: getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

export default olSimpleCarrow;

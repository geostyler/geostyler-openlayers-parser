import OlStyle from 'ol/style/Style';
import OlStyleIcon  from 'ol/style/Icon';
import { getEncodedSvg } from '../../src/Util/OlSvgUtil';
import { getPointSvg } from '../../src/Util/OlSvgPoints';

let svg = getPointSvg({
  kind: 'Mark',
  wellKnownName: 'circle',
  color: '#FF0000',
  radius: 2
});

export const olCase1 = new OlStyle({
  image: new OlStyleIcon({
    src: getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

svg = getPointSvg({
  kind: 'Mark',
  wellKnownName: 'circle',
  color: '#FF0000',
  radius: 5
});

export const olCase2 = new OlStyle({
  image: new OlStyleIcon({
    src: getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

svg = getPointSvg({
  kind: 'Mark',
  wellKnownName: 'circle',
  color: '#FF0000',
  radius: 10
});

export const olCase3 = new OlStyle({
  image: new OlStyleIcon({
    src: getEncodedSvg(svg),
    crossOrigin: 'anonymous'
  })
});

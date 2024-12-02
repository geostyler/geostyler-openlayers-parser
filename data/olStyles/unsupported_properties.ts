import OlStyle from 'ol/style/Style';
import OlStyleFill from 'ol/style/Fill';
import OlStyleIcon from 'ol/style/Icon';

const unsupportedFill = new OlStyle({
  fill: new OlStyleFill({
    color: '#F1337F'
  })
});
const unsupportedImage = new OlStyle({
  image: new OlStyleIcon({
    src: 'peter.png',
    crossOrigin: 'anonymous'
  })
});

export default [unsupportedFill, unsupportedImage];

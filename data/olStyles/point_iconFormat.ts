import OlStyle from 'ol/style/style';
import OlStyleIcon from 'ol/style/icon';

const olIconPoint = new OlStyle({
  image: new OlStyleIcon({
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/67/OpenLayers_logo.svg',
    scale: 0.1,
    rotation: Math.PI / 4,
    opacity: 0.5
  })
});

export default olIconPoint;

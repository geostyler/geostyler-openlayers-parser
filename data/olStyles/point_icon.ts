import OlStyle from 'ol/style/style';
import OlStyleIcon from 'ol/style/icon';

const olIconPoint = new OlStyle({
  image: new OlStyleIcon({
    src: 'https://avatars1.githubusercontent.com/u/1849416?s=460&v=4',
    scale: 0.1,
    rotation: Math.PI / 4,
    opacity: 0.5
  })
});

export default olIconPoint;

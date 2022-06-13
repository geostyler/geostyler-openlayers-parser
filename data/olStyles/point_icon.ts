import OlStyle from 'ol/style/Style';
import OlStyleIcon from 'ol/style/Icon';

const olIconPoint = new OlStyle({
  image: new OlStyleIcon({
    src: 'https://avatars1.githubusercontent.com/u/1849416?s=460&v=4',
    size: [2, 2],
    rotation: Math.PI / 4,
    opacity: 0.5,
    displacement: [10, 20]
  })
});

export default olIconPoint;

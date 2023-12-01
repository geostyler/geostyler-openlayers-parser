import OlStyle from 'ol/style/Style';
import OlStyleIcon from 'ol/style/Icon';

const olIconSpritePoint = new OlStyle({
  image: new OlStyleIcon({
    src: 'https://testurl.com/sprites/mysprite',
    offset: [20, 20],
    offsetOrigin: 'top-left',
    size: [10, 10]
  })
});

export default olIconSpritePoint;

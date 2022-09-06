import OlStyle from 'ol/style/Style';
import OlStyleCircle from 'ol/style/Circle';
import OlStyleFill from 'ol/style/Fill';

export const olBoolean1 = new OlStyle({
  image: new OlStyleCircle({
    radius: 10,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export const olBoolean2 = new OlStyle({
  image: new OlStyleCircle({
    radius: 6,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

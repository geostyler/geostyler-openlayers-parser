import OlStyle from 'ol/style/Style';
import OlStyleCircle from 'ol/style/Circle';
import OlStyleFill from 'ol/style/Fill';

export const olCase1 = new OlStyle({
  image: new OlStyleCircle({
    radius: 2,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export const olCase2 = new OlStyle({
  image: new OlStyleCircle({
    radius: 5,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

export const olCase3 = new OlStyle({
  image: new OlStyleCircle({
    radius: 10,
    fill: new OlStyleFill({
      color: '#FF0000'
    })
  })
});

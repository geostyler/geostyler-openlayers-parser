import OlStyle from 'ol/style/Style';
import OlStyleFill from 'ol/style/Fill';

const olUnsupportedProperties = new OlStyle({
  fill: new OlStyleFill({
    color: '#F1337F'
  })
});

export default olUnsupportedProperties;

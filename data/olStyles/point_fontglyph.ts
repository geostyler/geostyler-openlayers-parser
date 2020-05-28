import OlStyle from 'ol/style/Style';
import OlStyleText from 'ol/style/Text';
import OlStyleFill from 'ol/style/Fill';
import OlStyleStroke from 'ol/style/Stroke';

const olFontGlyph = new OlStyle({
  text: new OlStyleText({
    text: '|',
    font: 'Normal 12px \'My Font Name\', geostyler-mark-symbolizer',
    fill: new OlStyleFill({
      color: '#FF0000'
    }),
    stroke: new OlStyleStroke({
      color: '#112233'
    })
  })
});

export default olFontGlyph;

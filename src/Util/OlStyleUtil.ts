import { TextSymbolizer } from 'geostyler-style';

/**
 * Offers some utility functions to work with OpenLayers Styles.
 */
class OlStyleUtil {

  /**
   * Transforms a HEX encoded color and an opacity value to a RGBA notation.
   *
   * @param hexColor HEX encoded color
   * @param opacity  Opacity (Betweeen 0 and 1)
   */
  public static getRgbaColor(hexColor: string, opacity: number) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    if (opacity < 0) {
      opacity = 1;
    }

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';
  }

  /**
   * Returns an OL cpmpliant font string.
   *
   * @param symbolizer The TextSymbolizer to derive the font string from
   */
  public static getTextFont(symbolizer: TextSymbolizer) {
    const weight = 'Normal';
    const size = symbolizer.size;
    const font = symbolizer.font;
    return weight + ' ' + size + ' ' + font;
  }
}

export default OlStyleUtil;

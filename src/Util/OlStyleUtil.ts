import { TextSymbolizer } from 'geostyler-style';

/**
 * Offers some utility functions to work with OpenLayers Styles.
 */
class OlStyleUtil {

  /**
   * Transforms a HEX encoded color and an opacity value to a RGB(A) notation.
   *
   * @param {string} hexColor HEX encoded color
   * @param {number} opacity  Opacity (Betweeen 0 and 1)
   * @return {string} the RGB(A) value of the input color
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
   * Splits a RGBA encoded color into its color values.
   *
   * @param {string} rgbaColor RGB(A) encoded color
   * @return {number[]} Numeric color values as array
   */
  public static splitRgbaColor(rgbaColor: string): number[] {
    const colorsOnly = rgbaColor.substring(rgbaColor.indexOf('(') + 1, rgbaColor.lastIndexOf(')')).split(/,\s*/);
    const red = parseInt(colorsOnly[0], 10);
    const green = parseInt(colorsOnly[1], 10);
    const blue = parseInt(colorsOnly[2], 10);
    const opacity = parseFloat(colorsOnly[3]);

    return [red, green, blue, opacity];
  }

  /**
   * Transforms a RGB(A) color value to a HEX encoded notation.
   * If a HEX color is provided it will be returned untransformed.
   *
   * @param {string} inColor The color to transform
   * @return {string | undefined} The HEX color representation of the given color
   */
  public static getHexColor(inColor: string): string | undefined {
    // if passing in a hex code we just return it
    if (inColor.startsWith('#')) {
      return inColor;
    } else if (inColor.startsWith('rgb')) {
      const colorArr = OlStyleUtil.splitRgbaColor(inColor);

      return '#' + colorArr.map((x, idx) => {
        const hex = x.toString(16);
        // skip opeacity of available
        if (idx < 3) {
          // return hex;
          return hex.length === 1 ? '0' + hex : hex;
        }
      }).join('');
    } else {
      return;
    }
  }

  /**
   * Returns the opacity value of a RGB(A) color value.
   *
   * @param rgbaColor RGBA encoded color
   * @return {string | undefined} The opacity value of the given RGBA color
   */
  public static getOpacity(rgbaColor: string): number | undefined {
    if (!rgbaColor.startsWith('rgba(')) {
      return;
    }

    const colorArr = OlStyleUtil.splitRgbaColor(rgbaColor);

    if (colorArr.length === 4) {
      return colorArr[3];
    } else {
      return;
    }
  }

  /**
   * Returns an OL compliant font string.
   *
   * @param symbolizer The TextSymbolizer to derive the font string from
   */
  public static getTextFont(symbolizer: TextSymbolizer) {
    // since TextSymbolizer has no prop for font weight we use 'Normal' as default
    const weight = 'Normal';
    const size = symbolizer.size;
    const font = symbolizer.font;
    return weight + ' ' + size + 'px ' + font;
  }
}

export default OlStyleUtil;

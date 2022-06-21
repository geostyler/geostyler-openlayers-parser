import { MarkSymbolizer, TextSymbolizer } from 'geostyler-style';
import colors from 'color-name';

const WELLKNOWNNAME_TTF_REGEXP = /^ttf:\/\/(.+)#(.+)$/;
export const DUMMY_MARK_SYMBOLIZER_FONT = 'geostyler-mark-symbolizer';

/**
 * Offers some utility functions to work with OpenLayers Styles.
 */
class OlStyleUtil {

  /**
   * Transforms a HEX encoded color and an opacity value to a RGB(A) notation.
   *
   * @param {string} colorString HEX encoded color
   * @param {number} opacity  Opacity (Betweeen 0 and 1)
   * @return {string} the RGB(A) value of the input color
   */
  public static getRgbaColor(colorString: string, opacity: number) {
    if (colorString.startsWith('rgba(')) {
      return colorString;
    }

    // check if is valid HEX color - see also here
    // https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation/8027444
    const isHexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colorString);
    if (!isHexColor) {
      return;
    }

    const r = parseInt(colorString.slice(1, 3), 16);
    const g = parseInt(colorString.slice(3, 5), 16);
    const b = parseInt(colorString.slice(5, 7), 16);

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
   * Transforms a RGB(A) or named color value to a HEX encoded notation.
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
      return OlStyleUtil.getHexCodeFromRgbArray(colorArr);
    } else if (colors[inColor.toLocaleLowerCase()] !== undefined) {
      const rgbColorArr = colors[inColor.toLocaleLowerCase()];
      return OlStyleUtil.getHexCodeFromRgbArray(rgbColorArr);
    } else {
      return;
    }
  }

  /**
   * Returns the hex code for a given RGB(A) array.
   *
   * @param colorArr RGB(A) array. e.g. [255,0,0]
   * @return {string} The HEX color representation of the given color
   */
  public static getHexCodeFromRgbArray(colorArr: number[]): string {
    return '#' + colorArr.map((x, idx) => {
      const hex = x.toString(16);
      // skip opacity of available
      if (idx < 3) {
        // return hex;
        return hex.length === 1 ? '0' + hex : hex;
      }
      return '';
    }).join('');
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

  /**
   * Returns true if the given mark symbolizer is based on a font glyph
   * (i.e. has a well known name property starting with 'ttf://').
   *
   * @param symbolizer The TextSymbolizer to derive the font string from
   */
  public static getIsFontGlyphBased(symbolizer: MarkSymbolizer) {
    return WELLKNOWNNAME_TTF_REGEXP.test(symbolizer.wellKnownName);
  }

  /**
   * Returns whether the given font (as used in the OpenLayers Text Style `font` property)
   * is intended for a mark symbolizer or not.
   * This is done by checking whether the dummy DUMMY_MARK_SYMBOLIZER_FONT font name is present.
   *
   * @param font The text font to analyze
   */
  public static getIsMarkSymbolizerFont(font: string) {
    const search = DUMMY_MARK_SYMBOLIZER_FONT;
    return font.substring(font.length - search.length, font.length) === search;
  }

  /**
   * Returns an OL compliant font string, to be used for mark symbolizers
   * using a font glyph.
   * This also includes a dummy DUMMY_MARK_SYMBOLIZER_FONT font name at the end of the
   * string to allow determining that this font was intended for a mark symbolizer
   * later on.
   *
   * @param symbolizer The TextSymbolizer to derive the font string from
   */
  public static getTextFontForMarkSymbolizer(symbolizer: MarkSymbolizer) {
    const parts = symbolizer.wellKnownName.match(WELLKNOWNNAME_TTF_REGEXP);
    if (!parts) {
      throw new Error(`Could not parse font-based well known name: ${symbolizer.wellKnownName}`);
    }
    const fontFamily = parts[1];
    return `Normal ${symbolizer.radius || 5}px '${fontFamily}', ${DUMMY_MARK_SYMBOLIZER_FONT}`;
  }

  /**
   * Returns a 1-char string to be used as text for mark symbolizers using a font glyph.
   *
   * @param symbolizer The MarkSymbolizer to derive the character string from
   */
  public static getCharacterForMarkSymbolizer(symbolizer: MarkSymbolizer) {
    const parts = symbolizer.wellKnownName.match(WELLKNOWNNAME_TTF_REGEXP);
    if (!parts) {
      throw new Error(`Could not parse font-based well known name: ${symbolizer.wellKnownName}`);
    }
    return String.fromCharCode(parseInt(parts[2], 16));
  }

  /**
   * Returns the font name used in the OpenLayers text style `font` property.
   *
   * @param olFont the `font` property of an OpenLayers text style
   */
  public static getFontNameFromOlFont(olFont: string) {
    const parts = olFont.match(/(?:\d+\S+) '?"?([^,'"]+)/);
    if (!parts) {
      throw new Error(`Could not find font family name in the following string: ${olFont}`);
    }
    return parts[1];
  }

  /**
   * Returns the size in pixels specified in the OpenLayers text style `font` property,
   * or 0 if not found.
   *
   * @param olFont the `font` property of an OpenLayers text style
   */
  public static getSizeFromOlFont(olFont: string) {
    const parts = olFont.match(/(?:(\d+)px)/);
    return parts ? parseInt(parts[1], 10) : 0;
  }

  /**
   * Resolves the given template string with the given feature attributes, e.g.
   * the template "Size of area is {{AREA_SIZE}} km²" would be to resolved
   * to "Size of area is 1909 km²" (assuming the feature's attribute AREA_SIZE
   * really exists).
   *
   * @param {ol.Feature} feature The feature to get the attributes from.
   * @param {String} template The template string to resolve.
   * @param {String} [noValueFoundText] The text to apply, if the templated value
   *   could not be found, default is to 'n.v.'.
   * @param {Function} [valueAdjust] A method that will be called with each
   *   key/value match, we'll use what this function returns for the actual
   *   replacement. Optional, defaults to a function which will return the raw
   *   value it received. This can be used for last minute adjustments before
   *   replacing happens, e.g. to filter out falsy values or to do number
   *   formatting and such.
   * @return {String} The resolved template string.
   */
  static resolveAttributeTemplate(
    feature: any,
    template: string,
    noValueFoundText: string = 'n.v.',
    valueAdjust: Function = (key: string, val: any) => val
  ) {

    let attributeTemplatePrefix = '\\{\\{';
    let attributeTemplateSuffix = '\\}\\}';

    // Find any character between two braces (including the braces in the result)
    let regExp = new RegExp(attributeTemplatePrefix + '(.*?)' + attributeTemplateSuffix, 'g');
    let regExpRes = template.match(regExp);

    // If we have a regex result, it means we found a placeholder in the
    // template and have to replace the placeholder with its appropriate value.
    if (regExpRes) {
      // Iterate over all regex match results and find the proper attribute
      // for the given placeholder, finally set the desired value to the hover.
      // field text
      regExpRes.forEach(res => {
        // We count every non matching candidate. If this count is equal to
        // the objects length, we assume that there is no match at all and
        // set the output value to the value of "noValueFoundText".
        let noMatchCnt = 0;

        for (let [key, value] of Object.entries(feature.getProperties())) {
          // Remove the suffixes and find the matching attribute column.
          let attributeName = res.slice(2, res.length - 2);

          if (attributeName.toLowerCase() === key.toLowerCase()) {
            template = template.replace(res, valueAdjust(key, value));
            break;
          } else {
            noMatchCnt++;
          }
        }

        // No key match found for this feature (e.g. if key not
        // present or value is null).
        if (noMatchCnt === Object.keys(feature.getProperties()).length) {
          template = template.replace(res, noValueFoundText);
        }
      });
    }

    return template;
  }
}

export default OlStyleUtil;

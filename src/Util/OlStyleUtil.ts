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
        // skip opacity of available
        if (idx < 3) {
          // return hex;
          return hex.length === 1 ? '0' + hex : hex;
        }
        return '';
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
    feature: ol.Feature,
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

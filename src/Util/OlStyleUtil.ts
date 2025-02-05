import {
  Expression,
  MarkSymbolizer,
  PropertyType,
  Style,
  TextSymbolizer
} from 'geostyler-style/dist/style';

import {
  Fcase,
  GeoStylerBooleanFunction,
  GeoStylerFunction,
  GeoStylerNumberFunction,
  GeoStylerStringFunction,
  GeoStylerUnknownFunction,
} from 'geostyler-style/dist/functions';

import {
  isGeoStylerBooleanFunction,
  isGeoStylerFunction,
  isGeoStylerNumberFunction,
  isGeoStylerStringFunction,
  isGeoStylerUnknownFunction
} from 'geostyler-style/dist/typeguards';

import OlFeature from 'ol/Feature';
import { colors } from './colors';

const WELLKNOWNNAME_TTF_REGEXP = /^ttf:\/\/(.+)#(.+)$/;
const SVG_URI_SCHEME = 'data:image/svg+xml;utf8,';
export const LINE_WELLKNOWNNAMES = ['horline', 'vertline', 'line'];
export const NOFILL_WELLKNOWNNAMES = ['horline', 'vertline', 'line', 'cross', 'cross2', 'slash', 'backslash', 'oarrow'];
export const DUMMY_MARK_SYMBOLIZER_FONT = 'geostyler-mark-symbolizer';
export const DEGREES_TO_RADIANS = Math.PI / 180;

/**
 * Offers some utility functions to work with OpenLayers Styles.
 */
class OlStyleUtil {

  /**
   * Transforms a HEX encoded color and an opacity value to a RGB(A) notation.
   *
   * @param colorString HEX encoded color
   * @param opacity  Opacity (Betweeen 0 and 1)
   * @return the RGB(A) value of the input color
   */
  public static getRgbaColor(colorString: string | GeoStylerStringFunction, opacity: number | GeoStylerNumberFunction) {
    if (isGeoStylerStringFunction(colorString)) {
      colorString = OlStyleUtil.evaluateStringFunction(colorString);
    }

    if (typeof(colorString) !== 'string') {
      return;
    }
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

    if (isGeoStylerNumberFunction(opacity)) {
      opacity = OlStyleUtil.evaluateNumberFunction(opacity);
    }

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
      // skip opacity if passed as fourth entry
      if (idx < 3) {
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
   * Checks if the given opacity value is valid.
   * A valid opacity is a number between 0 and 1.
   * Value 1 is ignored as this the default value.
   * If the value is not valid, false is returned.
   * @param opacity The opacity value to check
   * @return true if the opacity is valid, false otherwise
   */
  public static checkOpacity(opacity: number | string | undefined): boolean {
    return typeof opacity === 'number' && opacity >= 0 && opacity < 1;
  }

  /**
   * Returns an OL compliant font string.
   *
   * @param symbolizer The TextSymbolizer to derive the font string from
   */
  public static getTextFont(symbolizer: TextSymbolizer) {
    const fontWeight = symbolizer.fontWeight ?? 'normal';
    const fontStyle = symbolizer.fontStyle ?? 'normal';

    const size = symbolizer.size;
    const font = symbolizer.font;
    return fontWeight + ' ' + fontStyle + ' ' + size + 'px ' + font?.join(', ');
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
    if (!font) {
      return false;
    }
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
   * Encodes the given SVG string using URI encoding to remove special characters.
   *
   * @param svgString the SVG string to encode
   * @returns the URI encoded SVG string
   */
  public static getEncodedSvg(svgString: string) {
    return SVG_URI_SCHEME + encodeURIComponent(svgString);
  }

  /**
   * Decodes a URI encoded SVG string.
   *
   * @param svgEncodedString The URI encoded SVG string to decode.
   * @returns The decoded SVG string.
   */
  public static getDecodedSvg(svgEncodedString: string) {
    return decodeURIComponent(svgEncodedString).replace(SVG_URI_SCHEME, '');
  }

  /**
   * Resolves the given template string with the given feature attributes, e.g.
   * the template "Size of area is {{AREA_SIZE}} km²" would be to resolved
   * to "Size of area is 1909 km²" (assuming the feature's attribute AREA_SIZE
   * really exists).
   *
   * @param feature The feature to get the attributes from.
   * @param template The template string to resolve.
   * @param [noValueFoundText] The text to apply, if the templated value
   *   could not be found, default is to 'n.v.'.
   * @param [valueAdjust] A method that will be called with each
   *   key/value match, we'll use what this function returns for the actual
   *   replacement. Optional, defaults to a function which will return the raw
   *   value it received. This can be used for last minute adjustments before
   *   replacing happens, e.g. to filter out falsy values or to do number
   *   formatting and such.
   * @return The resolved template string.
   */
  static resolveAttributeTemplate(
    feature: OlFeature,
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

  public static evaluateFunction(func: GeoStylerFunction, feature?: OlFeature): PropertyType {
    if (func.name === 'property') {
      if (!feature) {
        throw new Error(`Could not evalute 'property' function. Feature ${feature} is not defined.`);
      }
      if (isGeoStylerStringFunction(func.args[0])) {
        return feature?.get(OlStyleUtil.evaluateStringFunction(func.args[0], feature));
      } else {
        return feature?.get(func.args[0]);
      }
    }

    if (isGeoStylerUnknownFunction(func)) {
      return OlStyleUtil.evaluateUnknownFunction(func, feature);
    }
    if (isGeoStylerStringFunction(func)) {
      return OlStyleUtil.evaluateStringFunction(func, feature);
    }
    if (isGeoStylerNumberFunction(func)) {
      return OlStyleUtil.evaluateNumberFunction(func, feature);
    }
    if (isGeoStylerBooleanFunction(func)) {
      return OlStyleUtil.evaluateBooleanFunction(func, feature);
    }
    return;
  }

  public static evaluateBooleanFunction(func: GeoStylerBooleanFunction, feature?: OlFeature): boolean {
    const args = func.args.map(arg => {
      if (isGeoStylerFunction(arg)) {
        return OlStyleUtil.evaluateFunction(arg, feature);
      }
      return arg;
    });
    switch (func.name) {
      case 'all':
        return args.map(arg => this.evaluateBooleanFunction(arg as GeoStylerBooleanFunction, feature))
          .every(result => result === true);
      case 'any':
        return args.map(arg => this.evaluateBooleanFunction(arg as GeoStylerBooleanFunction, feature))
          .some(result => result === true);
      case 'between':
        return (args[0] as number) >= (args[1] as number) && (args[0] as number) <= (args[2] as number);
      case 'double2bool':
        // TODO: evaluate this correctly
        return false;
      case 'equalTo':
        return args[0] === args[1];
      case 'greaterThan':
        return (args[0] as number) > (args[1] as number);
      case 'greaterThanOrEqualTo':
        return (args[0] as number) >= (args[1] as number);
      case 'in':
        return args.slice(1).includes(args[0]);
      case 'lessThan':
        return (args[0] as number) < (args[1] as number);
      case 'lessThanOrEqualTo':
        return (args[0] as number) <= (args[1] as number);
      case 'not':
        return !args[0];
      case 'notEqualTo':
        return args[0] !== args[1];
      case 'parseBoolean':
        return !!args[0];
      case 'strEndsWith':
        return (args[0] as string).endsWith(args[1] as string);
      case 'strEqualsIgnoreCase':
        return (args[0] as string).toLowerCase() === (args[1] as string).toLowerCase() ;
      case 'strMatches':
        const regEx = (args[1] as string);
        const regexArray = regEx.match(/\/(.*?)\/([gimy]{0,4})$/);
        if (regexArray && regexArray.length === 3){
          return new RegExp(regexArray[1], regexArray[2]).test(args[0] as string);
        } else {
          return false;
        }
      case 'strStartsWith':
        return (args[0] as string).startsWith(args[1] as string);
      default:
        return false;
    }
  }

  public static evaluateNumberFunction(func: GeoStylerNumberFunction, feature?: OlFeature): number {
    if (func.name === 'pi') {
      return Math.PI;
    }
    if (func.name === 'random') {
      return Math.random();
    }
    const args = func.args.map(arg => {
      if (isGeoStylerFunction(arg)) {
        return OlStyleUtil.evaluateFunction(arg, feature);
      }
      return arg;
    });
    switch (func.name) {
      case 'abs':
        return Math.abs(args[0] as number);
      case 'acos':
        return Math.acos(args[0] as number);
      case 'add':
        return (args[0] as number) + (args[1] as number);
      case 'asin':
        return Math.asin(args[0] as number);
      case 'atan':
        return Math.atan(args[0] as number);
      case 'atan2':
        // TODO: evaluate this correctly
        return args[0] as number;
      case 'ceil':
        return Math.ceil(args[0] as number);
      case 'cos':
        return Math.cos(args[0] as number);
      case 'div':
        return (args[0] as number) / (args[1] as number);
      case 'exp':
        return Math.exp(args[0] as number);
      case 'floor':
        return Math.floor(args[0] as number);
      case 'log':
        return Math.log(args[0] as number);
      case 'max':
        return Math.max(...(args as number[]));
      case 'min':
        return Math.min(...(args as number[]));
      case 'modulo':
        return (args[0] as number) % (args[1] as number);
      case 'mul':
        return (args[0] as number) * (args[1] as number);
      case 'pow':
        return Math.pow(args[0] as number, args[1] as number);
      case 'rint':
        // TODO: evaluate this correctly
        return args[0] as number;
      case 'round':
        return Math.round(args[0] as number);
      case 'sin':
        return Math.sin(args[0] as number);
      case 'sqrt':
        return Math.sqrt(args[0] as number);
      case 'strIndexOf':
        return (args[0] as string).indexOf(args[1] as string);
      case 'strLastIndexOf':
        return (args[0] as string).lastIndexOf(args[1] as string);
      case 'strLength':
        return (args[0] as string).length;
      case 'sub':
        return (args[0] as number) - (args[1] as number);
      case 'tan':
        return Math.tan(args[0] as number);
      case 'toDegrees':
        return (args[0] as number) / DEGREES_TO_RADIANS;
      case 'toRadians':
        return (args[0] as number) * DEGREES_TO_RADIANS;
      default:
        return args[0] as number;
    }
  }

  public static evaluateUnknownFunction(func: GeoStylerUnknownFunction, feature?: OlFeature): unknown {
    const args = func.args.map(arg => {
      if (isGeoStylerFunction(arg)) {
        return OlStyleUtil.evaluateFunction(arg, feature);
      }
      return arg;
    });
    switch (func.name) {
      case 'property':
        return feature?.get(args[0] as string);
      case 'case':
        type FCaseParameter = {
          case: Expression<boolean>;
          value: Expression<PropertyType>;
        };
        const caseArgs: Fcase['args'] = args as Fcase['args'];
        let match;
        for (let index = 0; index < caseArgs.length; index++) {
          const caseArg = caseArgs[index] as FCaseParameter;
          // last arg of the case-function-expression is the default value
          if (index === caseArgs.length - 1) {
            match = caseArg;
            break;
          // the case can be a boolean
          } else if (caseArg.case === true) {
            match = caseArg.value;
            break;
          // … or a boolean function that has to be evaluated first
          } else if (OlStyleUtil.evaluateBooleanFunction(caseArg.case as GeoStylerBooleanFunction, feature)) {
            match = caseArg.value;
            break;
          }
        }
        return match;
      default:
        return args[0];
    }
  }

  public static evaluateStringFunction(func: GeoStylerStringFunction, feature?: OlFeature): string {
    const args = func.args.map(arg => {
      if (isGeoStylerFunction(arg)) {
        return OlStyleUtil.evaluateFunction(arg, feature);
      }
      return arg;
    });
    switch (func.name) {
      case 'numberFormat':
        // TODO: evaluate this correctly
        return args[0] as string;
      case 'strAbbreviate':
        // TODO: evaluate this correctly
        return args[0] as string;
      case 'strCapitalize':
        // https://stackoverflow.com/a/32589289/10342669
        var splitStr = (args[0] as string).toLowerCase().split(' ');
        for (let part of splitStr) {
          part = part.charAt(0).toUpperCase() + part.substring(1);
        }
        return splitStr.join(' ');
      case 'strConcat':
        return args.join();
      case 'strDefaultIfBlank':
        return (args[0] as string)?.length < 1 ? args[1] as string : args[0] as string;
      case 'strReplace':
        if (args[3] === true) {
          return (args[0] as string).replaceAll(args[1] as string, args[2] as string);
        } else {
          return (args[0] as string).replace(args[1] as string, args[2] as string);
        }
      case 'strStripAccents':
        // https://stackoverflow.com/a/37511463/10342669
        return (args[0] as string).normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
      case 'strSubstring':
        return (args[0] as string).substring(args[1] as number, args[2] as number);
      case 'strSubstringStart':
        return (args[0] as string).substring(args[1] as number);
      case 'strToLowerCase':
        return (args[0] as string).toLowerCase();
      case 'strToUpperCase':
        return (args[0] as string).toUpperCase();
      case 'strTrim':
        return (args[0] as string).trim();
      default:
        return args[0] as string;
    }
  }

  public static containsGeoStylerFunctions(style: Style) {
    return style.rules.some(rule => {
      const filterHasFunction = Array.isArray(rule.filter) && rule.filter?.some(isGeoStylerFunction);
      const styleHasFunction = rule.symbolizers?.some(symbolizer => {
        return Object.values(symbolizer).some(isGeoStylerFunction);
      });
      const scaleDenominatorHasFunction = isGeoStylerFunction(rule?.scaleDenominator?.max)
      || isGeoStylerFunction(rule?.scaleDenominator?.min);
      return filterHasFunction || styleHasFunction || scaleDenominatorHasFunction;
    });
  }
}

export default OlStyleUtil;

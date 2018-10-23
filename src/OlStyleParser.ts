import {
  Style,
  StyleParser,
  Rule,
  Symbolizer,
  MarkSymbolizer,
  LineSymbolizer,
  FillSymbolizer,
  TextSymbolizer,
  StyleType,
  PointSymbolizer,
  IconSymbolizer
} from 'geostyler-style';

import OlStyle from 'ol/style/style';
import OlStyleImage from 'ol/style/image';
import OlStyleFill from 'ol/style/fill';
import OlStyleStroke from 'ol/style/stroke';
import OlStyleText from 'ol/style/text';
import OlStyleCircle from 'ol/style/circle';
import OlStyleIcon from 'ol/style/icon';
import OlStyleRegularshape from 'ol/style/regularshape';

const _get = require('lodash/get');

import OlStyleUtil from './Util/OlStyleUtil';
import { isNumber } from 'util';
const _get = require('lodash/get');

export type OlParserStyleFct = ol.StyleFunction & {
  __geoStylerStyle: Style
};

export type OlParserStyleFct = ol.StyleFunction & {
  __geoStylerStyle: Style
};

/**
 * This parser can be used with the GeoStyler.
 * It implements the GeoStyler-Style Parser interface to work with OpenLayers styles.
 *
 * @class OlStyleParser
 * @implements StyleParser
 */
export class OlStyleParser implements StyleParser {

  OlStyleConstructor: any = OlStyle;
  OlStyleImageConstructor: any = OlStyleImage;
  OlStyleFillConstructor: any = OlStyleFill;
  OlStyleStrokeConstructor: any = OlStyleStroke;
  OlStyleTextConstructor: any = OlStyleText;
  OlStyleCircleConstructor: any = OlStyleCircle;
  OlStyleIconConstructor: any = OlStyleIcon;
  OlStyleRegularshapeConstructor: any = OlStyleRegularshape;

  isOlParserStyleFct = (x: any): x is OlParserStyleFct => {
    return typeof x === 'function';
  }

  constructor(ol?: any) {
    if (ol) {
      this.OlStyleConstructor = ol.style.Style;
      this.OlStyleImageConstructor = ol.style.Image;
      this.OlStyleFillConstructor = ol.style.Fill;
      this.OlStyleStrokeConstructor = ol.style.Stroke;
      this.OlStyleTextConstructor = ol.style.Text;
      this.OlStyleCircleConstructor = ol.style.Circle;
      this.OlStyleIconConstructor = ol.style.Icon;
      this.OlStyleRegularshapeConstructor = ol.style.RegularShape;
    }
  }

  /**
   * The name of the OlStyleParser.
   */
  public static title = 'OpenLayers Style Parser';

  /**
   * Get the GeoStyler-Style PointSymbolizer from an OpenLayers Style object.
   *
   * @param {object} olStyle The OpenLayers Style object
   * @return {PointSymbolizer} The GeoStyler-Style PointSymbolizer
   */
  getPointSymbolizerFromOlStyle(olStyle: OlStyle): PointSymbolizer {
    let pointSymbolizer: PointSymbolizer;
    if (olStyle.getImage() instanceof OlStyleCircle) {
      // circle
      const olCircleStyle = olStyle.getImage() as OlStyleCircle;
      const olFillStyle = olCircleStyle.getFill();
      const olStrokeStyle = olCircleStyle.getStroke();
      const circleSymbolizer: MarkSymbolizer = {
        kind: 'Mark',
        wellKnownName: 'Circle',
        color: olFillStyle ? OlStyleUtil.getHexColor(olFillStyle.getColor() as string) : undefined,
        opacity: olFillStyle ? OlStyleUtil.getOpacity(olFillStyle.getColor() as string) : undefined,
        radius: (olCircleStyle.getRadius() !== 0) ? olCircleStyle.getRadius() : 5,
        strokeColor: olStrokeStyle ? olStrokeStyle.getColor() as string : undefined,
        strokeOpacity: olStrokeStyle ? OlStyleUtil.getOpacity(olStrokeStyle.getColor() as string) : undefined,
        strokeWidth: olStrokeStyle ? olStrokeStyle.getWidth() : undefined
      };
      pointSymbolizer = circleSymbolizer;
    } else if (olStyle.getImage() instanceof OlStyleRegularshape) {
      // square, triangle, star, cross or x
      const olRegularStyle = olStyle.getImage() as OlStyleRegularshape;
      const olFillStyle = olRegularStyle.getFill();
      const olStrokeStyle = olRegularStyle.getStroke();
      const radius = olRegularStyle.getRadius();
      const radius2 = olRegularStyle.getRadius2();
      const points = olRegularStyle.getPoints();
      const angle = olRegularStyle.getAngle();

      let markSymbolizer: MarkSymbolizer = {
        kind: 'Mark',
        color: olFillStyle ? OlStyleUtil.getHexColor(olFillStyle.getColor() as string) : undefined,
        opacity: olFillStyle ? OlStyleUtil.getOpacity(olFillStyle.getColor() as string) : undefined,
        strokeColor: olStrokeStyle ? olStrokeStyle.getColor() as string : undefined,
        strokeOpacity: olStrokeStyle ? OlStyleUtil.getOpacity(olStrokeStyle.getColor() as string) : undefined,
        strokeWidth: olStrokeStyle ? olStrokeStyle.getWidth() : undefined,
        radius: (radius !== 0) ? radius : 5,
        // Rotation in openlayers is radians while we use degree
        rotate: olRegularStyle.getRotation() / Math.PI * 180
      } as MarkSymbolizer;

      switch (points) {
        case 2:
          switch (angle) {
            case 0:
              markSymbolizer.wellKnownName = 'shape://vertline';
              break;
            case Math.PI / 2:
              markSymbolizer.wellKnownName = 'shape://horline';
              break;
            case Math.PI / 4:
              markSymbolizer.wellKnownName = 'shape://slash';
              break;
            case 2 * Math.PI - (Math.PI / 4): 
              markSymbolizer.wellKnownName = 'shape://backslash';
              break;
            default:
              break;
          }
          break;
        case 3:
          switch (angle) {
            case 0:
              markSymbolizer.wellKnownName = 'Triangle';
              break;
            case Math.PI / 2:
              markSymbolizer.wellKnownName = 'shape://carrow';
              break;
            default:
              break;
          }
          break;
        case 4:
          if (isNumber(radius2)) {
            // cross or x
            if (olRegularStyle.getAngle() === 0) {
              // cross
              markSymbolizer.wellKnownName = 'Cross';
            } else {
              // x
              markSymbolizer.wellKnownName = 'X';
            }
          } else {
            // square
            markSymbolizer.wellKnownName = 'Square';
          }
          break;
        case 5:
          // star
          markSymbolizer.wellKnownName = 'Star';
          break;
        default:
          throw new Error(`Could not parse OlStyle. Only 2, 3, 4 or 5 point regular shapes are allowed`);
      }
      pointSymbolizer = markSymbolizer;
    } else {
      // icon
      const olIconStyle: OlStyleIcon = olStyle.getImage() as OlStyleIcon;
      let iconSymbolizer: IconSymbolizer = {
        kind: 'Icon',
        image: olIconStyle.getSrc() ? olIconStyle.getSrc() : undefined,
        opacity: olIconStyle.getOpacity(),
        size: (olIconStyle.getScale() !== 0) ? olIconStyle.getScale() : 5,
        // Rotation in openlayers is radians while we use degree
        rotate: olIconStyle.getRotation() / Math.PI * 180
      };
      pointSymbolizer = iconSymbolizer;
    }
    return pointSymbolizer;
  }

  /**
   * Get the GeoStyler-Style LineSymbolizer from an OpenLayers Style object.
   *
   * @param {object} olStyle The OpenLayers Style object
   * @return {LineSymbolizer} The GeoStyler-Style LineSymbolizer
   */
  getLineSymbolizerFromOlStyle(olStyle: OlStyle): LineSymbolizer {
    const olStrokeStyle = olStyle.getStroke() as OlStyleStroke;

    return {
      kind: 'Line',
      color: olStrokeStyle ? OlStyleUtil.getHexColor(olStrokeStyle.getColor() as string) as string : undefined,
      opacity: olStrokeStyle ? OlStyleUtil.getOpacity(olStrokeStyle.getColor() as string) : undefined,
      width: olStrokeStyle ? olStrokeStyle.getWidth() : undefined,
      cap: olStrokeStyle ? <LineSymbolizer['cap']> olStrokeStyle.getLineCap() : 'butt',
      join: olStrokeStyle ? <LineSymbolizer['join']> olStrokeStyle.getLineJoin() : 'miter',
      dasharray: olStrokeStyle ? olStrokeStyle.getLineDash() : undefined,
      dashOffset: olStrokeStyle ? olStrokeStyle.getLineDashOffset() : undefined
    };
  }

  /**
   * Get the GeoStyler-Style FillSymbolizer from an OpenLayers Style object.
   *
   * PolygonSymbolizer Stroke is just partially supported.
   *
   * @param {OlStyle} olStyle The OpenLayers Style object
   * @return {FillSymbolizer} The GeoStyler-Style FillSymbolizer
   */
  getFillSymbolizerFromOlStyle(olStyle: OlStyle): FillSymbolizer {
    const olFillStyle = olStyle.getFill() as OlStyleFill;
    const olStrokeStyle = olStyle.getStroke() as OlStyleStroke;

    return {
      kind: 'Fill',
      color: olFillStyle ? OlStyleUtil.getHexColor(olFillStyle.getColor() as string) : undefined,
      opacity: olFillStyle ? OlStyleUtil.getOpacity(olFillStyle.getColor() as string) : undefined,
      outlineColor: olStrokeStyle ? olStrokeStyle.getColor() as string : undefined,
      outlineWidth: olStrokeStyle ? olStrokeStyle.getWidth() as number : undefined
    };
  }

  /**
   * Get the GeoStyler-Style TextSymbolizer from an OpenLayers Style object.
   *
   *
   * @param {OlStyle} olStyle The OpenLayers Style object
   * @return {TextSymbolizer} The GeoStyler-Style TextSymbolizer
   */
  getTextSymbolizerFromOlStyle(olStyle: OlStyle): TextSymbolizer {
    const olTextStyle = olStyle.getText() as OlStyleText;
    const olFillStyle = olTextStyle.getFill() as OlStyleFill;
    const olStrokeStyle = olTextStyle.getStroke() as OlStyleStroke;
    const offsetX = olTextStyle.getOffsetX();
    const offsetY = olTextStyle.getOffsetY();
    const font = olTextStyle.getFont();
    const rotation = olTextStyle.getRotation();
    const text = olTextStyle.getText();
    let fontStyleWeightSize: string;
    let fontSizePart: string[];
    let fontSize: number = Infinity;
    let fontFamily: string[]|undefined = undefined;

    if (font) {
      const fontSplit = font.split('px');
      // font-size is always the first part of font-size/line-height
      fontStyleWeightSize = fontSplit[0].trim();

      fontSizePart = fontStyleWeightSize.split(' ');
      // The last element contains font size
      fontSize = parseInt(fontSizePart[fontSizePart.length - 1], 10);
      let fontFamilyPart: string = fontSplit.length === 2 ?
        fontSplit[1] : fontSplit[2];
      fontFamily = fontFamilyPart.split(',').map((fn: string) => {
        return fn.startsWith(' ') ? fn.slice(1) : fn;
      });
    }

    return {
      kind: 'Text',
      label: text,
      color: olFillStyle ? OlStyleUtil.getHexColor(olFillStyle.getColor() as string) : undefined,
      size: isFinite(fontSize) ? fontSize : undefined,
      font: fontFamily,
      offset: (offsetX !== undefined) && (offsetY !== undefined) ? [offsetX, offsetY] : [0, 0],
      haloColor: olStrokeStyle && olStrokeStyle.getColor() ?
        OlStyleUtil.getHexColor(olStrokeStyle.getColor() as string) : undefined,
      haloWidth: olStrokeStyle ? olStrokeStyle.getWidth() : undefined,
      rotate: (rotation !== undefined) ? rotation / Math.PI * 180 : undefined
    };
  }

  /**
   * Get the GeoStyler-Style Symbolizer from an OpenLayers Style object.
   *
   * @param {OlStyle} olStyle The OpenLayers Style object
   * @return {Symbolizer[]} The GeoStyler-Style Symbolizer array
   */
  getSymbolizersFromOlStyle(olStyles: OlStyle[]): Symbolizer[] {
    const symbolizers: Symbolizer[] = [];
    olStyles.forEach((olStyle: OlStyle) => {
      let symbolizer: Symbolizer;
      const styleType: StyleType = this.getStyleTypeFromOlStyle(olStyle);
      switch (styleType) {
        case 'Point':
          if (olStyle.getText()) {
            symbolizer = this.getTextSymbolizerFromOlStyle(olStyle);
          } else {
            symbolizer = this.getPointSymbolizerFromOlStyle(olStyle);
          }
          break;
        case 'Line':
          symbolizer = this.getLineSymbolizerFromOlStyle(olStyle);
          break;
        case 'Fill':
          symbolizer = this.getFillSymbolizerFromOlStyle(olStyle);
          break;
        default:
          throw new Error('Failed to parse SymbolizerKind from OpenLayers Style');
      }
      symbolizers.push(symbolizer);
    });

    return symbolizers;
  }

  /**
   * Get the GeoStyler-Style Rule from an OpenLayers Style object.
   *
   * @param {OlStyle} olStyle The OpenLayers Style object
   * @return {Rule} The GeoStyler-Style Rule
   */
  getRuleFromOlStyle(olStyles: OlStyle|OlStyle[]): Rule {
    let rule: Rule;
    let symbolizers: Symbolizer[];
    const name = 'OL Style Rule 0';

    if (Array.isArray(olStyles)) {
      symbolizers = this.getSymbolizersFromOlStyle(olStyles);
    } else {
      symbolizers = this.getSymbolizersFromOlStyle([olStyles]);
    }

    rule = {
      name, symbolizers
    };

    return rule;
  }

  /**
   * Get the GeoStyler-Style Symbolizer from an OpenLayers Style object.
   *
   * @param {OlStyle} olStyle The OpenLayers Style object
   * @return {Symbolizer} The GeoStyler-Style Symbolizer
   */
  getStyleTypeFromOlStyle(olStyle: OlStyle): StyleType {
    let styleType: StyleType;

    if (olStyle.getImage() instanceof OlStyleImage) {
      styleType = 'Point';
    } else if (olStyle.getText() instanceof OlStyleText) {
      styleType = 'Point';
    } else if (olStyle.getFill() instanceof OlStyleFill) {
      styleType = 'Fill';
    } else if (olStyle.getStroke() && !olStyle.getFill()) {
      styleType = 'Line';
    } else {
      throw new Error('StyleType could not be detected');
    }

    return styleType;
  }

  /**
   * Get the GeoStyler-Style Style from an OpenLayers Style object.
   *
   * @param {object} olStyle The OpenLayers Style object
   * @return {Style} The GeoStyler-Style Style
   */
  olStyleToGeoStylerStyle(olStyle: OlStyle|OlStyle[]): Style {
    const name = 'OL Style';
    const rule = this.getRuleFromOlStyle(olStyle);
    return {
      name,
      rules: [rule]
    };
  }

  /**
   * The readStyle implementation of the GeoStyler-Style StyleParser interface.
   * It reads an OpenLayers Style, an array of OpenLayers Styles or an olParserStyleFct and returns a Promise.
   *
   * The Promise itself resolves with a GeoStyler-Style Style.
   *
   * @param {OlStyle|OlStyle[]|OlParserStyleFct} olStyle The style to be parsed
   * @return {Promise} The Promise resolving with the GeoStyler-Style Style
   */
  readStyle(olStyle: OlStyle|OlStyle[]|OlParserStyleFct): Promise<Style> {
    return new Promise<Style>((resolve, reject) => {
      try {
        if (this.isOlParserStyleFct(olStyle)) {
          resolve(olStyle.__geoStylerStyle);
        } else {
          const geoStylerStyle: Style = this.olStyleToGeoStylerStyle(olStyle);
          resolve(geoStylerStyle);
        }

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * The writeStyle implementation of the GeoStyler-Style StyleParser interface.
   * It reads a GeoStyler-Style Style and returns a Promise.
   * The Promise itself resolves one of three types
   *
   * 1. OlStyle if input Style consists of
   *    one rule with one symbolizer, no filter, no scaleDenominator, no TextSymbolizer
   * 2. OlStyle[] if input Style consists of
   *    one rule with multiple symbolizers, no filter, no scaleDenominator, no TextSymbolizer
   * 3. OlParserStyleFct for everything else
   *
   * @param {Style} geoStylerStyle A GeoStyler-Style Style.
   * @return {Promise} The Promise resolving with one of above mentioned style types.
   */
  writeStyle(geoStylerStyle: Style): Promise<(OlStyle|OlStyle[]|OlParserStyleFct)> {
    return new Promise<any>((resolve, reject) => {
      try {

        const olStyle: (OlStyle|OlStyle[]|OlParserStyleFct) = this.getOlStyleTypeFromGeoStylerStyle(geoStylerStyle);
        resolve(olStyle);

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Decides which OlStyleType should be returned depending on given geoStylerStyle.
   * Three OlStyleTypes are possible:
   *
   * 1. OlStyle if input Style consists of
   *    one rule with one symbolizer, no filter, no scaleDenominator, no TextSymbolizer
   * 2. OlStyle[] if input Style consists of
   *    one rule with multiple symbolizers, no filter, no scaleDenominator, no TextSymbolizer
   * 3. OlParserStyleFct for everything else
   *
   * @param {geoStylerStyle} A GeoStyler-Style Style
   * @return {OlStyle|OlStyle[]|OlParserStyleFct}
   */
  getOlStyleTypeFromGeoStylerStyle(geoStylerStyle: Style): OlStyle|OlStyle[]|OlParserStyleFct {
    const rules = geoStylerStyle.rules;
    const nrRules = rules.length;
    if (nrRules === 1) {
      const hasFilter = _get(geoStylerStyle, 'rules[0].filter') !== undefined ? true : false;
      const hasMinScale = _get(geoStylerStyle, 'rules[0].scaleDenominator.min') !== undefined ? true : false;
      const hasMaxScale = _get(geoStylerStyle, 'rules[0].scaleDenominator.max') !== undefined ? true : false;
      const hasScaleDenominator = hasMinScale || hasMaxScale ? true : false;
      const nrSymbolizers = geoStylerStyle.rules[0].symbolizers.length;
      const hasTextSymbolizer = rules[0].symbolizers.some((symbolizer: Symbolizer) => {
        return symbolizer.kind === 'Text';
      });
      if (!hasFilter && !hasScaleDenominator && !hasTextSymbolizer) {
        if (nrSymbolizers === 1) {
          return this.geoStylerStyleToOlStyle(geoStylerStyle);
        } else {
          return this.geoStylerStyleToOlStyleArray(geoStylerStyle);
        }
      } else {
        return this.geoStylerStyleToOlParserStyleFct(geoStylerStyle);
      }
    } else {
      return this.geoStylerStyleToOlParserStyleFct(geoStylerStyle);
    }
  }

  /**
   * Parses the first symbolizer of the first rule of a GeoStyler-Style Style.
   *
   * @param {geoStylerStyle} A GeoStyler-Style Style
   * @return {OlStyle} An OpenLayers Style Object
   */
  geoStylerStyleToOlStyle(geoStylerStyle: Style): OlStyle {
    const rule = geoStylerStyle.rules[0];
    const symbolizer = rule.symbolizers[0];
    const olSymbolizer: OlStyle = this.getOlSymbolizerFromSymbolizer(symbolizer);
    return olSymbolizer;
  }

  /**
   * Parses all symbolizers of the first rule of a GeoStyler-Style Style.
   *
   * @param {geoStylerStyle} A GeoStyler-Style Style
   * @return {OlStyle[]} An array of OpenLayers Style Objects
   */
  geoStylerStyleToOlStyleArray(geoStylerStyle: Style): OlStyle[] {
    const rule = geoStylerStyle.rules[0];
    const olStyles: OlStyle[] = [];
    rule.symbolizers.forEach((symbolizer: Symbolizer) => {
      const olSymbolizer: OlStyle = this.getOlSymbolizerFromSymbolizer(symbolizer);
      olStyles.push(olSymbolizer);
    });
    return olStyles;
  }

  /**
   * Get the OpenLayers Style object from an GeoStyler-Style Style
   *
   * @param {Style} geoStylerStyle A GeoStyler-Style Style.
   * @return {OlParserStyleFct} An OlParserStyleFct
   */
  geoStylerStyleToOlParserStyleFct(geoStylerStyle: Style): OlParserStyleFct {
    const rules = geoStylerStyle.rules;
    const olStyle: ol.StyleFunction = (feature: ol.Feature, resolution: number): OlStyle[] => {
      // TODO
      // Filters here
      const styles: OlStyle[] = [];
      const scale = OlStyleUtil.getScaleForResolution(resolution, 'm');
      rules.forEach((rule: Rule) => {
        const minScale = _get(rule, 'scaleDenominator.min');
        const maxScale = _get(rule, 'scaleDenominator.max');
        let isWithinScale = true;
        if (minScale !== 'undefined' || maxScale !== 'undefined') {
          if (minScale !== 'undefined' && scale < minScale) {
            isWithinScale = false;
          }
          if (maxScale !== 'undefined' && scale >= maxScale) {
            isWithinScale = false;
          }
        }
        if (isWithinScale) {
          rule.symbolizers.forEach((symb: Symbolizer) => {
            const olSymbolizer: OlStyle|ol.StyleFunction = this.getOlSymbolizerFromSymbolizer(symb);

          // this.getOlTextSymbolizerFromTextSymbolizer returns
          // either an OlStyle or an ol.StyleFunction. OpenLayers only accepts an array
          // of OlStyles, not ol.StyleFunctions.
          // So we have to check it and in case of an ol.StyleFunction call that function
          // and add the returned style to const styles.
            if (olSymbolizer instanceof OlStyle) {
              styles.push(olSymbolizer);
            } else {
              const styleFromFct: OlStyle = olSymbolizer(feature, resolution) as OlStyle;
              styles.push(styleFromFct);
            }
          });
        }
      });
      return styles;
    };
    let olStyleFct: OlParserStyleFct = olStyle as OlParserStyleFct;
    olStyleFct.__geoStylerStyle = geoStylerStyle;
    return olStyleFct;
  }

  /**
   * Get the OpenLayers Style object or an OL StyleFunction from an
   * GeoStyler-Style Symbolizer.
   *
   * @param {Symbolizer} symbolizer A GeoStyler-Style Symbolizer.
   * @return {object} The OpenLayers Style object or a StyleFunction
   */
  getOlSymbolizerFromSymbolizer(symbolizer: Symbolizer): any {
    let olSymbolizer: OlStyle | ol.StyleFunction;
    switch (symbolizer.kind) {
      case 'Mark':
        olSymbolizer = this.getOlPointSymbolizerFromMarkSymbolizer(symbolizer);
        break;
      case 'Icon':
        olSymbolizer = this.getOlIconSymbolizerFromIconSymbolizer(symbolizer);
        break;
      case 'Text':
        olSymbolizer = this.getOlTextSymbolizerFromTextSymbolizer(symbolizer);
        break;
      case 'Line':
        olSymbolizer = this.getOlLineSymbolizerFromLineSymbolizer(symbolizer);
        break;
      case 'Fill':
        olSymbolizer = this.getOlPolygonSymbolizerFromFillSymbolizer(symbolizer);
        break;
      default:
        // Return the OL default style since the TS type binding does not allow
        // us to set olSymbolizer to undefined
        var fill = new this.OlStyleFillConstructor({
          color: 'rgba(255,255,255,0.4)'
        });
        var stroke = new this.OlStyleStrokeConstructor({
          color: '#3399CC',
          width: 1.25
        });
        olSymbolizer = new this.OlStyleConstructor({
          image: new this.OlStyleCircleConstructor({
            fill: fill,
            stroke: stroke,
            radius: 5
          }),
          fill: fill,
          stroke: stroke
        });
        break;
    }
    return olSymbolizer;
  }

  /**
   * Get the OL Style object  from an GeoStyler-Style MarkSymbolizer.
   *
   * @param {MarkSymbolizer} markSymbolizer A GeoStyler-Style MarkSymbolizer.
   * @return {object} The OL Style object
   */
  getOlPointSymbolizerFromMarkSymbolizer(markSymbolizer: MarkSymbolizer): OlStyle {
    let stroke;
    if (markSymbolizer.strokeColor || markSymbolizer.strokeWidth !== undefined) {
      stroke = new this.OlStyleStrokeConstructor({
        color: (markSymbolizer.strokeColor && (markSymbolizer.strokeOpacity !== undefined)) ? 
        OlStyleUtil.getRgbaColor(markSymbolizer.strokeColor, markSymbolizer.strokeOpacity) : 
        markSymbolizer.strokeColor,
        width: markSymbolizer.strokeWidth,
      });
    }

    const fill = new this.OlStyleFillConstructor({
      color: (markSymbolizer.color && markSymbolizer.opacity !== undefined) ?
        OlStyleUtil.getRgbaColor(markSymbolizer.color, markSymbolizer.opacity) : markSymbolizer.color
    });

    let olStyle: OlStyle;
    let shapeOpts: any = {
      fill: fill,
      opacity: markSymbolizer.opacity || 1,
      radius: markSymbolizer.radius || 5,
      rotation: markSymbolizer.rotate ? markSymbolizer.rotate * Math.PI / 180 : undefined,
      stroke: stroke
    };
    
    switch (markSymbolizer.wellKnownName) {
      case 'shape://dot':
      case 'Circle':
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleCircleConstructor(shapeOpts)
        });
        break;
      case 'Square':
        shapeOpts.points = 4;
        shapeOpts.angle = 45 * Math.PI / 180;
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      case 'Triangle':
        shapeOpts.points = 3;
        shapeOpts.angle = 0;
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      case 'Star':
        shapeOpts.points = 5;
        shapeOpts.radius2 = shapeOpts.radius / 2.5;
        shapeOpts.angle = 0;
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      case 'shape://plus':
      case 'Cross':
        shapeOpts.points = 4;
        shapeOpts.radius2 = 0;
        shapeOpts.angle = 0;
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      case 'shape://times':
      case 'X':
        shapeOpts.points = 4;
        shapeOpts.radius2 = 0;
        shapeOpts.angle = 45 * Math.PI / 180;
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      case 'shape://backslash':
        shapeOpts.points = 2;
        shapeOpts.angle = 2 * Math.PI - (Math.PI / 4);
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break; 
      case 'shape://horline':
        shapeOpts.points = 2;
        shapeOpts.angle = Math.PI / 2;
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      // so far, both arrows are closed arrows. Also, shape is a regular triangle with
      // all sides of equal length. In geoserver arrows only have two sides of equal length.
      // TODO redefine shapes of arrows?
      case 'shape://oarrow':
      case 'shape://carrow':
        shapeOpts.points = 3;
        shapeOpts.angle = Math.PI / 2;
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      case 'shape://slash':
        shapeOpts.points = 2;
        shapeOpts.angle = Math.PI / 4;
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      case 'shape://vertline':
        shapeOpts.points = 2;
        shapeOpts.angle = 0;
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      default:
        throw new Error(`MarkSymbolizer cannot be parsed. Unsupported WellKnownName.`);
    }

    return olStyle;
  }

  /**
   * Get the OL Style object  from an GeoStyler-Style IconSymbolizer.
   *
   * @param {IconSymbolizer} symbolizer  A GeoStyler-Style IconSymbolizer.
   * @return {object} The OL Style object
   */
  getOlIconSymbolizerFromIconSymbolizer(symbolizer: IconSymbolizer): OlStyle {
    return new this.OlStyleConstructor({
      image: new this.OlStyleIconConstructor({
        src: symbolizer.image,
        crossOrigin: 'anonymous',
        opacity: symbolizer.opacity,
        scale: symbolizer.size || 1,
        // Rotation in openlayers is radians while we use degree
        rotation: symbolizer.rotate ? symbolizer.rotate * Math.PI / 180 : undefined
      })
    });
  }

  /**
   * Get the OL Style object from an GeoStyler-Style LineSymbolizer.
   *
   * @param {LineSymbolizer} lineSymbolizer A GeoStyler-Style LineSymbolizer.
   * @return {object} The OL Style object
   */
  getOlLineSymbolizerFromLineSymbolizer(symbolizer: LineSymbolizer) {
    return new this.OlStyleConstructor({
      stroke: new this.OlStyleStrokeConstructor({
        color: (symbolizer.color && symbolizer.opacity) ?
          OlStyleUtil.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color,
        width: symbolizer.width,
        lineCap: symbolizer.cap,
        lineJoin: symbolizer.join,
        lineDash: symbolizer.dasharray,
        lineDashOffset: symbolizer.dashOffset
      })
    });
  }

  /**
   * Get the OL Style object from an GeoStyler-Style FillSymbolizer.
   *
   * @param {FillSymbolizer} fillSymbolizer A GeoStyler-Style FillSymbolizer.
   * @return {object} The OL Style object
   */
  getOlPolygonSymbolizerFromFillSymbolizer(symbolizer: FillSymbolizer) {
    return new this.OlStyleConstructor({
      stroke: new this.OlStyleStrokeConstructor({
        color: symbolizer.outlineColor,
        width: symbolizer.outlineWidth
      }),
      fill: new this.OlStyleFillConstructor({
        color: (symbolizer.color && symbolizer.opacity) ?
          OlStyleUtil.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color
      })
    });
  }

  /**
   * Get the OL StyleFunction object from an GeoStyler-Style TextSymbolizer.
   *
   * @param {TextSymbolizer} textSymbolizer A GeoStyler-Style TextSymbolizer.
   * @return {object} The OL StyleFunction
   */
  getOlTextSymbolizerFromTextSymbolizer(symbolizer: TextSymbolizer): ol.StyleFunction|OlStyle {
    const baseProps = {
      font: OlStyleUtil.getTextFont(symbolizer),
      fill: new this.OlStyleFillConstructor({
        color: (symbolizer.color && symbolizer.opacity) ?
          OlStyleUtil.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color
      }),
      stroke: new this.OlStyleStrokeConstructor({
        color: (symbolizer.haloColor && symbolizer.opacity) ?
          OlStyleUtil.getRgbaColor(symbolizer.haloColor, symbolizer.opacity) : symbolizer.haloColor,
        width: symbolizer.haloWidth ? symbolizer.haloWidth : 0
      }),
      offsetX: symbolizer.offset ? symbolizer.offset[0] : 0,
      offsetY: symbolizer.offset ? symbolizer.offset[1] : 0,
      rotation: symbolizer.rotate ? symbolizer.rotate * Math.PI / 180 : undefined
      // TODO check why props match
      // textAlign: symbolizer.pitchAlignment,
      // textBaseline: symbolizer.anchor
    };

    // check if TextSymbolizer.label contains a placeholder
    const prefix = '\\{\\{';
    const suffix = '\\}\\}';
    const regExp = new RegExp(prefix + '.*?' + suffix, 'g');
    const regExpRes = symbolizer.label ? symbolizer.label.match(regExp) : null;
    if (regExpRes) {
      // if it contains a placeholder
      // return olStyleFunction
      const olPointStyledLabelFn = (feature: ol.Feature, res: number) => {

        const text = new this.OlStyleTextConstructor({
          text: OlStyleUtil.resolveAttributeTemplate(feature, symbolizer.label as string, ''),
          ...baseProps
        });

        const style = new this.OlStyleConstructor({
          text: text
        });

        return style;
      };
      return olPointStyledLabelFn;
    } else {
      // if TextSymbolizer does not contain a placeholder
      // return OlStyle
      return new this.OlStyleConstructor({
        text: new this.OlStyleTextConstructor({
          text: symbolizer.label,
          ...baseProps
        })
      });
    }
  }

}

export default OlStyleParser;

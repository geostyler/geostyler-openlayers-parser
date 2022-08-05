import {
  FillSymbolizer,
  Filter,
  IconSymbolizer,
  isIconSymbolizer,
  isMarkSymbolizer,
  LineSymbolizer,
  MarkSymbolizer,
  Operator,
  PointSymbolizer,
  ReadStyleResult,
  Rule,
  Style,
  StyleParser,
  StyleType,
  Symbolizer,
  TextSymbolizer,
  UnsupportedProperties,
  WriteStyleResult
} from 'geostyler-style';

import OlImageState from 'ol/ImageState';

import OlGeomPoint from 'ol/geom/Point';

import OlStyle, { StyleFunction as OlStyleFunction, StyleLike as OlStyleLike} from 'ol/style/Style';
import OlStyleImage from 'ol/style/Image';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyleText from 'ol/style/Text';
import OlStyleCircle from 'ol/style/Circle';
import OlStyleFill from 'ol/style/Fill';
import OlStyleIcon from 'ol/style/Icon';
import OlStyleRegularshape, { Options as OlStyleRegularshapeOptions } from 'ol/style/RegularShape';
import { METERS_PER_UNIT } from 'ol/proj/Units';

import OlStyleUtil from './Util/OlStyleUtil';
import { toContext } from 'ol/render';

const _get = require('lodash/get');

export interface OlParserStyleFct {
  (feature: any, resolution: number): any;
  __geoStylerStyle: Style;
}

/**
 * This parser can be used with the GeoStyler.
 * It implements the GeoStyler-Style Parser interface to work with OpenLayers styles.
 *
 * @class OlStyleParser
 * @implements StyleParser
 */
export class OlStyleParser implements StyleParser<OlStyleLike> {

  /**
   * The name of the OlStyleParser.
   */
  public static title = 'OpenLayers Style Parser';

  unsupportedProperties: UnsupportedProperties = {
    Symbolizer: {
      MarkSymbolizer: {
        avoidEdges: 'none',
        blur: 'none',
        fillOpacity: 'none',
        offsetAnchor: 'none',
        pitchAlignment: 'none',
        pitchScale: 'none',
        visibility: 'none'
      },
      FillSymbolizer: {
        antialias: 'none',
        fillOpacity: {
          support: 'none',
          info: 'Use opacity instead.'
        },
        graphicFill: 'none',
        visibility: 'none'
      },
      IconSymbolizer: {
        allowOverlap: 'none',
        anchor: 'none',
        avoidEdges: 'none',
        color: 'none',
        haloBlur: 'none',
        haloColor: 'none',
        haloWidth: 'none',
        keepUpright: 'none',
        offsetAnchor: 'none',
        optional: 'none',
        padding: 'none',
        pitchAlignment: 'none',
        rotationAlignment: 'none',
        textFit: 'none',
        textFitPadding: 'none',
        visibility: 'none'
      },
      LineSymbolizer: {
        blur: 'none',
        gapWidth: 'none',
        gradient: 'none',
        miterLimit: 'none',
        roundLimit: 'none',
        spacing: 'none',
        visibility: 'none',
        graphicFill: 'none',
        graphicStroke: 'none',
        perpendicularOffset: 'none'
      },
      RasterSymbolizer: 'none'
    }
  };

  title = 'OpenLayers Style Parser';
  olIconStyleCache: any = {};

  OlStyleConstructor: any = OlStyle;
  OlStyleImageConstructor: any = OlStyleImage;
  OlStyleFillConstructor: any = OlStyleFill;
  OlStyleStrokeConstructor: any = OlStyleStroke;
  OlStyleTextConstructor: any = OlStyleText;
  OlStyleCircleConstructor: any = OlStyleCircle;
  OlStyleIconConstructor: any = OlStyleIcon;
  OlStyleRegularshapeConstructor: any = OlStyleRegularshape;

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

  isOlParserStyleFct = (x: any): x is OlParserStyleFct => {
    return typeof x === 'function';
  };

  /**
   * Get the GeoStyler-Style PointSymbolizer from an OpenLayers Style object.
   *
   * @param {object} olStyle The OpenLayers Style object
   * @return {PointSymbolizer} The GeoStyler-Style PointSymbolizer
   */
  getPointSymbolizerFromOlStyle(olStyle: OlStyle): PointSymbolizer {
    let pointSymbolizer: PointSymbolizer;
    if (olStyle.getImage() instanceof this.OlStyleCircleConstructor) {
      // circle
      const olCircleStyle: OlStyleCircle = olStyle.getImage() as OlStyleCircle;
      const olFillStyle = olCircleStyle.getFill();
      const olStrokeStyle = olCircleStyle.getStroke();
      const offset = olCircleStyle.getDisplacement() as [number, number];

      const circleSymbolizer: MarkSymbolizer = {
        kind: 'Mark',
        wellKnownName: 'circle',
        color: olFillStyle ? OlStyleUtil.getHexColor(olFillStyle.getColor() as string) : undefined,
        opacity: olFillStyle ? OlStyleUtil.getOpacity(olFillStyle.getColor() as string) : undefined,
        radius: (olCircleStyle.getRadius() !== 0) ? olCircleStyle.getRadius() : 5,
        strokeColor: olStrokeStyle ? olStrokeStyle.getColor() as string : undefined,
        strokeOpacity: olStrokeStyle ? OlStyleUtil.getOpacity(olStrokeStyle.getColor() as string) : undefined,
        strokeWidth: olStrokeStyle ? olStrokeStyle.getWidth() : undefined,
        offset: offset[0] || offset[1] ? offset : undefined
      };
      pointSymbolizer = circleSymbolizer;
    } else if (olStyle.getImage() instanceof this.OlStyleRegularshapeConstructor) {
      // square, triangle, star, cross or x
      const olRegularStyle: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
      const olFillStyle = olRegularStyle.getFill();
      const olStrokeStyle = olRegularStyle.getStroke();
      const radius = olRegularStyle.getRadius();
      const radius2 = olRegularStyle.getRadius2();
      const points = olRegularStyle.getPoints();
      const angle = olRegularStyle.getAngle();
      const offset = olRegularStyle.getDisplacement() as [number, number];

      const markSymbolizer: MarkSymbolizer = {
        kind: 'Mark',
        color: olFillStyle ? OlStyleUtil.getHexColor(olFillStyle.getColor() as string) : undefined,
        opacity: olFillStyle ? OlStyleUtil.getOpacity(olFillStyle.getColor() as string) : undefined,
        strokeColor: olStrokeStyle ? olStrokeStyle.getColor() as string : undefined,
        strokeOpacity: olStrokeStyle ? OlStyleUtil.getOpacity(olStrokeStyle.getColor() as string) : undefined,
        strokeWidth: olStrokeStyle ? olStrokeStyle.getWidth() : undefined,
        radius: (radius !== 0) ? radius : 5,
        // Rotation in openlayers is radians while we use degree
        rotate: olRegularStyle.getRotation() / Math.PI * 180,
        offset: offset[0] || offset[1] ? offset : undefined
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
              markSymbolizer.wellKnownName = 'triangle';
              break;
            case Math.PI / 2:
              markSymbolizer.wellKnownName = 'shape://carrow';
              break;
            default:
              break;
          }
          break;
        case 4:
          if (Number.isFinite(radius2)) {
            // cross or x
            if (olRegularStyle.getAngle() === 0) {
              // cross
              markSymbolizer.wellKnownName = 'cross';
            } else {
              // x
              markSymbolizer.wellKnownName = 'x';
            }
          } else {
            // square
            markSymbolizer.wellKnownName = 'square';
          }
          break;
        case 5:
          // star
          markSymbolizer.wellKnownName = 'star';
          break;
        default:
          throw new Error('Could not parse OlStyle. Only 2, 3, 4 or 5 point regular shapes are allowed');
      }
      pointSymbolizer = markSymbolizer;
    } else if (olStyle.getText() instanceof this.OlStyleTextConstructor) {
      const olTextStyle: OlStyleText = olStyle.getText() as OlStyleText;
      const olFillStyle = olTextStyle.getFill();
      const olStrokeStyle = olTextStyle.getStroke();
      const rotation = olTextStyle.getRotation();
      let char = olTextStyle.getText() || 'a';
      const font = olTextStyle.getFont() || '10px sans-serif';
      const fontName = OlStyleUtil.getFontNameFromOlFont(font);
      const radius = OlStyleUtil.getSizeFromOlFont(font);
      const offset = [olTextStyle.getOffsetX(), olTextStyle.getOffsetY()];

      if (Array.isArray(char)) {
        char = char[0];
      }

      pointSymbolizer = {
        kind: 'Mark',
        wellKnownName: `ttf://${fontName}#0x${char.charCodeAt(0).toString(16)}`,
        color: olFillStyle ? OlStyleUtil.getHexColor(olFillStyle.getColor() as string) : undefined,
        opacity: olFillStyle ? OlStyleUtil.getOpacity(olFillStyle.getColor() as string) : undefined,
        strokeColor: olStrokeStyle ? olStrokeStyle.getColor() as string : undefined,
        strokeOpacity: olStrokeStyle ? OlStyleUtil.getOpacity(olStrokeStyle.getColor() as string) : undefined,
        strokeWidth: olStrokeStyle ? olStrokeStyle.getWidth() : undefined,
        radius: (radius !== 0) ? radius : 5,
        // Rotation in openlayers is radians while we use degree
        rotate: rotation ? rotation / Math.PI * 180 : 0,
        offset: offset[0] || offset[1] ? offset : undefined
      } as MarkSymbolizer;
    } else {
      // icon
      const olIconStyle: any = olStyle.getImage();
      const offset = olIconStyle.getDisplacement() as [number, number];

      const iconSymbolizer: IconSymbolizer = {
        kind: 'Icon',
        image: olIconStyle.getSrc() ? olIconStyle.getSrc() : undefined,
        opacity: olIconStyle.getOpacity(),
        size: (olIconStyle.getScale() !== 0) ? olIconStyle.getScale() : 5,
        // Rotation in openlayers is radians while we use degree
        rotate: olIconStyle.getRotation() / Math.PI * 180,
        offset: offset[0] || offset[1] ? offset : undefined
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
    const olStrokeStyle = olStyle.getStroke();
    // getLineDash returns null not undefined. So we have to double check
    const dashArray = olStrokeStyle ? olStrokeStyle.getLineDash() : undefined;

    return {
      kind: 'Line',
      color: olStrokeStyle ? OlStyleUtil.getHexColor(olStrokeStyle.getColor() as string) as string : undefined,
      opacity: olStrokeStyle ? OlStyleUtil.getOpacity(olStrokeStyle.getColor() as string) : undefined,
      width: olStrokeStyle ? olStrokeStyle.getWidth() : undefined,
      cap: olStrokeStyle ? <LineSymbolizer['cap']> olStrokeStyle.getLineCap() : 'butt',
      join: olStrokeStyle ? <LineSymbolizer['join']> olStrokeStyle.getLineJoin() : 'miter',
      dasharray: dashArray ? dashArray : undefined,
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
    const olFillStyle = olStyle.getFill();
    const olStrokeStyle = olStyle.getStroke();
    // getLineDash returns null not undefined. So we have to double check
    const outlineDashArray = olStrokeStyle ? olStrokeStyle.getLineDash() : undefined;

    const symbolizer: FillSymbolizer = {
      kind: 'Fill'
    };

    if (olFillStyle) {
      symbolizer.color = OlStyleUtil.getHexColor(olFillStyle.getColor() as string);
    }
    if (olStrokeStyle) {
      symbolizer.opacity = OlStyleUtil.getOpacity(olFillStyle.getColor() as string);
    }
    if (olStrokeStyle) {
      symbolizer.outlineColor = OlStyleUtil.getHexColor(olStrokeStyle.getColor() as string);
    }
    if (outlineDashArray) {
      symbolizer.outlineDasharray = outlineDashArray;
    }
    if (olStrokeStyle) {
      symbolizer.outlineOpacity = OlStyleUtil.getOpacity(olStrokeStyle.getColor() as string);
    }
    if (olStrokeStyle && olStrokeStyle.getWidth()) {
      symbolizer.outlineWidth = olStrokeStyle.getWidth();
    }
    return symbolizer;

  }

  /**
   * Get the GeoStyler-Style TextSymbolizer from an OpenLayers Style object.
   *
   *
   * @param olStyle The OpenLayers Style object
   * @return The GeoStyler-Style TextSymbolizer
   */
  getTextSymbolizerFromOlStyle(olStyle: OlStyle): TextSymbolizer {
    const olTextStyle = olStyle.getText();
    const olFillStyle = olTextStyle.getFill();
    const olStrokeStyle = olTextStyle.getStroke();
    const offsetX = olTextStyle.getOffsetX();
    const offsetY = olTextStyle.getOffsetY();
    const font = olTextStyle.getFont();
    const rotation = olTextStyle.getRotation();
    const allowOverlap = olTextStyle.getOverflow() ? olTextStyle.getOverflow() : undefined;
    const text = olTextStyle.getText();
    const label = Array.isArray(text) ? text[0] : text;
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
      const fontFamilyPart: string = fontSplit.length === 2 ?
        fontSplit[1] : fontSplit[2];
      fontFamily = fontFamilyPart.split(',').map((fn: string) => {
        return fn.startsWith(' ') ? fn.slice(1) : fn;
      });
    }

    return {
      kind: 'Text',
      label,
      allowOverlap,
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
   * @param olStyle The OpenLayers Style object
   * @return The GeoStyler-Style Symbolizer array
   */
  getSymbolizersFromOlStyle(olStyles: OlStyle[]): Symbolizer[] {
    const symbolizers: Symbolizer[] = [];
    olStyles.forEach(olStyle => {
      let symbolizer: Symbolizer;
      const styleType: StyleType = this.getStyleTypeFromOlStyle(olStyle);
      switch (styleType) {
        case 'Point':
          if (olStyle.getText() && !OlStyleUtil.getIsMarkSymbolizerFont((olStyle as any).getText().getFont())) {
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
  getRuleFromOlStyle(olStyles: OlStyle | OlStyle[]): Rule {
    let symbolizers: Symbolizer[];
    const name = 'OL Style Rule 0';

    if (Array.isArray(olStyles)) {
      symbolizers = this.getSymbolizersFromOlStyle(olStyles);
    } else {
      symbolizers = this.getSymbolizersFromOlStyle([olStyles]);
    }

    return {
      name, symbolizers
    };
  }

  /**
   * Get the GeoStyler-Style Symbolizer from an OpenLayers Style object.
   *
   * @param {OlStyle} olStyle The OpenLayers Style object
   * @return {Symbolizer} The GeoStyler-Style Symbolizer
   */
  getStyleTypeFromOlStyle(olStyle: OlStyle): StyleType {
    let styleType: StyleType;

    if (olStyle.getImage() instanceof this.OlStyleImageConstructor) {
      styleType = 'Point';
    } else if (olStyle.getText() instanceof this.OlStyleTextConstructor) {
      styleType = 'Point';
    } else if (olStyle.getFill() instanceof this.OlStyleFillConstructor) {
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
   * @param olStyle The OpenLayers Style object
   * @return The GeoStyler-Style Style
   */
  olStyleToGeoStylerStyle(olStyle: OlStyle | OlStyle[]): Style {
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
   * @param olStyle The style to be parsed
   * @return The Promise resolving with the GeoStyler-Style Style
   */
  readStyle(olStyle: OlStyleLike): Promise<ReadStyleResult> {
    return new Promise<ReadStyleResult>((resolve) => {
      try {
        if (this.isOlParserStyleFct(olStyle)) {
          resolve({
            output: olStyle.__geoStylerStyle
          });
        } else {
          olStyle = olStyle as OlStyle | OlStyle[];
          const geoStylerStyle: Style = this.olStyleToGeoStylerStyle(olStyle);
          resolve({
            output: geoStylerStyle,
            // unsupportedProperties // TODO
          });
        }
      } catch (error) {
        resolve({
          errors: [error]
        });
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
  writeStyle(geoStylerStyle: Style): Promise<WriteStyleResult<OlStyleLike>> {
    return new Promise<WriteStyleResult>((resolve) => {
      const unsupportedProperties = this.checkForUnsupportedProperites(geoStylerStyle);
      try {
        const olStyle = this.getOlStyleTypeFromGeoStylerStyle(geoStylerStyle);
        resolve({
          output: olStyle,
          unsupportedProperties,
          warnings: unsupportedProperties && ['Your style contains unsupportedProperties!']
        });
      } catch (error) {
        resolve({
          errors: [error]
        });
      }
    });
  }

  checkForUnsupportedProperites(geoStylerStyle: Style): UnsupportedProperties | undefined {
    const capitalizeFirstLetter = (a: string) => a[0].toUpperCase() + a.slice(1);
    const unsupportedProperties: UnsupportedProperties = {};
    geoStylerStyle.rules.forEach(rule => {
      // ScaleDenominator and Filters are completly supported so we just check for symbolizers
      rule.symbolizers.forEach(symbolizer => {
        const key = capitalizeFirstLetter(`${symbolizer.kind}Symbolizer`);
        const value = this.unsupportedProperties?.Symbolizer?.[key];
        if (value) {
          if (typeof value === 'string' || value instanceof String ) {
            if (!unsupportedProperties.Symbolizer) {
              unsupportedProperties.Symbolizer = {};
            }
            unsupportedProperties.Symbolizer[key] = value;
          } else {
            Object.keys(symbolizer).forEach(property => {
              if (value[property]) {
                if (!unsupportedProperties.Symbolizer) {
                  unsupportedProperties.Symbolizer = {};
                }
                if (!unsupportedProperties.Symbolizer[key]) {
                  unsupportedProperties.Symbolizer[key] = {};
                }
                unsupportedProperties.Symbolizer[key][property] = value[property];
              }
            });
          }
        }
      });
    });
    if (Object.keys(unsupportedProperties).length > 0) {
      return unsupportedProperties;
    }
    return undefined;
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
   * @param A GeoStyler-Style Style
   */
  getOlStyleTypeFromGeoStylerStyle(geoStylerStyle: Style): OlStyleLike {
    const rules = geoStylerStyle.rules;
    const nrRules = rules.length;
    if (nrRules === 1) {
      const hasFilter = typeof _get(geoStylerStyle, 'rules[0].filter') !== 'undefined' ? true : false;
      const hasMinScale = typeof _get(geoStylerStyle, 'rules[0].scaleDenominator.min') !== 'undefined' ? true : false;
      const hasMaxScale = typeof _get(geoStylerStyle, 'rules[0].scaleDenominator.max') !== 'undefined' ? true : false;
      const hasScaleDenominator = hasMinScale || hasMaxScale ? true : false;
      const nrSymbolizers = geoStylerStyle.rules[0].symbolizers.length;
      const hasTextSymbolizer = rules[0].symbolizers.some((symbolizer: Symbolizer) => {
        return symbolizer.kind === 'Text';
      });
      const hasDynamicIconSymbolizer = rules[0].symbolizers.some((symbolizer: Symbolizer) => {
        return symbolizer.kind === 'Icon' && typeof(symbolizer.image) === 'string' && symbolizer.image.includes('{{');
      });
      if (!hasFilter && !hasScaleDenominator && !hasTextSymbolizer && !hasDynamicIconSymbolizer) {
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
  geoStylerStyleToOlStyle(geoStylerStyle: Style): OlStyleLike {
    const rule = geoStylerStyle.rules[0];
    const symbolizer = rule.symbolizers[0];
    const olSymbolizer = this.getOlSymbolizerFromSymbolizer(symbolizer);
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
    const olStyles: any[] = [];
    rule.symbolizers.forEach((symbolizer: Symbolizer) => {
      const olSymbolizer: any = this.getOlSymbolizerFromSymbolizer(symbolizer);
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
    const olStyle = (feature: any, resolution: number): any[] => {
      const styles: any[] = [];

      // calculate scale for resolution (from ol-util MapUtil)
      const dpi = 25.4 / 0.28;
      const mpu = METERS_PER_UNIT.m;
      const inchesPerMeter = 39.37;
      const scale = resolution * mpu * inchesPerMeter * dpi;

      rules.forEach((rule: Rule) => {
        // handling scale denominator
        const minScale = _get(rule, 'scaleDenominator.min');
        const maxScale = _get(rule, 'scaleDenominator.max');
        let isWithinScale = true;
        if (typeof minScale !== 'undefined' || typeof maxScale !== 'undefined') {
          if (typeof minScale !== 'undefined' && scale < minScale) {
            isWithinScale = false;
          }
          if (typeof maxScale !== 'undefined' && scale >= maxScale) {
            isWithinScale = false;
          }
        }

        // handling filter
        let matchesFilter: boolean = false;
        if (!rule.filter) {
          matchesFilter = true;
        } else {
          try {
            matchesFilter = this.geoStylerFilterToOlParserFilter(feature, rule.filter);
          } catch (e) {
            matchesFilter = false;
          }
        }

        if (isWithinScale && matchesFilter) {
          rule.symbolizers.forEach((symb: Symbolizer) => {
            const olSymbolizer: any = this.getOlSymbolizerFromSymbolizer(symb);

            // this.getOlTextSymbolizerFromTextSymbolizer returns
            // either an OlStyle or an ol.StyleFunction. OpenLayers only accepts an array
            // of OlStyles, not ol.StyleFunctions.
            // So we have to check it and in case of an ol.StyleFunction call that function
            // and add the returned style to const styles.
            if (typeof olSymbolizer !== 'function') {
              styles.push(olSymbolizer);
            } else {
              const styleFromFct: any = olSymbolizer(feature, resolution);
              styles.push(styleFromFct);
            }
          });
        }
      });
      return styles;
    };
    const olStyleFct: OlParserStyleFct = olStyle as OlParserStyleFct;
    olStyleFct.__geoStylerStyle = geoStylerStyle;
    return olStyleFct;
  }

  /**
   * Checks if a feature matches given filter expression(s)
   * @param feature ol.Feature
   * @param filter Filter
   * @return boolean true if feature matches filter expression
   */
  geoStylerFilterToOlParserFilter(feature: any, filter: Filter): boolean {
    const operatorMapping = {
      '&&': true,
      '||': true,
      '!': true
    };

    let matchesFilter: boolean = true;
    const operator: Operator = filter[0];
    let isNestedFilter: boolean = false;
    if (operatorMapping[operator]) {
      isNestedFilter = true;
    }
    try {
      if (isNestedFilter) {
        switch (filter[0]) {
          case '&&':
            let intermediate = true;
            let restFilter = filter.slice(1);
            restFilter.forEach((f: Filter) => {
              if (!this.geoStylerFilterToOlParserFilter(feature, f)) {
                intermediate = false;
              }
            });
            matchesFilter = intermediate;
            break;
          case '||':
            intermediate = false;
            restFilter = filter.slice(1);
            restFilter.forEach((f: Filter) => {
              if (this.geoStylerFilterToOlParserFilter(feature, f)) {
                intermediate = true;
              }
            });
            matchesFilter = intermediate;
            break;
          case '!':
            matchesFilter = !this.geoStylerFilterToOlParserFilter(feature, filter[1]);
            break;
          default:
            throw new Error('Cannot parse Filter. Unknown combination or negation operator.');
        }
      } else {
        const prop: any = feature.get(filter[1]);
        switch (filter[0]) {
          case '==':
            matchesFilter = ('' + prop) === ('' + filter[2]);
            break;
          case '*=':
            // inspired by
            // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
            if (typeof filter[2] === 'string' && typeof prop === 'string') {
              if (filter[2].length > prop.length) {
                matchesFilter = false;
              } else {
                matchesFilter = prop.indexOf(filter[2]) !== -1;
              }
            }
            break;
          case '!=':
            matchesFilter = ('' + prop) !== ('' + filter[2]);
            break;
          case '<':
            matchesFilter = parseFloat(prop) < Number(filter[2]);
            break;
          case '<=':
            matchesFilter = parseFloat(prop) <= Number(filter[2]);
            break;
          case '>':
            matchesFilter = parseFloat(prop) > Number(filter[2]);
            break;
          case '>=':
            matchesFilter = parseFloat(prop) >= Number(filter[2]);
            break;
          default:
            throw new Error('Cannot parse Filter. Unknown comparison operator.');
        }
      }
    } catch (e) {
      throw new Error('Cannot parse Filter. Invalid structure.');
    }
    return matchesFilter;
  }

  /**
   * Get the OpenLayers Style object or an OL StyleFunction from an
   * GeoStyler-Style Symbolizer.
   *
   * @param {Symbolizer} symbolizer A GeoStyler-Style Symbolizer.
   * @return {object} The OpenLayers Style object or a StyleFunction
   */
  getOlSymbolizerFromSymbolizer(symbolizer: Symbolizer): OlStyleLike {
    let olSymbolizer: any;
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
        const fill = new this.OlStyleFillConstructor({
          color: 'rgba(255,255,255,0.4)'
        });
        const stroke = new this.OlStyleStrokeConstructor({
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
  getOlPointSymbolizerFromMarkSymbolizer(markSymbolizer: MarkSymbolizer): OlStyleRegularshape {
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

    let olStyle: any;
    const shapeOpts: OlStyleRegularshapeOptions = {
      fill: fill,
      // @ts-ignore
      opacity: markSymbolizer.opacity || 1,
      radius: markSymbolizer.radius as number || 5,
      rotation: typeof(markSymbolizer.rotate) === 'number' ? markSymbolizer.rotate * Math.PI / 180 : undefined,
      stroke: stroke,
      displacement: typeof(markSymbolizer.offset) === 'number' ? markSymbolizer.offset : undefined
    };

    switch (markSymbolizer.wellKnownName) {
      case 'shape://dot':
      case 'circle':
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleCircleConstructor(shapeOpts)
        });
        break;
      case 'square':
        shapeOpts.points = 4;
        shapeOpts.angle = 45 * Math.PI / 180;
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      case 'triangle':
        shapeOpts.points = 3;
        shapeOpts.angle = 0;
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      case 'star':
        shapeOpts.points = 5;
        shapeOpts.radius2 = shapeOpts.radius! / 2.5;
        shapeOpts.angle = 0;
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor(shapeOpts)
        });
        break;
      case 'shape://plus':
      case 'cross':
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
      case 'x':
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
        if (OlStyleUtil.getIsFontGlyphBased(markSymbolizer)) {
          olStyle = new this.OlStyleConstructor({
            text: new this.OlStyleTextConstructor({
              text: OlStyleUtil.getCharacterForMarkSymbolizer(markSymbolizer),
              font: OlStyleUtil.getTextFontForMarkSymbolizer(markSymbolizer),
              fill: shapeOpts.fill,
              stroke: shapeOpts.stroke,
              rotation: shapeOpts.rotation
            })
          });
          break;
        }
        throw new Error('MarkSymbolizer cannot be parsed. Unsupported WellKnownName.');
    }

    return olStyle;
  }

  /**
   * Get the OL Style object  from an GeoStyler-Style IconSymbolizer.
   *
   * @param {IconSymbolizer} symbolizer  A GeoStyler-Style IconSymbolizer.
   * @return {object} The OL Style object
   */
  getOlIconSymbolizerFromIconSymbolizer(symbolizer: IconSymbolizer): OlStyleIcon | OlStyleFunction {
    const baseProps = {
      src: symbolizer.image,
      crossOrigin: 'anonymous',
      opacity: symbolizer.opacity,
      scale: symbolizer.size || 1,
      // Rotation in openlayers is radians while we use degree
      rotation: typeof(symbolizer.rotate) === 'number' ? symbolizer.rotate * Math.PI / 180 : undefined,
      displacement: symbolizer.offset
    };
    // check if IconSymbolizer.image contains a placeholder
    const prefix = '\\{\\{';
    const suffix = '\\}\\}';
    const regExp = new RegExp(prefix + '.*?' + suffix, 'g');
    const regExpRes = typeof(symbolizer.image) === 'string' ? symbolizer.image.match(regExp) : null;
    if (regExpRes) {
      // if it contains a placeholder
      // return olStyleFunction
      const olPointStyledIconFn = (feature: any) => {
        let src: string = OlStyleUtil.resolveAttributeTemplate(feature, symbolizer.image as string, '');
        // src can't be blank, would trigger ol errors
        if (!src) {
          src = symbolizer.image + '';
        }
        let image;
        if (this.olIconStyleCache[src]) {
          image = this.olIconStyleCache[src];
          image.setScale(baseProps.scale);
          if (baseProps.rotation !== undefined) {
            image.setRotation(baseProps.rotation);
          }
          if (baseProps.opacity !== undefined) {
            image.setOpacity(baseProps.opacity);
          }
        } else {
          image = new this.OlStyleIconConstructor({
            ...baseProps,
            src // order is important
          });
          this.olIconStyleCache[src] = image;
        }
        const style = new this.OlStyleConstructor({
          image
        });
        return style;
      };
      return olPointStyledIconFn;
    } else {
      return new this.OlStyleConstructor({
        image: new this.OlStyleIconConstructor({
          ...baseProps
        })
      });
    }
  }

  /**
   * Get the OL Style object from an GeoStyler-Style LineSymbolizer.
   *
   * @param {LineSymbolizer} lineSymbolizer A GeoStyler-Style LineSymbolizer.
   * @return {object} The OL Style object
   */
  getOlLineSymbolizerFromLineSymbolizer(symbolizer: LineSymbolizer): OlStyleStroke {
    return new this.OlStyleConstructor({
      stroke: new this.OlStyleStrokeConstructor({
        color: (symbolizer.color && symbolizer.opacity !== null && symbolizer.opacity !== undefined) ?
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
  getOlPolygonSymbolizerFromFillSymbolizer(symbolizer: FillSymbolizer): OlStyleFill {
    let fill = symbolizer.color ? new this.OlStyleFillConstructor({
      color: (symbolizer.opacity !== null && symbolizer.opacity !== undefined) ?
        OlStyleUtil.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color
    }) : null;

    const stroke = symbolizer.outlineColor ? new this.OlStyleStrokeConstructor({
      color: (symbolizer.outlineOpacity !== null && symbolizer.outlineOpacity !== undefined) ?
        OlStyleUtil.getRgbaColor(symbolizer.outlineColor, symbolizer.outlineOpacity) : symbolizer.outlineColor,
      width: symbolizer.outlineWidth,
      lineDash: symbolizer.outlineDasharray,
    }) : null;

    const olStyle = new this.OlStyleConstructor({
      fill,
      stroke
    });

    if (symbolizer.graphicFill) {
      const pattern = this.getOlPatternFromGraphicFill(symbolizer.graphicFill);
      if (!fill) {
        fill = new this.OlStyleFillConstructor({});
      }
      if (pattern) {
        fill.setColor(pattern);
      }
      olStyle.setFill(fill);
    }

    return olStyle;
  }

  /**
   * Get the pattern for a graphicFill.
   *
   * This creates a CanvasPattern based on the
   * properties of the given PointSymbolizer. Currently,
   * only IconSymbolizer and MarkSymbolizer are supported.
   *
   * @param {PointSymbolizer} graphicFill The Symbolizer that holds the pattern config.
   * @returns The created CanvasPattern, or null.
   */
  getOlPatternFromGraphicFill(graphicFill: PointSymbolizer): CanvasPattern | null {
    let graphicFillStyle: any;
    if (isIconSymbolizer(graphicFill)) {
      graphicFillStyle = this.getOlIconSymbolizerFromIconSymbolizer(graphicFill);
      const graphicFillImage = graphicFillStyle?.getImage();
      graphicFillImage?.load(); // Needed for Icon type images with a remote src
      // We can only work with the image once it's loaded
      if (graphicFillImage?.getImageState() !== OlImageState.LOADED) {
        return null;
      }
    } else if (isMarkSymbolizer(graphicFill)) {
      graphicFillStyle = this.getOlPointSymbolizerFromMarkSymbolizer(graphicFill);
    } else {
      return null;
    }

    // We need to clone the style and image since we'll be changing the scale below (hack)
    const graphicFillStyleCloned = graphicFillStyle.clone();
    const imageCloned = graphicFillStyleCloned.getImage();

    // Temporary canvas.
    // TODO: Can/should we reuse an pre-existing one for efficiency?
    const tmpCanvas: HTMLCanvasElement = document.createElement('canvas');
    const tmpContext = tmpCanvas.getContext('2d') as CanvasRenderingContext2D;

    // Hack to make scaling work for Icons.
    // TODO: find a better way than this.
    const scale = imageCloned.getScale() || 1;
    const pixelRatio = scale;
    imageCloned.setScale(1);

    const size: [number, number] = imageCloned.getSize();

    // Create the context where we'll be drawing the style on
    const vectorContext = toContext(tmpContext, {
      pixelRatio,
      size
    });

    // Draw the graphic
    vectorContext.setStyle(graphicFillStyleCloned);
    const pointCoords = size.map(item  => item / 2);
    vectorContext.drawGeometry(new OlGeomPoint(pointCoords));

    // Create the actual pattern and return style
    return tmpContext.createPattern(tmpCanvas, 'repeat');
  }

  /**
   * Get the OL StyleFunction object from an GeoStyler-Style TextSymbolizer.
   *
   * @param {TextSymbolizer} textSymbolizer A GeoStyler-Style TextSymbolizer.
   * @return {object} The OL StyleFunction
   */
  getOlTextSymbolizerFromTextSymbolizer(symbolizer: TextSymbolizer): OlStyleText | OlStyleFunction {
    const baseProps = {
      font: OlStyleUtil.getTextFont(symbolizer),
      fill: new this.OlStyleFillConstructor({
        color: (symbolizer.color && symbolizer.opacity !== null && symbolizer.opacity !== undefined) ?
          OlStyleUtil.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color
      }),
      stroke: new this.OlStyleStrokeConstructor({
        color: (symbolizer.haloColor && symbolizer.opacity !== null && symbolizer.opacity !== undefined) ?
          OlStyleUtil.getRgbaColor(symbolizer.haloColor, symbolizer.opacity) : symbolizer.haloColor,
        width: symbolizer.haloWidth ? symbolizer.haloWidth : 0
      }),
      overflow: symbolizer.allowOverlap,
      offsetX: symbolizer.offset ? symbolizer.offset[0] : 0,
      offsetY: symbolizer.offset ? symbolizer.offset[1] : 0,
      rotation: typeof(symbolizer.rotate) === 'number' ? symbolizer.rotate * Math.PI / 180 : undefined
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
      const olPointStyledLabelFn = (feature: any) => {

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

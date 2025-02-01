import { parseFont } from 'css-font-parser';

import {
  CapType,
  FillSymbolizer,
  Filter,
  IconSymbolizer,
  JoinType,
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
} from 'geostyler-style/dist/style';

import {
  isGeoStylerBooleanFunction,
  isGeoStylerFunction,
  isGeoStylerStringFunction,
  isIconSymbolizer,
  isMarkSymbolizer,
  isSprite
} from 'geostyler-style/dist/typeguards';

import OlGeomPoint from 'ol/geom/Point';

import OlStyle, { StyleFunction as OlStyleFunction, StyleLike as OlStyleLike} from 'ol/style/Style';
import OlStyleImage from 'ol/style/Image';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyleText, { Options as OlStyleTextOptions }  from 'ol/style/Text';
import OlStyleCircle from 'ol/style/Circle';
import OlStyleFill from 'ol/style/Fill';
import OlStyleIcon, { Options as OlStyleIconOptions }  from 'ol/style/Icon';
import OlStyleRegularshape from 'ol/style/RegularShape';
import { METERS_PER_UNIT } from 'ol/proj/Units';

import OlStyleUtil, { LINE_WELLKNOWNNAMES } from './Util/OlStyleUtil';
import { getShapeSvg, getSvgProperties, isPointSvgDefined, removeDuplicateShapes, SvgOptions } from './Util/svgs';
import { toContext } from 'ol/render';
import OlFeature from 'ol/Feature';

export interface OlParserStyleFct {
  (feature?: any, resolution?: number): any;
  __geoStylerStyle: Style;
}

type SymbolizerKeyType = keyof UnsupportedProperties['Symbolizer'];

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
        offsetAnchor: 'none',
        pitchAlignment: 'none',
        pitchScale: 'none'
      },
      FillSymbolizer: {
        antialias: 'none',
        opacity: {
          support: 'none',
          info: 'Use fillOpacity instead.'
        }
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
        size: {
          support: 'partial',
          info: 'Will set/get the width of the ol Icon.'
        },
        optional: 'none',
        padding: 'none',
        pitchAlignment: 'none',
        rotationAlignment: 'none',
        textFit: 'none',
        textFitPadding: 'none'
      },
      LineSymbolizer: {
        blur: 'none',
        gapWidth: 'none',
        gradient: 'none',
        miterLimit: 'none',
        roundLimit: 'none',
        spacing: 'none',
        graphicFill: 'none',
        graphicStroke: 'none',
        perpendicularOffset: 'none'
      },
      RasterSymbolizer: 'none',
      TextSymbolizer: {
        anchor: 'none',
        placement: {
          support:'partial',
          info: 'point and line supported. line-center will be mapped to line.'
        }
      }
    },
    Function: {
      double2bool: {
        support: 'none',
        info: 'Always returns false'
      },
      atan2: {
        support: 'none',
        info: 'Currently returns the first argument'
      },
      rint: {
        support: 'none',
        info: 'Currently returns the first argument'
      },
      numberFormat: {
        support: 'none',
        info: 'Currently returns the first argument'
      },
      strAbbreviate: {
        support: 'none',
        info: 'Currently returns the first argument'
      }
    }
  };

  title = 'OpenLayers Style Parser';
  olIconStyleCache: any = {};

  OlStyleConstructor = OlStyle;
  OlStyleImageConstructor = OlStyleImage;
  OlStyleFillConstructor = OlStyleFill;
  OlStyleStrokeConstructor = OlStyleStroke;
  OlStyleTextConstructor = OlStyleText;
  OlStyleCircleConstructor = OlStyleCircle;
  OlStyleIconConstructor = OlStyleIcon;
  OlStyleRegularshapeConstructor = OlStyleRegularshape;

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
   * @param olStyle The OpenLayers Style object
   * @return The GeoStyler-Style PointSymbolizer
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
        opacity: olCircleStyle.getOpacity() !== 1 ? olCircleStyle.getOpacity() : undefined,
        fillOpacity: olFillStyle ? OlStyleUtil.getOpacity(olFillStyle.getColor() as string) : undefined,
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
        opacity: olRegularStyle.getOpacity() !== 1 ? olRegularStyle.getOpacity() : undefined,
        fillOpacity: olFillStyle ? OlStyleUtil.getOpacity(olFillStyle.getColor() as string) : undefined,
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
      const olIconStyle = olStyle.getImage() as OlStyleIcon;
      const displacement = olIconStyle.getDisplacement() as [number, number];
      // initialOptions_ as fallback when image is not yet loaded
      // this always gets calculated from ol so this might not have been set initially
      let size = olIconStyle.getWidth();
      const rotation = olIconStyle.getRotation() / Math.PI * 180;
      const opacity = olIconStyle.getOpacity();

      // If the image is an SVG string try to extract the properties and build a MarkSymbolizer
      try {
        const svgString = OlStyleUtil.getBase64DecodedSvg(olIconStyle.getSrc() as string);
        const { id, dimensions, fill, stroke, strokeWidth } = getSvgProperties(svgString);
        let { fillOpacity, strokeOpacity } = getSvgProperties(svgString);

        fillOpacity = OlStyleUtil.checkOpacity(fillOpacity)
          ? fillOpacity : OlStyleUtil.getOpacity(String(fill));
        strokeOpacity = OlStyleUtil.checkOpacity(strokeOpacity)
          ? strokeOpacity : OlStyleUtil.getOpacity(String(stroke));

        pointSymbolizer = {
          kind: 'Mark',
          wellKnownName: id,
          ...fill && { color: fill },
          ...OlStyleUtil.checkOpacity(fillOpacity) && { fillOpacity },
          ...stroke && { strokeColor: stroke.substring(0, 7) },
          ...strokeWidth && { strokeWidth },
          ...OlStyleUtil.checkOpacity(strokeOpacity) && { strokeOpacity },
          ...dimensions / 2 !== 0 && { radius: dimensions / 2 },
          ...OlStyleUtil.checkOpacity(opacity) && { opacity },
          ...rotation && { rotate: rotation },
          ...(displacement[0] || displacement[1]) && { offset: displacement },
        } as MarkSymbolizer;
      } catch {
        // initialOptions_ as fallback when image is not yet loaded
        const image = this.getImageFromIconStyle(olIconStyle);

        const iconSymbolizer: IconSymbolizer = {
          kind: 'Icon',
          image,
          size,
          ...OlStyleUtil.checkOpacity(opacity) && { opacity },
          // Rotation in openlayers is radians while we use degree
          ...rotation && { rotate: rotation },
          ...(displacement[0] || displacement[1]) && { offset: displacement },
        };
        pointSymbolizer = iconSymbolizer;
      }

    }
    return pointSymbolizer;
  }

  /**
   *
   * @param olIconStyle An ol style Icon representation
   * @returns A string or Sprite configuration
   */
  getImageFromIconStyle(olIconStyle: OlStyleIcon): IconSymbolizer['image'] {
    const size = olIconStyle.getSize();
    if (Array.isArray(size)) {
      // TODO: create getters (and setters?) in openlayers
      // @ts-ignore
      let position = olIconStyle.offset_ as [number, number];
      // @ts-ignore
      const offsetOrigin = olIconStyle.offsetOrigin_ as string;
      if (offsetOrigin && offsetOrigin !== 'top-left') {
        throw new Error(`Offset origin ${offsetOrigin} not supported`);
      }

      return {
        source: olIconStyle.getSrc()!,
        position,
        size: size as [number, number]
      };
    } else {
      return olIconStyle.getSrc() ? olIconStyle.getSrc() : undefined;
    }

  }

  /**
   * Get the GeoStyler-Style LineSymbolizer from an OpenLayers Style object.
   *
   * @param olStyle The OpenLayers Style object
   * @return The GeoStyler-Style LineSymbolizer
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
   * @param olStyle The OpenLayers Style object
   * @return The GeoStyler-Style FillSymbolizer
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
    if (olFillStyle) {
      symbolizer.fillOpacity = OlStyleUtil.getOpacity(olFillStyle.getColor() as string);
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
    if (!olTextStyle) {
      throw new Error('Could not get text from olStyle.');
    }
    const olFillStyle = olTextStyle.getFill();
    const olStrokeStyle = olTextStyle.getStroke();
    const offsetX = olTextStyle.getOffsetX();
    const offsetY = olTextStyle.getOffsetY();
    const font = olTextStyle.getFont();
    const rotation = olTextStyle.getRotation();
    const allowOverlap = olTextStyle.getOverflow() ? olTextStyle.getOverflow() : undefined;
    const placement = olTextStyle.getPlacement();
    const text = olTextStyle.getText();
    const label = Array.isArray(text) ? text[0] : text;
    let fontSize: number = Infinity;
    let fontFamily: string[]|undefined = undefined;
    let fontWeight: 'normal' | 'bold' | undefined = undefined;
    let fontStyle: 'normal' | 'italic' | 'oblique' | undefined = undefined;
    if (font) {
      const fontObj = parseFont(font);
      if (fontObj['font-weight']) {
        fontWeight = fontObj['font-weight'];
      }
      if (fontObj['font-size']) {
        fontSize = parseInt(fontObj['font-size'], 10);
      }
      if (fontObj['font-family']) {
        const fontFamilies = fontObj['font-family'];
        fontFamily = fontFamilies?.map((f: string) => f.includes(' ') ? '"' + f + '"' : f);
      }
      if (fontObj['font-style']) {
        fontStyle = fontObj['font-style'];
      }
    }

    return {
      kind: 'Text',
      label,
      placement,
      allowOverlap,
      color: olFillStyle ? OlStyleUtil.getHexColor(olFillStyle.getColor() as string) : undefined,
      size: isFinite(fontSize) ? fontSize : undefined,
      font: fontFamily,
      fontWeight: fontWeight || undefined,
      fontStyle: fontStyle || undefined,
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
   * @param olStyles The OpenLayers Style object
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
   * @param olStyles The OpenLayers Style object
   * @return The GeoStyler-Style Rule
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
   * @param olStyle The OpenLayers Style object
   * @return The GeoStyler-Style Symbolizer
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
          const unsupportedProperties = this.checkForUnsupportedProperties(geoStylerStyle);
          resolve({
            output: geoStylerStyle,
            unsupportedProperties
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
   * @param geoStylerStyle A GeoStyler-Style Style.
   * @return The Promise resolving with one of above mentioned style types.
   */
  writeStyle(geoStylerStyle: Style): Promise<WriteStyleResult<OlStyle | OlStyle[] | OlParserStyleFct>> {
    return new Promise<WriteStyleResult>(async (resolve) => {
      const clonedStyle = structuredClone(geoStylerStyle);
      const unsupportedProperties = this.checkForUnsupportedProperties(clonedStyle);
      try {
        const olStyle = await this.getOlStyleTypeFromGeoStylerStyle(clonedStyle);
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

  checkForUnsupportedProperties(geoStylerStyle: Style): UnsupportedProperties | undefined {
    const capitalizeFirstLetter = (a: string) => a[0].toUpperCase() + a.slice(1);
    const unsupportedProperties: UnsupportedProperties = {};
    geoStylerStyle.rules.forEach(rule => {
      // ScaleDenominator and Filters are completly supported so we just check for symbolizers
      rule.symbolizers.forEach(symbolizer => {
        const key = capitalizeFirstLetter(`${symbolizer.kind}Symbolizer`);
        const value = this.unsupportedProperties?.Symbolizer?.[key as SymbolizerKeyType];
        if (value) {
          if (typeof value === 'string') {
            if (!unsupportedProperties.Symbolizer) {
              unsupportedProperties.Symbolizer = {};
            }
            unsupportedProperties.Symbolizer[key as SymbolizerKeyType] = value;
          } else {
            Object.keys(symbolizer).forEach(property => {
              if (value[property]) {
                if (!unsupportedProperties.Symbolizer) {
                  unsupportedProperties.Symbolizer = {};
                }
                if (!unsupportedProperties.Symbolizer[key as SymbolizerKeyType]) {
                  (unsupportedProperties.Symbolizer as any)[key] = {};
                }
                unsupportedProperties.Symbolizer
                  [key as SymbolizerKeyType][property] = value[property];
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
   * @param geoStylerStyle A GeoStyler-Style Style
   */
  async getOlStyleTypeFromGeoStylerStyle(geoStylerStyle: Style): Promise<OlStyle | OlParserStyleFct | OlStyle[]> {
    const rules = geoStylerStyle.rules;
    const nrRules = rules.length;
    if (nrRules === 1) {
      const hasFilter = geoStylerStyle?.rules?.[0]?.filter !== undefined ? true : false;
      const hasMinScale = geoStylerStyle?.rules?.[0]?.scaleDenominator?.min !== undefined ? true : false;
      const hasMaxScale = geoStylerStyle?.rules?.[0]?.scaleDenominator?.max !== undefined ? true : false;
      const hasScaleDenominator = hasMinScale || hasMaxScale ? true : false;
      const hasFunctions = OlStyleUtil.containsGeoStylerFunctions(geoStylerStyle);

      const nrSymbolizers = geoStylerStyle.rules[0].symbolizers.length;
      const hasTextSymbolizer = rules[0].symbolizers.some((symbolizer: Symbolizer) => {
        return symbolizer.kind === 'Text';
      });
      const hasDynamicIconSymbolizer = rules[0].symbolizers.some((symbolizer: Symbolizer) => {
        return symbolizer.kind === 'Icon' && typeof(symbolizer.image) === 'string' && symbolizer.image.includes('{{');
      });
      if (!hasFilter && !hasScaleDenominator && !hasTextSymbolizer && !hasDynamicIconSymbolizer && !hasFunctions) {
        if (nrSymbolizers === 1) {
          return await this.geoStylerStyleToOlStyle(geoStylerStyle);
        } else {
          return await this.geoStylerStyleToOlStyleArray(geoStylerStyle);
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
   * @param geoStylerStyle GeoStyler-Style Style
   * @return An OpenLayers Style Object
   */
  async geoStylerStyleToOlStyle(geoStylerStyle: Style): Promise<OlStyle> {
    const rule = geoStylerStyle.rules[0];
    const symbolizer = rule.symbolizers[0];
    const olSymbolizer = await this.getOlSymbolizerFromSymbolizer(symbolizer);
    return olSymbolizer;
  }

  /**
   * Parses all symbolizers of the first rule of a GeoStyler-Style Style.
   *
   * @param geoStylerStyle GeoStyler-Style Style
   * @return An array of OpenLayers Style Objects
   */
  async geoStylerStyleToOlStyleArray(geoStylerStyle: Style): Promise<OlStyle[]> {
    const rule = geoStylerStyle.rules[0];
    const olStyles: any[] = [];
    for (const symbolizer of rule.symbolizers) {
      const olSymbolizer: any = await this.getOlSymbolizerFromSymbolizer(symbolizer);
      olStyles.push(olSymbolizer);
    };
    return olStyles;
  }

  /**
   * Get the OpenLayers Style object from an GeoStyler-Style Style
   *
   * @param geoStylerStyle A GeoStyler-Style Style.
   * @return An OlParserStyleFct
   */
  geoStylerStyleToOlParserStyleFct(geoStylerStyle: Style): OlParserStyleFct {
    const rules = structuredClone(geoStylerStyle.rules);
    const olStyle = async (feature: any, resolution: any): Promise<any[]> => {
      const styles: any[] = [];

      // calculate scale for resolution (from ol-util MapUtil)
      const dpi = 25.4 / 0.28;
      const mpu = METERS_PER_UNIT.m;
      const inchesPerMeter = 39.37;
      const scale = resolution * mpu * inchesPerMeter * dpi;

      for (const rule of rules) {
        // handling scale denominator
        let minScale = rule?.scaleDenominator?.min;
        let maxScale = rule?.scaleDenominator?.max;
        let isWithinScale = true;
        if (minScale || maxScale) {
          minScale = isGeoStylerFunction(minScale) ? OlStyleUtil.evaluateNumberFunction(minScale) : minScale;
          maxScale = isGeoStylerFunction(maxScale) ? OlStyleUtil.evaluateNumberFunction(maxScale) : maxScale;
          if (minScale && scale < minScale) {
            isWithinScale = false;
          }
          if (maxScale && scale >= maxScale) {
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
          for (const symb of rule.symbolizers) {
            if (symb.visibility === false) {
              styles.push(null);
            }

            if (isGeoStylerBooleanFunction(symb.visibility)) {
              const visibility = OlStyleUtil.evaluateBooleanFunction(symb.visibility);
              if (!visibility) {
                styles.push(null);
              }
            }

            const olSymbolizer: any = await this.getOlSymbolizerFromSymbolizer(symb, feature);
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
          };
        }
      };
      return styles;
    };

    const olStyleFct: OlParserStyleFct = (feature, resolution) => {
      olStyle(feature, resolution).then(result => {
        // This is called once the async styles are ready
        feature.setStyle(result);
        feature.changed();
      });
      return []; // Return immediately, to avoid an OpenLayers error when trying to render the function
    };

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
    const operatorMapping: any = {
      '&&': true,
      '||': true,
      '!': true
    };

    let matchesFilter: boolean = true;
    if (isGeoStylerBooleanFunction(filter)) {
      return OlStyleUtil.evaluateBooleanFunction(filter, feature);
    }
    if (filter === true || filter === false) {
      return filter;
    }
    const operator: Operator = filter[0];
    let isNestedFilter: boolean = false;
    if (operatorMapping[operator]) {
      isNestedFilter = true;
    }
    try {
      if (isNestedFilter) {
        let intermediate: boolean;
        let restFilter: any;
        switch (filter[0]) {
          case '&&':
            intermediate = true;
            restFilter = filter.slice(1);
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
        let arg1: any;
        if (isGeoStylerFunction(filter[1])) {
          arg1 = OlStyleUtil.evaluateFunction(filter[1], feature);
        } else {
          arg1 = feature.get(filter[1]);
        }
        let arg2: any;
        if (isGeoStylerFunction(filter[2])) {
          arg2 = OlStyleUtil.evaluateFunction(filter[2], feature);
        } else {
          arg2 = filter[2];
        }
        switch (filter[0]) {
          case '==':
            matchesFilter = ('' + arg1) === ('' + arg2);
            break;
          case '*=':
            // inspired by
            // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
            if (typeof arg2 === 'string' && typeof arg1 === 'string') {
              if (arg2.length > arg1.length) {
                matchesFilter = false;
              } else {
                matchesFilter = arg1.indexOf(arg2) !== -1;
              }
            }
            break;
          case '!=':
            matchesFilter = ('' + arg1) !== ('' + arg2);
            break;
          case '<':
            matchesFilter = Number(arg1) < Number(arg2);
            break;
          case '<=':
            matchesFilter = Number(arg1) <= Number(arg2);
            break;
          case '>':
            matchesFilter = Number(arg1) > Number(arg2);
            break;
          case '>=':
            matchesFilter = Number(arg1) >= Number(arg2);
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
   * @param symbolizer A GeoStyler-Style Symbolizer.
   * @return The OpenLayers Style object or a StyleFunction
   */
  async getOlSymbolizerFromSymbolizer(symbolizer: Symbolizer, feature?: OlFeature): Promise<OlStyle> {
    let olSymbolizer: any;
    symbolizer = structuredClone(symbolizer);

    switch (symbolizer.kind) {
      case 'Mark':
        olSymbolizer = await this.getOlPointSymbolizerFromMarkSymbolizer(symbolizer, feature);
        break;
      case 'Icon':
        olSymbolizer = await this.getOlIconSymbolizerFromIconSymbolizer(symbolizer, feature);
        break;
      case 'Text':
        olSymbolizer = this.getOlTextSymbolizerFromTextSymbolizer(symbolizer, feature);
        break;
      case 'Line':
        olSymbolizer = this.getOlLineSymbolizerFromLineSymbolizer(symbolizer, feature);
        break;
      case 'Fill':
        olSymbolizer = await this.getOlPolygonSymbolizerFromFillSymbolizer(symbolizer, feature);
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
   * @param markSymbolizer A GeoStyler-Style MarkSymbolizer.
   * @return The OL Style object
   */
  async getOlPointSymbolizerFromMarkSymbolizer(markSymbolizer: MarkSymbolizer, feature?: OlFeature): Promise<OlStyle> {
    for (const key of Object.keys(markSymbolizer)) {
      if (isGeoStylerFunction(markSymbolizer[key as keyof MarkSymbolizer])) {
        (markSymbolizer as any)[key] = OlStyleUtil.evaluateFunction((markSymbolizer as any)[key], feature);
      }
    }

    const strokeColor = markSymbolizer.strokeColor as string;
    const strokeOpacity = markSymbolizer.strokeOpacity as number;
    const strokeWidth = markSymbolizer.strokeWidth as number;
    const fillColor = markSymbolizer.color as string;
    const fillOpacity = markSymbolizer.fillOpacity as number;
    const rotation = (Number(markSymbolizer.rotate) * Math.PI) / 180;
    const displacement = markSymbolizer.offset as [number, number];

    let olStyle: OlStyle;

    let shape = removeDuplicateShapes(markSymbolizer.wellKnownName);

    if (isPointSvgDefined(shape)) {
      const dimensions = (markSymbolizer?.radius as number ?? 6) * 2;  // Default to 12 pixels
      const opacity = markSymbolizer.opacity as number;

      const svgOpts: SvgOptions = {
        dimensions,
        ...fillColor && { fill: fillColor },
        ...OlStyleUtil.checkOpacity(fillOpacity) && { fillOpacity },
        ...strokeColor && { stroke: strokeColor },
        ...strokeWidth && { strokeWidth },
        ...OlStyleUtil.checkOpacity(strokeOpacity) && { strokeOpacity }
      };

      const svg = getShapeSvg(shape, svgOpts);

      olStyle = new this.OlStyleConstructor({
        image: new this.OlStyleIconConstructor({
          src: OlStyleUtil.getBase64EncodedSvg(svg),
          crossOrigin: 'anonymous',
          ...displacement && { displacement },
          ...OlStyleUtil.checkOpacity(opacity) && { opacity },
          ...rotation && { rotation },
          scale: 1,
        })
      });
    } else if (OlStyleUtil.getIsFontGlyphBased(markSymbolizer)) {
      const strokeRgbaColor = (strokeColor && strokeOpacity ?
        OlStyleUtil.getRgbaColor(strokeColor, strokeOpacity) :
        strokeColor) as string;
      const fillRgbaColor = (fillColor && fillOpacity ?
        OlStyleUtil.getRgbaColor(fillColor, fillOpacity) :
        fillColor) as string;

      const stroke = new this.OlStyleStrokeConstructor({
        ...strokeRgbaColor && { color: strokeRgbaColor as string },
        ...strokeWidth && { width: strokeWidth }
      });

      const fill = new this.OlStyleFillConstructor({
        ...fillRgbaColor && { color: fillRgbaColor as string }
      });

      olStyle = new this.OlStyleConstructor({
        text: new this.OlStyleTextConstructor({
          text: OlStyleUtil.getCharacterForMarkSymbolizer(markSymbolizer),
          font: OlStyleUtil.getTextFontForMarkSymbolizer(markSymbolizer),
          ...fill && { fill },
          ...displacement && { offsetX: displacement[0] },
          ...displacement && { offsetY: displacement[1] },
          ...stroke && { stroke },
          ...rotation && { rotation },
        })
      });
    } else {
      throw new Error('MarkSymbolizer cannot be parsed. Unsupported WellKnownName.');
    }

    return olStyle;
  }

  /**
   * Get the OL Style object  from an GeoStyler-Style IconSymbolizer.
   *
   * @param symbolizer  A GeoStyler-Style IconSymbolizer.
   * @return The OL Style object
   */
  async getOlIconSymbolizerFromIconSymbolizer(
    symbolizer: IconSymbolizer,
    feat?: OlFeature
  ): Promise<OlStyle | OlStyleIcon | OlStyleFunction> {
    for (const key of Object.keys(symbolizer)) {
      if (isGeoStylerFunction(symbolizer[key as keyof IconSymbolizer])) {
        (symbolizer as any)[key] = OlStyleUtil.evaluateFunction((symbolizer as any)[key], feat);
      }
    }

    const baseProps: OlStyleIconOptions = {
      src: isSprite(symbolizer.image) ? symbolizer.image.source as string : symbolizer.image as string,
      crossOrigin: 'anonymous',
      opacity: symbolizer.opacity as number,
      width: symbolizer.size as number,
      // Rotation in openlayers is radians while we use degree
      rotation: (typeof(symbolizer.rotate) === 'number' ? symbolizer.rotate * Math.PI / 180 : undefined) as number,
      displacement: symbolizer.offset as [number, number],
      size: isSprite(symbolizer.image) ? symbolizer.image.size as [number, number] : undefined,
      offset: isSprite(symbolizer.image) ? symbolizer.image.position as [number, number] : undefined,
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
   * @param symbolizer A GeoStyler-Style LineSymbolizer.
   * @return The OL Style object
   */
  getOlLineSymbolizerFromLineSymbolizer(symbolizer: LineSymbolizer, feat?: OlFeature): OlStyle | OlStyleStroke {
    for (const key of Object.keys(symbolizer)) {
      if (isGeoStylerFunction(symbolizer[key as keyof LineSymbolizer])) {
        (symbolizer as any)[key] = OlStyleUtil.evaluateFunction((symbolizer as any)[key], feat);
      }
    }
    const color = symbolizer.color as string;
    const opacity = symbolizer.opacity as number;
    const sColor = (color && opacity !== null && opacity !== undefined) ?
      OlStyleUtil.getRgbaColor(color, opacity) : color;

    return new this.OlStyleConstructor({
      stroke: new this.OlStyleStrokeConstructor({
        color: sColor,
        width: symbolizer.width as number,
        lineCap: symbolizer.cap as CapType,
        lineJoin: symbolizer.join as JoinType,
        lineDash: symbolizer.dasharray as number[],
        lineDashOffset: symbolizer.dashOffset as number
      })
    });
  }

  /**
   * Get the OL Style object from an GeoStyler-Style FillSymbolizer.
   *
   * @param symbolizer A GeoStyler-Style FillSymbolizer.
   * @return The OL Style object
   */
  async getOlPolygonSymbolizerFromFillSymbolizer(symbolizer: FillSymbolizer, feat?: OlFeature):
      Promise<OlStyle | OlStyleFill> {
    for (const key of Object.keys(symbolizer)) {
      if (isGeoStylerFunction(symbolizer[key as keyof FillSymbolizer])) {
        (symbolizer as any)[key] = OlStyleUtil.evaluateFunction((symbolizer as any)[key], feat);
      }
    }

    const color = symbolizer.color as string;
    const opacity = symbolizer.fillOpacity as number;
    const fColor = color && Number.isFinite(opacity)
      ? OlStyleUtil.getRgbaColor(color, opacity)
      : color;

    let fill = color
      ? new this.OlStyleFillConstructor({color: fColor})
      : undefined;

    const outlineColor = symbolizer.outlineColor as string;
    const outlineOpacity = symbolizer.outlineOpacity as number;
    const oColor = (outlineColor && Number.isFinite(outlineOpacity))
      ? OlStyleUtil.getRgbaColor(outlineColor, outlineOpacity)
      : outlineColor;

    const stroke = outlineColor || symbolizer.outlineWidth ? new this.OlStyleStrokeConstructor({
      color: oColor,
      width: symbolizer.outlineWidth as number,
      lineDash: symbolizer.outlineDasharray as number[],
    }) : undefined;

    const olStyle = new this.OlStyleConstructor({
      fill,
      stroke
    });

    if (symbolizer.graphicFill) {
      const pattern = await this.getOlPatternFromGraphicFill(symbolizer.graphicFill);
      if (!fill) {
        fill = new this.OlStyleFillConstructor({});
      }
      if (pattern) {
        fill.setColor(await pattern);
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
   * @param graphicFill The Symbolizer that holds the pattern config.
   * @returns The created CanvasPattern, or null.
   */
  async getOlPatternFromGraphicFill(graphicFill: PointSymbolizer): Promise<CanvasPattern | null> {
    return new Promise(async (resolve, reject) => {
      let graphicFillStyle: any;
      let iconSize: [number, number] = [16, 16];
      let iconSpacing = 1;
      let scaleFactor = 1;
      if (isIconSymbolizer(graphicFill)) {
        graphicFillStyle = await this.getOlIconSymbolizerFromIconSymbolizer(graphicFill);
        iconSize = graphicFillStyle?.getSize() || iconSize;
      } else if (isMarkSymbolizer(graphicFill)) {
        graphicFillStyle = await this.getOlPointSymbolizerFromMarkSymbolizer(graphicFill);
        const iconSvg = OlStyleUtil.getBase64DecodedSvg(graphicFillStyle.getImage().getSrc());
        const { id, dimensions } = getSvgProperties(iconSvg);
        if (dimensions) {
          iconSize = [dimensions, dimensions];
          // Hack to try to join lines for hatch patterns, but space out icon patterns.
          // Diagonal lines still do not render nicely in the corners, due to tiling.
          // TODO: Maybe use VendorOption's to control spacing?
          if (LINE_WELLKNOWNNAMES.includes(String(id))) {
            const iconRotation = graphicFillStyle.getImage().getRotation();
            // Extend lines that aren't horizontal or vertical to be full size of the canvas
            const isNotVerticalOrHorizontal = (iconRotation / (Math.PI / 2)) % 1 !== 0;
            if (isNotVerticalOrHorizontal) {
              scaleFactor = Math.abs(Math.cos(iconRotation)) + Math.abs(Math.sin(iconRotation));
            }
          } else {
            iconSpacing = 2;
          };
        }
      } else {
        reject(new Error('Unrecognised graphicFill type'));
        return;
      }

      const iconImage = graphicFillStyle.getImage();
      const canvasSize = iconSize.map(item  => item * iconSpacing);

      // Temporary canvas.
      // TODO: Can/should we reuse an pre-existing one for efficiency?
      const tmpCanvas: HTMLCanvasElement = document.createElement('canvas');
      tmpCanvas.width = canvasSize[0];
      tmpCanvas.height = canvasSize[1];
      const tmpContext = tmpCanvas.getContext('2d') as CanvasRenderingContext2D;

      // Create the context where we'll be drawing the style on
      const vectorContext = toContext(tmpContext, {
        size: canvasSize,
        pixelRatio: 1
      });

      const pointCoords = canvasSize.map(item  => item / 2);
      const pointFeature = new OlFeature(new OlGeomPoint(pointCoords));

      const patternImage = new Image(
        iconSize[0],
        iconSize[1]
      );
      patternImage.crossOrigin = 'anonymous';
      patternImage.src = iconImage.getSrc();

      const iconStyle = new OlStyleIcon({
        crossOrigin: 'anonymous',
        img: patternImage,
        scale: scaleFactor,
        size: iconSize,
        rotation: iconImage.getRotation()
      });

      const pointStyle = new OlStyle({
        image: iconStyle
      });

      patternImage.onload = () => {
        iconStyle.load();

        vectorContext.drawFeature(pointFeature, pointStyle);

        // Create a repeating pattern from the canvas
        const pattern = tmpContext.createPattern(tmpCanvas, 'repeat');

        if (!pattern) {
          reject(new Error('Failed to create pattern'));
          return;
        }

        // Resolve the pattern so it can be used elsewhere
        resolve(pattern);
        return;
      };
    });
  }

  /**
   * Get the OL StyleFunction object from an GeoStyler-Style TextSymbolizer.
   *
   * @param {TextSymbolizer} textSymbolizer A GeoStyler-Style TextSymbolizer.
   * @return {object} The OL StyleFunction
   */
  getOlTextSymbolizerFromTextSymbolizer(
    symbolizer: TextSymbolizer,
    feat?: OlFeature
  ): OlStyle | OlStyleText | OlStyleFunction {
    for (const key of Object.keys(symbolizer)) {
      if (isGeoStylerFunction(symbolizer[key as keyof TextSymbolizer])) {
        (symbolizer as any)[key] = OlStyleUtil.evaluateFunction((symbolizer as any)[key], feat);
      }
    }
    const color = symbolizer.color as string;
    let placement = symbolizer.placement;
    if (!placement) {
      // When setting placement it must not be undefined.
      // So we set it to the OL default value.
      placement = 'point';
    }
    if (placement === 'line-center') {
      // line-center not supported by OL.
      // So we use the closest supported value.
      placement = 'line';
    }
    const opacity = symbolizer.opacity as number;
    const fColor = color && Number.isFinite(opacity)
      ? OlStyleUtil.getRgbaColor(color, opacity)
      : color;

    const haloColor = symbolizer.haloColor as string;
    const haloWidth = symbolizer.haloWidth as number;
    const sColor = haloColor && Number.isFinite(opacity)
      ? OlStyleUtil.getRgbaColor(haloColor, opacity)
      : haloColor;
    const baseProps: OlStyleTextOptions = {
      font: OlStyleUtil.getTextFont(symbolizer),
      fill: new this.OlStyleFillConstructor({
        color: fColor
      }),
      stroke: new this.OlStyleStrokeConstructor({
        color: sColor,
        width: haloWidth ? haloWidth : 0 as number
      }),
      overflow: symbolizer.allowOverlap as boolean,
      offsetX: (symbolizer.offset ? symbolizer.offset[0] : 0) as number,
      offsetY: (symbolizer.offset ? symbolizer.offset[1] : 0) as number,
      rotation: typeof(symbolizer.rotate) === 'number' ? symbolizer.rotate * Math.PI / 180 : undefined,
      placement: placement as 'line' | 'point'
      // TODO check why props match
      // textAlign: symbolizer.pitchAlignment,
      // textBaseline: symbolizer.anchor
    };

    // check if TextSymbolizer.label contains a placeholder
    const prefix = '\\{\\{';
    const suffix = '\\}\\}';
    const regExp = new RegExp(prefix + '.*?' + suffix, 'g');
    let regExpRes;
    if (!isGeoStylerStringFunction(symbolizer.label)) {
      regExpRes = symbolizer.label ? symbolizer.label.match(regExp) : null;
    }
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
          text: symbolizer.label as string,
          ...baseProps
        })
      });
    }
  }

}

export default OlStyleParser;

import {
  CapType,
  FillSymbolizer,
  IconSymbolizer,
  isGeoStylerBooleanFunction,
  isGeoStylerFunction,
  isGeoStylerStringFunction,
  isSprite,
  JoinType,
  LineSymbolizer,
  MarkSymbolizer,
  ReadStyleResult,
  Rule,
  Style,
  StyleParser,
  Symbolizer,
  TextSymbolizer,
  UnsupportedProperties,
  WellKnownName,
  WriteStyleResult
} from 'geostyler-style';
import { EncodedExpression } from 'ol/expr/expression';
import {
  createDefaultStyle,
  FlatCircle,
  Rule as FlatRule,
  FlatShape,
  FlatStyle,
  FlatStyleLike
} from 'ol/style/flat';
import { IconOrigin } from 'ol/style/Icon';
import OlFlatStyleUtil from './Util/OlFlatStyleUtil';
import OlStyleUtil from './Util/OlStyleUtil';

/**
 * This parser can be used with the GeoStyler.
 * It implements the GeoStyler-Style Parser interface to work with OpenLayers Flat styles.
 *
 * @class OlFlatStyleParser
 * @implements StyleParser
 */
export class OlFlatStyleParser implements StyleParser<FlatStyleLike> {

  /**
   * The name of the OlFlatStyleParser.
   */
  public static title = 'OpenLayers FlatStyle Parser';

  unsupportedProperties: UnsupportedProperties = {
    Symbolizer: {
      MarkSymbolizer: {
        wellKnownName: {
          support: 'partial',
          info: 'Only circle is supported'
        },
        avoidEdges: 'none',
        blur: 'none',
        fillOpacity: 'none',
        offset: 'none',
        offsetAnchor: 'none',
        pitchAlignment: 'none',
        pitchScale: 'none',
        radiusUnit: 'none',
        rotate: 'none',
        strokeWidthUnit: 'none',
        visibility: 'none'
      },
      FillSymbolizer: {
        antialias: 'none',
        fillOpacity: 'none',
        graphicFill: 'none',
        graphicFillPadding: 'none',
        outlineCap: 'none',
        outlineColor: 'none',
        outlineDasharray: 'none',
        outlineJoin: 'none',
        outlineOpacity: 'none',
        outlineWidth: 'none',
        outlineWidthUnit: 'none',
        visibility: 'none'
      },
      IconSymbolizer: {
        allowOverlap: 'none',
        anchor: 'none',
        avoidEdges: 'none',
        color: 'none',
        format: 'none',
        haloBlur: 'none',
        haloColor: 'none',
        haloOpacity: 'none',
        haloWidth: 'none',
        haloWidthUnit: 'none',
        keepUpright: 'none',
        offsetAnchor: 'none',
        optional: 'none',
        padding: 'none',
        pitchAlignment: 'none',
        rotationAlignment: 'none',
        size: 'none',
        sizeUnit: 'none',
        textFit: 'none',
        textFitPadding: 'none',
        visibility: 'none'
      },
      LineSymbolizer: {
        blur: 'none',
        gapWidth: 'none',
        gapWidthUnit: 'none',
        gradient: 'none',
        graphicFill: 'none',
        graphicFillPadding: 'none',
        graphicStroke: 'none',
        roundLimit: 'none',
        spacing: 'none',
        spacingUnit: 'none',
        visibility: 'none',
        widthUnit: 'none'
      },
      RasterSymbolizer: 'none',
      TextSymbolizer: {
        allowOverlap: 'none',
        anchor: 'none',
        avoidEdges: 'none',
        fontStyle: 'none',
        fontWeight: 'none',
        haloBlur: 'none',
        haloWidthUnit: 'none',
        keepUpright: 'none',
        letterSpacing: 'none',
        letterSpacingUnit: 'none',
        lineHeight: 'none',
        lineHeightUnit: 'none',
        maxWidth: 'none',
        offsetAnchor: 'none',
        optional: 'none',
        pitchAlignment: 'none',
        rotationAlignment: 'none',
        transform: 'none',
        visibility: 'none',
      }
    },
    Function: {
      numberFormat: 'none',
      strAbbreviate: 'none',
      strCapitalize: 'none',
      strConcat: 'none',
      strEndsWith: 'none',
      strEqualsIgnoreCase: 'none',
      strIndexOf: 'none',
      strLastIndexOf: 'none',
      strLength: 'none',
      strMatches: 'none',
      strReplace: 'none',
      strStartsWith: 'none',
      strStripAccents: 'none',
      strSubstring: 'none',
      strSubstringStart: 'none',
      strToLowerCase: 'none',
      strToUpperCase: 'none',
      strTrim: 'none',
      acos: 'none',
      asin: 'none',
      exp: 'none',
      log: 'none',
      max: 'none',
      min: 'none',
      pi: 'none',
      random: 'none',
      rint: 'none',
      tan: 'none',
      toDegrees: 'none',
      toNumber: 'none',
      toRadians: 'none',
      double2bool: 'none',
      parseBoolean: 'none',
      step: 'none'
    }
  };

  title = 'OpenLayers FlatStyle Parser';

  flatStyleToGeoStylerFillSymbolizer(flatStyle: FlatStyle): FillSymbolizer {
    // NOTE: If fillColor is an expression, we cannot detect the opacity
    const [fillColor, fillOpacity] = OlFlatStyleUtil.isExpression(flatStyle['fill-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['fill-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['fill-color']);

    const [outlineColor, outlineOpacity] = OlFlatStyleUtil.isExpression(flatStyle['stroke-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['stroke-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['stroke-color']);

    const symbolizer: FillSymbolizer = {
      kind: 'Fill'
    };

    if (fillColor !== undefined) {
      symbolizer.color = fillColor;
    }
    if (fillOpacity !== undefined) {
      symbolizer.fillOpacity = fillOpacity;
    }
    if (outlineColor !== undefined) {
      symbolizer.outlineColor = outlineColor;
    }
    const outlineDasharray = OlFlatStyleUtil.olExpressionToGsExpression<number[]>(flatStyle['stroke-line-dash']);
    if (outlineDasharray !== undefined) {
      symbolizer.outlineDasharray = outlineDasharray;
    }
    if (outlineOpacity !== undefined) {
      symbolizer.outlineOpacity = outlineOpacity;
    }
    const outlineWidth = OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['stroke-width']);
    if (outlineWidth !== undefined) {
      symbolizer.outlineWidth = outlineWidth;
    }
    const outlineCap = OlFlatStyleUtil.olExpressionToGsExpression<CapType>(flatStyle['stroke-line-cap']);
    if (outlineCap !== undefined) {
      symbolizer.outlineCap = outlineCap;
    }
    const outlineJoin = OlFlatStyleUtil.olExpressionToGsExpression<JoinType>(flatStyle['stroke-line-join']);
    if (outlineJoin !== undefined) {
      symbolizer.outlineJoin = outlineJoin;
    }
    return symbolizer;
  }

  flatStyleToGeoStylerLineSymbolizer(flatStyle: FlatStyle): LineSymbolizer {
    const [strokeColor, strokeOpacity] = OlFlatStyleUtil.isExpression(flatStyle['stroke-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['stroke-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['stroke-color']);

    // TODO add other stroke properties
    return {
      kind: 'Line',
      color: strokeColor,
      opacity: strokeOpacity,
      width: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['stroke-width']),
      cap: OlFlatStyleUtil.olExpressionToGsExpression<CapType>(flatStyle['stroke-line-cap']),
      join: OlFlatStyleUtil.olExpressionToGsExpression<JoinType>(flatStyle['stroke-line-join']),
      dasharray: OlFlatStyleUtil.olExpressionToGsExpression<number[]>(flatStyle['stroke-line-dash']),
      dashOffset:
        OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['stroke-line-dash-offset']),
      miterLimit: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['stroke-miter-limit']),
      perpendicularOffset: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['stroke-offset'])
    };
  }

  flatTextStyleToGeoStylerTextSymbolizer(flatStyle: FlatStyle): TextSymbolizer {
    const [textFillColor, textFillOpacity] = OlFlatStyleUtil.isExpression(flatStyle['text-fill-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['text-fill-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['text-fill-color']);

    const [textStrokeColor, textStrokeOpacity] = OlFlatStyleUtil.isExpression(flatStyle['text-stroke-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['text-stroke-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['text-stroke-color']);

    let font: TextSymbolizer['font'] = undefined;
    let fontSize: TextSymbolizer['size'] = undefined;

    if (OlFlatStyleUtil.isExpression(flatStyle['text-font'])) {
      // NOTE: If font is an expression, we cannot detect the size
      font = [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['text-font'])];
    } else if (flatStyle['text-font']) {
      font = [OlStyleUtil.getFontNameFromOlFont(flatStyle['text-font'])];
      fontSize = OlStyleUtil.getSizeFromOlFont(flatStyle['text-font']);
    }

    // TODO add missing properties
    return {
      kind: 'Text',
      label: OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['text-value']),
      color: textFillColor,
      opacity: textFillOpacity,
      haloColor: textStrokeColor,
      haloOpacity: textStrokeOpacity,
      haloWidth: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['text-stroke-width']),
      font,
      size: fontSize,
      maxAngle: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['text-max-angle']),
      offset: [
        OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['text-offset-x']),
        OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['text-offset-y']),
      ],
      // TODO check if values of ol placement are the same as values of geostyler placement
      placement: OlFlatStyleUtil.olExpressionToGsExpression<'point' | 'line' | 'line-center'>(
        flatStyle['text-placement']
      ),
      rotate: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['text-rotation']),
      justify: OlFlatStyleUtil.olExpressionToGsExpression<'left' | 'center' | 'right'>(
        flatStyle['text-justify']
      ),
      padding: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['text-padding']),
    };
  }

  flatIconStyleToGeoStylerIconSymbolizer(flatStyle: FlatStyle): IconSymbolizer {
    let image;
    // If source, offset and size are defined, we assume that the image is a sprite.
    if (flatStyle['icon-src'] && flatStyle['icon-offset'] && flatStyle['icon-size']) {
      image = {
        source: flatStyle['icon-src'],
        position: flatStyle['icon-offset'] as [number, number],
        size: flatStyle['icon-size'] as [number, number],
      };
    } else {
      image = flatStyle['icon-src'];
    }

    // TODO add missing properties
    return {
      kind: 'Icon',
      image,
      opacity: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['icon-opacity']),
      size: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['icon-width']),
      rotate: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['icon-rotation']),
      offset: OlFlatStyleUtil.olExpressionToGsExpression<[number, number]>(
        flatStyle['icon-displacement']
      ),
    };
  }

  flatCircleStyleToGeoStylerMarkSymbolizer(flatStyle: FlatStyle): MarkSymbolizer {
    const [fillColor, fillOpacity] = OlFlatStyleUtil.isExpression(flatStyle['circle-fill-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['circle-fill-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['circle-fill-color']);

    const [strokeColor, strokeOpacity] = OlFlatStyleUtil.isExpression(flatStyle['circle-stroke-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['circle-stroke-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['circle-stroke-color']);

    // TODO add other circle properties
    return {
      kind: 'Mark',
      wellKnownName: 'circle',
      radius: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['circle-radius']),
      color: fillColor,
      opacity: fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeWidth: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['circle-stroke-width']),
      offset: OlFlatStyleUtil.olExpressionToGsExpression<[number, number]>(
        flatStyle['circle-displacement']
      ),
    };
  }

  flatShapeStyleToGeoStylerMarkSymbolizer(flatStyle: FlatStyle): MarkSymbolizer {
    const [fillColor, fillOpacity] = OlFlatStyleUtil.isExpression(flatStyle['shape-fill-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['shape-fill-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['shape-fill-color']);

    const [strokeColor, strokeOpacity] = OlFlatStyleUtil.isExpression(flatStyle['shape-stroke-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['shape-stroke-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['shape-stroke-color']);

    let wellKnownName: WellKnownName;
    switch (flatStyle['shape-points']) {
      case 2:
        switch (flatStyle['shape-angle']) {
          case 0:
            wellKnownName = 'shape://vertline';
            break;
          case Math.PI / 2:
            wellKnownName = 'shape://horline';
            break;
          case Math.PI / 4:
            wellKnownName = 'shape://slash';
            break;
          case 2 * Math.PI - (Math.PI / 4):
            wellKnownName = 'shape://backslash';
            break;
          default:
            break;
        }
        break;
      case 3:
        switch (flatStyle['shape-angle']) {
          case 0:
            wellKnownName = 'triangle';
            break;
          case Math.PI / 2:
            wellKnownName = 'shape://carrow';
            break;
          default:
            break;
        }
        break;
      case 4:
        if (Number.isFinite(flatStyle['shape-radius2'])) {
          // cross or x
          if (flatStyle['shape-angle'] === 0) {
            // cross
            wellKnownName = 'cross';
          } else {
            // x
            wellKnownName = 'x';
          }
        } else {
          // square
          wellKnownName = 'square';
        }
        break;
      case 5:
        // star
        wellKnownName = 'star';
        break;
      default:
        throw new Error('Could not parse FlatStyle. Only 2, 3, 4 or 5 point flat shapes are allowed');
    }

    // TODO add other shape properties
    return {
      kind: 'Mark',
      wellKnownName: wellKnownName!,
      color: fillColor,
      opacity: fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeWidth: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['shape-stroke-width']),
      radius: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['shape-radius']),
      offset: OlFlatStyleUtil.olExpressionToGsExpression<[number, number]>(flatStyle['shape-displacement']),
      rotate: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['shape-rotation']) || 0,
    };
  }

  flatTextStyleToGeoStylerMarkSymbolizer(flatStyle: FlatStyle): MarkSymbolizer {
    const [fillColor, fillOpacity] = OlFlatStyleUtil.isExpression(flatStyle['text-fill-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['text-fill-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['text-fill-color']);

    const [strokeColor, strokeOpacity] = OlFlatStyleUtil.isExpression(flatStyle['text-stroke-color'])
      ? [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['text-stroke-color'])]
      : OlFlatStyleUtil.getColorAndOpacity(flatStyle['text-stroke-color']);

    let font: TextSymbolizer['font'] = undefined;
    let fontSize: TextSymbolizer['size'] = undefined;

    if (OlFlatStyleUtil.isExpression(flatStyle['text-font'])) {
      // NOTE: If font is an expression, we cannot detect the size
      font = [OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['text-font'])];
    } else if (flatStyle['text-font']) {
      font = [OlStyleUtil.getFontNameFromOlFont(flatStyle['text-font'])];
      fontSize = OlStyleUtil.getSizeFromOlFont(flatStyle['text-font']);
    }

    let char = OlFlatStyleUtil.olExpressionToGsExpression<string>(flatStyle['text-value']) as string;
    if (Array.isArray(char)) {
      char = char[0];
    }

    return {
      kind: 'Mark',
      wellKnownName: `ttf://${font}#0x${char.charCodeAt(0).toString(16)}`,
      color: fillColor,
      opacity: fillOpacity,
      strokeColor,
      strokeOpacity,
      strokeWidth: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['text-stroke-width']),
      radius: (fontSize !== 0) ? fontSize : 5,
      rotate: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['text-rotation']) || 0,
      offset: [
        OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['text-offset-x']),
        OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['text-offset-y']),
      ],
    };
  }

  flatStyleToGeoStylerSymbolizers(flatStyle: FlatStyle): Symbolizer[] {
    const symbolizers: Symbolizer[] = [];

    if (OlFlatStyleUtil.hasFlatFill(flatStyle)) {
      symbolizers.push(this.flatStyleToGeoStylerFillSymbolizer(flatStyle));
    } else if (OlFlatStyleUtil.hasFlatStroke(flatStyle)) {
      symbolizers.push(this.flatStyleToGeoStylerLineSymbolizer(flatStyle));
    }

    if (OlFlatStyleUtil.hasFlatText(flatStyle)) {
      if (
        !OlFlatStyleUtil.isExpression(flatStyle['text-font']) &&
        flatStyle['text-font'] &&
        OlStyleUtil.getIsMarkSymbolizerFont(flatStyle['text-font'])
      ) {
        symbolizers.push(this.flatTextStyleToGeoStylerMarkSymbolizer(flatStyle));
      } else {
        symbolizers.push(this.flatTextStyleToGeoStylerTextSymbolizer(flatStyle));
      }
    }

    if (OlFlatStyleUtil.hasFlatIcon(flatStyle)) {
      symbolizers.push(this.flatIconStyleToGeoStylerIconSymbolizer(flatStyle));
    }

    if (OlFlatStyleUtil.hasFlatCircle(flatStyle)) {
      symbolizers.push(this.flatCircleStyleToGeoStylerMarkSymbolizer(flatStyle));
    }

    if (OlFlatStyleUtil.hasFlatShape(flatStyle)) {
      symbolizers.push(this.flatShapeStyleToGeoStylerMarkSymbolizer(flatStyle));
    }

    return symbolizers;
  }

  flatRuleToGeoStylerRule(flatRule: FlatRule, idx: number): Rule {
    // TODO handle else rules
    let symbolizers: Symbolizer[];

    if (OlFlatStyleUtil.isFlatStyle(flatRule.style)) {
      symbolizers = this.flatStyleToGeoStylerSymbolizers(flatRule.style);
    } else {
      // FlatStyleArray
      symbolizers = flatRule.style.map(this.flatStyleToGeoStylerSymbolizers, this).flat();
    }

    const rule: Rule = {
      name: `OL Style Rule ${idx}`,
      symbolizers,
    };

    if (flatRule.filter) {
      if (
        Array.isArray(flatRule.filter) &&
        flatRule.filter.length === 3 &&
        ['>=', '<'].includes(flatRule.filter[0]) &&
        Array.isArray(flatRule.filter[1]) &&
        flatRule.filter[1].length === 1 &&
        flatRule.filter[1][0] === 'resolution' &&
        !OlFlatStyleUtil.isExpression(flatRule.filter[2])
      ) {
        const resolution = flatRule.filter[2];

        const dpi = 25.4 / 0.28;
        const inchesPerMeter = 39.37;
        const scale = resolution * inchesPerMeter * dpi;
        if (flatRule.filter[0] === '>=') {
          rule.scaleDenominator = {
            min: scale
          };
        }
        if (flatRule.filter[0] === '<') {
          rule.scaleDenominator = {
            max: scale
          };
        }
      } else {
        rule.filter = OlFlatStyleUtil.olFilterToGsFilter(flatRule.filter);
      }
    }

    return rule;
  }

  flatRuleArrayToGeoStylerStyle(flatRuleArray: FlatRule[]): Style {
    return {
      name: 'OL Style',
      rules: flatRuleArray.map(this.flatRuleToGeoStylerRule, this)
    };
  }

  flatStyleArrayToGeoStylerStyle(flatStyleArray: FlatStyle[]): Style {
    // We interpret a FlatStyleArray as one geostyler rule with multiple symbolizers
    return {
      name: 'OL Style',
      rules: [{
        name: 'OL Style Rule 0',
        symbolizers: flatStyleArray.map(this.flatStyleToGeoStylerSymbolizers, this).flat()
      }]
    };
  }

  flatStyleToGeoStylerStyle(flatStyle: FlatStyle): Style {
    return {
      name: 'OL Style',
      rules: [{
        name: 'OL Style Rule 0',
        symbolizers: this.flatStyleToGeoStylerSymbolizers(flatStyle)
      }]
    };
  }

  flatStyleLikeToGeoStylerStyle(flatStyleLike: FlatStyleLike): Style {
    if (OlFlatStyleUtil.isFlatStyleArray(flatStyleLike)) {
      return this.flatStyleArrayToGeoStylerStyle(flatStyleLike);
    }
    if (OlFlatStyleUtil.isFlatRuleArray(flatStyleLike)) {
      return this.flatRuleArrayToGeoStylerStyle(flatStyleLike);
    }
    if (OlFlatStyleUtil.isFlatStyle(flatStyleLike)) {
      return this.flatStyleToGeoStylerStyle(flatStyleLike);
    }
    throw new Error('Provided argument is not a valid FlatStyleLike.');
  }

  /**
   * The readStyle implementation of the GeoStyler-Style StyleParser interface.
   * It reads an OpenLayers FlatStyle and returns a Promise.
   *
   * The Promise itself resolves with a GeoStyler-Style Style.
   *
   * @param flatStyleLike The style to be parsed
   * @return The Promise resolving with the GeoStyler-Style Style
   */
  readStyle(flatStyleLike: FlatStyleLike): Promise<ReadStyleResult> {
    return new Promise<ReadStyleResult>((resolve) => {
      try {
        const geoStylerStyle = this.flatStyleLikeToGeoStylerStyle(flatStyleLike);
        // TODO add support for unsupported properties
        resolve({
          output: geoStylerStyle
        });
      } catch (error) {
        resolve({
          errors: [error]
        });
      }
    });
  }

  /**
   * The writeStyle implementation of the GeoStyler-Style StyleParser interface.
   * It reads a GeoStyler-Style Style and returns a Promise containing the FlatStyle.
   *
   * The Promise itself resolves with an OpenLayers FlatStyle.
   *
   * @param geoStylerStyle A GeoStyler-Style Style.
   * @return The Promise resolving with one of above mentioned style types.
   */
  writeStyle(geoStylerStyle: Style): Promise<WriteStyleResult<FlatStyleLike>> {
    return new Promise<WriteStyleResult>((resolve) => {
      // TODO clone?
      // TODO add support for unsupported properties
      try {
        const flatStyle = this.flatStyleLikeFromGeoStylerStyle(geoStylerStyle);
        resolve({
          output: flatStyle,
          warnings: ['Not implemented yet']
        });
      } catch (error) {
        resolve({
          errors: [error]
        });
      }
    });
  }

  /**
   * Decides which FlatStyleLike should be returned depending on given geoStylerStyle.
   * Three FlatStyleLike are possible:
   *
   * 1. FlatStyle if input Style consists of
   *    one rule with one symbolizer, no filter, no scaleDenominator
   * 2. FlatStyle[] if input Style consists of
   *    one rule with multiple symbolizers, no filter, no scaleDenominator
   * 3. FlatRule[] if input Style consists of
   *    multiple rules, or contains filters or scaleDenominators
   *
   * @param geoStylerStyle A GeoStyler-Style Style
   */
  flatStyleLikeFromGeoStylerStyle(geoStylerStyle: Style): FlatStyle | FlatStyle[] | FlatRule[] {
    const rules = geoStylerStyle.rules;
    const nrRules = rules.length;
    if (nrRules === 1) {
      const hasFilter = geoStylerStyle?.rules?.[0]?.filter !== undefined ? true : false;
      const hasMinScale = geoStylerStyle?.rules?.[0]?.scaleDenominator?.min !== undefined ? true : false;
      const hasMaxScale = geoStylerStyle?.rules?.[0]?.scaleDenominator?.max !== undefined ? true : false;
      const hasScaleDenominator = hasMinScale || hasMaxScale ? true : false;
      if (!hasFilter && !hasScaleDenominator) {
        const nrSymbolizers = geoStylerStyle.rules[0].symbolizers.length;
        if (nrSymbolizers === 1) {
          return this.flatStyleFromGeoStylerStyle(geoStylerStyle);
        } else {
          return this.flatStyleArrayFromGeoStylerStyle(geoStylerStyle);
        }
      } else {
        return this.flatRuleArrayFromGeoStylerStyle(geoStylerStyle);
      }
    } else {
      return this.flatRuleArrayFromGeoStylerStyle(geoStylerStyle);
    }
  }

  /**
   * Parses the first symbolizer of the first rule of a GeoStyler-Style Style.
   *
   * @param geoStylerStyle GeoStyler-Style Style
   * @return An OpenLayers FlatStyle Object
   */
  flatStyleFromGeoStylerStyle(geoStylerStyle: Style): FlatStyle {
    const rule = geoStylerStyle.rules[0];
    const symbolizer = rule.symbolizers[0];
    const flatStyle = this.flatStyleFromSymbolizer(symbolizer);
    return flatStyle;
  }

  /**
   * Parses all symbolizers of the first rule of a GeoStyler-Style Style.
   *
   * @param geoStylerStyle GeoStyler-Style Style
   * @return An array of OpenLayers Style Objects
   */
  flatStyleArrayFromGeoStylerStyle(geoStylerStyle: Style): FlatStyle | FlatStyle[] {
    const rule = geoStylerStyle.rules[0];
    const flatStyles: FlatStyle[] = [];
    rule.symbolizers.sort((symb1: Symbolizer, symb2: Symbolizer) => {
      return symb1.kind < symb2.kind ? -1 : 1;
    });
    let prevKind: string | null = null;
    rule.symbolizers.forEach((symbolizer: Symbolizer) => {
      const flatStyle = this.flatStyleFromSymbolizer(symbolizer);
      if (prevKind !== symbolizer.kind) {
        let mergedStyle = flatStyle;
        const lastStyle = flatStyles.pop();
        if (lastStyle) {
          mergedStyle = Object.assign(lastStyle, flatStyle);
        }
        flatStyles.push(mergedStyle);
        prevKind = symbolizer.kind;
      } else {
        flatStyles.push(flatStyle);
      }
    });
    return flatStyles.length === 1 ? flatStyles[0] : flatStyles;
  }

  /**
   * Parses the rules and symbolizers of a GeoStyler-Style Style
   *
   * @param geoStylerStyle A GeoStyler-Style Style.
   * @return A FlatRuleArray
   */
  flatRuleArrayFromGeoStylerStyle(geoStylerStyle: Style): FlatRule[] {
    const rules = structuredClone(geoStylerStyle.rules);
    // const flatStyle = (feature: any, resolution: number): any[] => {
    const flatRules: FlatRule[] = [];

    // calculate scale for resolution (from ol-util MapUtil)
    const dpi = 25.4 / 0.28;
    const inchesPerMeter = 39.37;
    const scale = ['*', ['resolution'], inchesPerMeter * dpi];

    rules.forEach((rule: Rule) => {
      let minScaleFilter: EncodedExpression | undefined;
      let maxScaleFilter: EncodedExpression | undefined;
      let flatFilters: EncodedExpression[] = [];
      let flatFilter: EncodedExpression | undefined;
      const flatStyles: FlatStyle[] = [];

      // handling scale denominator
      let minScale = rule?.scaleDenominator?.min;
      let maxScale = rule?.scaleDenominator?.max;
      if (minScale || maxScale) {
        minScale = isGeoStylerFunction(minScale) ? OlStyleUtil.evaluateNumberFunction(minScale) : minScale;
        maxScale = isGeoStylerFunction(maxScale) ? OlStyleUtil.evaluateNumberFunction(maxScale) : maxScale;
        if (minScale !== undefined) {
          minScaleFilter = ['>=', scale, minScale];
          flatFilters.push(minScaleFilter);
        }
        if (maxScale !== undefined) {
          maxScaleFilter = ['<', scale, maxScale];
          flatFilters.push(maxScaleFilter);
        }
      }

      // handling filter
      if (rule.filter) {
        const ruleFilter = OlFlatStyleUtil.gsFilterToOlFilter(rule.filter);
        if (ruleFilter) {
          if (Array.isArray(ruleFilter) && ruleFilter[0] === 'all' && (minScaleFilter || maxScaleFilter)) {
            // remove all since we anyway combine the filters with an all
            ruleFilter.shift();
            flatFilters = [...flatFilters, ...ruleFilter];
          } else {
          flatFilters.push(ruleFilter);
          }
        }
      }

      if (flatFilters.length === 1) {
        flatFilter = flatFilters[0];
      } else if (flatFilters.length > 1) {
        flatFilter = ['all', ...flatFilters];
      }

      // if (isWithinScale && matchesFilter) {
      rule.symbolizers.forEach((symb: Symbolizer) => {
        if (symb.visibility === false) {
          flatStyles.push(null as any);
        }

        if (isGeoStylerBooleanFunction(symb.visibility)) {
          const visibility = OlStyleUtil.evaluateBooleanFunction(symb.visibility);
          if (!visibility) {
            flatStyles.push(null as any);
          }
        }

        const flatStyle = this.flatStyleFromSymbolizer(symb/* , feature */);
        // either a FlatStyle or an ol.StyleFunction. OpenLayers only accepts an array
        // of FlatStyles, not ol.StyleFunctions.
        // So we have to check it and in case of an ol.StyleFunction call that function
        // and add the returned style to const styles.
        if (typeof flatStyle !== 'function') {
          flatStyles.push(flatStyle);
        }/*  else {
              const styleFromFct: any = flatSymbolizer(feature, resolution);
              styles.push(styleFromFct);
            } */
      });
      // }
      flatRules.push({
        ...(flatFilter ? { filter: flatFilter } : {}),
        style: flatStyles.length === 1 ? flatStyles[0] : flatStyles,
      });
    });
    return flatRules;
    // };
    /* const flatStyleFct: FlatParserStyleFct = flatStyle as FlatParserStyleFct;
    flatStyleFct.__geoStylerStyle = geoStylerStyle;
    return flatStyleFct; */
  }

  /**
   * Get the OpenLayers FlatStyle object from a GeoStyler-Style Symbolizer.
   *
   * @param symbolizer A GeoStyler-Style Symbolizer.
   * @return The OpenLayers FlatStyle object
   */
  flatStyleFromSymbolizer(symbolizer: Symbolizer/* , feature?: OlFeature */): FlatStyle {
    let flatStyle: FlatStyle;
    symbolizer = structuredClone(symbolizer);

    switch (symbolizer.kind) {
      case 'Mark':
        flatStyle = this.flatStyleFromMarkSymbolizer(symbolizer/* , feature */);
        break;
      case 'Icon':
        flatStyle = this.flatStyleFromIconSymbolizer(symbolizer/* , feature */);
        break;
      case 'Text':
        flatStyle = this.flatStyleFromTextSymbolizer(symbolizer/* , feature */);
        break;
      case 'Line':
        flatStyle = this.flatStyleFromLineSymbolizer(symbolizer/* , feature */);
        break;
      case 'Fill':
        flatStyle = this.flatStyleFromFillSymbolizer(symbolizer/* , feature */);
        break;
      default:
        // Return the OL default style since the TS type binding does not allow
        // us to set olSymbolizer to undefined
        flatStyle = createDefaultStyle();
        break;
    }

    return flatStyle;
  }

  /**
   * Get the OL FlatStyle object from a GeoStyler-Style FillSymbolizer.
   *
   * @param symbolizer A GeoStyler-Style FillSymbolizer.
   * @return The OL FlatStyle object
   */
  flatStyleFromFillSymbolizer(symbolizer: FillSymbolizer/* , feat?: OlFeature */): FlatStyle {
    /* for (const key of Object.keys(symbolizer)) {
      if (isGeoStylerFunction(symbolizer[key as keyof FillSymbolizer])) {
        (symbolizer as any)[key] = OlStyleUtil.evaluateFunction((symbolizer as any)[key], feat);
      }
    } */

    const color = symbolizer.color as string;
    const opacity = symbolizer.fillOpacity as number;
    const fColor = color && Number.isFinite(opacity)
      ? OlStyleUtil.getRgbaColor(color, opacity)
      : color;

    const outlineColor = symbolizer.outlineColor as string;
    const outlineOpacity = symbolizer.outlineOpacity as number;
    const oColor = (outlineColor && Number.isFinite(outlineOpacity))
      ? OlStyleUtil.getRgbaColor(outlineColor, outlineOpacity)
      : outlineColor;

    const flatStyle = {
      ...(fColor ? { 'fill-color': fColor } : {}),
      ...(oColor ? { 'stroke-color': oColor } : {}),
      ...(symbolizer.outlineWidth !== undefined ? { 'stroke-width': symbolizer.outlineWidth as number } : {}),
      ...(symbolizer.outlineCap ? { 'stroke-line-cap': symbolizer.outlineCap as CapType } : {}),
      ...(symbolizer.outlineJoin ? { 'stroke-line-join': symbolizer.outlineJoin as JoinType } : {}),
      ...(symbolizer.outlineDasharray ? { 'stroke-line-dash': symbolizer.outlineDasharray as number[] } : {}),
    };

    /* if (symbolizer.graphicFill) {
      const pattern = this.getOlPatternFromGraphicFill(symbolizer.graphicFill);
      if (!fill) {
        fill = new this.OlStyleFillConstructor({});
      }
      if (pattern) {
        fill.setColor(pattern);
      }
      olStyle.setFill(fill);
    } */

    return flatStyle;
  }

  /**
   * Get the OL FlatStyle object from a GeoStyler-Style LineSymbolizer.
   *
   * @param symbolizer A GeoStyler-Style LineSymbolizer.
   * @return The OL FlatStyle object
   */
  flatStyleFromLineSymbolizer(symbolizer: LineSymbolizer/* , feat?: OlFeature */): FlatStyle {
    /* for (const key of Object.keys(symbolizer)) {
      if (isGeoStylerFunction(symbolizer[key as keyof LineSymbolizer])) {
        (symbolizer as any)[key] = OlStyleUtil.evaluateFunction((symbolizer as any)[key], feat);
      }
    } */

    const color = symbolizer.color as string;
    const opacity = symbolizer.opacity as number;
    const sColor = (color && opacity !== null && opacity !== undefined) ?
      OlStyleUtil.getRgbaColor(color, opacity) : color;

    return {
      ...(sColor ? {'stroke-color': sColor } : {}),
      ...(symbolizer.width !== undefined ? { 'stroke-width': symbolizer.width as number } : {}),
      ...(symbolizer.cap ? { 'stroke-line-cap': symbolizer.cap as CapType } : {}),
      ...(symbolizer.join ? { 'stroke-line-join': symbolizer.join as JoinType } : {}),
      ...(symbolizer.dasharray ? { 'stroke-line-dash': symbolizer.dasharray as number[] } : {}),
      ...(symbolizer.dashOffset ? { 'stroke-line-dash-offset': symbolizer.dashOffset as number } : {})
    };
  }

  /**
   * Get the OL FlatStyle object from an GeoStyler-Style TextSymbolizer.
   *
   * @param symbolizer A GeoStyler-Style TextSymbolizer.
   * @return The OL FlatStyle object
   */
  flatStyleFromTextSymbolizer(symbolizer: TextSymbolizer, /* feat?: OlFeature */): FlatStyle {
    /* for (const key of Object.keys(symbolizer)) {
      if (isGeoStylerFunction(symbolizer[key as keyof TextSymbolizer])) {
        (symbolizer as any)[key] = OlStyleUtil.evaluateFunction((symbolizer as any)[key], feat);
      }
    } */

    let placement = symbolizer.placement;
    if (placement === 'line-center') {
      // line-center not supported by OL.
      // So we use the closest supported value.
      placement = 'line';
    }

    const color = symbolizer.color as string;
    const opacity = symbolizer.opacity as number;
    const fColor = color && Number.isFinite(opacity)
      ? OlStyleUtil.getRgbaColor(color, opacity)
      : color;

    const haloColor = symbolizer.haloColor as string;
    const haloWidth = symbolizer.haloWidth as number;
    const sColor = haloColor && Number.isFinite(opacity)
      ? OlStyleUtil.getRgbaColor(haloColor, opacity)
      : haloColor;
    const flatStyle: FlatStyle = {
      ...(symbolizer.size && symbolizer.font ? { 'text-font': OlStyleUtil.getTextFont(symbolizer) } : {}),
      ...(fColor ? { 'text-fill-color': fColor } : {}),
      ...(sColor ? { 'text-stroke-color': sColor } : {}),
      ...(haloWidth ? { 'text-stroke-width': haloWidth } : {}),
      ...(symbolizer.allowOverlap !== undefined ? { 'text-overflow': symbolizer.allowOverlap as boolean } : {}),
      ...(symbolizer.offset ? { 'text-offset-x': symbolizer.offset[0] as number } : {}),
      ...(symbolizer.offset ? { 'text-offset-y': symbolizer.offset[1] as number } : {}),
      ...(typeof(symbolizer.rotate) === 'number' ? { 'text-rotation':  symbolizer.rotate } : {}),
      ...(symbolizer.placement ? { 'text-placement': placement as 'line' | 'point' } : {}),
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
      flatStyle['text-value'] = ['get', regExpRes[0].replace('{{', '').replace('}}', '')];
    } else {
      // if TextSymbolizer does not contain a placeholder
      if (symbolizer.label !== undefined) {
        flatStyle['text-value'] = symbolizer.label as string;
      }
    }

    return flatStyle;
  }

  /**
   * Get the OL FlatStyle object from a GeoStyler-Style IconSymbolizer.
   *
   * @param symbolizer A GeoStyler-Style IconSymbolizer.
   * @return The OL FlatStyle object
   */
  flatStyleFromIconSymbolizer(
    symbolizer: IconSymbolizer,
  ): FlatStyle {
    const flatStyle = {
      'icon-src': isSprite(symbolizer.image)
        ? (symbolizer.image.source as string)
        : (symbolizer.image as string),
      ...(symbolizer.opacity !== undefined ? { 'icon-opacity': symbolizer.opacity as number } : {}),
      ...(symbolizer.size ? { 'icon-width': symbolizer.size as number } : {}),
      ...(typeof(symbolizer.rotate) === 'number' ? { 'icon-rotation': symbolizer.rotate } : {}),
      ...(symbolizer.offset ? { 'icon-displacement': symbolizer.offset as [number, number] } : {}),
      ...(isSprite(symbolizer.image) ? {
        'icon-size': symbolizer.image.size as [number, number],
        'icon-offset': symbolizer.image.position as [number, number],
        'icon-offset-origin': 'top-left' as IconOrigin,
      } : {}),
    };

    // TODO add support for placeholder

    return flatStyle;
  }

  /**
   * Get the OL FLatStyle object from a GeoStyler-Style MarkSymbolizer.
   *
   * @param symbolizer A GeoStyler-Style MarkSymbolizer.
   * @return The OL FlatStyle object
   */
  flatStyleFromMarkSymbolizer(symbolizer: MarkSymbolizer/* , feat?: OlFeature */): FlatStyle {
    // let stroke: any;

    /* for (const key of Object.keys(symbolizer)) {
      if (isGeoStylerFunction(symbolizer[key as keyof MarkSymbolizer])) {
        (symbolizer as any)[key] = OlStyleUtil.evaluateFunction((symbolizer as any)[key], feat);
      }
    } */

    const strokeColor = symbolizer.strokeColor as string;
    const strokeOpacity = symbolizer.strokeOpacity as number;

    const sColor = strokeColor && (strokeOpacity !== undefined)
      ? OlStyleUtil.getRgbaColor(strokeColor, strokeOpacity)
      : symbolizer.strokeColor as string;

    /* if (symbolizer.strokeColor || symbolizer.strokeWidth !== undefined) {
      stroke = new this.OlStyleStrokeConstructor({
        color: sColor,
        width: symbolizer.strokeWidth as number
      });
    } */

    const color = symbolizer.color as string;
    // const opacity = symbolizer.opacity as number;
    const radius = symbolizer.radius as number;
    const fillOpacity = symbolizer.fillOpacity as number;
    const fColor = color && (fillOpacity !== undefined)
      ? OlStyleUtil.getRgbaColor(color, fillOpacity ?? 1)
      : color;

    /* const fill = new this.OlStyleFillConstructor({
      color: fColor
    }); */

    let flatStyle: FlatStyle;
    const baseProps = {
      fColor: fColor,
      radius: radius ?? 5,
      rotation: typeof(symbolizer.rotate) === 'number' ? symbolizer.rotate * Math.PI / 180 : undefined,
      sColor: sColor,
      sWidth: symbolizer.strokeWidth as number,
      displacement: Array.isArray(symbolizer.offset) ? symbolizer.offset.map(Number) : undefined
    };

    switch (symbolizer.wellKnownName) {
      case 'shape://dot':
      case 'circle':
        flatStyle = {
          'circle-radius': baseProps.radius as number,
          ...(baseProps.fColor ? { 'circle-fill-color': baseProps.fColor } : {}),
          ...(baseProps.sColor ? { 'circle-stroke-color': baseProps.sColor } : {}),
          ...(baseProps.sWidth ? { 'circle-stroke-width': baseProps.sWidth } : {}),
          ...(baseProps.displacement ? { 'circle-displacement': baseProps.displacement } : {}),
        } as FlatCircle;
        break;
      case 'square':
        flatStyle = {
          'shape-points': 4,
          ...(baseProps.fColor ? { 'shape-fill-color': baseProps.fColor } : {}),
          ...(baseProps.sColor ? { 'shape-stroke-color': baseProps.sColor } : {}),
          ...(baseProps.sWidth ? { 'shape-stroke-width': baseProps.sWidth } : {}),
          ...(baseProps.radius ? { 'shape-radius': baseProps.radius } : {}),
          ...(baseProps.displacement ? { 'shape-displacement': baseProps.displacement } : {}),
          ...(baseProps.rotation ? { 'shape-rotation': baseProps.rotation } : {}),
        } as FlatShape;
        break;
      case 'triangle':
        flatStyle = {
          'shape-points': 3,
          ...(baseProps.fColor ? { 'shape-fill-color': baseProps.fColor } : {}),
          ...(baseProps.sColor ? { 'shape-stroke-color': baseProps.sColor } : {}),
          ...(baseProps.sWidth ? { 'shape-stroke-width': baseProps.sWidth } : {}),
          ...(baseProps.radius ? { 'shape-radius': baseProps.radius } : {}),
          'shape-angle': 0,
          ...(baseProps.displacement ? { 'shape-displacement': baseProps.displacement } : {}),
          ...(baseProps.rotation ? { 'shape-rotation': baseProps.rotation } : {}),
        } as FlatShape;
        break;
      case 'star':
        flatStyle = {
          'shape-points': 5,
          ...(baseProps.fColor ? { 'shape-fill-color': baseProps.fColor } : {}),
          ...(baseProps.sColor ? { 'shape-stroke-color': baseProps.sColor } : {}),
          ...(baseProps.sWidth ? { 'shape-stroke-width': baseProps.sWidth } : {}),
          ...(baseProps.radius ? { 'shape-radius': baseProps.radius } : {}),
          'shape-radius2': 2,
          ...(baseProps.displacement ? { 'shape-displacement': baseProps.displacement } : {}),
          ...(baseProps.rotation ? { 'shape-rotation': baseProps.rotation } : {}),
        } as FlatShape;
        break;
      case 'shape://plus':
      case 'cross':
        flatStyle = {
          'shape-points': 4,
          ...(baseProps.fColor ? { 'shape-fill-color': baseProps.fColor } : {}),
          ...(baseProps.radius ? { 'shape-radius': baseProps.radius } : {}),
          'shape-radius2': 0,
          'shape-angle': 0,
          ...(baseProps.displacement ? { 'shape-displacement': baseProps.displacement } : {}),
          ...(baseProps.rotation ? { 'shape-rotation': baseProps.rotation } : {}),
        } as FlatShape;
        break;
      case 'shape://times':
      case 'x':
        flatStyle = {
          'shape-points': 4,
          ...(baseProps.fColor ? { 'shape-fill-color': baseProps.fColor } : {}),
          ...(baseProps.radius ? { 'shape-radius': baseProps.radius } : {}),
          'shape-radius2': 0,
          'shape-angle': 45 * Math.PI / 180,
          ...(baseProps.displacement ? { 'shape-displacement': baseProps.displacement } : {}),
          ...(baseProps.rotation ? { 'shape-rotation': baseProps.rotation } : {}),
        } as FlatShape;
        break;
      case 'shape://slash':
        flatStyle = {
          'shape-points': 2,
          ...(baseProps.fColor ? { 'shape-fill-color': baseProps.fColor } : {}),
          ...(baseProps.radius ? { 'shape-radius': baseProps.radius } : {}),
          'shape-angle': Math.PI / 4,
          ...(baseProps.displacement ? { 'shape-displacement': baseProps.displacement } : {}),
          ...(baseProps.rotation ? { 'shape-rotation': baseProps.rotation } : {}),
        } as FlatShape;
        break;
      case 'shape://backslash':
        flatStyle = {
          'shape-points': 2,
          ...(baseProps.fColor ? { 'shape-fill-color': baseProps.fColor } : {}),
          ...(baseProps.radius ? { 'shape-radius': baseProps.radius } : {}),
          'shape-angle': 2 * Math.PI - (Math.PI / 4),
          ...(baseProps.displacement ? { 'shape-displacement': baseProps.displacement } : {}),
          ...(baseProps.rotation ? { 'shape-rotation': baseProps.rotation } : {}),
        } as FlatShape;
        break;
      case 'shape://vertline':
        flatStyle = {
          'shape-points': 2,
          ...(baseProps.fColor ? { 'shape-fill-color': baseProps.fColor } : {}),
          ...(baseProps.radius ? { 'shape-radius': baseProps.radius } : {}),
          'shape-angle': 0,
          ...(baseProps.displacement ? { 'shape-displacement': baseProps.displacement } : {}),
          ...(baseProps.rotation ? { 'shape-rotation': baseProps.rotation } : {}),
        } as FlatShape;
        break;
      case 'shape://horline':
        flatStyle = {
          'shape-points': 2,
          ...(baseProps.fColor ? { 'shape-fill-color': baseProps.fColor } : {}),
          ...(baseProps.radius ? { 'shape-radius': baseProps.radius } : {}),
          'shape-angle': Math.PI / 2,
          ...(baseProps.displacement ? { 'shape-displacement': baseProps.displacement } : {}),
          ...(baseProps.rotation ? { 'shape-rotation': baseProps.rotation } : {}),
        } as FlatShape;
        break;
      // so far, both arrows are closed arrows. Also, shape is a regular triangle with
      // all sides of equal length. In geoserver arrows only have two sides of equal length.
      // TODO redefine shapes of arrows?
      case 'shape://oarrow':
      case 'shape://carrow':
        flatStyle = {
          'shape-points': 3,
          ...(baseProps.fColor ? { 'shape-fill-color': baseProps.fColor } : {}),
          ...(baseProps.radius ? { 'shape-radius': baseProps.radius } : {}),
          'shape-angle': Math.PI / 2,
          ...(baseProps.displacement ? { 'shape-displacement': baseProps.displacement } : {}),
          ...(baseProps.rotation ? { 'shape-rotation': baseProps.rotation } : {}),
        } as FlatShape;
        break;
      default:
        if (OlStyleUtil.getIsFontGlyphBased(symbolizer)) {
          flatStyle = {
            'text-value': OlStyleUtil.getCharacterForMarkSymbolizer(symbolizer),
            'text-font': OlStyleUtil.getTextFontForMarkSymbolizer(symbolizer),
            ...(baseProps.fColor ? { 'text-fill-color': baseProps.fColor } : {}),
            ...(baseProps.sColor ? { 'text-stroke-color': baseProps.sColor } : {}),
            'text-offset-x': (symbolizer.offset ? symbolizer.offset[0] : 0) as number,
            'text-offset-y': (symbolizer.offset ? symbolizer.offset[1] : 0) as number,
            ...(typeof(symbolizer.rotate) === 'number' ? { 'text-rotation':  symbolizer.rotate } : {}),
          };
          break;
        }
        throw new Error('MarkSymbolizer cannot be parsed. Unsupported WellKnownName.');
    }

    /* if (Number.isFinite(opacity) && olStyle.getImage()) {
      olStyle.getImage().setOpacity(opacity);
    } */

    return flatStyle;
  }
}

export default OlFlatStyleParser;

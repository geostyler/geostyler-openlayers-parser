import {
  CapType,
  FillSymbolizer,
  IconSymbolizer,
  isGeoStylerBooleanFunction,
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
  WriteStyleResult
} from 'geostyler-style';
import { EncodedExpression } from 'ol/expr/expression';
import {
  FlatStyle,
  FlatStyleLike,
  Rule as FlatRule,
  createDefaultStyle,
  FlatCircle
} from 'ol/style/flat';
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

    // TODO add other fill properties
    return {
      kind: 'Fill',
      color: fillColor,
      opacity: fillOpacity
    };
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

  flatStyleToGeoStylerTextSymbolizer(flatStyle: FlatStyle): TextSymbolizer {
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

  flatStyleToGeoStylerIconSymbolizer(flatStyle: FlatStyle): IconSymbolizer {
    // TODO add missing properties
    return {
      kind: 'Icon',
      image: flatStyle['icon-src'],
      offset: OlFlatStyleUtil.olExpressionToGsExpression<[number, number]>(
        flatStyle['icon-offset']
      ),
      opacity: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['icon-opacity']),
      rotate: OlFlatStyleUtil.olExpressionToGsExpression<number>(flatStyle['icon-rotation'])
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

  flatStyleToGeoStylerSymbolizers(flatStyle: FlatStyle): Symbolizer[] {
    const symbolizers: Symbolizer[] = [];

    if (OlFlatStyleUtil.hasFlatFill(flatStyle)) {
      symbolizers.push(this.flatStyleToGeoStylerFillSymbolizer(flatStyle));
    }

    if (OlFlatStyleUtil.hasFlatStroke(flatStyle)) {
      symbolizers.push(this.flatStyleToGeoStylerLineSymbolizer(flatStyle));
    }

    if (OlFlatStyleUtil.hasFlatText(flatStyle)) {
      symbolizers.push(this.flatStyleToGeoStylerTextSymbolizer(flatStyle));
    }

    if (OlFlatStyleUtil.hasFlatIcon(flatStyle)) {
      symbolizers.push(this.flatStyleToGeoStylerIconSymbolizer(flatStyle));
    }

    if (OlFlatStyleUtil.hasFlatCircle(flatStyle)) {
      symbolizers.push(this.flatCircleStyleToGeoStylerMarkSymbolizer(flatStyle));
    }

    // TODO add support for FlatShape
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
      rule.filter = OlFlatStyleUtil.olFilterToGsFilter(flatRule.filter);
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
          name: `OL Style Rule 0`,
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
   *    multiple rules, no filter, no scaleDenominator
   *
   * @param geoStylerStyle A GeoStyler-Style Style
   */
  flatStyleLikeFromGeoStylerStyle(geoStylerStyle: Style): FlatStyle | FlatStyle[] | FlatRule[] | undefined {
    const rules = geoStylerStyle.rules;
    const nrRules = rules.length;
    if (nrRules === 1) {
      const hasFilter = geoStylerStyle?.rules?.[0]?.filter !== undefined ? true : false;
      const hasMinScale = geoStylerStyle?.rules?.[0]?.scaleDenominator?.min !== undefined ? true : false;
      const hasMaxScale = geoStylerStyle?.rules?.[0]?.scaleDenominator?.max !== undefined ? true : false;
      const hasScaleDenominator = hasMinScale || hasMaxScale ? true : false;
      const hasFunctions = OlStyleUtil.containsGeoStylerFunctions(geoStylerStyle);

      const nrSymbolizers = geoStylerStyle.rules[0].symbolizers.length;
      /* const hasTextSymbolizer = rules[0].symbolizers.some((symbolizer: Symbolizer) => {
        return symbolizer.kind === 'Text';
      }); */
      const hasDynamicIconSymbolizer = rules[0].symbolizers.some((symbolizer: Symbolizer) => {
        return symbolizer.kind === 'Icon' && typeof(symbolizer.image) === 'string' && symbolizer.image.includes('{{');
      });
      if (!hasFilter && !hasScaleDenominator && !hasDynamicIconSymbolizer && !hasFunctions) {
        if (nrSymbolizers === 1) {
          return this.flatStyleFromGeoStylerStyle(geoStylerStyle);
        } else {
          return this.flatStyleArrayFromGeoStylerStyle(geoStylerStyle);
        }
      }/*  else {
        return this.geoStylerStyleToOlParserStyleFct(geoStylerStyle);
      } */
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
  flatStyleArrayFromGeoStylerStyle(geoStylerStyle: Style): FlatStyle[] {
    const rule = geoStylerStyle.rules[0];
    const flatStyles: FlatStyle[] = [];
    rule.symbolizers.forEach((symbolizer: Symbolizer) => {
      const flatStyle = this.flatStyleFromSymbolizer(symbolizer);
      flatStyles.push(flatStyle);
    });
    return flatStyles;
  }

  /**
   * Parses the rules and symbolizers of a GeoStyler-Style Style
   *
   * @param geoStylerStyle A GeoStyler-Style Style.
   * @return A FlatRuleArray
   */
  flatRuleArrayFromGeoStylerStyle(geoStylerStyle: Style): FlatRule[] {
    const rules = structuredClone(geoStylerStyle.rules);
    //const flatStyle = (feature: any, resolution: number): any[] => {
      const flatRules: FlatRule[] = [];

      // calculate scale for resolution (from ol-util MapUtil)
      /* const dpi = 25.4 / 0.28;
      const mpu = METERS_PER_UNIT.m;
      const inchesPerMeter = 39.37;
      const scale = resolution * mpu * inchesPerMeter * dpi; */

      rules.forEach((rule: Rule) => {
        let flatFilter: EncodedExpression | undefined;
        const flatStyles: FlatStyle[] = [];

        // handling scale denominator
        /* let minScale = rule?.scaleDenominator?.min;
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
        } */

        // handling filter
        /* let matchesFilter = false;
        if (!rule.filter) {
          matchesFilter = true;
        } else {
          try {
            matchesFilter = this.geoStylerFilterToOlParserFilter(feature, rule.filter);
          } catch (e) {
            matchesFilter = false;
          }
        } */
        if (rule.filter) {
          flatFilter = OlFlatStyleUtil.gsFilterToOlFilter(rule.filter);
        }

        //if (isWithinScale && matchesFilter) {
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
        //}
        flatRules.push({
          ...(flatFilter ? { filter: flatFilter } : {}),
          style: flatStyles.length === 1 ? flatStyles[0] : flatStyles,
        });
      });
      return flatRules;
    //};
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

    /* let fill = color
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
    }) : undefined; */

    const flatStyle = {
      ...(fColor ? { 'fill-color': fColor } : {}),
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
      'text-stroke-width': haloWidth ? haloWidth : 0 as number,
      ...(symbolizer.allowOverlap !== undefined ? { 'text-overflow': symbolizer.allowOverlap as boolean } : {}),
      'text-offset-x': (symbolizer.offset ? symbolizer.offset[0] : 0) as number,
      'text-offset-y': (symbolizer.offset ? symbolizer.offset[1] : 0) as number,
      ...(typeof(symbolizer.rotate) === 'number' ? { 'text-rotation':  symbolizer.rotate } : {}),
      'text-placement': placement as 'line' | 'point'
      // TODO check why props match
      // textAlign: symbolizer.pitchAlignment,
      // textBaseline: symbolizer.anchor
    };

    /* // check if TextSymbolizer.label contains a placeholder
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
    } */

    if (symbolizer.label !== undefined) {
      flatStyle['text-value'] = symbolizer.label as string;
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
    /* feat?: OlFeature */
  ): FlatStyle {
    /* for (const key of Object.keys(symbolizer)) {
      if (isGeoStylerFunction(symbolizer[key as keyof IconSymbolizer])) {
        (symbolizer as any)[key] = OlStyleUtil.evaluateFunction((symbolizer as any)[key], feat);
      }
    } */

    const flatStyle = {
      ...(symbolizer.image !== undefined
        ? { 'icon-src': isSprite(symbolizer.image)
          ? (symbolizer.image.source as string)
          : (symbolizer.image as string) }
        : {}),
      ...(symbolizer.opacity !== undefined ? { 'icon-opacity': symbolizer.opacity as number } : {}),
      ...(typeof(symbolizer.rotate) === 'number' ? { 'icon-rotation': symbolizer.rotate } : {}),
      ...(symbolizer.offset ? { 'icon-offset': symbolizer.offset as [number, number] } : {}),
    };

    /* // check if IconSymbolizer.image contains a placeholder
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
    } */

    return flatStyle;
  }

  /**
   * Get the OL FLatStyle object from a GeoStyler-Style MarkSymbolizer.
   *
   * @param symbolizer A GeoStyler-Style MarkSymbolizer.
   * @return The OL FlatStyle object
   */
  flatStyleFromMarkSymbolizer(symbolizer: MarkSymbolizer/* , feat?: OlFeature */): FlatStyle {
    //let stroke: any;

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
    //const opacity = symbolizer.opacity as number;
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
      //case 'shape://dot':
      case 'circle':
        flatStyle = {
          'circle-radius': baseProps.radius as number,
          ...(baseProps.fColor ? { 'circle-fill-color': baseProps.fColor } : {}),
          ...(baseProps.sColor ? { 'circle-stroke-color': baseProps.sColor } : {}),
          ...(baseProps.sWidth ? { 'circle-stroke-width': baseProps.sWidth } : {}),
          ...(baseProps.displacement ? { 'circle-displacement': baseProps.displacement } : {}),
        } as FlatCircle
        break;
      /* case 'square':
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor({
            ...shapeOpts,
            points: 4,
            angle: 45 * Math.PI / 180
          })
        });
        break;
      case 'triangle':
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor({
            ...shapeOpts,
            points: 3,
            angle: 0
          })
        });
        break;
      case 'star':
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor({
            ...shapeOpts,
            points: 5,
            radius2: shapeOpts.radius! / 2.5,
            angle: 0
          })
        });
        break;
      case 'shape://plus':
      case 'cross':
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor({
            ...shapeOpts,
            points: 4,
            radius2: 0,
            angle: 0
          })
        });
        break;
      case 'shape://times':
      case 'x':
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor({
            ...shapeOpts,
            points: 4,
            radius2: 0,
            angle: 45 * Math.PI / 180
          })
        });
        break;
      case 'shape://backslash':
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor({
            ...shapeOpts,
            points: 2,
            angle: 2 * Math.PI - (Math.PI / 4)
          })
        });
        break;
      case 'shape://horline':
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor({
            ...shapeOpts,
            points: 2,
            angle: Math.PI / 2
          })
        });
        break;
      // so far, both arrows are closed arrows. Also, shape is a regular triangle with
      // all sides of equal length. In geoserver arrows only have two sides of equal length.
      // TODO redefine shapes of arrows?
      case 'shape://oarrow':
      case 'shape://carrow':
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor({
            ...shapeOpts,
            points: 3,
            angle: Math.PI / 2
          })
        });
        break;
      case 'shape://slash':
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor({
            ...shapeOpts,
            points: 2,
            angle: Math.PI / 4
          })
        });
        break;
      case 'shape://vertline':
        // openlayers does not seem to set a default stroke color,
        // which is needed for regularshapes with radius2 = 0
        if (shapeOpts.stroke === undefined) {
          shapeOpts.stroke = new this.OlStyleStrokeConstructor({
            color: '#000'
          });
        }
        olStyle = new this.OlStyleConstructor({
          image: new this.OlStyleRegularshapeConstructor({
            ...shapeOpts,
            points: 2,
            angle: 0
          })
        });
        break; */
      default:
        /* if (OlStyleUtil.getIsFontGlyphBased(symbolizer)) {
          olStyle = new this.OlStyleConstructor({
            text: new this.OlStyleTextConstructor({
              text: OlStyleUtil.getCharacterForMarkSymbolizer(symbolizer),
              font: OlStyleUtil.getTextFontForMarkSymbolizer(symbolizer),
              fill: shapeOpts.fill,
              stroke: shapeOpts.stroke,
              rotation: shapeOpts.rotation
            })
          });
          break;
        } */
        throw new Error('MarkSymbolizer cannot be parsed. Unsupported WellKnownName.');
    }

    /* if (Number.isFinite(opacity) && olStyle.getImage()) {
      olStyle.getImage().setOpacity(opacity);
    } */

    return flatStyle;
  }
}

export default OlFlatStyleParser;

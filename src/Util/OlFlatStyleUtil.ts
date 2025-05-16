import { invert } from 'lodash';
import {
  FlatStyle,
  FlatStyleLike,
  Rule as FlatRule,
  ColorExpression,
} from 'ol/style/flat';

import {
  Fatan,
  Fatan2,
  Filter,
  Fin,
  Finterpolate,
  FstrDefaultIfBlank,
  GeoStylerFunction,
  Operator,
  PropertyType,
  Expression as StyleExpression
} from 'geostyler-style';

import OlStyleUtil from './OlStyleUtil';

export type Expression = any[];

const comparisonFilterNames = [
  '==',
  '!=',
  '<',
  '<=',
  '>',
  '>=',
  'between',
];

const filterNames = [
  ...comparisonFilterNames,
  'all',
  'any',
  '!'
];

export type FilterExpression = [typeof filterNames[number], ...any[]];
export type ComparisonFilterExpression = [typeof comparisonFilterNames[number], ...any[]];

// TODO continue here
const filterNameMap: Record<Operator, typeof filterNames[number] | null> = {
  '==': '==',
  '*=': null,
  '!=': '!=',
  '<': '<',
  '<=': '<=',
  '>': '>',
  '>=': '>=',
  '<=x<=': 'between',
  '&&': 'all',
  '||': 'any',
  '!': '!',
};

const invertedFilterMap: Partial<Record<typeof filterNames[number], Operator>> =
  invert(filterNameMap) as Partial<Record<typeof filterNames[number], Operator>> ;

const expressionNames = [
  'get',
  '*',
  '/',
  '+',
  '-',
  '%',
  '^',
  'abs',
  'floor',
  'round',
  'ceil',
  'sin',
  'cos',
  'atan',
  'sqrt',
  'case',
  'interpolate',
  'string',
  '<',
  '<=',
  '>',
  '>=',
  '==',
  '!=',
  '!',
  'all',
  'any',
  'between',
  'in',
  'to-string',
] as const;

const functionNameMap: Record<GeoStylerFunction['name'], typeof expressionNames[number]| null> = {
  // ---- string ----
  numberFormat: null,
  // numberFormat: 'number-format', // TODO: this could be done in theory but gs and mb use different format approaches
  strAbbreviate: null,
  strCapitalize: null,
  strConcat: null,
  strDefaultIfBlank: 'string',
  strEndsWith: null,
  strEqualsIgnoreCase: null,
  strIndexOf: null,
  strLastIndexOf: null,
  strLength: null,
  strMatches: null,
  strReplace: null,
  strStartsWith: null,
  strStripAccents: null,
  strSubstring: null,
  strSubstringStart: null,
  strToLowerCase: null,
  strToUpperCase: null,
  strToString: 'to-string',
  strTrim: null,
  // ---- number ----
  add: '+',
  abs: 'abs',
  acos: null,
  asin: null,
  // openlayers uses atan if only one argument is passed
  // atan2 is used for two arguments
  atan: 'atan',
  atan2: 'atan',
  ceil: 'ceil',
  cos: 'cos',
  div: '/',
  exp: null,
  floor: 'floor',
  interpolate: 'interpolate',
  log: null,
  // – : 'ln2'
  // – : 'log10'
  // – : 'log2'
  max: null,
  min: null,
  modulo: '%',
  mul: '*',
  pi: null,
  // - : 'e',
  pow: '^',
  random: null,
  rint: null,
  round: 'round',
  sin: 'sin',
  sqrt: 'sqrt',
  sub: '-',
  tan: null,
  toDegrees: null,
  toNumber: null,
  toRadians: null,
  // ---- boolean ----
  all: 'all',
  // eslint-disable-next-line id-blacklist
  any: 'any',
  between: 'between',
  double2bool: null,
  equalTo: '==',
  greaterThan: '>',
  greaterThanOrEqualTo: '>=',
  in: 'in',
  lessThan: '<',
  lessThanOrEqualTo: '<=',
  not: '!',
  notEqualTo: '!=',
  parseBoolean: null,
  // ---- unknown ----
  case: 'case',
  property: 'get',
  step: null
};

const invertedFunctionNameMap: Partial<Record<typeof expressionNames[number], GeoStylerFunction['name']>> =
  invert(functionNameMap);

class OlFlatStyleUtil {
  public static isFlatRule(flatStyle: FlatStyle | FlatRule): flatStyle is FlatRule {
    const hasStyleProp = flatStyle.hasOwnProperty('style');
    return hasStyleProp;
  }

  public static isFlatRuleArray(flatStyleLike: FlatStyleLike): flatStyleLike is FlatRule[] {
    const isArray = Array.isArray(flatStyleLike);
    if (!isArray) {
      return false;
    }

    const hasFlatRules = flatStyleLike.every(style => OlFlatStyleUtil.isFlatRule(style));
    return hasFlatRules;
  }

  public static isFlatStyle(flatStyleLike: FlatStyleLike): flatStyleLike is FlatStyle {
    const isArray = Array.isArray(flatStyleLike);
    if (isArray) {
      return false;
    }
    const hasStyleProp = flatStyleLike.hasOwnProperty('style');
    return !hasStyleProp;
  }

  public static isFlatStyleArray(flatStyleLike: FlatStyleLike): flatStyleLike is FlatStyle[] {
    const isArray = Array.isArray(flatStyleLike);
    if (!isArray) {
      return false;
    }
    const isFlatRuleArray = OlFlatStyleUtil.isFlatRuleArray(flatStyleLike);
    if (isFlatRuleArray) {
      return false;
    }
    const hasFlatStyles = flatStyleLike.every(
      style => OlFlatStyleUtil.isFlatStyle(style)
    );
    return hasFlatStyles;
  }

  public static isExpression(flatStyleProp: any): flatStyleProp is Expression {
    const isUndefined = flatStyleProp === undefined;
    const isArray = Array.isArray(flatStyleProp);
    if (isUndefined || !isArray) {
      return false;
    }

    const hasOperator = typeof flatStyleProp[0] == 'string';
    const isExpressionName = expressionNames.includes(flatStyleProp[0]);
    return hasOperator && isExpressionName;
  }

  public static isFilter(flatStyleProp: any): flatStyleProp is FilterExpression {
    const isUndefined = flatStyleProp === undefined;
    const isArray = Array.isArray(flatStyleProp);
    if (isUndefined || !isArray) {
      return false;
    }

    const hasOperator = typeof flatStyleProp[0] == 'string';
    const isFilterName = filterNames.includes(flatStyleProp[0]);
    return hasOperator && isFilterName;
  }

  public static isComparisonFilter(filter: FilterExpression): filter is  ComparisonFilterExpression {
    const isUndefined = filter === undefined;
    const isArray = Array.isArray(filter);
    if (isUndefined || !isArray) {
      return false;
    }

    const hasOperator = typeof filter[0] == 'string';
    const isComparisonFilterName = comparisonFilterNames.includes(filter[0]);
    return hasOperator && isComparisonFilterName;
  }

  public static getColorAndOpacity(
    flatStyleProp: ColorExpression | undefined
  ): [string | StyleExpression<string> | undefined, number | undefined] {
    if (flatStyleProp === undefined) {
      return [undefined, undefined];
    }

    const isArray = Array.isArray(flatStyleProp);
    if (!isArray) {
      let hexColor = OlStyleUtil.getHexColor(flatStyleProp);
      if (!hexColor) {
        throw new Error('Invalid color value');
      }
      const hasAlpha = hexColor.length > 7;
      if (hasAlpha) {
        hexColor = hexColor.slice(0, 7);
      }
      const opacity = OlStyleUtil.getOpacity(flatStyleProp);
      return [hexColor, opacity];
    }
    return [
      OlStyleUtil.getHexCodeFromRgbArray(flatStyleProp),
      flatStyleProp[3]
    ];
  }

  public static hasFlatFill(flatStyle: FlatStyle) {
    const hasFill = flatStyle.hasOwnProperty('fill-color') && flatStyle['fill-color'] !== undefined;
    return hasFill;
  }

  public static hasFlatStroke(flatStyle: FlatStyle) {
    const hasStrokeColor = flatStyle.hasOwnProperty('stroke-color') && flatStyle['stroke-color'] !== undefined;
    const hasStrokeWidth = flatStyle.hasOwnProperty('stroke-width') && flatStyle['stroke-width'] !== undefined;
    return hasStrokeColor || hasStrokeWidth;
  }

  public static hasFlatText(flatStyle: FlatStyle) {
    const hasTextValue = flatStyle.hasOwnProperty('text-value') && flatStyle['text-value'] !== undefined;
    return hasTextValue;
  }

  public static hasFlatIcon(flatStyle: FlatStyle) {
    const hasIconSrc = flatStyle.hasOwnProperty('icon-src') && flatStyle['icon-src'] !== undefined;
    return hasIconSrc;
  }

  public static hasFlatCircle(flatStyle: FlatStyle) {
    const hasCircleRadius = flatStyle.hasOwnProperty('circle-radius') && flatStyle['circle-radius'] !== undefined;
    return hasCircleRadius;
  }

  public static olExpressionToGsExpression<T extends PropertyType>(olExpression: any): StyleExpression<T> {
    if (!OlFlatStyleUtil.isExpression(olExpression)) {
      return olExpression;
    }

    const olExpressionName = olExpression[0] as typeof expressionNames[number];
    const functionName = invertedFunctionNameMap[olExpressionName];

    let func: GeoStylerFunction;
    const args = olExpression.slice(1);
    switch (functionName) {
      case 'case': {
        const gsArgs: any[] = [];
        const fallback = OlFlatStyleUtil.olExpressionToGsExpression(args.pop());
        args.forEach((a, index) => {
          var gsIndex = Math.floor(index / 2);
          if (index % 2 === 0) {
            gsArgs[gsIndex] = {
              case: OlFlatStyleUtil.olExpressionToGsExpression(a)
            };
          } else {
            gsArgs[gsIndex] = {
              ...gsArgs[gsIndex] as any,
              value: OlFlatStyleUtil.olExpressionToGsExpression(a)
            };
          }
        });
        func = {
          name: functionName,
          args: [fallback, ...gsArgs]
        };
        break;
      }
      case 'interpolate': {
        // currently only supporting linear interpolation
        const interpolationType = (args.shift() as [string])[0];
        const input = OlFlatStyleUtil.olExpressionToGsExpression(args.shift());
        const gsArgs: any[] = [];

        args.forEach((a, index) => {
          const gsIndex = Math.floor(index / 2);
          if (index % 2 === 0) {
            gsArgs[gsIndex] = {
              stop: OlFlatStyleUtil.olExpressionToGsExpression(a)
            };
          } else {
            gsArgs[gsIndex] = {
              ...gsArgs[gsIndex] as any,
              value: OlFlatStyleUtil.olExpressionToGsExpression(a)
            };
          }
        });
        // adding the interpolation type and the input as the first args
        gsArgs.unshift({name: interpolationType}, input);
        func = {
          name: functionName,
          args: gsArgs as Finterpolate['args']
        };
        break;
      }
      case 'strDefaultIfBlank': {
        func = {
          name: functionName,
          // gs function only allows two args
          args: args
            .slice(0, 2)
            .map(OlFlatStyleUtil.olExpressionToGsExpression) as FstrDefaultIfBlank['args']
        };
        break;
      }
      case 'in': {
        const needle = OlFlatStyleUtil.olExpressionToGsExpression(args.shift());
        let haystack: number[] | string[] = [];
        if (args[0] === 'literal') {
          haystack = args[0].pop();
        } else {
          haystack = args[0];
        }
        func = {
          name: functionName,
          args: [needle, ...haystack]
        } as Fin;
        break;
      }
      case 'atan':
      case 'atan2': {
        const atanFunc = {
          name: args.length === 1 ? 'atan' : 'atan2',
          args: args.map(OlFlatStyleUtil.olExpressionToGsExpression)
        };
        if (args.length === 1) {
          func = atanFunc as Fatan;
        } else {
          func = atanFunc as Fatan2;
        }
        break;
      }
      default:
        func = {
          name: functionName,
          args: args.map(OlFlatStyleUtil.olExpressionToGsExpression)
        } as GeoStylerFunction;
        break;
    }
    return func as StyleExpression<T>;
  }

  public static olFilterToGsFilter(olFilter: any): Filter | undefined {
    const isExpression = OlFlatStyleUtil.isExpression(olFilter);
    const isFilter = OlFlatStyleUtil.isFilter(olFilter);
    const isComparisonFilter = OlFlatStyleUtil.isComparisonFilter(olFilter);
    if (!isFilter && !isExpression) {
      return olFilter;
    }

    let filter: Filter;
    if (isFilter) {
      const olExpressionName = olFilter[0] as typeof filterNames[number];
      const filterName = invertedFilterMap[olExpressionName];
      const args = olFilter.slice(1);

      let propertyName: string | StyleExpression<string> = args.shift();
      // In GeoStyler, the first argument of a comparison filter
      // is the property name as plain string. So if the first argument
      // is a 'get' expression, we extract the property name from it.
      if (isComparisonFilter && Array.isArray(propertyName) && propertyName[0] === 'get') {
        propertyName = propertyName[1];
      }

      filter = [
        filterName,
        OlFlatStyleUtil.olFilterToGsFilter(propertyName),
        ...args.map(OlFlatStyleUtil.olFilterToGsFilter)
      ] as Filter;
    } else {
      filter = OlFlatStyleUtil.olExpressionToGsExpression(olFilter);
    }

    return filter;
  }
}

export default OlFlatStyleUtil;

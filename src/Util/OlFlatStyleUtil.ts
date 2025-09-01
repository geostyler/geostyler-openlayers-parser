import { invert, isEqual } from 'lodash';
import type { ColorExpression, FlatStyle, FlatStyleLike, Rule as FlatRule } from 'ol/style/flat';
import type { ExpressionValue } from 'ol/expr/expression';
import type {
  CombinationFilter,
  Expression as StyleExpression,
  Fatan,
  Fatan2,
  Filter,
  Fin,
  Finterpolate,
  FstrDefaultIfBlank,
  FunctionCall,
  GeoStylerFunction, NegationFilter,
  Operator,
  PropertyType,
} from 'geostyler-style';
import OlStyleUtil from './OlStyleUtil';
import { ComparisonFilter, Expression } from 'geostyler-style/dist/style';

const olExpressionOperators = [
  '==',
  '!=',
  '<',
  '<=',
  '>',
  '>=',
  'between',
  'all',
  'any',
  '!',
  'in',
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
  'to-string',
  'match'
] as const;

export type OpenLayersOperator = typeof olExpressionOperators[number];
export type OpenLayersExpression = [OpenLayersOperator, ...unknown[]];

const gsComparisonFilterToOlOperator: Partial<Record<Operator, OpenLayersOperator | null>> = {
  '==': '==',
  '!=': '!=',
  '<': '<',
  '<=': '<=',
  '>': '>',
  '>=': '>=',
  '<=x<=': 'between',
  '*=': null,
} as const;
const gsFilterToOlOperator: Record<Operator, OpenLayersOperator | null> = {
  ...gsComparisonFilterToOlOperator,
  '&&': 'all',
  '||': 'any',
  '!': '!',
};
const olOperatorToGsFilter = invert(gsFilterToOlOperator) as Record<OpenLayersOperator, Operator>;

const gsFunctionToOlOperator: Record<GeoStylerFunction['name'], OpenLayersOperator | null> = {
  // ---- string ----
  strToString: 'to-string',
  strDefaultIfBlank: 'string',
  numberFormat: null, // unsupported
  // numberFormat: 'number-format', // TODO: this could be done in theory but gs and mb use different format approaches
  strAbbreviate: null, // unsupported
  strCapitalize: null, // unsupported
  strConcat: null, // unsupported
  strEndsWith: null, // unsupported
  strEqualsIgnoreCase: null, // unsupported
  strIndexOf: null, // unsupported
  strLastIndexOf: null, // unsupported
  strLength: null, // unsupported
  strMatches: null, // unsupported
  strReplace: null, // unsupported
  strStartsWith: null, // unsupported
  strStripAccents: null, // unsupported
  strSubstring: null, // unsupported
  strSubstringStart: null, // unsupported
  strToLowerCase: null, // unsupported
  strToUpperCase: null, // unsupported
  strTrim: null, // unsupported
  // ---- number ----
  add: '+',
  abs: 'abs',
  // openlayers uses atan if only one argument is passed
  // atan2 is used for two arguments
  atan: 'atan',
  atan2: 'atan',
  ceil: 'ceil',
  cos: 'cos',
  div: '/',
  floor: 'floor',
  interpolate: 'interpolate',
  modulo: '%',
  mul: '*',
  pow: '^',
  round: 'round',
  sin: 'sin',
  sqrt: 'sqrt',
  sub: '-',
  acos: null, // unsupported
  asin: null, // unsupported
  exp: null, // unsupported
  log: null, // unsupported
  // – : 'ln2'
  // – : 'log10'
  // – : 'log2'
  max: null, // unsupported
  min: null, // unsupported
  pi: null, // unsupported
  // - : 'e',
  random: null, // unsupported
  rint: null, // unsupported
  tan: null, // unsupported
  toDegrees: null, // unsupported
  toNumber: null, // unsupported
  toRadians: null, // unsupported
  // ---- boolean ----
  all: 'all',
  // eslint-disable-next-line id-blacklist
  any: 'any',
  between: 'between',
  equalTo: '==',
  greaterThan: '>',
  greaterThanOrEqualTo: '>=',
  in: 'in',
  lessThan: '<',
  lessThanOrEqualTo: '<=',
  not: '!',
  notEqualTo: '!=',
  double2bool: null, // unsupported
  parseBoolean: null, // unsupported
  // ---- unknown ----
  case: 'case',
  property: 'get',
  step: null // unsupported
};
const olOperatorToGsFunction: Partial<Record<OpenLayersOperator, GeoStylerFunction['name']>> =
  invert(gsFunctionToOlOperator);

class OlFlatStyleUtil {
  public static isFlatRule(flatStyle: FlatStyle | FlatRule): flatStyle is FlatRule {
    return 'style' in flatStyle;
  }

  public static isFlatRuleArray(flatStyleLike: FlatStyleLike): flatStyleLike is FlatRule[] {
    const isArray = Array.isArray(flatStyleLike);
    if (!isArray) {
      return false;
    }
    return flatStyleLike.every(style => OlFlatStyleUtil.isFlatRule(style));
  }

  public static isFlatStyle(flatStyleLike: FlatStyleLike): flatStyleLike is FlatStyle {
    const isArray = Array.isArray(flatStyleLike);
    if (isArray) {
      return false;
    }
    return !('style' in flatStyleLike);
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
    return flatStyleLike.every(
      style => OlFlatStyleUtil.isFlatStyle(style)
    );
  }

  public static isOlExpression(value?: ExpressionValue): value is OpenLayersExpression {
    return Array.isArray(value) && typeof value[0] == 'string';
  }

  public static isGsExpression<T extends PropertyType>(value?: StyleExpression<T>): value is StyleExpression<T> {
    if (!value) {
      return false;
    }
    const isFunctionCall = typeof value === 'object'  && 'name' in value && 'args' in value;
    const isFilter = Array.isArray(value) && typeof value[0] == 'string';
    return isFunctionCall || isFilter;
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
    return ('fill-color' in flatStyle) && flatStyle['fill-color'] !== undefined;
  }

  public static hasFlatStroke(flatStyle: FlatStyle) {
    const hasStrokeColor = ('stroke-color' in flatStyle) && flatStyle['stroke-color'] !== undefined;
    const hasStrokeWidth = ('stroke-width' in flatStyle) && flatStyle['stroke-width'] !== undefined;
    return hasStrokeColor || hasStrokeWidth;
  }

  public static hasFlatText(flatStyle: FlatStyle) {
    return ('text-value' in flatStyle) && flatStyle['text-value'] !== undefined;
  }

  public static hasFlatIcon(flatStyle: FlatStyle) {
    return ('icon-src' in flatStyle) && flatStyle['icon-src'] !== undefined;
  }

  public static hasFlatCircle(flatStyle: FlatStyle) {
    return ('circle-radius' in flatStyle) && flatStyle['circle-radius'] !== undefined;
  }

  public static hasFlatShape(flatStyle: FlatStyle) {
    return ('shape-points' in flatStyle) && flatStyle['shape-points'] !== undefined;
  }

  public static olExpressionToGsExpression<T extends PropertyType>(olExpression?: ExpressionValue):
    StyleExpression<T> {
    if (!OlFlatStyleUtil.isOlExpression(olExpression)) {
      // special case for 'pi'
      if (olExpression === Math.PI) {
        return { name: 'pi' } as StyleExpression<T>;
      }
      return olExpression; // literal value: return as is
    }

    const olOperator = olExpression[0] as OpenLayersOperator;
    const functionName = olOperatorToGsFunction[olOperator];

    let func: GeoStylerFunction;
    const args = olExpression.slice(1) as ExpressionValue[];
    switch (olOperator) {
      case 'case': {
        const gsArgs: any[] = [];
        const fallback = OlFlatStyleUtil.olExpressionToGsExpression(args.pop());
        args.forEach((a, index) => {
          const gsIndex = Math.floor(index / 2);
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
        const input = OlFlatStyleUtil.olExpressionToGsExpression(args.shift()!);
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
      case 'string': {
        let funcArgs: FstrDefaultIfBlank['args'];
        // one arg: duplicate it to match GS expression signature (2 args)
        if (args.length === 1) {
          const singleArg =
            OlFlatStyleUtil.olExpressionToGsExpression(args[0] as ExpressionValue) as string | StyleExpression<string>;
          funcArgs = [singleArg, singleArg]; // duplicate arg if single
        }
        // more than two args: first one has to be turned into another strDefaultIfBlank function
        else if (args.length > 2) {
          const lastArg = OlFlatStyleUtil.olExpressionToGsExpression(
            args[args.length - 1] as ExpressionValue
          ) as string | StyleExpression<string>;
          const firstArg = OlFlatStyleUtil.olExpressionToGsExpression(
            ['string', ...args.slice(0, -1)]
          ) as string | StyleExpression<string>;
          funcArgs = [firstArg, lastArg];
        }
        // two args
        else {
          funcArgs = args.map(OlFlatStyleUtil.olExpressionToGsExpression) as FstrDefaultIfBlank['args'];
        }
        func = {
          name: functionName,
          args: funcArgs
        };
        break;
      }
      case 'in': {
        const needle = OlFlatStyleUtil.olExpressionToGsExpression(args.shift()!);
        let haystack: number[] | string[] = [];
        if (args[0][0] === 'literal') {
          haystack = args[0][1] as string[];
        } else {
          haystack = args[0];
        }
        func = {
          name: functionName,
          args: [needle, ...haystack]
        } as Fin;
        break;
      }
      case 'atan': {
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
      case 'match': {
        const gsArgs: any[] = [];
        const input = OlFlatStyleUtil.olExpressionToGsExpression(args[0]);
        const fallback = OlFlatStyleUtil.olExpressionToGsExpression(args[args.length - 1]);
        args.slice(1, -1).forEach((a, index) => {
          const gsIndex = Math.floor(index / 2);
          if (index % 2 === 0) {
            gsArgs[gsIndex] = {
              case: {
                name: 'equalTo',
                args: [input, OlFlatStyleUtil.olExpressionToGsExpression(a)]
              }
            };
          } else {
            gsArgs[gsIndex] = {
              ...gsArgs[gsIndex] as any,
              value: OlFlatStyleUtil.olExpressionToGsExpression(a)
            };
          }
        });
        func = {
          name: 'case',
          args: [fallback, ...gsArgs]
        };
        break;
      }
      default: {
        if (!functionName) {
          throw new Error(`OpenLayers operator cannot be converted to a GeoStyler function: ${olOperator}`);
        }
        func = {
          name: functionName,
          args: args.map(OlFlatStyleUtil.olExpressionToGsExpression)
        } as GeoStylerFunction;
        break;
      }
    }
    return func as StyleExpression<T>;
  }

  /**
   * This will attempt to generate a GeoStyler filter from an OpenLayers expression if possible.
   * If not, it will fall back to generating a GeoStyler expression.
   * @param olExpression
   */
  public static olExpressionToGsFilter<T extends PropertyType>(olExpression: ExpressionValue):
    Filter | StyleExpression<T> | undefined {
    let filter: Filter;
    const olOperator = OlFlatStyleUtil.getOlExpressionOperator(olExpression);
    const canBeAFilter =  olOperator != null && olOperator in olOperatorToGsFilter;
    if (canBeAFilter) {
      const filterName = olOperatorToGsFilter[olOperator];
      const args = (olExpression as OpenLayersExpression).slice(1);
      const firstArg = args.shift() as ExpressionValue;
      const canBeAComparisonFilter = filterName in gsComparisonFilterToOlOperator;
      let propertyName: string;
      // In GeoStyler, the first argument of a comparison filter
      // is the property name as plain string. So if the first argument
      // is a 'get' expression, we extract the property name from it.
      const firstArgOperator = OlFlatStyleUtil.getOlExpressionOperator(firstArg);
      if (canBeAComparisonFilter && firstArgOperator === 'get') {
        propertyName = (firstArg as OpenLayersExpression)[1] as string;
      } else {
        propertyName = firstArg as string;
      }

      filter = [
        filterName,
        OlFlatStyleUtil.olExpressionToGsFilter(propertyName),
        ...args.map(OlFlatStyleUtil.olExpressionToGsFilter)
      ] as Filter;
    } else {
      filter = OlFlatStyleUtil.olExpressionToGsExpression(olExpression);
    }
    return filter;
  }

  public static gsExpressionToOlExpression<T extends PropertyType>(gsExpression: StyleExpression<T>):
    OpenLayersExpression | null {
    if (!OlFlatStyleUtil.isGsExpression(gsExpression)) {
      return gsExpression as ExpressionValue;
    }
    if (Array.isArray(gsExpression)) {
      return OlFlatStyleUtil.gsFilterToOlExpression(gsExpression as Filter);
    }
    const gsFuncName = (gsExpression as FunctionCall<T>).name;
    const gsFuncArgs = (gsExpression as FunctionCall<T>).args;
    const olOperator = gsFunctionToOlOperator[gsFuncName];

    switch (gsFuncName) {
      case 'pi': return Math.PI;
      case 'interpolate': {
        const type = gsFuncArgs[0].name;
        const input = OlFlatStyleUtil.gsExpressionToOlExpression(gsFuncArgs[1]);
        const olArgs = gsFuncArgs.slice(2).map((arg) =>  [arg.stop, arg.value]).flat();
        return [olOperator, [type], input, ...olArgs];
      }
      case 'case': {
        const fallback = gsFuncArgs[0];
        let isMatchOperator = true;
        let matchInput = null;
        for (let i = 1; i < gsFuncArgs.length; i++) {
          const arg = gsFuncArgs[i];
          if (arg.case.name !== 'equalTo') {
            isMatchOperator = false;
            break;
          }
          if (matchInput === null) {
            matchInput = arg.case.args[0];
          } else if (!isEqual(matchInput, arg.case.args[0])) {
            isMatchOperator = false;
            break;
          }
        }
        if (isMatchOperator && matchInput) {
          const valueArgs = gsFuncArgs.slice(1).map((arg) => [arg.case.args[1], arg.value]).flat();
          return ['match',
            OlFlatStyleUtil.gsExpressionToOlExpression(matchInput),
            ...valueArgs.map(OlFlatStyleUtil.gsExpressionToOlExpression),
            fallback];
        }
        const olArgs = gsFuncArgs.slice(1).map((arg) => [arg.case, arg.value]).flat();
        return [olOperator, ...olArgs.map(OlFlatStyleUtil.gsExpressionToOlExpression), fallback];
      }
      case 'in': {
        const input = OlFlatStyleUtil.gsExpressionToOlExpression(gsFuncArgs[0]);
        const haystack = gsFuncArgs.slice(1).map(OlFlatStyleUtil.gsExpressionToOlExpression);
        const isStr = haystack.every(v => typeof v === 'string');
        return [olOperator, input, isStr ? ['literal', haystack] : haystack];
      }
      case 'strDefaultIfBlank': {
        // identical args: a single arg can be used in the OL expression
        if (gsFuncArgs[0] === gsFuncArgs[1]) {
          return [olOperator, OlFlatStyleUtil.gsExpressionToOlExpression(gsFuncArgs[0])];
        }
        const values = [];
        function collectValues(gsFunc) {
          if (gsFunc.name === 'strDefaultIfBlank') {
            values.unshift(gsFunc.args[1]);
            collectValues(gsFunc.args[0]);
          } else {
            values.unshift(gsFunc);
          }
        }
        collectValues(gsExpression);
        return [olOperator, ...values.map(OlFlatStyleUtil.gsExpressionToOlExpression)];
      }
    }
    if (!olOperator) {
      throw new Error(`GeoStyler function not supported in OpenLayers flat style: ${gsFuncName}`);
    }
    if (!gsFuncArgs) {
      return [olOperator];
    }
    return [olOperator, ...gsFuncArgs.map(OlFlatStyleUtil.gsExpressionToOlExpression)];
  }

  public static gsFilterToOlExpression(gsFilter: Filter): OpenLayersExpression | null {
    let result: OpenLayersExpression | null;
    const gsOperator = OlFlatStyleUtil.getGsFilterOperator(gsFilter);
    const isFilter = gsOperator && gsOperator in gsFilterToOlOperator;
    if (isFilter) {
      const isComparisonFilter = gsOperator in gsComparisonFilterToOlOperator;
      const olOperator = gsFilterToOlOperator[gsOperator];
      const args = (gsFilter as CombinationFilter | ComparisonFilter | NegationFilter).slice(1);

      const firstArg = args.shift();
      // In GeoStyler, the first argument of a comparison filter
      // can be the property name used in the comparison. In that case, we convert it to a 'get' expression.
      let firstOlArg;
      if (typeof firstArg === 'string' && isComparisonFilter) {
        firstOlArg = ['get', firstArg];
      } else {
        firstOlArg = OlFlatStyleUtil.gsFilterToOlExpression(firstArg);
      }
      result = [
        olOperator,
        firstOlArg,
        ...args.map(OlFlatStyleUtil.gsFilterToOlExpression)
      ] as OpenLayersExpression;
    } else {
      result = OlFlatStyleUtil.gsExpressionToOlExpression(gsFilter);
    }

    return result;
  }

  private static getOlExpressionOperator(olExpression: ExpressionValue): OpenLayersOperator | null {
    const isUndefined = olExpression === undefined;
    const isArray = Array.isArray(olExpression);
    if (isUndefined || !isArray) {
      return null;
    }
    const hasOperator = typeof olExpression[0] == 'string';
    if (!hasOperator) {
      return null;
    }
    return olExpression[0] as OpenLayersOperator;
  }

  private static getGsFilterOperator<T extends PropertyType>(value?: StyleExpression<T>):
    Operator | null {
    const isUndefined = value === undefined;
    const isArray = Array.isArray(value);
    if (isUndefined || !isArray) {
      return null;
    }
    const hasOperator = typeof value[0] == 'string';
    if (!hasOperator) {
      return null;
    }
    return value[0];
  }
}

export default OlFlatStyleUtil;

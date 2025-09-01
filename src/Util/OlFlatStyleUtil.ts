import { invert, isEqual } from 'lodash';
import type { ColorExpression, FlatStyle, FlatStyleLike, Rule as FlatRule } from 'ol/style/flat';
import { LiteralValue } from 'ol/expr/expression';
import type {
  CombinationFilter,
  ComparisonFilter,
  Expression,
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
  FCaseParameter, FInterpolateParameter,
  Fcase
} from 'geostyler-style';
import OlStyleUtil from './OlStyleUtil';

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
  'match',
  'literal'
] as const;

export type OpenLayersOperator = typeof olExpressionOperators[number];
export type OpenLayersExpression = [OpenLayersOperator, ...unknown[]];
export type OpenLayersValue = LiteralValue;
export type OpenLayersExpressionOrValue = OpenLayersExpression | OpenLayersValue;

export type GeoStylerExpression<T extends PropertyType> = T extends boolean ? Filter | Expression<T> : Expression<T>;
export type GeoStylerExpressionOrValue<T extends PropertyType> = GeoStylerExpression<T> | T;

const gsComparisonFilterToOlOperator = {
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
const olOperatorToGsFunction = invert(gsFunctionToOlOperator) as Record<OpenLayersOperator, GeoStylerFunction['name']>;

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

  public static isOlExpression(value?: OpenLayersExpressionOrValue): value is OpenLayersExpression {
    return Array.isArray(value) && typeof value[0] == 'string';
  }

  public static isGsExpression<T extends PropertyType>(value?: GeoStylerExpressionOrValue<T>):
    value is GeoStylerExpression<T> {
    if (!value) {
      return false;
    }
    const isFunctionCall = typeof value === 'object'  && 'name' in value && 'args' in value;
    const isFilter = Array.isArray(value) && typeof value[0] == 'string';
    return isFunctionCall || isFilter;
  }

  public static getColorAndOpacity(
    flatStyleProp: ColorExpression | undefined
  ): [GeoStylerExpressionOrValue<string> | undefined, number | undefined] {
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

  public static olExpressionToGsExpression<T extends PropertyType>(olExpression?: OpenLayersExpressionOrValue):
    GeoStylerExpressionOrValue<T> {
    if (!OlFlatStyleUtil.isOlExpression(olExpression)) {
      // special case for 'pi'
      if (olExpression === Math.PI) {
        return { name: 'pi' } as GeoStylerExpressionOrValue<T>;
      }
      return olExpression as T; // literal value: return as is
    }

    const olOperator = olExpression[0] as OpenLayersOperator;

    let func: GeoStylerFunction;
    const args = olExpression.slice(1) as OpenLayersExpressionOrValue[];
    switch (olOperator) {
      case 'case': {
        const cases: FCaseParameter[] = [];
        const fallback = OlFlatStyleUtil.olExpressionToGsExpression<T>(args.pop());
        args.forEach((a, index) => {
          const gsIndex = Math.floor(index / 2);
          if (index % 2 === 0) {
            cases[gsIndex] = {
              case: OlFlatStyleUtil.olExpressionToGsExpression<boolean>(a) as Expression<boolean>,
              value: undefined
            };
          } else {
            cases[gsIndex] = {
              ...cases[gsIndex],
              value: OlFlatStyleUtil.olExpressionToGsExpression(a)
            };
          }
        });
        func = {
          name: 'case',
          args: [fallback, ...cases]
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
          name: 'interpolate',
          args: gsArgs as Finterpolate['args']
        };
        break;
      }
      case 'string': {
        let funcArgs: FstrDefaultIfBlank['args'];
        // one arg: duplicate it to match GS expression signature (2 args)
        if (args.length === 1) {
          const singleArg =
            OlFlatStyleUtil.olExpressionToGsExpression(
              args[0] as OpenLayersExpressionOrValue
            ) as string | Expression<string>;
          funcArgs = [singleArg, singleArg]; // duplicate arg if single
        }
        // more than two args: first one has to be turned into another strDefaultIfBlank function
        else if (args.length > 2) {
          const lastArg = OlFlatStyleUtil.olExpressionToGsExpression(
            args[args.length - 1] as OpenLayersExpressionOrValue
          ) as string | Expression<string>;
          const firstArg = OlFlatStyleUtil.olExpressionToGsExpression(
            ['string', ...args.slice(0, -1)]
          ) as string | Expression<string>;
          funcArgs = [firstArg, lastArg];
        }
        // two args
        else {
          funcArgs = args.map(OlFlatStyleUtil.olExpressionToGsExpression) as FstrDefaultIfBlank['args'];
        }
        func = {
          name: 'strDefaultIfBlank',
          args: funcArgs
        };
        break;
      }
      case 'in': {
        const needle = OlFlatStyleUtil.olExpressionToGsExpression(args.shift()!);
        let haystack: number[] | string[] = [];
        const firstArg = args[0] as OpenLayersExpressionOrValue;
        const firstArgOperator = OlFlatStyleUtil.getOlExpressionOperator(firstArg);
        if (firstArgOperator === 'literal') {
          haystack = (firstArg as OpenLayersExpression)[1] as string[];
        } else {
          haystack = firstArg as number[];
        }
        func = {
          name: 'in',
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
        const functionName = olOperatorToGsFunction[olOperator];
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
    return func as GeoStylerExpression<T>;
  }

  /**
   * This will attempt to generate a GeoStyler filter from an OpenLayers expression if possible.
   * If not, it will fall back to generating a GeoStyler expression.
   * @param olExpression
   */
  public static olExpressionToGsFilter(olExpression: OpenLayersExpressionOrValue):
    GeoStylerExpressionOrValue<boolean> {
    const olOperator = OlFlatStyleUtil.getOlExpressionOperator(olExpression);
    const canBeAFilter =  olOperator != null && olOperator in olOperatorToGsFilter;
    if (canBeAFilter) {
      const filterName = olOperatorToGsFilter[olOperator];
      const args = (olExpression as OpenLayersExpression).slice(1);
      const firstArg = args.shift() as OpenLayersExpressionOrValue;
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

      return [
        filterName,
        OlFlatStyleUtil.olExpressionToGsFilter(propertyName),
        ...args.map(OlFlatStyleUtil.olExpressionToGsFilter)
      ] as Filter;
    }

    return OlFlatStyleUtil.olExpressionToGsExpression(olExpression);
  }

  public static gsExpressionToOlExpression<T extends PropertyType>(gsExpression: GeoStylerExpressionOrValue<T>):
    OpenLayersExpressionOrValue | null {
    if (!OlFlatStyleUtil.isGsExpression(gsExpression)) {
      return gsExpression as OpenLayersValue;
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
        const gsInterpolateArgs = gsFuncArgs as Finterpolate['args'];
        const type = (gsInterpolateArgs[0]).name;
        const input = OlFlatStyleUtil.gsExpressionToOlExpression(gsInterpolateArgs[1]);
        const olArgs = gsFuncArgs.slice(2).map((arg: FInterpolateParameter) =>  [arg.stop, arg.value]).flat();
        return ['interpolate', [type], input, ...olArgs];
      }
      case 'case': {
        const gsCaseArgs = gsFuncArgs as Fcase['args'];
        const fallback = gsCaseArgs[0];
        let isMatchOperator = true;
        let matchInput = null;
        // first we check if all cases are comparing against a similar expression/value; if yes, this function can
        // become a `match` expression instead of a `case` one
        for (let i = 1; i < gsCaseArgs.length; i++) {
          const arg = gsCaseArgs[i] as FCaseParameter;
          if (typeof arg.case !== 'object' || arg.case.name !== 'equalTo') {
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
          const valueArgs = gsCaseArgs.slice(1).map(
            (arg: FCaseParameter) => [(arg.case as FunctionCall<boolean>).args[1], arg.value]).flat();
          return ['match',
            OlFlatStyleUtil.gsExpressionToOlExpression(matchInput),
            ...valueArgs.map(OlFlatStyleUtil.gsExpressionToOlExpression),
            fallback];
        }
        const olArgs = gsFuncArgs.slice(1).map((arg: FCaseParameter) => [arg.case, arg.value]).flat();
        return ['case', ...olArgs.map(OlFlatStyleUtil.gsExpressionToOlExpression), fallback];
      }
      case 'in': {
        const input = OlFlatStyleUtil.gsExpressionToOlExpression(gsFuncArgs[0]);
        const haystack = gsFuncArgs.slice(1).map(OlFlatStyleUtil.gsExpressionToOlExpression);
        const isStr = haystack.every(v => typeof v === 'string');
        return ['in', input, isStr ? ['literal', haystack] : haystack];
      }
      case 'strDefaultIfBlank': {
        // identical args: a single arg can be used in the OL expression
        if (gsFuncArgs[0] === gsFuncArgs[1]) {
          return ['string', OlFlatStyleUtil.gsExpressionToOlExpression(gsFuncArgs[0])];
        }
        const values: GeoStylerExpressionOrValue<unknown>[] = [];
        function collectValues<U extends PropertyType>(gsExpr: GeoStylerExpressionOrValue<U>) {
          if (!OlFlatStyleUtil.isGsExpression(gsExpr) || Array.isArray(gsExpr)) {
            values.unshift(gsExpr);
            return;
          }
          const gsFunc = gsExpr as FunctionCall<U>;
          if (gsFunc.name === 'strDefaultIfBlank') {
            values.unshift(gsFunc.args[1]);
            collectValues(gsFunc.args[0]);
          } else {
            values.unshift(gsFunc);
          }
        }
        collectValues(gsExpression);
        return ['string', ...values.map(OlFlatStyleUtil.gsExpressionToOlExpression)];
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

  public static gsFilterToOlExpression<T extends PropertyType>(gsFilter: GeoStylerExpressionOrValue<T>):
    OpenLayersExpressionOrValue | null {
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
        firstOlArg = OlFlatStyleUtil.gsFilterToOlExpression(firstArg as GeoStylerExpressionOrValue<boolean>);
      }
      return [
        olOperator,
        firstOlArg,
        ...args.map(OlFlatStyleUtil.gsFilterToOlExpression)
      ] as OpenLayersExpression;
    }

    return OlFlatStyleUtil.gsExpressionToOlExpression<T>(gsFilter);
  }

  private static getOlExpressionOperator(olExpression: OpenLayersExpressionOrValue): OpenLayersOperator | null {
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

  private static getGsFilterOperator<T extends PropertyType>(value?: GeoStylerExpressionOrValue<T>):
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

import { FlatStyle, Rule } from 'ol/style/flat';
import OlFlatStyleUtil, { FilterExpression } from './OlFlatStyleUtil';
import { ColorLike } from 'ol/colorlike';
import { Color } from 'ol/color';

const flatStyle: FlatStyle = {
  'circle-radius': 6
};

const flatRule: Rule = {
  style: flatStyle
};

const flatStyleArray: FlatStyle[] = [
  flatStyle
];

const flatRuleArray: Rule[] = [
  flatRule
];

const expression = ['==', 'name', 'value'];

const comparisonFilter: FilterExpression = ['==', ['get', 'name'], 'value'];

const nonComparisonFilter: FilterExpression = ['all', false, true];

const primitives = {
  // eslint-disable-next-line id-blacklist
  string: 'string',
  // eslint-disable-next-line id-blacklist
  number: 1,
  // eslint-disable-next-line id-blacklist
  boolean: true,
  // eslint-disable-next-line id-blacklist
  null: null,
  // eslint-disable-next-line id-blacklist
  undefined: undefined
};

const objects = {
  object: {},
  array: []
};

const rgbaArray: Color = [255, 0, 0, 1];
const rgbString: ColorLike = 'rgb(255, 0, 0)';
const rgbaString: ColorLike = 'rgba(255, 0, 0, 1)';
const hexString: ColorLike = '#FF0000';
const hexStringWithAlpha: ColorLike = '#FF0000FF';

const flatFill: FlatStyle = {
  'fill-color': '#FF0000',
};

const flatStroke: FlatStyle = {
  'stroke-color': '#FF0000'
};

const flatText: FlatStyle = {
  'text-value': 'foo'
};

const flatIcon: FlatStyle = {
  'icon-src': 'foo.png'
};

const flatCircle: FlatStyle = {
  'circle-radius': 6
};

describe('OlFlatStyleUtil', () => {

  it('OlFlatStyleUtil is defined', () => {
    expect(OlFlatStyleUtil).toBeDefined();
  });

  describe('isFlatRule', () => {
    it('returns true for a FlatRule', () => {
      const isFlatRule = OlFlatStyleUtil.isFlatRule(flatRule);
      expect(isFlatRule).toBe(true);
    });
    it('returns false for a FlatStyle', () => {
      const isFlatRule = OlFlatStyleUtil.isFlatRule(flatStyle);
      expect(isFlatRule).toBe(false);
    });
  });

  describe('isFlatRuleArray', () => {
    it('returns true for a FlatRule array', () => {
      const isFlatRuleArray = OlFlatStyleUtil.isFlatRuleArray(flatRuleArray);
      expect(isFlatRuleArray).toBe(true);
    });
    it('returns false for a FlatStyle array', () => {
      const isFlatRuleArray = OlFlatStyleUtil.isFlatRuleArray(flatStyleArray);
      expect(isFlatRuleArray).toBe(false);
    });
    it('returns false for a FlatStyle', () => {
      const isFlatRuleArray = OlFlatStyleUtil.isFlatRuleArray(flatStyle);
      expect(isFlatRuleArray).toBe(false);
    });
  });

  describe('isFlatStyle', () => {
    it('returns true for a FlatStyle', () => {
      const isFlatStyle = OlFlatStyleUtil.isFlatStyle(flatStyle);
      expect(isFlatStyle).toBe(true);
    });
    it('returns false for a FlatStyle array', () => {
      const isFlatStyle = OlFlatStyleUtil.isFlatStyle(flatStyleArray);
      expect(isFlatStyle).toBe(false);
    });
    it('returns false for a FlatRule array', () => {
      const isFlatStyle = OlFlatStyleUtil.isFlatStyle(flatRuleArray);
      expect(isFlatStyle).toBe(false);
    });
  });

  describe('isFlatStyleArray', () => {
    it('returns true for a FlatStyle array', () => {
      const isFlatStyleArray = OlFlatStyleUtil.isFlatStyleArray(flatStyleArray);
      expect(isFlatStyleArray).toBe(true);
    });
    it('returns false for a FlatRule array', () => {
      const isFlatStyleArray = OlFlatStyleUtil.isFlatStyleArray(flatRuleArray);
      expect(isFlatStyleArray).toBe(false);
    });
    it('returns false for a FlatStyle', () => {
      const isFlatStyleArray = OlFlatStyleUtil.isFlatStyleArray(flatStyle);
      expect(isFlatStyleArray).toBe(false);
    });
  });

  describe('isExpression', () => {
    it('returns true for an expression', () => {
      const isExpression = OlFlatStyleUtil.isExpression(expression);
      expect(isExpression).toBe(true);
    });
    it('returns false for primitives', () => {
      Object.keys(primitives).forEach((key) => {
        const isExpression = OlFlatStyleUtil.isExpression(primitives[key]);
        expect(isExpression).toBe(false);
      });
    });
    it('returns false for objects and non-expression arrays', () => {
      Object.keys(objects).forEach((key) => {
        const isExpression = OlFlatStyleUtil.isExpression(objects[key]);
        expect(isExpression).toBe(false);
      });
    });
  });

  describe('isFilter', () => {
    it('returns true for a filter', () => {
      const isFilter = OlFlatStyleUtil.isFilter(comparisonFilter);
      expect(isFilter).toBe(true);
    });
    it('returns false for primitives', () => {
      Object.keys(primitives).forEach((key) => {
        const isFilter = OlFlatStyleUtil.isFilter(primitives[key]);
        expect(isFilter).toBe(false);
      });
    });
    it('returns false for objects and non-filter arrays', () => {
      Object.keys(objects).forEach((key) => {
        const isFilter = OlFlatStyleUtil.isFilter(objects[key]);
        expect(isFilter).toBe(false);
      });
    });
  });

  describe('isComparisonFilter', () => {
    it('returns true for a comparison filter', () => {
      const isComparisonFilter = OlFlatStyleUtil.isComparisonFilter(comparisonFilter);
      expect(isComparisonFilter).toBe(true);
    });
    it('returns false for primitives', () => {
      Object.keys(primitives).forEach((key) => {
        const isComparisonFilter = OlFlatStyleUtil.isComparisonFilter(primitives[key]);
        expect(isComparisonFilter).toBe(false);
      });
    });
    it('returns false for non-comparison-filter arrays', () => {
      const isComparisonFilter = OlFlatStyleUtil.isComparisonFilter(nonComparisonFilter);
      expect(isComparisonFilter).toBe(false);
    });
    it('returns false for objects and non-filter arrays', () => {
      Object.keys(objects).forEach((key) => {
        const isComparisonFilter = OlFlatStyleUtil.isComparisonFilter(objects[key]);
        expect(isComparisonFilter).toBe(false);
      });
    });
  });

  describe('getColorAndOpacity', () => {
    it('gets the color and opacity from a rgba array', () => {
      const [color, opacity] = OlFlatStyleUtil.getColorAndOpacity(rgbaArray);
      expect(color).toBe('#ff0000');
      expect(opacity).toBe(1);
    });
    it('gets the color from a rgb string', () => {
      const [color, opacity] = OlFlatStyleUtil.getColorAndOpacity(rgbString);
      expect(color).toBe('#ff0000');
      expect(opacity).toBe(undefined);
    });
    it('gets the color and opacity from a rgba string', () => {
      const [color, opacity] = OlFlatStyleUtil.getColorAndOpacity(rgbaString);
      expect(color).toBe('#ff0000');
      expect(opacity).toBe(1);
    });
    it('gets the color and opacity from a hex string', () => {
      const [color, opacity] = OlFlatStyleUtil.getColorAndOpacity(hexString);
      expect(color).toBe('#FF0000');
      expect(opacity).toBe(undefined);
    });
    it('gets the color and opacity from a hex string with alpha', () => {
      const [color, opacity] = OlFlatStyleUtil.getColorAndOpacity(hexStringWithAlpha);
      expect(color).toBe('#FF0000');
      expect(opacity).toBe(1);
    });
  });

  describe('hasFlatFill', () => {
    it('returns true for a flat fill', () => {
      const hasFlatFill = OlFlatStyleUtil.hasFlatFill(flatFill);
      expect(hasFlatFill).toBe(true);
    });
    it('returns false for a flat stroke', () => {
      const hasFlatFill = OlFlatStyleUtil.hasFlatFill(flatStroke);
      expect(hasFlatFill).toBe(false);
    });
    it('returns false for a flat text', () => {
      const hasFlatFill = OlFlatStyleUtil.hasFlatFill(flatText);
      expect(hasFlatFill).toBe(false);
    });
    it('returns false for a flat icon', () => {
      const hasFlatFill = OlFlatStyleUtil.hasFlatFill(flatIcon);
      expect(hasFlatFill).toBe(false);
    });
    it('returns false for a flat circle', () => {
      const hasFlatFill = OlFlatStyleUtil.hasFlatFill(flatCircle);
      expect(hasFlatFill).toBe(false);
    });
  });

  describe('hasFlatStroke', () => {
    it('returns true for a flat stroke', () => {
      const hasFlatStroke = OlFlatStyleUtil.hasFlatStroke(flatStroke);
      expect(hasFlatStroke).toBe(true);
    });
    it('returns false for a flat fill', () => {
      const hasFlatStroke = OlFlatStyleUtil.hasFlatStroke(flatFill);
      expect(hasFlatStroke).toBe(false);
    });
    it('returns false for a flat text', () => {
      const hasFlatStroke = OlFlatStyleUtil.hasFlatStroke(flatText);
      expect(hasFlatStroke).toBe(false);
    });
    it('returns false for a flat icon', () => {
      const hasFlatStroke = OlFlatStyleUtil.hasFlatStroke(flatIcon);
      expect(hasFlatStroke).toBe(false);
    });
    it('returns false for a flat circle', () => {
      const hasFlatStroke = OlFlatStyleUtil.hasFlatStroke(flatCircle);
      expect(hasFlatStroke).toBe(false);
    });
  });

  describe('hasFlatText', () => {
    it('returns true for a flat text', () => {
      const hasFlatText = OlFlatStyleUtil.hasFlatText(flatText);
      expect(hasFlatText).toBe(true);
    });
    it('returns false for a flat fill', () => {
      const hasFlatText = OlFlatStyleUtil.hasFlatText(flatFill);
      expect(hasFlatText).toBe(false);
    });
    it('returns false for a flat stroke', () => {
      const hasFlatText = OlFlatStyleUtil.hasFlatText(flatStroke);
      expect(hasFlatText).toBe(false);
    });
    it('returns false for a flat icon', () => {
      const hasFlatText = OlFlatStyleUtil.hasFlatText(flatIcon);
      expect(hasFlatText).toBe(false);
    });
    it('returns false for a flat circle', () => {
      const hasFlatText = OlFlatStyleUtil.hasFlatText(flatCircle);
      expect(hasFlatText).toBe(false);
    });
  });

  describe('hasFlatIcon', () => {
    it('returns true for a flat icon', () => {
      const hasFlatIcon = OlFlatStyleUtil.hasFlatIcon(flatIcon);
      expect(hasFlatIcon).toBe(true);
    });
    it('returns false for a flat fill', () => {
      const hasFlatIcon = OlFlatStyleUtil.hasFlatIcon(flatFill);
      expect(hasFlatIcon).toBe(false);
    });
    it('returns false for a flat stroke', () => {
      const hasFlatIcon = OlFlatStyleUtil.hasFlatIcon(flatStroke);
      expect(hasFlatIcon).toBe(false);
    });
    it('returns false for a flat text', () => {
      const hasFlatIcon = OlFlatStyleUtil.hasFlatIcon(flatText);
      expect(hasFlatIcon).toBe(false);
    });
    it('returns false for a flat circle', () => {
      const hasFlatIcon = OlFlatStyleUtil.hasFlatIcon(flatCircle);
      expect(hasFlatIcon).toBe(false);
    });
  });

  describe('hasFlatCircle', () => {
    it('returns true for a flat circle', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatCircle(flatCircle);
      expect(hasFlatCircle).toBe(true);
    });
    it('returns false for a flat fill', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatCircle(flatFill);
      expect(hasFlatCircle).toBe(false);
    });
    it('returns false for a flat stroke', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatCircle(flatStroke);
      expect(hasFlatCircle).toBe(false);
    });
    it('returns false for a flat text', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatCircle(flatText);
      expect(hasFlatCircle).toBe(false);
    });
    it('returns false for a flat icon', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatCircle(flatIcon);
      expect(hasFlatCircle).toBe(false);
    });
  });

  describe('olExpressionToGsExpression', () => {
    it('returns the input if it is not an expression', () => {
      const input = 'foo';
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toBe(input);
    });
    it('can read a "string" expression', () => {
      const input = ['string', 'foo'];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'strDefaultIfBlank',
        args: ['foo']
      });
    });
    it('can read a "to-string" expression', () => {
      const input = ['to-string', 'foo'];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'strToString',
        args: ['foo']
      });
    });
    it('can read a "+" expression', () => {
      const input = ['+', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'add',
        args: [1, 2]
      });
    });
    it('can read a "abs" expression', () => {
      const input = ['abs', -1];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'abs',
        args: [-1]
      });
    });
    it('can read a "atan" expression with one argument', () => {
      const input = ['atan', 1];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'atan',
        args: [1]
      });
    });
    it('can read a "atan" expression with two arguments', () => {
      const input = ['atan', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'atan2',
        args: [1, 2]
      });
    });
    it('can read a "ceil" expression', () => {
      const input = ['ceil', 1.5];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'ceil',
        args: [1.5]
      });
    });
    it('can read a "cos" expression', () => {
      const input = ['cos', 1];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'cos',
        args: [1]
      });
    });
    it('can read a "/" expression', () => {
      const input = ['/', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'div',
        args: [1, 2]
      });
    });
    it('can read a "floor" expression', () => {
      const input = ['floor', 1.5];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'floor',
        args: [1.5]
      });
    });
    it('can read a "interpolate" expression', () => {
      const input = ['interpolate', ['linear'], 0, 0, 1];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'interpolate',
        args: [
          { name: 'linear' },
          0,
          { stop: 0, value: 1 }
        ]
      });
    });
    it('can read a "%" expression', () => {
      const input = ['%', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'modulo',
        args: [1, 2]
      });
    });
    it('can read a "*" expression', () => {
      const input = ['*', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'mul',
        args: [1, 2]
      });
    });
    it('can read a "^" expression', () => {
      const input = ['^', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'pow',
        args: [1, 2]
      });
    });
    it('can read a "round" expression', () => {
      const input = ['round', 1.5];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'round',
        args: [1.5]
      });
    });
    it('can read a "sin" expression', () => {
      const input = ['sin', 1];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'sin',
        args: [1]
      });
    });
    it('can read a "sqrt" expression', () => {
      const input = ['sqrt', 4];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'sqrt',
        args: [4]
      });
    });
    it('can read a "-" expression', () => {
      const input = ['-', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'sub',
        args: [1, 2]
      });
    });
    it('can read a "all" expression', () => {
      const input = ['all', true, false];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'all',
        args: [true, false]
      });
    });
    it('can read a "any" expression', () => {
      const input = ['any', true, false];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'any',
        args: [true, false]
      });
    });
    it('can read a "between" expression', () => {
      const input = ['between', 1, 2, 3];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'between',
        args: [1, 2, 3]
      });
    });
    it('can read a "==" expression', () => {
      const input = ['==', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'equalTo',
        args: [1, 2]
      });
    });
    it('can read a ">" expression', () => {
      const input = ['>', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'greaterThan',
        args: [1, 2]
      });
    });
    it('can read a ">=" expression', () => {
      const input = ['>=', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'greaterThanOrEqualTo',
        args: [1, 2]
      });
    });
    it('can read a "in" expression', () => {
      const input = ['in', 1, [2, 3]];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'in',
        args: [1, 2, 3]
      });
    });
    it('can read a "<" expression', () => {
      const input = ['<', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'lessThan',
        args: [1, 2]
      });
    });
    it('can read a "<=" expression', () => {
      const input = ['<=', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'lessThanOrEqualTo',
        args: [1, 2]
      });
    });
    it('can read a "!" expression', () => {
      const input = ['!', true];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'not',
        args: [true]
      });
    });
    it('can read a "!=" expression', () => {
      const input = ['!=', 1, 2];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'notEqualTo',
        args: [1, 2]
      });
    });
    it('can read a "case" expression', () => {
      const input = ['case', false, 1, true, 2, 3];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'case',
        args: [
          3,
          { case: false, value: 1 },
          { case: true, value: 2 }
        ]
      });
    });
    it('can read a "get" expression', () => {
      const input = ['get', 'foo'];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'property',
        args: ['foo']
      });
    });
    it('can read a nested expression', () => {
      const input = ['==', ['get', 'foo'], 1];
      const output = OlFlatStyleUtil.olExpressionToGsExpression(input);
      expect(output).toEqual({
        name: 'equalTo',
        args: [
          {
            name: 'property',
            args: ['foo']
          },
          1
        ]
      });
    });
  });

  describe('olFilterToGsFilter', () => {
    it('returns the input if it is not an expression', () => {
      const input = 'foo';
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toBe(input);
    });
    it('can read a "==" expression', () => {
      const input = ['==', 'name', 'value'];
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toEqual(['==', 'name', 'value']);
    });
    it('can read a "!=" expression', () => {
      const input = ['!=', 'name', 'value'];
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toEqual(['!=', 'name', 'value']);
    });
    it('can read a "<" expression', () => {
      const input = ['<', 1, 2];
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toEqual(['<', 1, 2]);
    });
    it('can read a "<=" expression', () => {
      const input = ['<=', 1, 2];
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toEqual(['<=', 1, 2]);
    });
    it('can read a ">" expression', () => {
      const input = ['>', 1, 2];
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toEqual(['>', 1, 2]);
    });
    it('can read a ">=" expression', () => {
      const input = ['>=', 1, 2];
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toEqual(['>=', 1, 2]);
    });
    it('can read a "between" expression', () => {
      const input = ['between', 1, 2, 3];
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toEqual(['<=x<=', 1, 2, 3]);
    });
    it('can read a "all" expression', () => {
      const input = ['all', true, false];
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toEqual(['&&', true, false]);
    });
    it('can read a "any" expression', () => {
      const input = ['any', true, false];
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toEqual(['||', true, false]);
    });
    it('can read a "!" expression', () => {
      const input = ['!', true];
      const output = OlFlatStyleUtil.olFilterToGsFilter(input);
      expect(output).toEqual(['!', true]);
    });
  });
});

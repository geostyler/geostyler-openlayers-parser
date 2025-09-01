import { FlatCircle, FlatFill, FlatIcon, FlatStroke, FlatStyle, FlatText, Rule } from 'ol/style/flat';
import type { ExpressionValue } from 'ol/expr/expression';
import OlFlatStyleUtil, { type GsFilterExpression, type OlFilterExpression } from './OlFlatStyleUtil';
import { ColorLike } from 'ol/colorlike';
import { Color } from 'ol/color';
import { GeoStylerFunction } from 'geostyler-style/dist/functions';
import { Filter } from 'geostyler-style';

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

const comparisonFilter: GsFilterExpression = ['==', ['get', 'name'], 'value'];

const nonComparisonFilter: OlFilterExpression = ['all', false, true];

const primitives = {
  // eslint-disable-next-line id-blacklist
  string: 'string',
  // eslint-disable-next-line id-blacklist
  number: 1,
  // eslint-disable-next-line id-blacklist
  boolean: true,

  null: null,
  // eslint-disable-next-line id-blacklist
  undefined: undefined
};

const objects = {
  object: {},
  'non-expression array': [1, 2, 3]
};

const rgbaArray: Color = [255, 0, 0, 1];
const rgbString: ColorLike = 'rgb(255, 0, 0)';
const rgbaString: ColorLike = 'rgba(255, 0, 0, 1)';
const hexString: ColorLike = '#FF0000';
const hexStringWithAlpha: ColorLike = '#FF0000FF';

const flatFill: FlatFill = {
  'fill-color': '#FF0000',
};

const flatStroke: FlatStroke = {
  'stroke-color': '#FF0000'
};

const flatText: FlatText = {
  'text-value': 'foo'
};

const flatIcon: FlatIcon = {
  'icon-src': 'foo.png'
};

const flatCircle: FlatCircle = {
  'circle-radius': 6
};

const flatShape: FlatStyle = {
  'shape-points': 4
};

interface TestCase {
  name: string;
  gsExpr: GeoStylerFunction;
  gsFilter?: Filter;
  olExpr?: ExpressionValue;
  exception?: string;
}

const testCases: TestCase[] = [
  {
    name: 'Addition',
    olExpr: ['+', 1, 2],
    gsExpr: {
      name: 'add',
      args: [1, 2]
    }
  },
  {
    name: 'Absolute',
    olExpr: ['abs', -1],
    gsExpr: {
      name: 'abs',
      args: [-1]
    }
  },
  {
    name: 'Atan',
    olExpr: ['atan', 1],
    gsExpr: {
      name: 'atan',
      args: [1]
    }
  },
  {
    name: 'Atan2',
    olExpr: ['atan', 1, 2],
    gsExpr: {
      name: 'atan2',
      args: [1, 2]
    }
  },
  {
    name: 'Ceil',
    olExpr: ['ceil', 1.5],
    gsExpr: {
      name: 'ceil',
      args: [1.5]
    }
  },
  {
    name: 'Cos',
    olExpr: ['cos', 1],
    gsExpr: {
      name: 'cos',
      args: [1]
    }
  },
  {
    name: 'Division',
    olExpr: ['/', 1, 2],
    gsExpr: {
      name: 'div',
      args: [1, 2]
    }
  },
  {
    name: 'Floor',
    olExpr: ['floor', 1.5],
    gsExpr: {
      name: 'floor',
      args: [1.5]
    }
  },
  {
    name: 'Interpolate',
    olExpr: ['interpolate', ['linear'], 0, 0, 1, 2, 10],
    gsExpr: {
      name: 'interpolate',
      args: [
        {name: 'linear'},
        0,
        {stop: 0, value: 1},
        {stop: 2, value: 10}
      ]
    }
  },
  {
    name: 'Modulo',
    olExpr: ['%', 1, 2],
    gsExpr: {
      name: 'modulo',
      args: [1, 2]
    }
  },
  {
    name: 'Multiplication',
    olExpr: ['*', 1, 2],
    gsExpr: {
      name: 'mul',
      args: [1, 2]
    }
  },
  {
    name: 'Pow',
    olExpr: ['^', 1, 2],
    gsExpr: {
      name: 'pow',
      args: [1, 2]
    }
  },
  {
    name: 'Round',
    olExpr: ['round', 1.5],
    gsExpr: {
      name: 'round',
      args: [1.5]
    }
  },
  {
    name: 'Sin',
    olExpr: ['sin', 1],
    gsExpr: {
      name: 'sin',
      args: [1]
    }
  },
  {
    name: 'Sqrt',
    olExpr: ['sqrt', 4],
    gsExpr: {
      name: 'sqrt',
      args: [4]
    }
  },
  {
    name: 'Substraction',
    olExpr: ['-', 1, 2],
    gsExpr: {
      name: 'sub',
      args: [1, 2]
    }
  },
  {
    name: 'All',
    olExpr: ['all', true, false],
    gsExpr: {
      name: 'all',
      args: [true, false]
    },
    gsFilter: ['&&', true, false]
  },
  {
    name: 'Any',
    olExpr: ['any', true, false],
    gsExpr: {
      name: 'any',
      args: [true, false]
    },
    gsFilter: ['||', true, false]
  },
  {
    name: 'Between',
    olExpr: ['between', 1, 2, 3],
    gsExpr: {
      name: 'between',
      args: [1, 2, 3]
    }
  },
  {
    name: 'Between property',
    olExpr: ['between', ['get', 'foo'], 2, 3],
    gsExpr: {
      name: 'between',
      args: [{
        name: 'property',
        args: ['foo']
      }, 2, 3]
    },
    gsFilter: ['<=x<=', 'foo', 2, 3]
  },
  {
    name: 'Equals',
    olExpr: ['==', 1, 2],
    gsExpr: {
      name: 'equalTo',
      args: [1, 2]
    }
  },
  {
    name: 'Greater than',
    olExpr: ['>', 1, 2],
    gsExpr: {
      name: 'greaterThan',
      args: [1, 2]
    },
    gsFilter: ['>', 1, 2]
  },
  {
    name: 'Greater than or equal to',
    olExpr: ['>=', 1, 2],
    gsExpr: {
      name: 'greaterThanOrEqualTo',
      args: [1, 2]
    },
    gsFilter: ['>=', 1, 2]
  },
  {
    name: 'In (number haystack)',
    olExpr: ['in', 1, [2, 3, 10]],
    gsExpr: {
      name: 'in',
      args: [1, 2, 3, 10]
    }
  },
  {
    name: 'In (string haystack)',
    olExpr: ['in', 'ab', ['literal', ['abc', 'def', 'ghi']]],
    gsExpr: {
      name: 'in',
      args: ['ab', 'abc', 'def', 'ghi']
    }
  },
  {
    name: 'Less than',
    olExpr: ['<', 1, 2],
    gsExpr: {
      name: 'lessThan',
      args: [1, 2]
    },
    gsFilter: ['<', 1, 2]
  },
  {
    name: 'Less than or equal to',
    olExpr: ['<=', 1, 2],
    gsExpr: {
      name: 'lessThanOrEqualTo',
      args: [1, 2]
    },
    gsFilter: ['<=', 1, 2]
  },
  {
    name: 'Not',
    olExpr: ['!', true],
    gsExpr: {
      name: 'not',
      args: [true]
    },
    gsFilter: ['!', true]
  },
  {
    name: 'Not equals',
    olExpr: ['!=', 1, 2],
    gsExpr: {
      name: 'notEqualTo',
      args: [1, 2]
    }
  },
  {
    name: 'Case',
    olExpr: ['case', false, 1, true, 2, 3],
    gsExpr: {
      name: 'case',
      args: [
        3,
        {case: false, value: 1},
        {case: true, value: 2}
      ]
    }
  },
  {
    name: 'Property',
    olExpr: ['get', 'foo'],
    gsExpr: {
      name: 'property',
      args: ['foo']
    }
  },
  {
    name: 'Equals property',
    olExpr: ['==', ['get', 'foo'], 1],
    gsExpr: {
      name: 'equalTo',
      args: [
        {
          name: 'property',
          args: ['foo']
        },
        1
      ]
    },
    gsFilter: ['==', 'foo', 1]
  },
  {
    name: 'Pi',
    gsExpr: {
      name: 'pi'
    },
    olExpr: Math.PI
  },
  {
    name: 'String coalesce',
    olExpr: ['string', 'bar', 'foo'],
    gsExpr: {
      name: 'strDefaultIfBlank',
      args: ['bar', 'foo']
    }
  },
  {
    name: 'String coalesce (only one argument)',
    olExpr: ['string', 'foo'],
    gsExpr: {
      name: 'strDefaultIfBlank',
      args: ['foo', 'foo']
    }
  },
  {
    name: 'String coalesce (many arguments)',
    olExpr: ['string', 'foo', 'bar', 'abc', 'def'],
    gsExpr: {
      name: 'strDefaultIfBlank',
      args: [{
        name: 'strDefaultIfBlank',
        args: [{
          name: 'strDefaultIfBlank',
          args: ['foo', 'bar']
        }, 'abc']
      }, 'def']
    }
  },
  {
    name: 'String conversion',
    olExpr: ['to-string', 'foo'],
    gsExpr: {
      name: 'strToString',
      args: ['foo']
    }
  },
  {
    name: 'Not equals property',
    olExpr: ['!=', ['get', 'name'], 'value'],
    gsExpr: {
      name: 'notEqualTo',
      args: [{
        name: 'property',
        args: ['name']
      }, 'value']
    },
    gsFilter: ['!=', 'name', 'value']
  },
  {
    name: 'Nested value',
    olExpr: ['+', Math.PI, ['abs', 123]],
    gsExpr: {
      name: 'add',
      args: [{
        name: 'pi'
      }, {
        name: 'abs',
        args: [123]
      }]
    },
  },
  {
    name: 'Unsupported GS function',
    gsExpr: {
      name: 'max',
      args: [{
        name: 'pi'
      }, {
        name: 'strLength',
        args: ['Peter']
      }]
    },
    exception: 'GeoStyler function not supported in OpenLayers flat style: max'
  },
  {
    olExpr: ['between', ['get', 'testprop'], 0, 1],
    name: 'Simple property-based filter',
    gsExpr: {
      name: 'between',
      args: [{
        name: 'property',
        args: ['testprop']
      }, 0, 1]
    },
    gsFilter: [
      '==',
      {
        name: 'between',
        args: [{
          name: 'property',
          args: ['testprop']
        }, 0, 1]
      },
      true
    ],
  },
  {
    name: 'Composite property-based filter',
    olExpr: [
      'all',
      ['==', ['get', 'posledni_hodnota'], ['get', 'posledni_hodnota_sekundarni']],
      ['>', ['get', 'value1'], ['get', 'value2']],
      [
        '<=',
        ['get', 'posledni_hodnota'],
        ['get', 'spa1h']
      ],
      ['!=', ['get', 'status'], 'NULL'],
    ],
    gsExpr: {
      args: [
        {
          args: [
            {
              args: [
                'posledni_hodnota'
              ],
              name: 'property'
            },
            {
              args: [
                'posledni_hodnota_sekundarni'
              ],
              name: 'property'
            }
          ],
          name: 'equalTo'
        },
        {
          args: [
            {
              args: [
                'value1'
              ],
              name: 'property'
            },
            {
              args: [
                'value2'
              ],
              name: 'property'
            }
          ],
          name: 'greaterThan'
        },
        {
          args: [
            {
              args: [
                'posledni_hodnota'
              ],
              name: 'property'
            },
            {
              args: [
                'spa1h'
              ],
              name: 'property'
            }
          ],
          name: 'lessThanOrEqualTo'
        },
        {
          args: [
            {
              args: [
                'status'
              ],
              name: 'property'
            },
            'NULL'
          ],
          name: 'notEqualTo'
        }
      ],
      name: 'all'
    },
    gsFilter: ['&&',
      // Basic property to property comparison
      ['==', {
        name: 'property',
        args: ['posledni_hodnota']
      }, {
        name: 'property',
        args: ['posledni_hodnota_sekundarni']
      }],
      // Different comparison operators
      ['>', {
        name: 'property',
        args: ['value1']
      }, {
        name: 'property',
        args: ['value2']
      }],
      [
        '<=',
        {
          name: 'property',
          args: ['posledni_hodnota']
        },
        {
          name: 'property',
          args: ['spa1h']
        }
      ],
      // Mixed with property-to-literal
      ['!=', 'status', 'NULL'],
    ]
  },
  {
    name: 'Match',
    olExpr: ['match', ['get', 'string'], 'foo', 'got foo', 'bar', 'got bar', 'got other'],
    gsExpr: {
      name: 'case',
      args: ['got other', {
        case: {
          name: 'equalTo',
          args: [{
            name: 'property',
            args: ['string']
          }, 'foo']
        },
        value: 'got foo'
      }, {
        case: {
          name: 'equalTo',
          args: [{
            name: 'property',
            args: ['string']
          }, 'bar']
        },
        value: 'got bar'
      }]
    }
  }
] as const;

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

  describe('isOlExpression', () => {
    it('returns true for an expression', () => {
      const isExpression = OlFlatStyleUtil.isOlExpression(expression);
      expect(isExpression).toBe(true);
    });
    Object.keys(primitives).forEach((key) => {
      it(`returns false for primitive ${key}`, () => {
        const isExpression = OlFlatStyleUtil.isOlExpression(primitives[key]);
        expect(isExpression).toBe(false);
      });
    });
    Object.keys(objects).forEach((key) => {
      it(`returns false for ${key}`, () => {
        const isExpression = OlFlatStyleUtil.isOlExpression(objects[key]);
        expect(isExpression).toBe(false);
      });
    });
  });

  describe('isOlExpression', () => {
    it('returns true for a filter', () => {
      const isFilter = OlFlatStyleUtil.isOlExpression(comparisonFilter);
      expect(isFilter).toBe(true);
    });
    it('returns false for primitives', () => {
      Object.keys(primitives).forEach((key) => {
        const isFilter = OlFlatStyleUtil.isOlExpression(primitives[key]);
        expect(isFilter).toBe(false);
      });
    });
    it('returns false for objects and non-filter arrays', () => {
      Object.keys(objects).forEach((key) => {
        const isFilter = OlFlatStyleUtil.isOlExpression(objects[key]);
        expect(isFilter).toBe(false);
      });
    });
  });

  describe('isGsExpression', () => {
    it('returns true for a filter', () => {
      const isFilter = OlFlatStyleUtil.isGsExpression(comparisonFilter);
      expect(isFilter).toBe(true);
    });
    it('returns false for primitives', () => {
      Object.keys(primitives).forEach((key) => {
        const isFilter = OlFlatStyleUtil.isGsExpression(primitives[key]);
        expect(isFilter).toBe(false);
      });
    });
    it('returns false for objects and non-filter arrays', () => {
      Object.keys(objects).forEach((key) => {
        const isFilter = OlFlatStyleUtil.isGsExpression(objects[key]);
        expect(isFilter).toBe(false);
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
    it('returns false for a flat shape', () => {
      const hasFlatFill = OlFlatStyleUtil.hasFlatFill(flatShape);
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
    it('returns false for a flat shape', () => {
      const hasFlatStroke = OlFlatStyleUtil.hasFlatStroke(flatShape);
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
    it('returns false for a flat shape', () => {
      const hasFlatText = OlFlatStyleUtil.hasFlatText(flatShape);
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
    it('returns false for a flat shape', () => {
      const hasFlatIcon = OlFlatStyleUtil.hasFlatIcon(flatShape);
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
    it('returns false for a flat shape', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatCircle(flatShape);
      expect(hasFlatCircle).toBe(false);
    });
  });

  describe('hasFlatShape', () => {
    it('returns true for a flat shape', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatShape(flatShape);
      expect(hasFlatCircle).toBe(true);
    });
    it('returns false for a flat fill', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatShape(flatFill);
      expect(hasFlatCircle).toBe(false);
    });
    it('returns false for a flat stroke', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatShape(flatStroke);
      expect(hasFlatCircle).toBe(false);
    });
    it('returns false for a flat text', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatShape(flatText);
      expect(hasFlatCircle).toBe(false);
    });
    it('returns false for a flat icon', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatShape(flatIcon);
      expect(hasFlatCircle).toBe(false);
    });
    it('returns false for a flat circle', () => {
      const hasFlatCircle = OlFlatStyleUtil.hasFlatShape(flatCircle);
      expect(hasFlatCircle).toBe(false);
    });
  });

  describe('olExpressionToGsExpression', () => {
    const olExpressionFixture = testCases.filter(f => f.olExpr);
    olExpressionFixture.forEach(({name, olExpr, gsExpr}) => {
      it(`converts ${name}`, () => {
        const output = OlFlatStyleUtil.olExpressionToGsExpression(olExpr!);
        expect(output).toEqual(gsExpr);
      });
    });
  });

  describe('olExpressionToGsFilter', () => {
    const filterFixtures = testCases.filter(f => f.gsFilter);
    filterFixtures.forEach(({name, olExpr, gsFilter}) => {
      it(`converts ${name}`, () => {
        const output = OlFlatStyleUtil.olExpressionToGsFilter(olExpr);
        expect(output).toEqual(gsFilter);
      });
    });
  });

  describe('gsFilterToOlExpression', () => {
    const filterFixtures = testCases.filter(f => f.gsFilter);
    filterFixtures.forEach(({name, olExpr, gsFilter}) => {
      it(`converts ${name}`, () => {
        const output = OlFlatStyleUtil.gsFilterToOlExpression(gsFilter);
        expect(output).toEqual(olExpr);
      });
    });
  });

  describe('gsExpressionToOlExpression', () => {
    const gsExpressionFixture = testCases.filter(f => f.gsExpr);
    gsExpressionFixture.forEach(({name, olExpr, gsExpr, exception}) => {
      if (exception) {
        it(`throws an error for ${name}`, () => {
          expect(() => OlFlatStyleUtil.gsExpressionToOlExpression(gsExpr!)).toThrow(exception);
        });
      } else {
        it(`converts ${name}`, () => {
          const output = OlFlatStyleUtil.gsExpressionToOlExpression(gsExpr!);
          expect(output).toEqual(olExpr);
        });
      }
    });
  });
});

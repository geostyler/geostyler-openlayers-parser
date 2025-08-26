import 'regenerator-runtime/runtime';

import OlFlatStyleParser from './OlFlatStyleParser';
import { FlatStyleLike } from 'ol/style/flat';
import { Style, UnsupportedProperties } from 'geostyler-style';

import filter_comparison_propertyFunction from '../data/styles/filter_comparison_propertyFunction';
import filter_nestedFilter from '../data/styles/filter_nestedFilter';
import filter_resolution from '../data/styles/filter_resolution';
import filter_simpleFilter from '../data/styles/filter_simpleFilter';
import function_case from '../data/styles/function_case';
import function_markSymbolizer from '../data/styles/function_markSymbolizer';
import function_nested_fillSymbolizer from '../data/styles/function_nested_fillSymbolizer';
import line_simpleline from '../data/styles/line_simpleline';
import multi_simplefillSimpleline from '../data/styles/multi_simplefillSimpleline';
import multi_simplelineLabel from '../data/styles/multi_simplelineLabel';
import multi_twoRulesSimplepoint from '../data/styles/multi_twoRulesSimplepoint';
import point_fontglyph from '../data/styles/point_fontglyph';
import point_icon from '../data/styles/point_icon';
import point_icon_simple from '../data/styles/point_icon_simple';
import point_icon_sprite from '../data/styles/point_icon_sprite';
import point_simplebackslash from '../data/styles/point_simplebackslash';
import point_simplecarrow from '../data/styles/point_simplecarrow';
import point_simplecross from '../data/styles/point_simplecross';
import point_simpledot from '../data/styles/point_simpledot';
import point_simplehorline from '../data/styles/point_simplehorline';
import point_simpleoarrow from '../data/styles/point_simpleoarrow';
import point_simpleoffset from '../data/styles/point_simpleoffset';
import point_simpleplus from '../data/styles/point_simpleplus';
import point_simplepoint from '../data/styles/point_simplepoint';
import point_simplepoint_filter from '../data/styles/point_simplepoint_filter';
import point_simpleslash from '../data/styles/point_simpleslash';
import point_simplesquare from '../data/styles/point_simplesquare';
import point_simplestar from '../data/styles/point_simplestar';
import point_simpletimes from '../data/styles/point_simpletimes';
import point_simpletriangle from '../data/styles/point_simpletriangle';
import point_simplevertline from '../data/styles/point_simplevertline';
import point_simplex from '../data/styles/point_simplex';
import point_styledlabel from '../data/styles/point_styledlabel';
import point_styledLabel_static from '../data/styles/point_styledLabel_static';
import polygon_simple from '../data/styles/polygon_simple';
import polygon_transparentpolygon from '../data/styles/polygon_transparentpolygon';
import scaleDenom_line from '../data/styles/scaleDenom_line';
import scaleDenom_line_circle from '../data/styles/scaleDenom_line_circle';
import text_placement_line from '../data/styles/text_placement_line';
import text_placement_point from '../data/styles/text_placement_point';
import unsupported_properties from '../data/styles/unsupported_properties';

import flat_filter_comparison_propertyFunction from '../data/olFlatStyles/filter_comparison_propertyFunction';
import flat_filter_nestedFilter from '../data/olFlatStyles/filter_nestedFilter';
import flat_filter_resolution from '../data/olFlatStyles/filter_resolution';
import flat_filter_simpleFilter from '../data/olFlatStyles/filter_simpleFilter';
import flat_function_boolean from '../data/olFlatStyles/function_boolean';
import flat_function_case from '../data/olFlatStyles/function_case';
import flat_function_markSymbolizer from '../data/olFlatStyles/function_markSymbolizer';
import flat_function_nested_fillSymbolizer from '../data/olFlatStyles/function_nested_fillSymbolizer';
import flat_line_simpleline from '../data/olFlatStyles/line_simpleline';
import flat_multi_simplefillSimpleline from '../data/olFlatStyles/multi_simplefillSimpleline';
import flat_multi_simplelineLabel from '../data/olFlatStyles/multi_simplelineLabel';
import flat_multi_twoRulesSimplepoint from '../data/olFlatStyles/multi_twoRulesSimplepoint';
import flat_point_fontglyph from '../data/olFlatStyles/point_fontglyph';
import flat_point_icon from '../data/olFlatStyles/point_icon';
import flat_point_icon_simple from '../data/olFlatStyles/point_icon_simple';
import flat_point_icon_sprite from '../data/olFlatStyles/point_icon_sprite';
import flat_point_simplebackslash from '../data/olFlatStyles/point_simplebackslash';
import flat_point_simplecarrow from '../data/olFlatStyles/point_simplecarrow';
import flat_point_simplecross from '../data/olFlatStyles/point_simplecross';
import flat_point_simpledot from '../data/olFlatStyles/point_simpledot';
import flat_point_simplehorline from '../data/olFlatStyles/point_simplehorline';
import flat_point_simpleoarrow from '../data/olFlatStyles/point_simpleoarrow';
import flat_point_simpleoffset from '../data/olFlatStyles/point_simpleoffset';
import flat_point_simpleplus from '../data/olFlatStyles/point_simpleplus';
import flat_point_simplepoint from '../data/olFlatStyles/point_simplepoint';
import flat_point_simplepoint_filter from '../data/olFlatStyles/point_simplepoint_filter';
import flat_point_simpleslash from '../data/olFlatStyles/point_simpleslash';
import flat_point_simplesquare from '../data/olFlatStyles/point_simplesquare';
import flat_point_simplestar from '../data/olFlatStyles/point_simplestar';
import flat_point_simpletimes from '../data/olFlatStyles/point_simpletimes';
import flat_point_simpletriangle from '../data/olFlatStyles/point_simpletriangle';
import flat_point_simplevertline from '../data/olFlatStyles/point_simplevertline';
import flat_point_simplex from '../data/olFlatStyles/point_simplex';
import flat_point_styledLabel_static from '../data/olFlatStyles/point_styledLabel_static';
import flat_point_styledlabel from '../data/olFlatStyles/point_styledlabel';
import flat_polygon_simple from '../data/olFlatStyles/polygon_simple';
import flat_polygon_transparentpolygon from '../data/olFlatStyles/polygon_transparentpolygon';
import flat_scaleDenom_line from '../data/olFlatStyles/scaleDenom_line';
import flat_scaleDenom_line_circle from '../data/olFlatStyles/scaleDenom_line_circle';
import flat_text_placement_line from '../data/olFlatStyles/text_placement_line';
import flat_text_placement_point from '../data/olFlatStyles/text_placement_point';
import flat_unsupported_properties from '../data/olFlatStyles/unsupported_properties';

interface TestCase {
  name: string;
  olFlatStyle?: FlatStyleLike; // if defined, can be used as source
  gsStyle?: Style; // if defined, can be used as source
  unsupportedProperties?: UnsupportedProperties;
  // use these only if the conversion is not reversible
  gsTargetStyle?: Style;
  olTargetFlatStyle?: FlatStyleLike;
}

const testCases: TestCase[] = [
  {
    name: 'point symbolizer',
    olFlatStyle: flat_point_simplepoint,
    gsStyle: point_simplepoint
  },
  {
    name: 'point symbolizer with displacement',
    olFlatStyle: flat_point_simpleoffset,
    gsStyle: point_simpleoffset
  },
  {
    name: 'icon symbolizer',
    olFlatStyle: flat_point_icon,
    gsStyle: point_icon
  },
  {
    name: 'icon symbolizer with sprite',
    olFlatStyle: flat_point_icon_sprite,
    gsStyle: point_icon_sprite
  },
  {
    name: 'mark symbolizer as wellKnownName square',
    olFlatStyle: flat_point_simplesquare,
    gsStyle: point_simplesquare
  },
  {
    name: 'mark symbolizer as wellKnownName star',
    olFlatStyle: flat_point_simplestar,
    gsStyle: point_simplestar
  },
  {
    name: 'mark symbolizer as wellKnownName triangle',
    olFlatStyle: flat_point_simpletriangle,
    gsStyle: point_simpletriangle
  },
  {
    name: 'mark symbolizer as wellKnownName cross',
    olFlatStyle: flat_point_simplecross,
    gsStyle: point_simplecross
  },
  {
    name: 'mark symbolizer as wellKnownName X',
    olFlatStyle: flat_point_simplex,
    gsStyle: point_simplex
  },
  {
    name: 'mark symbolizer as wellKnownName shape://slash',
    olFlatStyle: flat_point_simpleslash,
    gsStyle: point_simpleslash
  },
  {
    name: 'mark symbolizer as wellKnownName shape://backslash',
    olFlatStyle: flat_point_simplebackslash,
    gsStyle: point_simplebackslash
  },
  {
    name: 'mark symbolizer as wellKnownName shape://vertline',
    olFlatStyle: flat_point_simplevertline,
    gsStyle: point_simplevertline
  },
  {
    name: 'mark symbolizer as wellKnownName shape://horline',
    olFlatStyle: flat_point_simplehorline,
    gsStyle: point_simplehorline
  },
  {
    name: 'mark symbolizer as wellKnownName shape://carrow',
    olFlatStyle: flat_point_simplecarrow,
    gsStyle: point_simplecarrow
  },
  {
    name: 'mark symbolizer as wellKnownName shape://oarrow',
    olFlatStyle: flat_point_simpleoarrow,
    gsStyle: point_simpleoarrow
  },
  {
    name: 'mark symbolizer as wellKnownName shape://dot',
    olFlatStyle: flat_point_simpledot,
    gsStyle: point_simpledot,
    // using point_simplepoint since the OL flat style is identical between dot and point
    gsTargetStyle: point_simplepoint,
  },
  {
    name: 'mark symbolizer as wellKnownName shape://plus',
    olFlatStyle: flat_point_simpleplus,
    gsStyle: point_simpleplus
  },
  {
    name: 'mark symbolizer as wellKnownName shape://times',
    olFlatStyle: flat_point_simpletimes,
    gsStyle: point_simpletimes,
    // using point_simplex since the OL flat style is identical between times and x
    gsTargetStyle: point_simplex,
  },
  {
    name: 'mark symbolizer as wellKnownName circle',
    olFlatStyle: flat_point_simplepoint,
    gsStyle: point_simplepoint
  },
  {
    name: 'mark symbolizer with filter',
    olFlatStyle: flat_point_simplepoint_filter,
    gsStyle: point_simplepoint_filter
  },
  {
    name: 'line symbolizer',
    olFlatStyle: flat_line_simpleline,
    gsStyle: line_simpleline
  },
  {
    name: 'polygon symbolizer',
    olFlatStyle: flat_polygon_transparentpolygon,
    gsStyle: polygon_transparentpolygon
  },
  {
    name: 'text symbolizer with static text',
    olFlatStyle: flat_point_styledLabel_static,
    gsStyle: point_styledLabel_static
  },
  {
    name: 'text symbolizer with dynamic text',
    olFlatStyle: flat_point_styledlabel,
    gsStyle: point_styledlabel
  },
  {
    name: 'text symbolizer with placement point',
    olFlatStyle: flat_text_placement_point,
    gsStyle: text_placement_point
  },
  {
    name: 'text symbolizer with placement line',
    olFlatStyle: flat_text_placement_line,
    gsStyle: text_placement_line
  },
  {
    name: 'mark symbolizer based on font glyph',
    olFlatStyle: flat_point_fontglyph,
    gsStyle: point_fontglyph
  },
  {
    name: 'simple polygon with just fill',
    olFlatStyle: flat_polygon_simple,
    gsStyle: polygon_simple
  },
  {
    name: 'icon symbolizer',
    olFlatStyle: flat_point_icon_simple,
    gsStyle: point_icon_simple
  },
  {
    name: 'multiple symbolizers of different kinds',
    olFlatStyle: flat_multi_simplefillSimpleline,
    gsStyle: multi_simplefillSimpleline
  },
  {
    name: 'multiple symbolizers of same kind',
    olFlatStyle: flat_multi_twoRulesSimplepoint,
    gsStyle: multi_twoRulesSimplepoint
  },
  {
    name: 'line symbolizer with label',
    olFlatStyle: flat_multi_simplelineLabel,
    gsStyle: multi_simplelineLabel
  },
  {
    name: 'simple filter',
    olFlatStyle: flat_filter_simpleFilter,
    gsStyle: filter_simpleFilter
  },
  {
    name: 'nested filter',
    olFlatStyle: flat_filter_nestedFilter,
    gsStyle: filter_nestedFilter
  },
  {
    name: 'property-based filter',
    olFlatStyle: flat_filter_comparison_propertyFunction,
    gsStyle: filter_comparison_propertyFunction
  },
  {
    name: 'resolution-based filter',
    olFlatStyle: flat_filter_resolution,
    gsStyle: filter_resolution
  },
  {
    name: 'style with boolean function',
    olFlatStyle: flat_function_boolean,
    gsStyle: filter_resolution
  },
  {
    name: 'style with case function',
    olFlatStyle: flat_function_case,
    gsStyle: function_case
  },
  {
    name: 'mark symbolizer with function',
    olFlatStyle: flat_function_markSymbolizer,
    gsStyle: function_markSymbolizer
  },
  {
    name: 'nested fill symbolizer with function',
    olFlatStyle: flat_function_nested_fillSymbolizer,
    gsStyle: function_nested_fillSymbolizer
  },
  {
    name: 'line symbolizer with scale denominator range',
    olFlatStyle: flat_scaleDenom_line,
    gsStyle: scaleDenom_line
  },
  {
    name: 'two symbolizers with different scale denominator ranges',
    olFlatStyle: flat_scaleDenom_line_circle,
    gsStyle: scaleDenom_line_circle
  },
  {
    name: 'GS style with unsupported properties',
    gsStyle: unsupported_properties,
    olTargetFlatStyle: flat_unsupported_properties,
    unsupportedProperties: {
      Symbolizer: {
        FillSymbolizer: {
          opacity: {
            info: 'Use fillOpacity instead.',
            support: 'none'
          },
          graphicFill: {
            info: 'Graphic fills are not supported in OL Style.',
            support: 'none'
          }
        },
        IconSymbolizer: {
          anchor: 'none',
          image: {
            info: 'Dynamic icon paths are not supported in OL Style.',
            support: 'none'
          }
        },
        TextSymbolizer: {
          placement: {
            info: 'The "line-center" placement gets converted to "line" in OL Style; partial support.',
            support: 'partial'
          }
        }
      }
    }
  },
  // FIXME: find a way to report unsupported properties on read
  // {
  //   name: 'OL flat style with unsupported properties',
  //   olFlatStyle: flat_unsupported_properties,
  //   unsupportedProperties: {
  //     Function: {
  //       zoom: 'none'
  //     }
  //   }
  // },
];


it('OlFlatStyleParser is defined', () => {
  expect(OlFlatStyleParser).toBeDefined();
});

describe('OlFlatStyleParser implements StyleParser', () => {
  let styleParser: OlFlatStyleParser;

  beforeEach(() => {
    styleParser = new OlFlatStyleParser();
  });

  describe('#readStyle', () => {
    it('is defined', () => {
      expect(styleParser.readStyle).toBeDefined();
    });
    it('can read an OpenLayers Flat Style', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simplepoint);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplepoint);
    });
    it('can read an OpenLayers Flat Style Array', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle([flat_point_simplepoint]);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplepoint);
    });

    testCases
      .filter(testCase => !!testCase.olFlatStyle)
      .forEach(testCase => {
        it(`successfully converts ${testCase.name} to GeoStyler Style format`, async () => {
          const {output: geoStylerStyle, unsupportedProperties} = await styleParser.readStyle(testCase.olFlatStyle!);
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(testCase.gsTargetStyle ?? testCase.gsStyle);
          if (testCase.unsupportedProperties) {
            expect(unsupportedProperties).toEqual(testCase.unsupportedProperties);
          }
        });
      });
  });

  describe('#writeStyle', () => {
    it('is defined', () => {
      expect(styleParser.writeStyle).toBeDefined();
    });
    it('returns the right output format', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simplepoint);
      const { output: flatStyles } = await styleParser.writeStyle(multi_simplefillSimpleline);
      const { output: flatRules } = await styleParser.writeStyle(multi_twoRulesSimplepoint);
      expect(flatStyle).toBeDefined();
      expect(flatStyles).toBeDefined();
      expect(flatRules).toBeDefined();
      expect(Array.isArray(flatStyles)).toBe(true);
      expect(flatStyles).toHaveLength(2);
      expect(flatStyles![0]).not.toHaveProperty('style');
      expect(flatStyles![1]).not.toHaveProperty('style');
      expect(Array.isArray(flatRules)).toBe(true);
      expect(flatRules).toHaveLength(2);
      expect(flatRules![0]).toHaveProperty('style');
      expect(flatRules![1]).toHaveProperty('style');
    });

    testCases
      .filter(testCase => !!testCase.gsStyle)
      .forEach(testCase => {
        it(`successfully converts ${testCase.name} to OpenLayers Flat Style format`, async () => {
          const {output: olFlatStyle, unsupportedProperties} = await styleParser.writeStyle(testCase.gsStyle!);
          expect(olFlatStyle).toBeDefined();
          expect(olFlatStyle).toEqual(testCase.olTargetFlatStyle ?? testCase.olFlatStyle);
          if (testCase.unsupportedProperties) {
            expect(unsupportedProperties).toEqual(testCase.unsupportedProperties);
          }
        });
      });
  });
});

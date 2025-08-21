import 'regenerator-runtime/runtime';

import OlFlatStyleParser from './OlFlatStyleParser';

import polygonSimple from '../data/styles/polygon_simple';
import lineSimpleLine from '../data/styles/line_simpleline';
import textPlacementLine from '../data/styles/text_placement_line';
import pointIconSimple from '../data/styles/point_icon_simple';
import point_simplepoint from '../data/styles/point_simplepoint';
import point_simpleoffset from '../data/styles/point_simpleoffset';
import point_icon from '../data/styles/point_icon';
import point_icon_sprite from '../data/styles/point_icon_sprite';
import point_simplesquare from '../data/styles/point_simplesquare';
import point_simplestar from '../data/styles/point_simplestar';
import point_simpletriangle from '../data/styles/point_simpletriangle';
import point_simpleplus from '../data/styles/point_simpleplus';
import point_simpletimes from '../data/styles/point_simpletimes';
import point_simpleslash from '../data/styles/point_simpleslash';
import point_simplebackslash from '../data/styles/point_simplebackslash';
import point_simplevertline from '../data/styles/point_simplevertline';
import point_simplehorline from '../data/styles/point_simplehorline';
import point_simplecross from '../data/styles/point_simplecross';
import point_simplex from '../data/styles/point_simplex';
import multi_simplefillSimpleline from '../data/styles/multi_simplefillSimpleline';
import multi_twoRulesSimplepoint from '../data/styles/multi_twoRulesSimplepoint';
import filterSimpleFilter from '../data/styles/filter_simpleFilter';
import filterNestedFilter from '../data/styles/filter_nestedFilter';

import flat_polygon_simple from '../data/olFlatStyles/polygon_simple';
import flat_line_simpleline from '../data/olFlatStyles/line_simpleline';
import flat_text_placement_line from '../data/olFlatStyles/text_placement_line';
import flat_point_icon_simple from '../data/olFlatStyles/point_icon_simple';
import flat_point_simplepoint from '../data/olFlatStyles/point_simplepoint';
import flat_point_simpleoffset from '../data/olFlatStyles/point_simpleoffset';
import flat_point_icon from '../data/olFlatStyles/point_icon';
import flat_point_icon_sprite from '../data/olFlatStyles/point_icon_sprite';
import flat_point_simplesquare from '../data/olFlatStyles/point_simplesquare';
import flat_point_simplestar from '../data/olFlatStyles/point_simplestar';
import flat_point_simpletriangle from '../data/olFlatStyles/point_simpletriangle';
import flat_point_simpleplus from '../data/olFlatStyles/point_simpleplus';
import flat_point_simpletimes from '../data/olFlatStyles/point_simpletimes';
import flat_point_simpleslash from '../data/olFlatStyles/point_simpleslash';
import flat_point_simplebackslash from '../data/olFlatStyles/point_simplebackslash';
import flat_point_simplevertline from '../data/olFlatStyles/point_simplevertline';
import flat_point_simplehorline from '../data/olFlatStyles/point_simplehorline';
import flat_point_simplecross from '../data/olFlatStyles/point_simplecross';
import flat_point_simplex from '../data/olFlatStyles/point_simplex';
import flat_multi_simplefillSimpleline from '../data/olFlatStyles/multi_simplefillSimpleline';
import flat_multi_twoRulesSimplepoint from '../data/olFlatStyles/multi_twoRulesSimplepoint';
import flat_filter_simpleFilter from '../data/olFlatStyles/filter_simpleFilter';
import flat_filter_nestedFilter from '../data/olFlatStyles/filter_nestedFilter';

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
    it('can read an OpenLayers Flat PointSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simplepoint);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplepoint);
    });
    it('can read an OpenLayers Flat PointSymbolizer with displacement', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simpleoffset);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simpleoffset);
    });
    it('can read an OpenLayers Flat IconSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_icon);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_icon);
    });
    it('can read an OpenLayers Flat IconSymbolizer with a sprite', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_icon_sprite);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_icon_sprite);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName Square', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simplesquare);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplesquare);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName Star', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simplestar);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplestar);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName Triangle', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simpletriangle);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simpletriangle);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName Cross', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simplecross);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplecross);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName X', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simplex);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplex);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName shape://slash', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simpleslash);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simpleslash);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName shape://backslash', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simplebackslash);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplebackslash);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName shape://vertline', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simplevertline);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplevertline);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName shape://horline', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simplehorline);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplehorline);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName shape://plus', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simpleplus);
      expect(geoStylerStyle).toBeDefined();
      // using point_simplecross here since reading OlFlatStyle cannot distinguish
      // between cross and plus
      expect(geoStylerStyle).toEqual(point_simplecross);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName shape://times', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simpletimes);
      expect(geoStylerStyle).toBeDefined();
      // using point_simplex here since reading OlFlatStyle cannot distinguish
      // between x and times
      expect(geoStylerStyle).toEqual(point_simplex);
    });

    it('reads a FlatFill style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_polygon_simple);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(polygonSimple);
    });

    it('reads a FlatStroke style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_line_simpleline);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(lineSimpleLine);
    });

    it('reads a FlatText style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_text_placement_line);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(textPlacementLine);
    });

    it('reads a FlatIcon style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_point_icon_simple);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(pointIconSimple);
    });

    it('reads a FlatCircle style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_point_simplepoint);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(point_simplepoint);
    });

    it('reads a style from a FlatStyleArray', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_multi_simplefillSimpleline);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(multi_simplefillSimpleline);
    });

    it('reads a style from a FlatRuleArray', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_multi_twoRulesSimplepoint);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(multi_twoRulesSimplepoint);
    });

    it('reads a filter', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_filter_simpleFilter);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(filterSimpleFilter);
    });

    it('reads a nested filter', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_filter_nestedFilter);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(filterNestedFilter);
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
    it('can write an OpenLayers Flat PointSymbolizer', async () => {
      let { output: flatStyle } = await styleParser.writeStyle(point_simplepoint);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplepoint);
    });
    it('can write an OpenLayers Flat PointSymbolizer with displacement', async () => {
      let { output: flatStyle } = await styleParser.writeStyle(point_simpleoffset);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simpleoffset);
    });
    it('can write an OpenLayers Flat IconSymbolizer', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_icon);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_icon);
    });
    it('can write an OpenLayers Flat IconSymbolizer with a sprite', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_icon_sprite);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_icon_sprite);
    });
    it('can write an OpenLayers Flat MarkSymbolizer square', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simplesquare);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplesquare);
    });
    it('can write an OpenLayers Flat MarkSymbolizer star', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simplestar);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplestar);
    });
    it('can write an OpenLayers Flat MarkSymbolizer triangle', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simpletriangle);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simpletriangle);
    });
    it('can write an OpenLayers Flat MarkSymbolizer cross', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simplecross);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplecross);
    });
    it('can write an OpenLayers Flat MarkSymbolizer x', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simplex);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplex);
    });
    it('can write an OpenLayers Flat MarkSymbolizer shape://slash', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simpleslash);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simpleslash);
    });
    it('can write an OpenLayers Flat MarkSymbolizer shape://backslash', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simplebackslash);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplebackslash);
    });
    it('can write an OpenLayers Flat MarkSymbolizer shape://vertline', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simplevertline);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplevertline);
    });
    it('can write an OpenLayers Flat MarkSymbolizer shape://horline', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simplehorline);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplehorline);
    });
    it('can write an OpenLayers Flat MarkSymbolizer shape://plus', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simpleplus);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simpleplus);
    });
    it('can write an OpenLayers Flat MarkSymbolizer shape://times', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simpletimes);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simpletimes);
    });

    it('writes a FlatFill style', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(polygonSimple);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_polygon_simple);
    });

    it('writes a FlatStroke style', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(lineSimpleLine);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_line_simpleline);
    });

    it('writes a FlatText style', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(textPlacementLine);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_text_placement_line);
    });

    it('writes a FlatIcon style', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(pointIconSimple);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_icon_simple);
    });

    it('writes a FlatCircle style', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simplepoint);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplepoint);
    });

    it('writes a FlatStyleArray style', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(multi_simplefillSimpleline);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_multi_simplefillSimpleline);
    });

    it('writes a FlatRuleArray style', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(multi_twoRulesSimplepoint);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_multi_twoRulesSimplepoint);
    });

    it('writes a filter', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(filterSimpleFilter);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_filter_simpleFilter);
    });

    it('writes a nested filter', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(filterNestedFilter);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_filter_nestedFilter);
    });
  });
});

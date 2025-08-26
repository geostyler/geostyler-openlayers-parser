import 'regenerator-runtime/runtime';

import OlFlatStyleParser from './OlFlatStyleParser';

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
import point_simplecarrow from '../data/styles/point_simplecarrow';
import point_simpleoarrow from '../data/styles/point_simpleoarrow';
import point_simpledot from '../data/styles/point_simpledot';
import point_simplecross from '../data/styles/point_simplecross';
import point_simplex from '../data/styles/point_simplex';
import line_simpleline from '../data/styles/line_simpleline';
import polygon_transparentpolygon from '../data/styles/polygon_transparentpolygon';
import point_styledlabel from '../data/styles/point_styledlabel';
import point_styledLabel_static from '../data/styles/point_styledLabel_static';
import text_placement_point from '../data/styles/text_placement_point';
import text_placement_line from '../data/styles/text_placement_line';
import point_fontglyph from '../data/styles/point_fontglyph';
import polygon_simple from '../data/styles/polygon_simple';
import point_icon_simple from '../data/styles/point_icon_simple';
import multi_simplefillSimpleline from '../data/styles/multi_simplefillSimpleline';
import multi_twoRulesSimplepoint from '../data/styles/multi_twoRulesSimplepoint';
import filter_simpleFilter from '../data/styles/filter_simpleFilter';
import filter_nestedFilter from '../data/styles/filter_nestedFilter';

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
import flat_point_simplecarrow from '../data/olFlatStyles/point_simplecarrow';
import flat_point_simpleoarrow from '../data/olFlatStyles/point_simpleoarrow';
import flat_point_simpledot from '../data/olFlatStyles/point_simpledot';
import flat_point_simplecross from '../data/olFlatStyles/point_simplecross';
import flat_point_simplex from '../data/olFlatStyles/point_simplex';
import flat_line_simpleline from '../data/olFlatStyles/line_simpleline';
import flat_polygon_transparentpolygon from '../data/olFlatStyles/polygon_transparentpolygon';
import flat_point_styledlabel from '../data/olFlatStyles/point_styledlabel';
import flat_point_styledLabel_static from '../data/olFlatStyles/point_styledLabel_static';
import flat_text_placement_point from '../data/olFlatStyles/text_placement_point';
import flat_text_placement_line from '../data/olFlatStyles/text_placement_line';
import flat_point_fontglyph from '../data/olFlatStyles/point_fontglyph';
import flat_polygon_simple from '../data/olFlatStyles/polygon_simple';
import flat_point_icon_simple from '../data/olFlatStyles/point_icon_simple';
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
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName shape://carrow', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simplecarrow);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplecarrow);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName shape://oarrow', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simpleoarrow);
      expect(geoStylerStyle).toBeDefined();
      // using point_simplecarrow here since reading OlStyle cannot distinguish
      // between carrow and oarrow
      expect(geoStylerStyle).toEqual(point_simplecarrow);
    });
    it('can read an OpenLayers Flat MarkSymbolizer as WellKnownName shape://dot', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_simpledot);
      expect(geoStylerStyle).toBeDefined();
      // using point_simplepoint here since reading OlStyle cannot distinguish
      // between circle and dot
      expect(geoStylerStyle).toEqual(point_simplepoint);
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
    it('can read an OpenLayers Flat LineSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_line_simpleline);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(line_simpleline);
    });
    it('can read an OpenLayers Flat PolygonSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_polygon_transparentpolygon);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(polygon_transparentpolygon);
    });
    it('can read an OpenLayers Flat TextSymbolizer with static text', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_styledLabel_static);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_styledLabel_static);
    });
    it('can read an OpenLayers Flat TextSymbolizer with placement point', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_text_placement_point);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(text_placement_point);
    });
    it('can read an OpenLayers Flat TextSymbolizer with placement line', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_text_placement_line);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(text_placement_line);
    });
    it('can read an OpenLayers Flat MarkSymbolizer based on a font glyph (WellKnownName starts with ttf://)', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_point_fontglyph);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_fontglyph);
    });

    it('can read a simple polygon with just fill', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(flat_polygon_simple);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(polygon_simple);
    });

    it('reads a FlatIcon style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_point_icon_simple);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(point_icon_simple);
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
      expect(geostylerStyle).toEqual(filter_simpleFilter);
    });

    it('reads a nested filter', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(flat_filter_nestedFilter);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(filter_nestedFilter);
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
      const { output: flatStyle } = await styleParser.writeStyle(point_simplepoint);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplepoint);
    });
    it('can write an OpenLayers Flat PointSymbolizer with displacement', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simpleoffset);
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
    it('can write an OpenLayers Flat MarkSymbolizer shape://carrow', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simplecarrow);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplecarrow);
    });
    it('can write an OpenLayers Flat MarkSymbolizer shape://oarrow', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simpleoarrow);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simplecarrow);
    });
    it('can write an OpenLayers Flat MarkSymbolizer shape://dot', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_simpledot);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_simpledot);
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
    it('can write an OpenLayers Flat LineSymbolizer', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(line_simpleline);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_line_simpleline);
    });
    it('can write an OpenLayers Flat PolygonSymbolizer', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(polygon_transparentpolygon);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_polygon_transparentpolygon);
    });
    it('can write an OpenLayers Flat TextSymbolizer', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_styledlabel);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_styledlabel);
    });
    it('can write an OpenLayers Flat TextSymbolizer with static text', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_styledLabel_static);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_styledLabel_static);
    });
    it('can write an OpenLayers Flat TextSymbolizer with placement point', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(text_placement_point);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_text_placement_point);
    });
    it('can write an OpenLayers Flat TextSymbolizer with placement line', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(text_placement_line);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_text_placement_line);
    });
    it('can write an OpenLayers Flat MarkSymbolizer based on a font glyph (WellKnownName starts with ttf://)', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_fontglyph);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_point_fontglyph);
    });

    it('can write a simple polygon with just fill', async () => {
      const { output: geoStylerStyle } = await styleParser.writeStyle(polygon_simple);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(flat_polygon_simple);
    });

    it('writes a FlatIcon style', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(point_icon_simple);
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
      const { output: flatStyle } = await styleParser.writeStyle(filter_simpleFilter);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_filter_simpleFilter);
    });

    it('writes a nested filter', async () => {
      const { output: flatStyle } = await styleParser.writeStyle(filter_nestedFilter);
      expect(flatStyle).toBeDefined();
      expect(flatStyle).toEqual(flat_filter_nestedFilter);
    });
  });
});

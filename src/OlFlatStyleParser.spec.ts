import 'regenerator-runtime/runtime';

import OlFlatStyleParser from './OlFlatStyleParser';

import polygonSimple from '../data/styles/polygon_simple';
import lineSimpleLine from '../data/styles/line_simpleline';
import textPlacementLine from '../data/styles/text_placement_line';
import pointIconSimple from '../data/styles/point_icon_simple';
import pointSimplePoint from '../data/styles/point_simplepoint';
import multiTwoRulesSimplepoint from '../data/styles/multi_twoRulesSimplepoint';
import filterSimpleFilter from '../data/styles/filter_simpleFilter';
import filterNestedFilter from '../data/styles/filter_nestedFilter';

import ol_polygon_simple from '../data/olFlatStyles/polygon_simple';
import ol_line_simpleline from '../data/olFlatStyles/line_simpleline';
import ol_text_placement_line from '../data/olFlatStyles/text_placement_line';
import ol_point_icon_simple from '../data/olFlatStyles/point_icon_simple';
import ol_point_simplepoint from '../data/olFlatStyles/point_simplepoint';
import ol_multi_twoRulesSimplepoint from '../data/olFlatStyles/multi_twoRulesSimplepoint';
import ol_filter_simpleFilter from '../data/olFlatStyles/filter_simpleFilter';
import ol_filter_nestedFilter from '../data/olFlatStyles/filter_nestedFilter';

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

    it('reads a FlatFill style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(ol_polygon_simple);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(polygonSimple);
    });

    it('reads a FlatStroke style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(ol_line_simpleline);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(lineSimpleLine);
    });

    it('reads a FlatText style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(ol_text_placement_line);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(textPlacementLine);
    });

    it('reads a FlatIcon style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(ol_point_icon_simple);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(pointIconSimple);
    });

    it('reads a FlatCircle style', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(ol_point_simplepoint);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(pointSimplePoint);
    });

    it('reads a style from a FlatStyleArray', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(ol_multi_twoRulesSimplepoint);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(multiTwoRulesSimplepoint);
    });

    it('reads a style from a FlatRuleArray', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(ol_filter_simpleFilter);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(filterSimpleFilter);
    });

    it('reads a nested filter', async () => {
      const { output: geostylerStyle } = await styleParser.readStyle(ol_filter_nestedFilter);
      expect(geostylerStyle).toBeDefined();
      expect(geostylerStyle).toEqual(filterNestedFilter);
    });
  });
});

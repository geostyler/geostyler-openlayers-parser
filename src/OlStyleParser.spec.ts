import 'regenerator-runtime/runtime';

import OlStyle, {
  Options as StyleOptions
} from 'ol/style/Style';
import OlStyleIcon from 'ol/style/Icon';
import OlStyleText, { Options as TextOptions } from 'ol/style/Text';
import OlStyleFill, { Options as FillOptions } from 'ol/style/Fill';
import OlFeature from 'ol/Feature';

import OlStyleParser, { OlParserStyleFct } from './OlStyleParser';

import point_simplepoint from '../data/styles/point_simplepoint';
import point_simpleoffset from '../data/styles/point_simpleoffset';
import point_icon from '../data/styles/point_icon';
import point_icon_sprite from '../data/styles/point_icon_sprite';
import point_dynamic_icon from '../data/styles/point_dynamic_icon';
import point_simplesquare from '../data/styles/point_simplesquare';
import point_simplestar from '../data/styles/point_simplestar';
import point_simplestartransparentfill from '../data/styles/point_simplestartransparentfill';
import point_simpletriangle from '../data/styles/point_simpletriangle';
import point_simplecross from '../data/styles/point_simplecross';
import point_simplex from '../data/styles/point_simplex';
import point_simpleslash from '../data/styles/point_simpleslash';
import point_simplebackslash from '../data/styles/point_simplebackslash';
import point_simplevertline from '../data/styles/point_simplevertline';
import point_simplehorline from '../data/styles/point_simplehorline';
import point_simplecarrow from '../data/styles/point_simplecarrow';
import point_simpleoarrow from '../data/styles/point_simpleoarrow';
import point_simpledot from '../data/styles/point_simpledot';
import point_simpleplus from '../data/styles/point_simpleplus';
import point_simpletimes from '../data/styles/point_simpletimes';
import line_simpleline from '../data/styles/line_simpleline';
import filter_simplefilter from '../data/styles/filter_simpleFilter';
import filter_nestedfilter from '../data/styles/filter_nestedFilter';
import filter_invalidfilter from '../data/styles/filter_invalidFilter';
import function_marksymbolizer from '../data/styles/function_markSymbolizer';
import function_nested_fillsymbolizer from '../data/styles/function_nested_fillSymbolizer';
import point_styledLabel_static from '../data/styles/point_styledLabel_static';
import multi_twoRulesSimplepoint from '../data/styles/multi_twoRulesSimplepoint';
import multi_simplefillSimpleline from '../data/styles/multi_simplefillSimpleline';
import scaleDenomLine from '../data/styles/scaleDenom_line';
import scaleDenomLineCircle from '../data/styles/scaleDenom_line_circle';
import scaleDenomLineCircleOverlap from '../data/styles/scaleDenom_line_circle_overlap';
import polygon_transparentpolygon from '../data/styles/polygon_transparentpolygon';
import polygon_simple from '../data/styles/polygon_simple';
import point_styledlabel from '../data/styles/point_styledlabel';
import point_fontglyph from '../data/styles/point_fontglyph';
import unsupported_properties from '../data/styles/unsupported_properties';
import function_boolean from '../data/styles/function_boolean';
import function_case from '../data/styles/function_case';
import text_placement_point from '../data/styles/text_placement_point';
import text_placement_line from '../data/styles/text_placement_line';
import text_placement_line_center from '../data/styles/text_palcement_line_center';
import filter_comparison_propertyFunction from '../data/styles/filter_comparison_propertyFunction';

import ol_function_marksymbolizer from '../data/olStyles/function_markSymbolizer';
import ol_function_nested_fillsymbolizer from '../data/olStyles/function_nested_fillSymbolizer';
import ol_point_simplepoint from '../data/olStyles/point_simplepoint';
import ol_point_simpleoffset from '../data/olStyles/point_simpleoffset';
import ol_point_icon from '../data/olStyles/point_icon';
import ol_point_icon_sprite from '../data/olStyles/point_icon_sprite';
import ol_point_simplesquare from '../data/olStyles/point_simplesquare';
import ol_point_simplestar from '../data/olStyles/point_simplestar';
import ol_point_simplestartransparentfill from '../data/olStyles/point_simplestartransparentfill';
import ol_point_simpletriangle from '../data/olStyles/point_simpletriangle';
import ol_point_simplecross from '../data/olStyles/point_simplecross';
import ol_point_simplex from '../data/olStyles/point_simplex';
import ol_point_simpleslash from '../data/olStyles/point_simpleslash';
import ol_point_simplebackslash from '../data/olStyles/point_simplebackslash';
import ol_point_simplevertline from '../data/olStyles/point_simplevertline';
import ol_point_simplehorline from '../data/olStyles/point_simplehorline';
import ol_point_simplecarrow from '../data/olStyles/point_simplecarrow';
import ol_point_simpleoarrow from '../data/olStyles/point_simpleoarrow';
import ol_point_simpledot from '../data/olStyles/point_simpledot';
import ol_point_simpleplus from '../data/olStyles/point_simpleplus';
import ol_point_simpletimes from '../data/olStyles/point_simpletimes';
import ol_line_simpleline from '../data/olStyles/line_simpleline';
import ol_polygon_transparentpolygon from '../data/olStyles/polygon_transparentpolygon';
import ol_polygon_simple from '../data/olStyles/polygon_simple';
import ol_multi_simplefillSimpleline from '../data/olStyles/multi_simplefillSimpleline';
import ol_point_styledLabel_static from '../data/olStyles/point_styledLabel_static';
import ol_point_fontglyph from '../data/olStyles/point_fontglyph';
import ol_unsupported_properties from '../data/olStyles/unsupported_properties';
import ol_text_placement_point from '../data/olStyles/text_placement_point';
import ol_text_placement_line from '../data/olStyles/text_placement_line';
import {
  olBoolean1 as ol_function_boolean_fillsymbolizer1,
  olBoolean2 as ol_function_boolean_fillsymbolizer2
} from '../data/olStyles/function_boolean';
import {
  olCase1 as ol_function_case_1,
  olCase2 as ol_function_case_2,
  olCase3 as ol_function_case_3
} from '../data/olStyles/function_case';

import { METERS_PER_UNIT } from 'ol/proj/Units';
import {
  LineSymbolizer,
  FillSymbolizer,
  TextSymbolizer,
  IconSymbolizer,
  MarkSymbolizer,
  Sprite
} from 'geostyler-style/dist/style';

import OlStyleUtil from './Util/OlStyleUtil';
import { getSvgProperties, removeDuplicateShapes } from './Util/svgs';

// reverse calculation of resolution for scale (from ol-util MapUtil)
function getResolutionForScale (scale, units) {
  let dpi = 25.4 / 0.28;
  let mpu = METERS_PER_UNIT[units];
  let inchesPerMeter = 39.37;

  return parseFloat(scale) / (mpu * inchesPerMeter * dpi);
}

// function to enable testing of async assertions
async function waitForCondition(
  condition: () => boolean,
  timeout = 5000,
  interval = 50
): Promise<void> {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const checkCondition = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startTime >= timeout) {
        reject(new Error('Timeout waiting for condition'));
      } else {
        setTimeout(checkCondition, interval);
      }
    };
    checkCondition();
  });
}

it('OlStyleParser is defined', () => {
  expect(OlStyleParser).toBeDefined();
});

describe('OlStyleParser implements StyleParser', () => {
  let styleParser: OlStyleParser;

  beforeEach(() => {
    styleParser = new OlStyleParser();
  });

  describe('#readStyle', () => {
    it('is defined', () => {
      expect(styleParser.readStyle).toBeDefined();
    });
    it('can read an OpenLayers Style', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplepoint);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplepoint);
    });
    it('can read an OpenLayers Style Array', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle([ol_point_simplepoint]);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplepoint);
    });
    it('can read an OpenLayers Style Function', async () => {
      const styleFct: OlParserStyleFct = (feature, resolution) => {
        return [ol_point_simplepoint];
      };
      styleFct.__geoStylerStyle = point_simplepoint;

      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplepoint);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplepoint);
    });
    it('can read an OpenLayers PointSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplepoint);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplepoint);
    });
    it('can read an OpenLayers PointSymbolizer with displacement', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpleoffset);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simpleoffset);
    });
    it('can read an OpenLayers IconSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_icon);
      expect(geoStylerStyle).toBeDefined();
    });
    it('can read an OpenLayers IconSymbolizer with a sprite', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_icon_sprite);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_icon_sprite);
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName Square', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplesquare);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplesquare);
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName Star', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplestar);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplestar);
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName Star Transparent Fill', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplestartransparentfill);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplestartransparentfill);
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName Triangle', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpletriangle);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simpletriangle);
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName Cross', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplecross);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplecross);
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName X', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplex);
      expect(geoStylerStyle).toBeDefined();
      expect(JSON.stringify(geoStylerStyle).replace('cross2', 'x')).toEqual(JSON.stringify(point_simplex));
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName shape://slash', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpleslash);
      expect(geoStylerStyle).toBeDefined();
      expect(JSON.stringify(geoStylerStyle).replace('slash', 'shape://slash'))
        .toEqual(JSON.stringify(point_simpleslash));
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName shape://backslash', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplebackslash);
      expect(geoStylerStyle).toBeDefined();
      expect(JSON.stringify(geoStylerStyle).replace('backslash', 'shape://backslash'))
        .toEqual(JSON.stringify(point_simplebackslash));
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName shape://vertline', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplevertline);
      expect(geoStylerStyle).toBeDefined();
      expect(JSON.stringify(geoStylerStyle).replace('line', 'shape://vertline'))
        .toEqual(JSON.stringify(point_simplevertline));
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName shape://horline', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplehorline);
      expect(geoStylerStyle).toBeDefined();
      expect(JSON.stringify(geoStylerStyle).replace('horline', 'shape://horline'))
        .toEqual(JSON.stringify(point_simplehorline));
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName shape://carrow', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplecarrow);
      expect(geoStylerStyle).toBeDefined();
      expect(JSON.stringify(geoStylerStyle).replace('carrow', 'shape://carrow'))
        .toEqual(JSON.stringify(point_simplecarrow));
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName shape://oarrow', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpleoarrow);
      expect(geoStylerStyle).toBeDefined();
      expect(JSON.stringify(geoStylerStyle).replace('oarrow', 'shape://oarrow'))
        .toEqual(JSON.stringify(point_simpleoarrow));
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName shape://dot', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpledot);
      expect(geoStylerStyle).toBeDefined();
      expect(JSON.stringify(geoStylerStyle).replace('circle', 'shape://dot'))
        .toEqual(JSON.stringify(point_simpledot));
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName shape://plus', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpleplus);
      expect(geoStylerStyle).toBeDefined();
      expect(JSON.stringify(geoStylerStyle).replace('cross', 'shape://plus'))
        .toEqual(JSON.stringify(point_simpleplus));
    });
    it('can read an OpenLayers MarkSymbolizer as WellKnownName shape://times', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpletimes);
      expect(geoStylerStyle).toBeDefined();
      expect(JSON.stringify(geoStylerStyle).replace('cross2', 'shape://times'))
        .toEqual(JSON.stringify(point_simpletimes));
    });
    it('can read an OpenLayers LineSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_line_simpleline);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(line_simpleline);
    });
    it('can read an OpenLayers PolygonSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_polygon_transparentpolygon);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(polygon_transparentpolygon);
    });
    it('can read two OpenLayers Styles in one Rule', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_multi_simplefillSimpleline);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(multi_simplefillSimpleline);
    });
    it('can read an OpenLayers TextSymbolizer with static text', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_styledLabel_static);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_styledLabel_static);
    });
    it('can read an OpenLayers TextSymbolizer with placement point', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_text_placement_point);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(text_placement_point);
    });
    it('can read an OpenLayers TextSymbolizer with placement line', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_text_placement_line);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(text_placement_line);
    });
    // it('can read an OpenLayers style with a filter', () => {
    //   expect.assertions(2);
    //   const sld = fs.readFileSync( './data/slds/point_simplepoint_filter.sld', 'utf8');
    //   const { output: geoStylerStyle } = await styleParser.readStyle(sld)
    //     .then((geoStylerStyle: Style) => {
    //       expect(geoStylerStyle).toBeDefined();
    //       expect(geoStylerStyle).toEqual(point_simplepoint_filter);
    //     });
    // });
    it('can read an OpenLayers MarkSymbolizer based on a font glyph (WellKnownName starts with ttf://)', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_fontglyph);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_fontglyph);
    });

    it('can read a simple polygon with just fill', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_polygon_simple);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(polygon_simple);
    });

    describe('#olStyleToGeoStylerStyle', () => {
      it('is defined', () => {
        expect(styleParser.olStyleToGeoStylerStyle).toBeDefined();
      });
    });

    describe('#getStyleTypeFromOlStyle', () => {
      it('is defined', () => {
        expect(styleParser.getStyleTypeFromOlStyle).toBeDefined();
      });
    });

    describe('#getRuleFromOlStyle', () => {
      it('is defined', () => {
        expect(styleParser.getRuleFromOlStyle).toBeDefined();
      });
    });

    describe('#getSymbolizersFromOlStyle', () => {
      it('is defined', () => {
        expect(styleParser.getSymbolizersFromOlStyle).toBeDefined();
      });
    });

    // describe('#getFilterFromOperatorAndComparison', () => {
    //   it('is defined', () => {
    //     expect(styleParser.getFilterFromOperatorAndComparison).toBeDefined();
    //   });
    // });

    // describe('#getFilterFromRule', () => {
    //   it('is defined', () => {
    //     expect(styleParser.getFilterFromRule).toBeDefined();
    //   });
    // });

    // describe('#getScaleDenominatorFromRule', () => {
    //   it('is defined', () => {
    //     expect(styleParser.getScaleDenominatorFromRule).toBeDefined();
    //   });
    // });

    describe('#getPointSymbolizerFromOlSymbolizer', () => {
      it('is defined', () => {
        expect(styleParser.getPointSymbolizerFromOlStyle).toBeDefined();
      });
    });

    describe('#getLineSymbolizerFromOlSymbolizer', () => {
      it('is defined', () => {
        expect(styleParser.getLineSymbolizerFromOlStyle).toBeDefined();
      });
    });

    describe('#getFillSymbolizerFromOlSymbolizer', () => {
      it('is defined', () => {
        expect(styleParser.getFillSymbolizerFromOlStyle).toBeDefined();
      });
    });

    describe('#getTextSymbolizerFromOlStyle', () => {
      it('is defined', () => {
        expect(styleParser.getTextSymbolizerFromOlStyle).toBeDefined();
      });

      it('generates correct TextSymbolizer for a corresponding OlStyle', () => {
        const offsetX = 1909;
        const offsetY = 19.09;
        const fontFamily = 'font-name';
        const font = `19px ${fontFamily}`;
        const rotation = Math.PI / 4;

        const fillOpts: FillOptions = {
          color: '#FFFF00'
        };
        const textOpts: TextOptions = {
          text: 'Peter',
          offsetX,
          offsetY,
          font,
          fill: new OlStyleFill(fillOpts),
          rotation
        };

        const styleOpts: StyleOptions = {
          text: new OlStyleText(textOpts)
        };
        const testStyle: OlStyle = new OlStyle(styleOpts);
        const result = styleParser.getTextSymbolizerFromOlStyle(testStyle);
        expect(result).toBeDefined();
        expect(result.kind).toBe('Text');
        expect(result.color).toBe('#FFFF00');
        expect(result.size).toBeCloseTo(19);
        expect(result.font).toEqual([fontFamily]);
        expect(result.offset).toHaveLength(2);
        expect(result.offset?.[0]).toBeCloseTo(offsetX);
        expect(result.offset?.[1]).toBeCloseTo(offsetY);
        expect(result.rotate).toBeCloseTo(rotation / Math.PI * 180);
      });

      it('generates correct TextSymbolizer for sophisticated fonst styles', () => {
        const fontFamily = [
          ['arial', 'sans-serif'],
          ['Georgia', 'serif'],
          ['"Neue Helvetica"', 'Helvetica', 'sans-serif']
        ];
        const font1 = `bold 5px ${fontFamily[0].join(', ')}`;
        const font2 = `italic bold 12px/30px ${fontFamily[1].join(', ')}`;
        const font3 = `15px/18px ${fontFamily[2].join(', ')}`;

        const expectedFontSizes = [5, 12, 15];

        const fillOpts: FillOptions = {
          color: '#FFFF00'
        };

        [font1, font2, font3].forEach((font: string, idx: number) => {
          const textOpts: TextOptions = {
            text: 'Peter',
            font,
            fill: new OlStyleFill(fillOpts)
          };

          const styleOpts: StyleOptions = {
            text: new OlStyleText(textOpts)
          };
          const testStyle: OlStyle = new OlStyle(styleOpts);
          const result = styleParser.getTextSymbolizerFromOlStyle(testStyle);
          expect(result).toBeDefined();
          expect(result.kind).toBe('Text');
          expect(result.color).toBe('#FFFF00');
          expect(result.size).toBe(expectedFontSizes[idx]);
          expect(result.font).toEqual(fontFamily[idx]);
        });
      });
    });
  });

  describe('#writeStyle', () => {
    it('is defined', () => {
      expect(styleParser.writeStyle).toBeDefined();
    });
    it('returns the right output format', async () => {
      let { output: olStyle } = await styleParser.writeStyle(point_simplepoint);
      const { output: olStyles } = await styleParser.writeStyle(multi_simplefillSimpleline);
      const { output: olStyleFct } = await styleParser.writeStyle(multi_twoRulesSimplepoint);
      expect(olStyle).toBeDefined();
      expect(olStyles).toBeDefined();
      expect(olStyleFct).toBeDefined();
      expect(olStyle).toHaveProperty('getImage');
      expect(Array.isArray(olStyles)).toBe(true);
      expect(olStyles).toHaveLength(2);
      expect(typeof olStyleFct === 'function').toBe(true);
    });
    it('can write an OpenLayers PointSymbolizer', async () => {
      let { output: olStyle } = await styleParser.writeStyle(point_simplepoint);
      olStyle = olStyle as OlStyle;
      expect(olStyle).toBeDefined();

      const expecSymb = point_simplepoint.rules[0].symbolizers[0] as MarkSymbolizer;
      const olSimplePoint: OlStyleIcon = olStyle.getImage() as OlStyleIcon;

      expect(olSimplePoint).toBeDefined();

      const svgString = OlStyleUtil.getBase64DecodedSvg(olSimplePoint.getSrc() as string);
      const { id, dimensions, fill } = getSvgProperties(svgString);

      expect(id).toEqual(expecSymb.wellKnownName);
      expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
      expect(fill).toEqual(expecSymb.color);
    });
    it('can write an OpenLayers PointSymbolizer with displacement', async () => {
      let { output: olStyle } = await styleParser.writeStyle(point_simpleoffset);
      olStyle = olStyle as OlStyle;
      expect(olStyle).toBeDefined();

      const expecSymb = point_simpleoffset.rules[0].symbolizers[0] as MarkSymbolizer;
      const olCircle: OlStyleIcon = olStyle.getImage() as OlStyleIcon;

      expect(olCircle).toBeDefined();
      expect(olCircle.getDisplacement()).toEqual(expecSymb.offset);
    });
    it('can write an OpenLayers IconSymbolizer', async () => {
      let { output: olStyle } = await styleParser.writeStyle(point_icon);
      olStyle = olStyle as OlStyle;
      expect(olStyle).toBeDefined();

      const expecSymb = point_icon.rules[0].symbolizers[0] as IconSymbolizer;
      const olIcon: OlStyleIcon = olStyle.getImage() as OlStyleIcon;

      expect(olIcon.getSrc()).toEqual(expecSymb.image);
      // Rotation in openlayers is radians while we use degree
      expect(olIcon.getRotation()).toBeCloseTo((expecSymb.rotate as number) * Math.PI / 180);
      expect(olIcon.getOpacity()).toBeCloseTo(expecSymb.opacity as number);

      expect(olIcon).toBeDefined();
    });
    it('can write an OpenLayers IconSymbolizer with a sprite', async () => {
      let { output: olStyle } = await styleParser.writeStyle(point_icon_sprite);
      olStyle = olStyle as OlStyle;
      expect(olStyle).toBeDefined();

      const expecSymb = point_icon_sprite.rules[0].symbolizers[0] as IconSymbolizer;
      const image = expecSymb.image as Sprite;
      const olIcon: OlStyleIcon = olStyle.getImage() as OlStyleIcon;

      expect(olIcon).toBeDefined();
      expect(olIcon.getSrc()).toEqual(image.source);
      expect(olIcon.getSize()).toEqual(image.size);
      // @ts-ignore
      expect(olIcon.offset_).toEqual(image.position);
    });
    it('can write an OpenLayers IconSymbolizer with feature attribute based src', async () => {
      let { output: olStyle } = await styleParser.writeStyle(point_dynamic_icon);
      olStyle = olStyle as OlParserStyleFct;
      expect(olStyle).toBeDefined();
      const dummyFeat = new OlFeature({
        path: 'image.jpg'
      });

      await olStyle(dummyFeat, 1);

      await waitForCondition(() => !!dummyFeat.getStyle());

      expect(dummyFeat.getStyle()).toBeDefined();
      expect(dummyFeat.getStyle()).toHaveLength(1);

      const olIcon: OlStyleIcon = dummyFeat.getStyle()?.[0].getImage() as OlStyleIcon;
      expect(olIcon).toBeDefined();
      expect(olIcon.getSrc()).toEqual(dummyFeat.get('path'));
    });
  });
  it('can write an OpenLayers Marker square', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplesquare);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplesquare.rules[0].symbolizers[0] as MarkSymbolizer;
    const olSquare = olStyle.getImage() as OlStyleIcon;
    expect(olSquare).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olSquare.getSrc() as string);
    const { id, dimensions, fill } = getSvgProperties(svgString);

    expect(id).toEqual(expecSymb.wellKnownName);
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(fill).toEqual(expecSymb.color);
    expect(JSON.stringify(ol_point_simplesquare)).toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker star', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplestar);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplestar.rules[0].symbolizers[0] as MarkSymbolizer;
    const olStar = olStyle.getImage() as OlStyleIcon;
    expect(olStar).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olStar.getSrc() as string);
    const { id, dimensions, fill } = getSvgProperties(svgString);

    expect(id).toEqual(expecSymb.wellKnownName);
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(fill).toEqual(expecSymb.color);
    expect(JSON.stringify(ol_point_simplestar)).toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker star transparent fill', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplestartransparentfill);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplestartransparentfill.rules[0].symbolizers[0] as MarkSymbolizer;
    const olStarTransparentFill = olStyle.getImage() as OlStyleIcon;
    expect(olStarTransparentFill).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olStarTransparentFill.getSrc() as string);
    const { id, dimensions, fill, fillOpacity } = getSvgProperties(svgString);

    expect(id).toEqual(expecSymb.wellKnownName);
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(fill).toEqual(expecSymb.color);
    expect(fillOpacity).toEqual(expecSymb.fillOpacity);
    expect(JSON.stringify(ol_point_simplestartransparentfill)).toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker triangle', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpletriangle);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpletriangle.rules[0].symbolizers[0] as MarkSymbolizer;
    const olTriangle = olStyle.getImage() as OlStyleIcon;
    expect(olTriangle).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olTriangle.getSrc() as string);
    const { id, dimensions, fill } = getSvgProperties(svgString);

    expect(id).toEqual(expecSymb.wellKnownName);
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(fill).toEqual(expecSymb.color);
    expect(JSON.stringify(ol_point_simpletriangle)).toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker cross', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplecross);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplecross.rules[0].symbolizers[0] as MarkSymbolizer;
    const olCross = olStyle.getImage() as OlStyleIcon;
    expect(olCross).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olCross.getSrc() as string);
    const { id, dimensions, stroke } = getSvgProperties(svgString);

    expect(id).toEqual(expecSymb.wellKnownName);
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(stroke).toEqual(expecSymb.strokeColor);
    expect(JSON.stringify(ol_point_simplecross)).toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker x', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplex);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplex.rules[0].symbolizers[0] as MarkSymbolizer;
    const olX = olStyle.getImage() as OlStyleIcon;
    expect(olX).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olX.getSrc() as string);
    const { id, dimensions, stroke } = getSvgProperties(svgString);

    expect(id).toEqual(removeDuplicateShapes(expecSymb.wellKnownName));
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(stroke).toEqual(expecSymb.strokeColor);
    expect(JSON.stringify(ol_point_simplex).replace('cross2', 'x')).toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker shape://slash', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpleslash);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpleslash.rules[0].symbolizers[0] as MarkSymbolizer;
    const olSlash = olStyle.getImage() as OlStyleIcon;
    expect(olSlash).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olSlash.getSrc() as string);
    const { id, dimensions, stroke } = getSvgProperties(svgString);

    expect(id).toEqual(removeDuplicateShapes(expecSymb.wellKnownName));
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(stroke).toEqual(expecSymb.strokeColor);
    expect(JSON.stringify(ol_point_simpleslash).replace('slash', 'shape://slash')).toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker shape://backslash', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplebackslash);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplebackslash.rules[0].symbolizers[0] as MarkSymbolizer;
    const olBackSlash = olStyle.getImage() as OlStyleIcon;
    expect(olBackSlash).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olBackSlash.getSrc() as string);
    const { id, dimensions, stroke } = getSvgProperties(svgString);

    expect(id).toEqual(removeDuplicateShapes(expecSymb.wellKnownName));
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(stroke).toEqual(expecSymb.strokeColor);
    expect(JSON.stringify(ol_point_simplebackslash).replace('backslash', 'shape://backslash'))
      .toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker shape://vertline', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplevertline);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplevertline.rules[0].symbolizers[0] as MarkSymbolizer;
    const olVertline = olStyle.getImage() as OlStyleIcon;
    expect(olVertline).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olVertline.getSrc() as string);
    const { id, dimensions, stroke } = getSvgProperties(svgString);

    expect(id).toEqual(removeDuplicateShapes(expecSymb.wellKnownName));
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(stroke).toEqual(expecSymb.strokeColor);
    expect(JSON.stringify(ol_point_simplevertline).replace('line', 'shape://vertline'))
      .toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker shape://horline', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplehorline);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplehorline.rules[0].symbolizers[0] as MarkSymbolizer;
    const olHorline = olStyle.getImage() as OlStyleIcon;
    expect(olHorline).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olHorline.getSrc() as string);
    const { id, dimensions, stroke } = getSvgProperties(svgString);

    expect(id).toEqual(removeDuplicateShapes(expecSymb.wellKnownName));
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(stroke).toEqual(expecSymb.strokeColor);
    expect(JSON.stringify(ol_point_simplehorline).replace('horline', 'shape://horline'))
      .toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker shape://carrow', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplecarrow);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplecarrow.rules[0].symbolizers[0] as MarkSymbolizer;
    const olCarrow = olStyle.getImage() as OlStyleIcon;
    expect(olCarrow).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olCarrow.getSrc() as string);
    const { id, dimensions, fill } = getSvgProperties(svgString);

    expect(id).toEqual(removeDuplicateShapes(expecSymb.wellKnownName));
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(fill).toEqual(expecSymb.color);
    expect(JSON.stringify(ol_point_simplecarrow).replace('carrow', 'shape://carrow'))
      .toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker shape://oarrow', async() => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpleoarrow);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpleoarrow.rules[0].symbolizers[0] as MarkSymbolizer;
    const olOarrow = olStyle.getImage() as OlStyleIcon;
    expect(olOarrow).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olOarrow.getSrc() as string);
    const { id, dimensions, stroke } = getSvgProperties(svgString);

    expect(id).toEqual(removeDuplicateShapes(expecSymb.wellKnownName));
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(stroke).toEqual(expecSymb.strokeColor);
    expect(JSON.stringify(ol_point_simpleoarrow).replace('oarrow', 'shape://oarrow'))
      .toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker shape://dot', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpledot);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpledot.rules[0].symbolizers[0] as MarkSymbolizer;
    const olDot = olStyle.getImage() as OlStyleIcon;
    expect(olDot).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olDot.getSrc() as string);
    const { id, dimensions, fill } = getSvgProperties(svgString);

    expect(id).toEqual(removeDuplicateShapes(expecSymb.wellKnownName));
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(fill).toEqual(expecSymb.color);
    expect(JSON.stringify(ol_point_simpledot)).toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker shape://plus', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpleplus);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpleplus.rules[0].symbolizers[0] as MarkSymbolizer;
    const olPlus = olStyle.getImage() as OlStyleIcon;
    expect(olPlus).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olPlus.getSrc() as string);
    const { id, dimensions, stroke } = getSvgProperties(svgString);

    expect(id).toEqual(removeDuplicateShapes(expecSymb.wellKnownName));
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(stroke).toEqual(expecSymb.strokeColor);
    expect(JSON.stringify(ol_point_simpleplus)).toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Marker shape://times', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpletimes);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpletimes.rules[0].symbolizers[0] as MarkSymbolizer;
    const olTimes = olStyle.getImage() as OlStyleIcon;
    expect(olTimes).toBeDefined();

    const svgString = OlStyleUtil.getBase64DecodedSvg(olTimes.getSrc() as string);
    const { id, dimensions, stroke } = getSvgProperties(svgString);

    expect(id).toEqual(removeDuplicateShapes(expecSymb.wellKnownName));
    expect((dimensions / 2)).toBeCloseTo(expecSymb.radius as number);
    expect(stroke).toEqual(expecSymb.strokeColor);
    expect(JSON.stringify(ol_point_simpletimes).replace('cross2', 'shape://times'))
      .toEqual(JSON.stringify(olStyle));
  });
  it('can write an OpenLayers Style based on a font glyph (WellKnownName starts with ttf://)', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_fontglyph);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_fontglyph.rules[0].symbolizers[0] as MarkSymbolizer;
    const olText = olStyle.getText();
    expect(olText).toBeDefined();

    expect(olText?.getFont()).toBe('Normal 12px \'My Font Name\', geostyler-mark-symbolizer');
    expect(olText?.getText()).toBe('|');

    const olTextFill = olText?.getFill();
    expect(olTextFill).toBeDefined();
    expect(olTextFill?.getColor()).toEqual(expecSymb.color);

    const olTextStroke = olText?.getStroke();
    expect(olTextStroke).toBeDefined();
    expect(olTextStroke?.getColor()).toEqual(expecSymb.strokeColor);
  });
  it('can write an OpenLayers LineSymbolizer', async () => {
    let { output: olStyle } = await styleParser.writeStyle(line_simpleline);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = line_simpleline.rules[0].symbolizers[0] as LineSymbolizer;
    const olStroke = olStyle.getStroke();

    expect(olStroke).toBeDefined();
    expect(olStroke?.getColor()).toEqual(expecSymb.color);
    expect(olStroke?.getWidth()).toBeCloseTo(expecSymb.width as number);
    expect(olStroke?.getLineDash()).toEqual(expecSymb.dasharray);
  });
  it('can write an OpenLayers PolygonSymbolizer', async () => {
    let { output: olStyle } = await styleParser.writeStyle(polygon_transparentpolygon);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = polygon_transparentpolygon.rules[0].symbolizers[0] as FillSymbolizer;
    const olStroke = olStyle.getStroke();
    expect(olStroke).toBeDefined();

    const expecSymbOutlCol: string = expecSymb.outlineColor as string;
    const expecSymbOutlOpac: number = expecSymb.outlineOpacity as number;
    expect(olStroke?.getColor()).toEqual(OlStyleUtil.getRgbaColor(expecSymbOutlCol, expecSymbOutlOpac));

    const olFill = olStyle.getFill();
    expect(olFill).toBeDefined();

    const expecSymbFillCol: string = expecSymb.color as string;
    const expecSymbFillOpac: number = expecSymb.fillOpacity as number;
    expect(olFill?.getColor()).toEqual(OlStyleUtil.getRgbaColor(expecSymbFillCol, expecSymbFillOpac));

    expect(olStroke?.getLineDash()).toEqual(expecSymb.outlineDasharray);
  });
  // The graphicFill fill pattern is now built using a HTMLImageElement which doesn't appear to be fully
  // supported for testing using Jest.  It hangs while attempting to load the image.
  // it('can write an OpenLayers PolygonSymbolizer with MarkSymbolizer as graphicFill', async () => {
  //   let { output: olStyle } = await styleParser.writeStyle(polygon_graphicfill_mark);
  //   olStyle = olStyle as OlStyle;
  //   expect(olStyle).toBeDefined();

  //   const olFill = olStyle.getFill();
  //   expect(olFill).toBeDefined();
  //   expect(olFill?.getColor()).toBeInstanceOf(CanvasPattern);
  // });
  it('can write an OpenLayers TextSymbolizer', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_styledlabel);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const testFeature = new OlFeature({name: 'GeoStyler'});
    await olStyle(testFeature, 1);

    await waitForCondition(() => !!testFeature.getStyle());

    expect(testFeature.getStyle()).toHaveLength(1);

    const expecSymb = point_styledlabel.rules[0].symbolizers[0] as TextSymbolizer;

    const style: OlStyle = testFeature.getStyle()?.[0];

    const olText = style.getText();
    expect(olText).toBeDefined();

    const olTextStroke = olText?.getStroke();
    expect(olTextStroke).toBeDefined();
    expect(olTextStroke?.getColor()).toEqual(expecSymb.haloColor);
    expect(olTextStroke?.getWidth()).toBeCloseTo(expecSymb.haloWidth as number);

    const olTextFill = olText?.getFill();
    expect(olTextFill).toBeDefined();
    expect(olTextFill?.getColor()).toEqual(expecSymb.color);

    const olTextFont = olText?.getFont();
    expect(olTextFont).toEqual(OlStyleUtil.getTextFont(expecSymb));

    const olTextContent = olText?.getText();
    expect(olTextContent).toEqual(testFeature.get('name'));

    expecSymb.rotate = expecSymb.rotate as number;

    const olTextRotation = olText?.getRotation();
    expect(olTextRotation).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olTextOffsetX = olText?.getOffsetX();
    const olTextOffsetY = olText?.getOffsetY();
    const expectedOffsetX = expecSymb.offset ? expecSymb.offset[0] : null;
    const expectedOffsetY = expecSymb.offset ? expecSymb.offset[1] : null;
    expect(olTextOffsetX).toBeCloseTo(expectedOffsetX as number);
    expect(olTextOffsetY).toBeCloseTo(expectedOffsetY as number);
  });
  it('can write an OpenLayers TextSymbolizer with static text', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_styledLabel_static);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const testFeature = new OlFeature();
    await olStyle(testFeature, 1);

    await waitForCondition(() => !!testFeature.getStyle());

    expect(testFeature.getStyle()).toHaveLength(1);

    const expecSymb = point_styledLabel_static.rules[0].symbolizers[0] as TextSymbolizer;
    const expecText = expecSymb.label;
    const expecOffset = expecSymb.offset;
    expecSymb.rotate = expecSymb.rotate as number;
    const expecRotation = expecSymb.rotate * Math.PI / 180;
    // openlayers adds default font-style
    const expecFont = `normal normal ${expecSymb.size}px ${expecSymb.font?.join(', ')}`;

    const style = testFeature.getStyle()?.[0] as OlStyle;
    expect(style).toBeDefined();
    const olTextStyle = style.getText();
    expect(olTextStyle).toBeDefined();

    const olText = olTextStyle?.getText();
    expect(olText).toBeDefined();
    expect(olText).toEqual(expecText);

    const olFont = olTextStyle?.getFont();
    expect(olFont).toBeDefined();
    expect(olFont).toEqual(expecFont);

    const olRotation = olTextStyle?.getRotation();
    expect(olRotation).toBeDefined();
    expect(olRotation).toBeCloseTo(expecRotation);

    const olOffsetX = olTextStyle?.getOffsetX();
    expect(olOffsetX).toBeDefined();
    expect(olOffsetX).toBeCloseTo(expecOffset?.[0] as number);

    const olOffsetY = olTextStyle?.getOffsetY();
    expect(olOffsetY).toBeDefined();
    expect(olOffsetY).toBeCloseTo(expecOffset?.[1] as number);
  });
  it('can write an OpenLayers Style from multiple symbolizers in one Rule', async () => {
    const { output: olStyles } = await styleParser.writeStyle(multi_simplefillSimpleline);
    expect(olStyles).toBeDefined();
    expect(olStyles).toHaveLength(2);

    const expecFill = multi_simplefillSimpleline.rules[0].symbolizers[0] as FillSymbolizer;
    const expecLine = multi_simplefillSimpleline.rules[0].symbolizers[1] as LineSymbolizer;

    const olFill = olStyles?.[0].getFill();
    expect(olFill).toBeDefined();

    expect(olFill.getColor()).toEqual(expecFill.color);

    const olLine = olStyles?.[1].getStroke();
    expect(olLine).toBeDefined();

    expect(olLine.getColor()).toEqual(expecLine.color);
    expect(olLine.getWidth()).toBeCloseTo(expecLine.width as number);
  });
  it('can write an OpenLayers Style from symbolizers in multiple Rules', async () => {
    let { output: olStyle } = await styleParser.writeStyle(multi_twoRulesSimplepoint);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const testFeature = new OlFeature();
    await olStyle(testFeature, 1);

    await waitForCondition(() => !!testFeature.getStyle());

    expect(testFeature.getStyle()).toHaveLength(2);

    const expecSymb1 = multi_twoRulesSimplepoint.rules[0].symbolizers[0] as MarkSymbolizer;
    const expecSymb2 = multi_twoRulesSimplepoint.rules[1].symbolizers[0] as MarkSymbolizer;

    const olCircle1 = testFeature.getStyle()?.[0].getImage() as OlStyleIcon;
    const olCircle1Svg = OlStyleUtil.getBase64DecodedSvg(olCircle1.getSrc() as string);
    expect(olCircle1).toBeDefined();
    let { dimensions, fill } = getSvgProperties(olCircle1Svg);
    expect(dimensions / 2).toBeCloseTo(expecSymb1.radius as number);
    expect(fill).toEqual(expecSymb1.color);

    const olCircle2 = testFeature.getStyle()?.[1].getImage() as OlStyleIcon;
    const olCircle2Svg = OlStyleUtil.getBase64DecodedSvg(olCircle2.getSrc() as string);
    expect(olCircle2).toBeDefined();
    ({ dimensions, fill } = getSvgProperties(olCircle2Svg));
    expect(dimensions / 2).toBeCloseTo(expecSymb2.radius as number);
    expect(fill).toEqual(expecSymb2.color);
  });
  it('transforms labels values based on fields to string ', async () => {
    // change the field as base for the label text to a numeric one
    const inSymb = point_styledlabel.rules[0].symbolizers[0] as TextSymbolizer;
    inSymb.label = '{{id}}';
    let { output: olStyle } = await styleParser.writeStyle(point_styledlabel);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const dummyFeat = new OlFeature({
      id: 1
    });

    await olStyle(dummyFeat, 1);

    await waitForCondition(() => !!dummyFeat.getStyle());

    expect(dummyFeat.getStyle()).toBeDefined();
    expect(dummyFeat.getStyle()).toHaveLength(1);

    const olText = dummyFeat.getStyle()?.[0].getText();
    const olTextContent = olText.getText();
    expect(typeof olTextContent).toEqual('string');
    expect(olTextContent).toEqual(dummyFeat.get('id') + '');
  });
  it('returns style if scale is within scaleDenominators', async () => {
    let { output: olStyle } = await styleParser.writeStyle(scaleDenomLine);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const withinScale = scaleDenomLine?.rules?.[0].scaleDenominator?.min as number;
    const beyondScale = scaleDenomLine?.rules?.[0].scaleDenominator?.max as number;

    const resolutionRuleOne = getResolutionForScale(withinScale, 'm');
    const resolutionRuleTwo = getResolutionForScale(beyondScale, 'm');

    const dummyFeat1 = new OlFeature();
    const dummyFeat2 = new OlFeature();

    await olStyle(dummyFeat1, resolutionRuleOne);
    await olStyle(dummyFeat2, resolutionRuleTwo);

    await waitForCondition(() => !!dummyFeat1.getStyle() && !!dummyFeat2.getStyle());

    expect(dummyFeat1.getStyle()).toHaveLength(1);
    expect(dummyFeat2.getStyle()).toHaveLength(0);
  });
  it('returns right style based on scaleDenominators', async () => {
    let { output: olStyle } = await styleParser.writeStyle(scaleDenomLineCircle);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const scaleWithinFirst = scaleDenomLineCircle?.rules?.[0].scaleDenominator?.min as number;
    const scaleWithinSecond = scaleDenomLineCircle?.rules?.[1].scaleDenominator?.min as number;
    const scaleBeyond = scaleDenomLineCircle?.rules?.[1].scaleDenominator?.max as number;

    const resolutionWithinFirst = getResolutionForScale(scaleWithinFirst, 'm');
    const resolutionWithinSecond = getResolutionForScale(scaleWithinSecond, 'm');
    const resolutionBeyond = getResolutionForScale(scaleBeyond, 'm');

    const dummyFeat1 = new OlFeature();
    const dummyFeat2 = new OlFeature();
    const dummyFeat3 = new OlFeature();

    await olStyle(dummyFeat1, resolutionWithinFirst);
    await olStyle(dummyFeat2, resolutionWithinSecond);
    await olStyle(dummyFeat3, resolutionBeyond);

    await waitForCondition(() => !!dummyFeat1.getStyle() && !!dummyFeat2.getStyle() && !!dummyFeat3.getStyle());

    expect(dummyFeat1.getStyle()).toHaveLength(1);
    expect(dummyFeat2.getStyle()).toHaveLength(1);
    expect(dummyFeat3.getStyle()).toHaveLength(0);

    const styleFirst: OlStyle = dummyFeat1.getStyle()?.[0];
    const expecFirst = scaleDenomLineCircle.rules[0].symbolizers[0] as LineSymbolizer;
    const olStroke = styleFirst.getStroke();
    expect(olStroke).toBeDefined();
    expect(olStroke?.getColor()).toEqual(expecFirst.color);
    expect(olStroke?.getWidth()).toBeCloseTo(expecFirst.width as number);
    expect(olStroke?.getLineDash()).toEqual(expecFirst.dasharray);

    const styleSecond: OlStyle = dummyFeat2.getStyle()?.[0];
    const expecSecond = scaleDenomLineCircle.rules[1].symbolizers[0] as MarkSymbolizer;
    const olCircle = styleSecond.getImage() as OlStyleIcon;
    expect(olCircle).toBeDefined();
    const olCircleSvg = OlStyleUtil.getBase64DecodedSvg(olCircle.getSrc() as string);
    const { dimensions, fill } = getSvgProperties(olCircleSvg);
    expect(dimensions / 2).toBeCloseTo(expecSecond.radius as number);
    expect(fill).toEqual(expecSecond.color);
  });
  it('returns styles of all rules that lie within scaleDenominator', async () => {
    let { output: olStyle } = await styleParser.writeStyle(scaleDenomLineCircleOverlap);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const scaleOnlyFirst = scaleDenomLineCircleOverlap?.rules?.[0]?.scaleDenominator?.min as number;
    const scaleOverlap = scaleDenomLineCircleOverlap?.rules?.[1]?.scaleDenominator?.min as number;
    const scaleOnlySecond = scaleDenomLineCircleOverlap?.rules?.[1].scaleDenominator?.max as number - 1;

    const resolutionOnlyFirst = getResolutionForScale(scaleOnlyFirst, 'm');
    const resolutionOverlap = getResolutionForScale(scaleOverlap, 'm');
    const resolutionOnlySecond = getResolutionForScale(scaleOnlySecond, 'm');

    const dummyFeat1 = new OlFeature();
    const dummyFeat2 = new OlFeature();
    const dummyFeat3 = new OlFeature();

    await olStyle(dummyFeat1, resolutionOnlyFirst);
    await olStyle(dummyFeat2, resolutionOverlap);
    await olStyle(dummyFeat3, resolutionOnlySecond);

    await waitForCondition(() => !!dummyFeat1.getStyle() && !!dummyFeat2.getStyle() && !!dummyFeat3.getStyle());

    expect(dummyFeat1.getStyle()).toHaveLength(1);
    expect(dummyFeat2.getStyle()).toHaveLength(2);
    expect(dummyFeat3.getStyle()).toHaveLength(1);
  });
  it('can write an OpenLayers style with a simple filter', async () => {
    let { output: olStyle } = await styleParser.writeStyle(filter_simplefilter);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const bonnFeat = new OlFeature();
    bonnFeat.set('Name', 'Bonn');
    await olStyle(bonnFeat, 1);

    await waitForCondition(() => !!bonnFeat.getStyle());

    expect(bonnFeat.getStyle()).toBeDefined();
    const bonnFilterIcon = bonnFeat.getStyle()?.[0].getImage() as OlStyleIcon;
    const bonnFilterSvg = OlStyleUtil.getBase64DecodedSvg(bonnFilterIcon.getSrc() as string);
    let { dimensions } = getSvgProperties(bonnFilterSvg);
    const expecBonnSymbolizer: MarkSymbolizer = filter_simplefilter.rules[0].symbolizers[0] as MarkSymbolizer;
    expect(dimensions / 2).toBeCloseTo(expecBonnSymbolizer.radius as number);

    const notBonnFeat = new OlFeature();
    notBonnFeat.set('Name', 'Koblenz');
    await olStyle(notBonnFeat, 1);

    await waitForCondition(() => !!notBonnFeat.getStyle());

    expect(notBonnFeat.getStyle()).toBeDefined();
    const notBonnFilterIcon = notBonnFeat.getStyle()?.[0].getImage() as OlStyleIcon;
    const notBonnFilterSvg = OlStyleUtil.getBase64DecodedSvg(notBonnFilterIcon.getSrc() as string);
    ({ dimensions } = getSvgProperties(notBonnFilterSvg));
    const expecNotBonnSymbolizer: MarkSymbolizer = filter_simplefilter.rules[1].symbolizers[0] as MarkSymbolizer;
    expect(dimensions / 2).toBeCloseTo(expecNotBonnSymbolizer.radius as number);
  });
  it('can write an OpenLayers style with a nested filter', async () => {
    let { output: olStyle } = await styleParser.writeStyle(filter_nestedfilter);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const matchFilterFeat = new OlFeature();
    matchFilterFeat.set('state', 'germany');
    matchFilterFeat.set('population', 100000);
    matchFilterFeat.set('name', 'Dortmund');
    await olStyle(matchFilterFeat, 1);

    await waitForCondition(() => !!matchFilterFeat.getStyle());

    expect(matchFilterFeat.getStyle()).toBeDefined();
    const matchFilterIcon = matchFilterFeat.getStyle()?.[0].getImage() as OlStyleIcon;
    const matchFilterSvg = OlStyleUtil.getBase64DecodedSvg(matchFilterIcon.getSrc() as string);
    let { dimensions } = getSvgProperties(matchFilterSvg);
    const expecMatchSymbolizer: MarkSymbolizer = filter_nestedfilter.rules[0].symbolizers[0] as MarkSymbolizer;
    expect(dimensions / 2).toBeCloseTo(expecMatchSymbolizer.radius as number);

    const noMatchFilterFeat = new OlFeature();
    noMatchFilterFeat.set('state', 'germany');
    noMatchFilterFeat.set('population', 100000);
    noMatchFilterFeat.set('name', 'Schalke');
    await olStyle(noMatchFilterFeat, 1);

    await waitForCondition(() => !!noMatchFilterFeat.getStyle());

    expect(noMatchFilterFeat.getStyle()?.[0]).toBeDefined();
    const noMatchFilterIcon = noMatchFilterFeat.getStyle()?.[0].getImage() as OlStyleIcon;
    const noMatchFilterSvg = OlStyleUtil.getBase64DecodedSvg(noMatchFilterIcon.getSrc() as string);
    ({ dimensions } = getSvgProperties(noMatchFilterSvg));
    const expecNoMatchSymbolizer: MarkSymbolizer = filter_nestedfilter.rules[1].symbolizers[0] as MarkSymbolizer;
    expect(dimensions / 2).toBeCloseTo(expecNoMatchSymbolizer.radius as number);

    const noMatchFilterFeat2 = new OlFeature();
    noMatchFilterFeat2.set('state', 'germany');
    noMatchFilterFeat2.set('population', '100000');
    noMatchFilterFeat2.set('name', 'Schalke');
    await olStyle(noMatchFilterFeat2, 1);

    await waitForCondition(() => !!noMatchFilterFeat2.getStyle());

    expect(noMatchFilterFeat2.getStyle()).toBeDefined();
    const noMatchFilter2Icon = noMatchFilterFeat2.getStyle()?.[0].getImage() as OlStyleIcon;
    const noMatchFilter2Svg = OlStyleUtil.getBase64DecodedSvg(noMatchFilter2Icon.getSrc() as string);
    ({ dimensions } = getSvgProperties(noMatchFilter2Svg));
    const expecNoMatch2Symbolizer: MarkSymbolizer = filter_nestedfilter.rules[1].symbolizers[0] as MarkSymbolizer;
    expect(dimensions / 2).toBeCloseTo(expecNoMatch2Symbolizer.radius as number);
  });
  it('does neither match nor crash if filters are invalid', async () => {
    let { output: olStyle } = await styleParser.writeStyle(filter_invalidfilter);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const noMatchFilterFeat = new OlFeature();
    noMatchFilterFeat.set('state', 'germany');
    noMatchFilterFeat.set('population', 100000);
    noMatchFilterFeat.set('name', 'Schalke');
    await olStyle(noMatchFilterFeat, 1);

    await waitForCondition(() => !!noMatchFilterFeat.getStyle());

    expect(noMatchFilterFeat.getStyle()).toHaveLength(1);

    expect(noMatchFilterFeat.getStyle()).toBeDefined();
    const noMatchFilterIcon = noMatchFilterFeat.getStyle()?.[0].getImage() as OlStyleIcon;
    const noMatchFilterSvg = OlStyleUtil.getBase64DecodedSvg(noMatchFilterIcon.getSrc() as string);
    const { dimensions } = getSvgProperties(noMatchFilterSvg);
    const expecNoMatchSymbolizer: MarkSymbolizer = filter_invalidfilter.rules[1].symbolizers[0] as MarkSymbolizer;
    expect(dimensions / 2).toBeCloseTo(expecNoMatchSymbolizer.radius as number);
  });

  it('can write a simple polygon with just fill', async () => {
    const { output: geoStylerStyle } = await styleParser.writeStyle(polygon_simple);
    expect(geoStylerStyle).toBeDefined();
    expect(geoStylerStyle).toEqual(ol_polygon_simple);
  });
  it('can write a TextSymbolizer with placement point', async () => {
    let { output: olStyle } = await styleParser.writeStyle(text_placement_point);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const testFeature = new OlFeature({name: 'GeoStyler'});
    await olStyle(testFeature, 1);

    await waitForCondition(() => !!testFeature.getStyle());

    expect(testFeature.getStyle()).toHaveLength(1);

    const style: OlStyle = testFeature.getStyle()?.[0];

    const olPlacement = style.getText()?.getPlacement();
    expect(olPlacement).toEqual('point');
  });

  it('can write a TextSymbolizer with placement line', async () => {
    let { output: olStyle } = await styleParser.writeStyle(text_placement_line);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const testFeature = new OlFeature({name: 'GeoStyler'});
    await olStyle(testFeature, 1);

    await waitForCondition(() => !!testFeature.getStyle());

    expect(testFeature.getStyle()).toHaveLength(1);

    const style: OlStyle = testFeature.getStyle()?.[0];
    const olPlacement = style.getText()?.getPlacement();
    expect(olPlacement).toEqual('line');
  });

  it('can write a TextSymbolizer with placement line-center to line ', async () => {
    let { output: olStyle } = await styleParser.writeStyle(text_placement_line_center);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const testFeature = new OlFeature({name: 'GeoStyler'});
    await olStyle(testFeature, 1);

    await waitForCondition(() => !!testFeature.getStyle());

    expect(testFeature.getStyle()).toHaveLength(1);

    const style: OlStyle = testFeature.getStyle()?.[0];
    const olPlacement = style.getText()?.getPlacement();
    expect(olPlacement).toEqual('line');
  });

  it('can write a Marksymbolizer with GeoStylerFunction', async () => {
    let { output: geoStylerStyle } = await styleParser.writeStyle(function_marksymbolizer);
    expect(geoStylerStyle).toBeDefined();
    expect(typeof geoStylerStyle === 'function').toBe(true);
    geoStylerStyle = geoStylerStyle as OlParserStyleFct;
    const dummyFeat = new OlFeature();
    await geoStylerStyle(dummyFeat);

    await waitForCondition(() => !!dummyFeat.getStyle());

    expect(geoStylerStyle.__geoStylerStyle).toEqual(function_marksymbolizer);
    expect(dummyFeat.getStyle()?.[0]).toEqual(ol_function_marksymbolizer);
  });
  it('can write a Marksymbolizer with the GeoStylerFunction "case"', async () => {
    let { output: geoStylerStyle } = await styleParser.writeStyle(function_case);
    expect(geoStylerStyle).toBeDefined();
    expect(typeof geoStylerStyle === 'function').toBe(true);
    geoStylerStyle = geoStylerStyle as OlParserStyleFct;
    const dummyFeat1 = new OlFeature({
      population: 49000
    });
    const dummyFeat2 = new OlFeature({
      population: 1000000
    });
    const dummyFeat3 = new OlFeature({
      population: 999999999
    });
    await geoStylerStyle(dummyFeat1);
    await geoStylerStyle(dummyFeat2);
    await geoStylerStyle(dummyFeat3);

    await waitForCondition(() => !!dummyFeat1.getStyle() && !!dummyFeat2.getStyle() && !!dummyFeat3.getStyle());

    expect(geoStylerStyle.__geoStylerStyle).toEqual(function_case);
    expect(dummyFeat1.getStyle()?.[0]).toEqual(ol_function_case_1);
    expect(dummyFeat2.getStyle()?.[0]).toEqual(ol_function_case_2);
    expect(dummyFeat3.getStyle()?.[0]).toEqual(ol_function_case_3);
  });

  it('can write a FillSymbolizer with a nested GeoStylerFunction', async () => {
    let { output: geoStylerStyle } = await styleParser.writeStyle(function_nested_fillsymbolizer);
    expect(geoStylerStyle).toBeDefined();
    expect(typeof geoStylerStyle === 'function').toBe(true);
    geoStylerStyle = geoStylerStyle as OlParserStyleFct;
    const dummyFeat = new OlFeature();
    await geoStylerStyle(dummyFeat);

    await waitForCondition(() => !!dummyFeat.getStyle());

    expect(geoStylerStyle.__geoStylerStyle).toEqual(function_nested_fillsymbolizer);
    expect(dummyFeat.getStyle()?.[0]).toEqual(ol_function_nested_fillsymbolizer);
  });

  it('can write a Filter with a GeoStylerBooleanFunction', async () => {
    let { output: geoStylerStyle } = await styleParser.writeStyle(function_boolean);
    expect(geoStylerStyle).toBeDefined();
    expect(typeof geoStylerStyle === 'function').toBe(true);
    geoStylerStyle = geoStylerStyle as OlParserStyleFct;
    const dummyFeat1 = new OlFeature({
      testprop: 0.8
    });
    const dummyFeat2 = new OlFeature({
      testprop: 2
    });
    await geoStylerStyle(dummyFeat1);
    await geoStylerStyle(dummyFeat2);

    await waitForCondition(() => !!dummyFeat1.getStyle() && !!dummyFeat2.getStyle());

    expect(geoStylerStyle.__geoStylerStyle).toEqual(function_boolean);
    expect(dummyFeat1.getStyle()?.[0]).toEqual(ol_function_boolean_fillsymbolizer1);
    expect(dummyFeat2.getStyle()?.[0]).toEqual(ol_function_boolean_fillsymbolizer2);
  });

  it('can write a comparison filter where the first and second arguments are property functions', async () => {
    let { output: geoStylerStyle } = await styleParser.writeStyle(filter_comparison_propertyFunction);
    expect(geoStylerStyle).toBeDefined();
    expect(typeof geoStylerStyle === 'function').toBe(true);
    geoStylerStyle = geoStylerStyle as OlParserStyleFct;
    const inBetweenLabel = (filter_comparison_propertyFunction.rules[0].symbolizers[0] as TextSymbolizer).label;
    const aboveLabel = (filter_comparison_propertyFunction.rules[1].symbolizers[0] as TextSymbolizer).label;
    const belowLabel = (filter_comparison_propertyFunction.rules[2].symbolizers[0] as TextSymbolizer).label;

    const inBetweenFeat = new OlFeature({
      value: 0.8,
      max: 1,
      min: 0.5
    });
    const aboveFeat = new OlFeature({
      value: 2,
      max: 1,
      min: 0.5
    });
    const belowFeat = new OlFeature({
      value: 0.2,
      max: 1,
      min: 0.5
    });

    await geoStylerStyle(inBetweenFeat);
    await geoStylerStyle(aboveFeat);
    await geoStylerStyle(belowFeat);

    await waitForCondition(() => !!inBetweenFeat.getStyle() && !!aboveFeat.getStyle() && !!belowFeat.getStyle());

    expect(inBetweenFeat.getStyle()?.[0].getText().getText()).toBe(inBetweenLabel);
    expect(aboveFeat.getStyle()?.[0].getText().getText()).toBe(aboveLabel);
    expect(belowFeat.getStyle()?.[0].getText().getText()).toBe(belowLabel);
  });

  it('adds unsupportedProperties to the write output', async () => {
    let {
      output: olStyle,
      unsupportedProperties,
      warnings
    } = await styleParser.writeStyle(unsupported_properties);
    expect(olStyle).toBeDefined();
    const unsupportedGot = {
      Symbolizer: {
        FillSymbolizer: {
          opacity: {
            info: 'Use fillOpacity instead.',
            support: 'none'
          }
        },
        IconSymbolizer: {
          anchor: 'none',
        },
      }
    };
    const warningsGot = ['Your style contains unsupportedProperties!'];
    expect(unsupportedProperties).toEqual(unsupportedGot);
    expect(warnings).toEqual(warningsGot);
    expect(olStyle).toEqual(ol_unsupported_properties);
  });

  describe('#getOlStyleTypeFromGeoStylerStyle', () => {
    it('is defined', () => {
      expect(styleParser.getOlStyleTypeFromGeoStylerStyle).toBeDefined();
    });
  });

  describe('#geoStylerStyleToOlStyle', () => {
    it('is defined', () => {
      expect(styleParser.geoStylerStyleToOlStyle).toBeDefined();
    });
  });

  describe('#geoStylerStyleToOlStyleArray', () => {
    it('is defined', () => {
      expect(styleParser.geoStylerStyleToOlStyleArray).toBeDefined();
    });
  });

  describe('#geoStylerStyleToOlParserStyleFct', () => {
    it('is defined', () => {
      expect(styleParser.geoStylerStyleToOlParserStyleFct).toBeDefined();
    });
  });

  describe('#geoStylerFilterToOlParserFilter', () => {
    it('is defined', () => {
      expect(styleParser.geoStylerFilterToOlParserFilter).toBeDefined();
    });
  });

  describe('#getOlSymbolizerFromSymbolizer', () => {
    it('is defined', () => {
      expect(styleParser.getOlSymbolizerFromSymbolizer).toBeDefined();
    });
  });

  describe('#getOlPointSymbolizerFromMarkSymbolizer', () => {
    it('is defined', () => {
      expect(styleParser.getOlPointSymbolizerFromMarkSymbolizer).toBeDefined();
    });
  });

  describe('#getOlIconSymbolizerFromIconSymbolizer', () => {
    it('is defined', () => {
      expect(styleParser.getOlIconSymbolizerFromIconSymbolizer).toBeDefined();
    });
  });

  describe('#getOlTextSymbolizerFromTextSymbolizer', () => {
    it('is defined', () => {
      expect(styleParser.getOlTextSymbolizerFromTextSymbolizer).toBeDefined();
    });
  });

  describe('#getOlPolygonSymbolizerFromFillSymbolizer', () => {
    it('is defined', () => {
      expect(styleParser.getOlPolygonSymbolizerFromFillSymbolizer).toBeDefined();
    });
  });

  describe('#getOlLineSymbolizerFromLineSymbolizer', () => {
    it('is defined', () => {
      expect(styleParser.getOlLineSymbolizerFromLineSymbolizer).toBeDefined();
    });
  });

  // describe('#getSldComparisonFilterFromComparisonFilte', () => {
  //   it('is defined', () => {
  //     expect(styleParser.getSldComparisonFilterFromComparisonFilter).toBeDefined();
  //   });
  // });

  // describe('#getSldFilterFromFilter', () => {
  //   it('is defined', () => {
  //     expect(styleParser.getSldFilterFromFilter).toBeDefined();
  //   });
  // });

});

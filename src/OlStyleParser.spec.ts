import 'regenerator-runtime/runtime';

import OlStyle, {
  Options as StyleOptions
} from 'ol/style/Style';
import OlStyleCircle from 'ol/style/Circle';
import OlStyleRegularshape from 'ol/style/RegularShape';
import OlStyleStroke from 'ol/style/Stroke';
import OlStyleIcon from 'ol/style/Icon';
import OlStyleText, { Options as TextOptions } from 'ol/style/Text';
import OlStyleFill, { Options as FillOptions } from 'ol/style/Fill';
import OlFeature from 'ol/Feature';

import OlStyleParser, { OlParserStyleFct } from './OlStyleParser';

import point_simplepoint from '../data/styles/point_simplepoint';
import point_icon from '../data/styles/point_icon';
import point_dynamic_icon from '../data/styles/point_dynamic_icon';
import point_simplesquare from '../data/styles/point_simplesquare';
import point_simplestar from '../data/styles/point_simplestar';
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
import point_styledLabel_static from '../data/styles/point_styledLabel_static';
import multi_twoRulesSimplepoint from '../data/styles/multi_twoRulesSimplepoint';
import multi_simplefillSimpleline from '../data/styles/multi_simplefillSimpleline';
import scaleDenomLine from '../data/styles/scaleDenom_line';
import scaleDenomLineCircle from '../data/styles/scaleDenom_line_circle';
import scaleDenomLineCircleOverlap from '../data/styles/scaleDenom_line_circle_overlap';
import polygon_transparentpolygon from '../data/styles/polygon_transparentpolygon';
import polygon_graphicfill_mark from '../data/styles/polygon_graphicFill_mark';
import polygon_simple from '../data/styles/polygon_simple';
import point_styledlabel from '../data/styles/point_styledlabel';
import point_fontglyph from '../data/styles/point_fontglyph';
import unsupported_properties from '../data/styles/unsupported_properties';

import ol_point_simplepoint from '../data/olStyles/point_simplepoint';
import ol_point_icon from '../data/olStyles/point_icon';
import ol_point_simplesquare from '../data/olStyles/point_simplesquare';
import ol_point_simplestar from '../data/olStyles/point_simplestar';
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

import { METERS_PER_UNIT } from 'ol/proj/Units';
import {
  LineSymbolizer,
  FillSymbolizer,
  TextSymbolizer,
  IconSymbolizer,
  MarkSymbolizer
} from 'geostyler-style';

import OlStyleUtil from './Util/OlStyleUtil';

// reverse calculation of resolution for scale (from ol-util MapUtil)
function getResolutionForScale (scale, units) {
  let dpi = 25.4 / 0.28;
  let mpu = METERS_PER_UNIT[units];
  let inchesPerMeter = 39.37;

  return parseFloat(scale) / (mpu * inchesPerMeter * dpi);
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
        return ol_point_simplepoint;
      };
      styleFct.__geoStylerStyle = point_simplepoint;

      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplepoint);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplepoint);
    });
    it('can read a OpenLayers PointSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplepoint);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplepoint);
    });
    it('can read a OpenLayers IconSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_icon);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_icon);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName Square', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplesquare);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplesquare);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName Star', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplestar);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplestar);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName Triangle', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpletriangle);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simpletriangle);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName Cross', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplecross);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplecross);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName X', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplex);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplex);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName shape://slash', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpleslash);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simpleslash);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName shape://backslash', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplebackslash);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplebackslash);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName shape://vertline', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplevertline);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplevertline);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName shape://horline', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplehorline);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplehorline);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName shape://carrow', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simplecarrow);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_simplecarrow);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName shape://oarrow', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpleoarrow);
      expect(geoStylerStyle).toBeDefined();
      // using point_simplecarrow here since reading OlStyle cannot distinguish
      // between carrow and oarrow
      expect(geoStylerStyle).toEqual(point_simplecarrow);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName shape://dot', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpledot);
      expect(geoStylerStyle).toBeDefined();
      // using point_simplepoint here since reading OlStyle cannot distinguish
      // between circle and dot
      expect(geoStylerStyle).toEqual(point_simplepoint);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName shape://plus', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpleplus);
      expect(geoStylerStyle).toBeDefined();
      // using point_simplecross here since reading OlStyle cannot distinguish
      // between cross and plus
      expect(geoStylerStyle).toEqual(point_simplecross);
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName shape://times', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_simpletimes);
      expect(geoStylerStyle).toBeDefined();
      // using point_simplex here since reading OlStyle cannot distinguish
      // between x and times
      expect(geoStylerStyle).toEqual(point_simplex);
    });
    it('can read a OpenLayers LineSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_line_simpleline);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(line_simpleline);
    });
    it('can read a OpenLayers PolygonSymbolizer', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_polygon_transparentpolygon);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(polygon_transparentpolygon);
    });
    it('can read two OpenLayers Styles in one Rule', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_multi_simplefillSimpleline);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(multi_simplefillSimpleline);
    });
    it('can read a OpenLayers TextSymbolizer with static text', async () => {
      const { output: geoStylerStyle } = await styleParser.readStyle(ol_point_styledLabel_static);
      expect(geoStylerStyle).toBeDefined();
      expect(geoStylerStyle).toEqual(point_styledLabel_static);
    });
    // it('can read a OpenLayers style with a filter', () => {
    //   expect.assertions(2);
    //   const sld = fs.readFileSync( './data/slds/point_simplepoint_filter.sld', 'utf8');
    //   const { output: geoStylerStyle } = await styleParser.readStyle(sld)
    //     .then((geoStylerStyle: Style) => {
    //       expect(geoStylerStyle).toBeDefined();
    //       expect(geoStylerStyle).toEqual(point_simplepoint_filter);
    //     });
    // });
    it('can read a OpenLayers MarkSymbolizer based on a font glyph (WellKnownName starts with ttf://)', async () => {
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
        expect(result.offset[0]).toBeCloseTo(offsetX);
        expect(result.offset[1]).toBeCloseTo(offsetY);
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
    it('can write a OpenLayers PointSymbolizer', async () => {
      let { output: olStyle } = await styleParser.writeStyle(point_simplepoint);
      olStyle = olStyle as OlStyle;
      expect(olStyle).toBeDefined();

      const expecSymb = point_simplepoint.rules[0].symbolizers[0] as MarkSymbolizer;
      const olCircle: OlStyleCircle = olStyle.getImage() as OlStyleCircle;

      expect(olCircle).toBeDefined();
      expect(olCircle.getRadius()).toBeCloseTo(expecSymb.radius);
      expect(olCircle.getFill().getColor()).toEqual(expecSymb.color);
    });
    it('can write an OpenLayers IconSymbolizer', async () => {
      let { output: olStyle } = await styleParser.writeStyle(point_icon);
      olStyle = olStyle as OlStyle;
      expect(olStyle).toBeDefined();

      const expecSymb = point_icon.rules[0].symbolizers[0] as IconSymbolizer;
      const olIcon: OlStyleIcon = olStyle.getImage() as OlStyleIcon;

      expect(olIcon.getSrc()).toEqual(expecSymb.image);
      expect(olIcon.getSize()[0]).toBeCloseTo(expecSymb.size);
      expect(olIcon.getSize()[1]).toBeCloseTo(expecSymb.size);
      // Rotation in openlayers is radians while we use degree
      expect(olIcon.getRotation()).toBeCloseTo(expecSymb.rotate! * Math.PI / 180);
      expect(olIcon.getOpacity()).toBeCloseTo(expecSymb.opacity);

      expect(olIcon).toBeDefined();
    });
    it('can write an OpenLayers IconSymbolizer with feature attribute based src', async () => {
      let { output: olStyle } = await styleParser.writeStyle(point_dynamic_icon);
      olStyle = olStyle as OlParserStyleFct;
      expect(olStyle).toBeDefined();
      const dummyFeat = new OlFeature({
        path: 'image.jpg'
      });

      const styles = olStyle(dummyFeat, 1);
      expect(styles).toBeDefined();
      expect(styles).toHaveLength(1);

      const olIcon: OlStyleIcon = styles[0].getImage() as OlStyleIcon;
      expect(olIcon).toBeDefined();
      expect(olIcon.getSrc()).toEqual(dummyFeat.get('path'));
    });
  });
  it('can write a OpenLayers RegularShape square', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplesquare);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplesquare.rules[0].symbolizers[0] as MarkSymbolizer;
    const olSquare: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olSquare).toBeDefined();

    expect(olSquare.getPoints()).toBeCloseTo(4);
    expect(olSquare.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olSquare.getAngle()).toBeCloseTo(45 * Math.PI / 180);
    expect(olSquare.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olSquareFill: OlStyleFill = olSquare.getFill();
    expect(olSquareFill).toBeDefined();
    expect(olSquareFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape star', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplestar);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplestar.rules[0].symbolizers[0] as MarkSymbolizer;
    const olStar: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olStar).toBeDefined();

    expect(olStar.getPoints()).toBeCloseTo(5);
    expect(olStar.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olStar.getRadius2()).toBeCloseTo(expecSymb.radius / 2.5);
    expect(olStar.getAngle()).toBeCloseTo(0);
    expect(olStar.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olStarFill: OlStyleFill = olStar.getFill();
    expect(olStarFill).toBeDefined();
    expect(olStarFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape triangle', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpletriangle);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpletriangle.rules[0].symbolizers[0] as MarkSymbolizer;
    const olTriangle: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olTriangle).toBeDefined();

    expect(olTriangle.getPoints()).toBeCloseTo(3);
    expect(olTriangle.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olTriangle.getAngle()).toBeCloseTo(0);
    expect(olTriangle.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olTriangleFill: OlStyleFill = olTriangle.getFill();
    expect(olTriangleFill).toBeDefined();
    expect(olTriangleFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape cross', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplecross);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplecross.rules[0].symbolizers[0] as MarkSymbolizer;
    const olCross: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olCross).toBeDefined();

    expect(olCross.getPoints()).toBeCloseTo(4);
    expect(olCross.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olCross.getRadius2()).toBeCloseTo(0);
    expect(olCross.getAngle()).toBeCloseTo(0);
    expect(olCross.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olCrossFill: OlStyleFill = olCross.getFill();
    expect(olCrossFill).toBeDefined();
    expect(olCrossFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape x', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplex);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplex.rules[0].symbolizers[0] as MarkSymbolizer;
    const olX: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olX).toBeDefined();

    expect(olX.getPoints()).toBeCloseTo(4);
    expect(olX.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olX.getRadius2()).toBeCloseTo(0);
    expect(olX.getAngle()).toBeCloseTo(45 * Math.PI / 180);
    expect(olX.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olXFill: OlStyleFill = olX.getFill();
    expect(olXFill).toBeDefined();
    expect(olXFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape shape://slash', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpleslash);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpleslash.rules[0].symbolizers[0] as MarkSymbolizer;
    const olSlash: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olSlash).toBeDefined();

    expect(olSlash.getPoints()).toBeCloseTo(2);
    expect(olSlash.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olSlash.getAngle()).toBeCloseTo(Math.PI / 4);
    expect(olSlash.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olSlashFill: OlStyleFill = olSlash.getFill();
    expect(olSlashFill).toBeDefined();
    expect(olSlashFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape shape://backslash', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplebackslash);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplebackslash.rules[0].symbolizers[0] as MarkSymbolizer;
    const olBackSlash: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olBackSlash).toBeDefined();

    expect(olBackSlash.getPoints()).toBeCloseTo(2);
    expect(olBackSlash.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olBackSlash.getAngle()).toBeCloseTo(2 * Math.PI - (Math.PI / 4));
    expect(olBackSlash.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olBackSlashFill: OlStyleFill = olBackSlash.getFill();
    expect(olBackSlashFill).toBeDefined();
    expect(olBackSlashFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape shape://vertline', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplevertline);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplevertline.rules[0].symbolizers[0] as MarkSymbolizer;
    const olVertline: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olVertline).toBeDefined();

    expect(olVertline.getPoints()).toBeCloseTo(2);
    expect(olVertline.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olVertline.getAngle()).toBeCloseTo(0, 0);
    expect(olVertline.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olVertlineFill: OlStyleFill = olVertline.getFill();
    expect(olVertlineFill).toBeDefined();
    expect(olVertlineFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape shape://horline', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplehorline);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplehorline.rules[0].symbolizers[0] as MarkSymbolizer;
    const olHorline: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olHorline).toBeDefined();

    expect(olHorline.getPoints()).toBeCloseTo(2);
    expect(olHorline.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olHorline.getAngle()).toBeCloseTo(Math.PI / 2);
    expect(olHorline.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olHorlineFill: OlStyleFill = olHorline.getFill();
    expect(olHorlineFill).toBeDefined();
    expect(olHorlineFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape shape://carrow', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simplecarrow);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simplecarrow.rules[0].symbolizers[0] as MarkSymbolizer;
    const olCarrow: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olCarrow).toBeDefined();

    expect(olCarrow.getPoints()).toBeCloseTo(3);
    expect(olCarrow.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olCarrow.getAngle()).toBeCloseTo(Math.PI / 2);
    expect(olCarrow.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olCarrowFill: OlStyleFill = olCarrow.getFill();
    expect(olCarrowFill).toBeDefined();
    expect(olCarrowFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape shape://oarrow', async() => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpleoarrow);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpleoarrow.rules[0].symbolizers[0] as MarkSymbolizer;
    const olOarrow: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olOarrow).toBeDefined();

    expect(olOarrow.getPoints()).toBeCloseTo(3);
    expect(olOarrow.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olOarrow.getAngle()).toBeCloseTo(Math.PI / 2);
    expect(olOarrow.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olOarrowFill: OlStyleFill = olOarrow.getFill();
    expect(olOarrowFill).toBeDefined();
    expect(olOarrowFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape shape://dot', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpledot);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpledot.rules[0].symbolizers[0] as MarkSymbolizer;
    const olDot: OlStyleCircle = olStyle.getImage() as OlStyleCircle;

    expect(olDot).toBeDefined();
    expect(olDot.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olDot.getFill().getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape shape://plus', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpleplus);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpleplus.rules[0].symbolizers[0] as MarkSymbolizer;
    const olPlus: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olPlus).toBeDefined();

    expect(olPlus.getPoints()).toBeCloseTo(4);
    expect(olPlus.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olPlus.getRadius2()).toBeCloseTo(0);
    expect(olPlus.getAngle()).toBeCloseTo(0);
    expect(olPlus.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olPlusFill: OlStyleFill = olPlus.getFill();
    expect(olPlusFill).toBeDefined();
    expect(olPlusFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers RegularShape shape://times', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_simpletimes);

    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_simpletimes.rules[0].symbolizers[0] as MarkSymbolizer;
    const olTimes: OlStyleRegularshape = olStyle.getImage() as OlStyleRegularshape;
    expect(olTimes).toBeDefined();

    expect(olTimes.getPoints()).toBeCloseTo(4);
    expect(olTimes.getRadius()).toBeCloseTo(expecSymb.radius);
    expect(olTimes.getRadius2()).toBeCloseTo(0);
    expect(olTimes.getAngle()).toBeCloseTo(45 * Math.PI / 180);
    expect(olTimes.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olTimesFill: OlStyleFill = olTimes.getFill();
    expect(olTimesFill).toBeDefined();
    expect(olTimesFill.getColor()).toEqual(expecSymb.color);
  });
  it('can write a OpenLayers Style based on a font glyph (WellKnownName starts with ttf://)', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_fontglyph);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = point_fontglyph.rules[0].symbolizers[0] as MarkSymbolizer;
    const olText: OlStyleText = olStyle.getText();
    expect(olText).toBeDefined();

    expect(olText.getFont()).toBe('Normal 12px \'My Font Name\', geostyler-mark-symbolizer');
    expect(olText.getText()).toBe('|');

    const olTextFill: OlStyleFill = olText.getFill();
    expect(olTextFill).toBeDefined();
    expect(olTextFill.getColor()).toEqual(expecSymb.color);

    const olTextStroke: OlStyleStroke = olText.getStroke();
    expect(olTextStroke).toBeDefined();
    expect(olTextStroke.getColor()).toEqual(expecSymb.strokeColor);
  });
  it('can write a OpenLayers LineSymbolizer', async () => {
    let { output: olStyle } = await styleParser.writeStyle(line_simpleline);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = line_simpleline.rules[0].symbolizers[0] as LineSymbolizer;
    const olStroke = olStyle.getStroke();

    expect(olStroke).toBeDefined();
    expect(olStroke.getColor()).toEqual(expecSymb.color);
    expect(olStroke.getWidth()).toBeCloseTo(expecSymb.width);
    expect(olStroke.getLineDash()).toEqual(expecSymb.dasharray);
  });
  it('can write a OpenLayers PolygonSymbolizer', async () => {
    let { output: olStyle } = await styleParser.writeStyle(polygon_transparentpolygon);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const expecSymb = polygon_transparentpolygon.rules[0].symbolizers[0] as FillSymbolizer;
    const olStroke = olStyle.getStroke();
    expect(olStroke).toBeDefined();

    const expecSymbOutlCol: string = expecSymb.outlineColor as string;
    const expecSymbOutlOpac: number = expecSymb.outlineOpacity as number;
    expect(olStroke.getColor()).toEqual(OlStyleUtil.getRgbaColor(expecSymbOutlCol, expecSymbOutlOpac));

    const olFill = olStyle.getFill();
    expect(olFill).toBeDefined();

    const expecSymbFillCol: string = expecSymb.color as string;
    const expecSymbFillOpac: number = expecSymb.opacity as number;
    expect(olFill.getColor()).toEqual(OlStyleUtil.getRgbaColor(expecSymbFillCol, expecSymbFillOpac));

    expect(olStroke.getLineDash()).toEqual(expecSymb.outlineDasharray);
  });
  it('can write a OpenLayers PolygonSymbolizer with MarkSymbolizer as graphicFill', async () => {
    let { output: olStyle } = await styleParser.writeStyle(polygon_graphicfill_mark);
    olStyle = olStyle as OlStyle;
    expect(olStyle).toBeDefined();

    const olFill = olStyle.getFill();
    expect(olFill).toBeDefined();
    expect(olFill.getColor()).toBeInstanceOf(CanvasPattern);
  });
  it('can write a OpenLayers TextSymbolizer', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_styledlabel);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const testFeature = new OlFeature({name: 'GeoStyler'});
    const styles = olStyle(testFeature, 1);
    expect(styles).toHaveLength(1);

    const expecSymb = point_styledlabel.rules[0].symbolizers[0] as TextSymbolizer;

    const style: OlStyle = styles[0];

    const olText = style.getText();
    expect(olText).toBeDefined();

    const olTextStroke = olText.getStroke();
    expect(olTextStroke).toBeDefined();
    expect(olTextStroke.getColor()).toEqual(expecSymb.haloColor);
    expect(olTextStroke.getWidth()).toBeCloseTo(expecSymb.haloWidth);

    const olTextFill = olText.getFill();
    expect(olTextFill).toBeDefined();
    expect(olTextFill.getColor()).toEqual(expecSymb.color);

    const olTextFont = olText.getFont();
    expect(olTextFont).toEqual(OlStyleUtil.getTextFont(expecSymb));

    const olTextContent = olText.getText();
    expect(olTextContent).toEqual(testFeature.get('name'));

    const olTextRotation = olText.getRotation();
    expect(olTextRotation).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

    const olTextOffsetX = olText.getOffsetX();
    const olTextOffsetY = olText.getOffsetY();
    const expectedOffsetX = expecSymb.offset ? expecSymb.offset[0] : null;
    const expectedOffsetY = expecSymb.offset ? expecSymb.offset[1] : null;
    expect(olTextOffsetX).toBeCloseTo(expectedOffsetX);
    expect(olTextOffsetY).toBeCloseTo(expectedOffsetY);
  });
  it('can write an OpenLayers TextSymbolizer with static text', async () => {
    let { output: olStyle } = await styleParser.writeStyle(point_styledLabel_static);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const testFeature = new OlFeature();
    const styles = olStyle(testFeature, 1);
    expect(styles).toHaveLength(1);

    const expecSymb = point_styledLabel_static.rules[0].symbolizers[0] as TextSymbolizer;
    const expecText = expecSymb.label;
    const expecOffset = expecSymb.offset;
    const expecRotation = expecSymb.rotate * Math.PI / 180;
    // openlayers adds default font-style
    const expecFont = `Normal ${expecSymb.size}px ${expecSymb.font.join(', ')}`;

    const style = styles[0] as OlStyle;
    expect(style).toBeDefined();
    const olTextStyle = style.getText();
    expect(olTextStyle).toBeDefined();

    const olText = olTextStyle.getText();
    expect(olText).toBeDefined();
    expect(olText).toEqual(expecText);

    const olFont = olTextStyle.getFont();
    expect(olFont).toBeDefined();
    expect(olFont).toEqual(expecFont);

    const olRotation = olTextStyle.getRotation();
    expect(olRotation).toBeDefined();
    expect(olRotation).toBeCloseTo(expecRotation);

    const olOffsetX = olTextStyle.getOffsetX();
    expect(olOffsetX).toBeDefined();
    expect(olOffsetX).toBeCloseTo(expecOffset[0]);

    const olOffsetY = olTextStyle.getOffsetY();
    expect(olOffsetY).toBeDefined();
    expect(olOffsetY).toBeCloseTo(expecOffset[1]);
  });
  it('can write an OpenLayers Style from multiple symbolizers in one Rule', async () => {
    const { output: olStyles } = await styleParser.writeStyle(multi_simplefillSimpleline);
    expect(olStyles).toBeDefined();
    expect(olStyles).toHaveLength(2);

    const expecFill = multi_simplefillSimpleline.rules[0].symbolizers[0] as FillSymbolizer;
    const expecLine = multi_simplefillSimpleline.rules[0].symbolizers[1] as LineSymbolizer;

    const olFill = olStyles[0].getFill();
    expect(olFill).toBeDefined();

    expect(olFill.getColor()).toEqual(expecFill.color);

    const olLine = olStyles[1].getStroke();
    expect(olLine).toBeDefined();

    expect(olLine.getColor()).toEqual(expecLine.color);
    expect(olLine.getWidth()).toBeCloseTo(expecLine.width);
  });
  it('can write an OpenLayers Style from symbolizers in multiple Rules', async () => {
    let { output: olStyle } = await styleParser.writeStyle(multi_twoRulesSimplepoint);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const testFeature = new OlFeature();
    const styles = olStyle(testFeature, 1);
    expect(styles).toHaveLength(2);

    const expecSymb1 = multi_twoRulesSimplepoint.rules[0].symbolizers[0] as MarkSymbolizer;
    const expecSymb2 = multi_twoRulesSimplepoint.rules[1].symbolizers[0] as MarkSymbolizer;

    const olCircle1 = styles[0].getImage() as OlStyleCircle;
    expect(olCircle1).toBeDefined();
    expect(olCircle1.getRadius()).toBeCloseTo(expecSymb1.radius);
    expect(olCircle1.getFill().getColor()).toEqual(expecSymb1.color);

    const olCircle2 = styles[1].getImage() as OlStyleCircle;
    expect(olCircle2).toBeDefined();
    expect(olCircle2.getRadius()).toBeCloseTo(expecSymb2.radius);
    expect(olCircle2.getFill().getColor()).toEqual(expecSymb2.color);
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

    const styles = olStyle(dummyFeat, 1);
    expect(styles).toBeDefined();
    expect(styles).toHaveLength(1);

    const olText = styles[0].getText();
    const olTextContent = olText.getText();
    expect(typeof olTextContent).toEqual('string');
    expect(olTextContent).toEqual(dummyFeat.get('id') + '');

  });
  it('returns style if scale is within scaleDenominators', async () => {
    let { output: olStyle } = await styleParser.writeStyle(scaleDenomLine);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const withinScale: number = scaleDenomLine.rules[0].scaleDenominator.min;
    const beyondScale: number = scaleDenomLine.rules[0].scaleDenominator.max;

    const resolutionRuleOne = getResolutionForScale(withinScale, 'm');
    const resolutionRuleTwo = getResolutionForScale(beyondScale, 'm');

    const dummyFeat = new OlFeature();
    const styleWithinScale = olStyle(dummyFeat, resolutionRuleOne);
    const styleBeyondScale = olStyle(dummyFeat, resolutionRuleTwo);

    expect(styleWithinScale).toHaveLength(1);
    expect(styleBeyondScale).toHaveLength(0);
  });
  it('returns right style based on scaleDenominators', async () => {
    let { output: olStyle } = await styleParser.writeStyle(scaleDenomLineCircle);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const scaleWithinFirst: number = scaleDenomLineCircle.rules[0].scaleDenominator.min;
    const scaleWithinSecond: number = scaleDenomLineCircle.rules[1].scaleDenominator.min;
    const scaleBeyond: number = scaleDenomLineCircle.rules[1].scaleDenominator.max;

    const resolutionWithinFirst = getResolutionForScale(scaleWithinFirst, 'm');
    const resolutionWithinSecond = getResolutionForScale(scaleWithinSecond, 'm');
    const resolutionBeyond = getResolutionForScale(scaleBeyond, 'm');

    const dummyFeat = new OlFeature();
    const styleWithinFirst = olStyle(dummyFeat, resolutionWithinFirst);
    const styleWithinSecond = olStyle(dummyFeat, resolutionWithinSecond);
    const styleBeyond = olStyle(dummyFeat, resolutionBeyond);

    expect(styleWithinFirst).toHaveLength(1);
    expect(styleWithinSecond).toHaveLength(1);
    expect(styleBeyond).toHaveLength(0);

    const styleFirst: OlStyle = styleWithinFirst[0];
    const expecFirst = scaleDenomLineCircle.rules[0].symbolizers[0] as LineSymbolizer;
    const olStroke = styleFirst.getStroke();
    expect(olStroke).toBeDefined();
    expect(olStroke.getColor()).toEqual(expecFirst.color);
    expect(olStroke.getWidth()).toBeCloseTo(expecFirst.width);
    expect(olStroke.getLineDash()).toEqual(expecFirst.dasharray);

    const styleSecond: OlStyle = styleWithinSecond[0];
    const expecSecond = scaleDenomLineCircle.rules[1].symbolizers[0] as MarkSymbolizer;
    const olCircle: OlStyleCircle = styleSecond.getImage() as OlStyleCircle;
    expect(olCircle).toBeDefined();
    expect(olCircle.getRadius()).toBeCloseTo(expecSecond.radius);
    expect(olCircle.getFill().getColor()).toEqual(expecSecond.color);
  });
  it('returns styles of all rules that lie within scaleDenominator', async () => {
    let { output: olStyle } = await styleParser.writeStyle(scaleDenomLineCircleOverlap);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const scaleOnlyFirst: number = scaleDenomLineCircleOverlap.rules[0].scaleDenominator.min;
    const scaleOverlap: number = scaleDenomLineCircleOverlap.rules[1].scaleDenominator.min;
    const scaleOnlySecond: number = scaleDenomLineCircleOverlap.rules[1].scaleDenominator.max - 1;

    const resolutionOnlyFirst = getResolutionForScale(scaleOnlyFirst, 'm');
    const resolutionOverlap = getResolutionForScale(scaleOverlap, 'm');
    const resolutionOnlySecond = getResolutionForScale(scaleOnlySecond, 'm');

    const dummyFeat = new OlFeature();
    const styleOnlyFirst = olStyle(dummyFeat, resolutionOnlyFirst);
    const styleOverlap = olStyle(dummyFeat, resolutionOverlap);
    const styleOnlySecond = olStyle(dummyFeat, resolutionOnlySecond);

    expect(styleOnlyFirst).toHaveLength(1);
    expect(styleOverlap).toHaveLength(2);
    expect(styleOnlySecond).toHaveLength(1);
  });
  it('can write an OpenLayers style with a simple filter', async () => {
    let { output: olStyle } = await styleParser.writeStyle(filter_simplefilter);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const bonnFeat = new OlFeature();
    bonnFeat.set('Name', 'Bonn');
    const bonnStyle = olStyle(bonnFeat, 1);
    expect(bonnStyle).toBeDefined();
    const bonnRadius = bonnStyle[0].getImage().getRadius();
    const expecBonnSymbolizer: MarkSymbolizer = filter_simplefilter.rules[0].symbolizers[0] as MarkSymbolizer;
    expect(bonnRadius).toBeCloseTo(expecBonnSymbolizer.radius);

    const notBonnFeat = new OlFeature();
    notBonnFeat.set('Name', 'Koblenz');
    const notBonnStyle = olStyle(notBonnFeat, 1);
    expect(notBonnStyle).toBeDefined();
    const notBonnRadius = notBonnStyle[0].getImage().getRadius();
    const expecNotBonnSymbolizer: MarkSymbolizer = filter_simplefilter.rules[1].symbolizers[0] as MarkSymbolizer;
    expect(notBonnRadius).toBeCloseTo(expecNotBonnSymbolizer.radius);
  });
  it('can write an OpenLayers style with a nested filter', async () => {
    let { output: olStyle } = await styleParser.writeStyle(filter_nestedfilter);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const matchFilterFeat = new OlFeature();
    matchFilterFeat.set('state', 'germany');
    matchFilterFeat.set('population', 100000);
    matchFilterFeat.set('name', 'Dortmund');
    const matchStyle = olStyle(matchFilterFeat, 1);
    expect(matchStyle).toBeDefined();
    const matchRadius = matchStyle[0].getImage().getRadius();
    const expecMatchSymbolizer: MarkSymbolizer = filter_nestedfilter.rules[0].symbolizers[0] as MarkSymbolizer;
    expect(matchRadius).toBeCloseTo(expecMatchSymbolizer.radius);

    const noMatchFilterFeat = new OlFeature();
    noMatchFilterFeat.set('state', 'germany');
    noMatchFilterFeat.set('population', 100000);
    noMatchFilterFeat.set('name', 'Schalke');
    const noMatchStyle = olStyle(noMatchFilterFeat, 1);
    expect(noMatchStyle).toBeDefined();
    const noMatchRadius = noMatchStyle[0].getImage().getRadius();
    const expecNoMatchSymbolizer: MarkSymbolizer = filter_nestedfilter.rules[1].symbolizers[0] as MarkSymbolizer;
    expect(noMatchRadius).toBeCloseTo(expecNoMatchSymbolizer.radius);

    const noMatchFilterFeat2 = new OlFeature();
    noMatchFilterFeat2.set('state', 'germany');
    noMatchFilterFeat2.set('population', '100000');
    noMatchFilterFeat2.set('name', 'Schalke');
    const noMatchStyle2 = olStyle(noMatchFilterFeat2, 1);
    expect(noMatchStyle2).toBeDefined();
    const noMatchRadius2 = noMatchStyle2[0].getImage().getRadius();
    const expecNoMatch2Symbolizer: MarkSymbolizer = filter_nestedfilter.rules[1].symbolizers[0] as MarkSymbolizer;
    expect(noMatchRadius2).toBeCloseTo(expecNoMatch2Symbolizer.radius);
  });
  it('does neither match nor crash if filters are invalid', async () => {
    let { output: olStyle } = await styleParser.writeStyle(filter_invalidfilter);
    olStyle = olStyle as OlParserStyleFct;
    expect(olStyle).toBeDefined();

    const noMatchFilterFeat = new OlFeature();
    noMatchFilterFeat.set('state', 'germany');
    noMatchFilterFeat.set('population', 100000);
    noMatchFilterFeat.set('name', 'Schalke');
    const noMatchStyle = olStyle(noMatchFilterFeat, 1);
    expect(noMatchStyle).toBeDefined();
    const noMatchRadius = noMatchStyle[0].getImage().getRadius();
    const expecNoMatchSymbolizer: MarkSymbolizer = filter_invalidfilter.rules[1].symbolizers[0] as MarkSymbolizer;
    expect(noMatchRadius).toBeCloseTo(expecNoMatchSymbolizer.radius);
  });

  it('can write a simple polygon with just fill', async () => {
    const { output: geoStylerStyle } = await styleParser.writeStyle(polygon_simple);
    expect(geoStylerStyle).toBeDefined();
    expect(geoStylerStyle).toEqual(ol_polygon_simple);
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
          fillOpacity: {
            info: 'Use opacity instead.',
            support: 'none'
          }
        }
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

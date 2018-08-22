import OlStyle from 'ol/style/style';
import OlStyleText from 'ol/style/text';
import OlStyleFill from 'ol/style/fill';
import OlStyleCircle from 'ol/style/circle';
import OlStyleIcon from 'ol/style/icon';
import OlStyleRegularshape from 'ol/style/regularshape';
import OlFeature from 'ol/feature';
import ol from 'ol';
type OlStyleFunction = ol.StyleFunction;

import OlStyleParser from './OlStyleParser';

import point_simplepoint from '../data/styles/point_simplepoint';
import point_icon from '../data/styles/point_icon';
import point_iconFormat from '../data/styles/point_iconFormat';
import point_simplesquare from '../data/styles/point_simplesquare';
import point_simplestar from '../data/styles/point_simplestar';
import point_simpletriangle from '../data/styles/point_simpletriangle';
import point_simplecross from '../data/styles/point_simplecross';
import point_simplex from '../data/styles/point_simplex';
import line_simpleline from '../data/styles/line_simpleline';
import multi_twoRulesSimplepoint from '../data/styles/multi_twoRulesSimplepoint';
import multi_simplefillSimpleline from '../data/styles/multi_simplefillSimpleline';
import polygon_transparentpolygon from '../data/styles/polygon_transparentpolygon';
import point_styledlabel from '../data/styles/point_styledlabel';
import ol_point_simplepoint from '../data/olStyles/point_simplepoint';
import ol_point_icon from '../data/olStyles/point_icon';
import ol_point_iconFormat from '../data/olStyles/point_iconFormat';
import ol_point_simplesquare from '../data/olStyles/point_simplesquare';
import ol_point_simplestar from '../data/olStyles/point_simplestar';
import ol_point_simpletriangle from '../data/olStyles/point_simpletriangle';
import ol_point_simplecross from '../data/olStyles/point_simplecross';
import ol_point_simplex from '../data/olStyles/point_simplex';
import ol_line_simpleline from '../data/olStyles/line_simpleline';
import ol_polygon_transparentpolygon from '../data/olStyles/polygon_transparentpolygon';
import ol_multi_twoRulesSimplepoint from '../data/olStyles/multi_twoRulesSimplepoint';
import ol_multi_simplefillSimpleline from '../data/olStyles/multi_simplefillSimpleline';
import {
  CircleSymbolizer,
  LineSymbolizer,
  FillSymbolizer,
  TextSymbolizer,
  Style,
  IconSymbolizer,
  SquareSymbolizer,
  StarSymbolizer,
  TriangleSymbolizer,
  CrossSymbolizer,
  XSymbolizer
} from 'geostyler-style';

import OlStyleUtil from './Util/OlStyleUtil';
import olSimpleSquare from '../data/olStyles/point_simplesquare';
// import { style } from 'openlayers';

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
    it('can read a OpenLayers PointSymbolizer', () => {
      expect.assertions(2);
      return styleParser.readStyle([[ol_point_simplepoint]])
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(point_simplepoint);
        });
    });
    it('can read a OpenLayers IconSymbolizer', () => {
      expect.assertions(2);
      return styleParser.readStyle([[ol_point_icon]])
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(point_icon);
        });
    });
    it('can read a OpenLayers IconSymbolizer with Format', () => {
      expect.assertions(2);
      return styleParser.readStyle([[ol_point_iconFormat]])
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(point_iconFormat);
        });
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName Square', () => {
      expect.assertions(2);
      return styleParser.readStyle([[ol_point_simplesquare]])
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(point_simplesquare);
        });
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName Star', () => {
      expect.assertions(2);
      return styleParser.readStyle([[ol_point_simplestar]])
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(point_simplestar);
        });
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName Triangle', () => {
      expect.assertions(2);
      return styleParser.readStyle([[ol_point_simpletriangle]])
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(point_simpletriangle);
        });
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName Cross', () => {
      expect.assertions(2);
      return styleParser.readStyle([[ol_point_simplecross]])
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(point_simplecross);
        });
    });
    it('can read a OpenLayers MarkSymbolizer as WellKnownName X', () => {
      expect.assertions(2);
      return styleParser.readStyle([[ol_point_simplex]])
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(point_simplex);
        });
    });
    it('can read a OpenLayers LineSymbolizer', () => {
      expect.assertions(2);
      return styleParser.readStyle([[ol_line_simpleline]])
      .then((geoStylerStyle: Style) => {
        expect(geoStylerStyle).toBeDefined();
        expect(geoStylerStyle).toEqual(line_simpleline);
      });
    });
    it('can read a OpenLayers PolygonSymbolizer', () => {
      expect.assertions(2);
      return styleParser.readStyle([[ol_polygon_transparentpolygon]])
      .then((geoStylerStyle: Style) => {
        expect(geoStylerStyle).toBeDefined();
        expect(geoStylerStyle).toEqual(polygon_transparentpolygon);
      });
    });
    it('can read OpenLayers Styles in two Rules', () => {
      expect.assertions(2);
      return styleParser.readStyle(ol_multi_twoRulesSimplepoint)
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(multi_twoRulesSimplepoint);
        });
    });
    it('can read two OpenLayers Styles in one Rule', () => {
      expect.assertions(2);
      return styleParser.readStyle([ol_multi_simplefillSimpleline])
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(multi_simplefillSimpleline);
        });
    });
    // it('can read a OpenLayers TextSymbolizer', () => {
    //   expect.assertions(2);
    //   const sld = fs.readFileSync( './data/slds/point_styledlabel.sld', 'utf8');
    //   return styleParser.readStyle(sld)
    //     .then((geoStylerStyle: Style) => {
    //       expect(geoStylerStyle).toBeDefined();
    //       expect(geoStylerStyle).toEqual(point_styledlabel);
    //     });
    // });
    // it('can read a OpenLayers style with a filter', () => {
    //   expect.assertions(2);
    //   const sld = fs.readFileSync( './data/slds/point_simplepoint_filter.sld', 'utf8');
    //   return styleParser.readStyle(sld)
    //     .then((geoStylerStyle: Style) => {
    //       expect(geoStylerStyle).toBeDefined();
    //       expect(geoStylerStyle).toEqual(point_simplepoint_filter);
    //     });
    // });

    describe('#getStyleTypeFromOlStyle', () => {
      it('is defined', () => {
        expect(styleParser.getStyleTypeFromOlStyle).toBeDefined();
      });
    });

    describe('#getRulesFromOlStyle', () => {
      it('is defined', () => {
        expect(styleParser.getRulesFromOlStyle).toBeDefined();
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
        const font = '19px font-name';
        const rotation = Math.PI / 4;

        const fillOpts: ol.olx.style.FillOptions = {
          color: '#FFFF00'
        };
        const textOpts: ol.olx.style.TextOptions = {
          text: 'Peter',
          offsetX,
          offsetY,
          font,
          fill: new OlStyleFill(fillOpts),
          rotation
        };

        const styleOpts: ol.olx.style.StyleOptions = {
          text: new OlStyleText(textOpts)
        };
        const testStyle: OlStyle = new OlStyle(styleOpts);
        const result = styleParser.getTextSymbolizerFromOlStyle(testStyle);
        expect(result).toBeDefined();
        expect(result.kind).toBe('Text');
        expect(result.color).toBe('#FFFF00');
        expect(result.size).toBeCloseTo(19);
        expect(result.font).toEqual([font]);
        expect(result.offset).toHaveLength(2);
        expect(result.offset[0]).toBeCloseTo(offsetX);
        expect(result.offset[1]).toBeCloseTo(offsetY);
        expect(result.rotate).toBeCloseTo(rotation / Math.PI * 180);
      });

      it('generates correct TextSymbolizer for sophisticated fonst styles', () => {
        const font1 = 'bold 5px arial, sans-serif';
        const font2 = 'italic bold 12px/30px Georgia, serif';
        const font3 = '15px/18px "Neue Helvetica", Helvetica, sans-serif';

        const expectedFontSizes = [5, 12, 15];

        const fillOpts: ol.olx.style.FillOptions = {
          color: '#FFFF00'
        };

        [font1, font2, font3].forEach((font: string, idx: number) => {
          const textOpts: ol.olx.style.TextOptions = {
            text: 'Peter',
            font,
            fill: new OlStyleFill(fillOpts)
          };

          const styleOpts: ol.olx.style.StyleOptions = {
            text: new OlStyleText(textOpts)
          };
          const testStyle: OlStyle = new OlStyle(styleOpts);
          const result = styleParser.getTextSymbolizerFromOlStyle(testStyle);
          expect(result).toBeDefined();
          expect(result.kind).toBe('Text');
          expect(result.color).toBe('#FFFF00');
          expect(result.size).toBe(expectedFontSizes[idx]);
          expect(result.font).toEqual([font]);
        });
      });
    });
  });

  describe('#writeStyle', () => {
    it('is defined', () => {
      expect(styleParser.writeStyle).toBeDefined();
    });
    it('can write a OpenLayers PointSymbolizer', () => {
      expect.assertions(4);
      return styleParser.writeStyle(point_simplepoint)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_simplepoint.rules[0].symbolizers[0] as CircleSymbolizer;
          const olCircle: OlStyleCircle = olStyles[0][0].getImage() as OlStyleCircle;

          expect(olCircle).toBeDefined();
          expect(olCircle.getRadius()).toBeCloseTo(expecSymb.radius);
          expect(olCircle.getFill().getColor()).toEqual(expecSymb.color);
        });
    });
    it('can write a OpenLayers IconSymbolizer', () => {
      expect.assertions(6);
      return styleParser.writeStyle(point_icon)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_icon.rules[0].symbolizers[0] as IconSymbolizer;
          const olIcon: OlStyleIcon = olStyles[0][0].getImage() as OlStyleIcon;

          expect(olIcon.getSrc()).toEqual(expecSymb.image);
          expect(olIcon.getScale()).toBeCloseTo(expecSymb.size);
          // Rotation in openlayers is radians while we use degree
          expect(olIcon.getRotation()).toBeCloseTo(expecSymb.rotate! * Math.PI / 180);
          expect(olIcon.getOpacity()).toBeCloseTo(expecSymb.opacity);

          expect(olIcon).toBeDefined();
        });
    });
    it('can write a OpenLayers IconSymbolizer with Format', () => {
      expect.assertions(7);
      return styleParser.writeStyle(point_iconFormat)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_iconFormat.rules[0].symbolizers[0] as IconSymbolizer;
          const olIcon: OlStyleIcon = olStyles[0][0].getImage() as OlStyleIcon;

          expect(olIcon.getSrc()).toEqual(expecSymb.image);
          expect(`image/${olIcon.getSrc().split('.').pop()}+xml`).toEqual('image/svg+xml');
          expect(olIcon.getScale()).toBeCloseTo(expecSymb.size);
          // Rotation in openlayers is radians while we use degree
          expect(olIcon.getRotation()).toBeCloseTo(expecSymb.rotate! * Math.PI / 180);
          expect(olIcon.getOpacity()).toBeCloseTo(expecSymb.opacity);

          expect(olIcon).toBeDefined();
        });
    });
    it('can write a OpenLayers RegularShape square', () => {
      expect.assertions(8);
      return styleParser.writeStyle(point_simplesquare)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_simplesquare.rules[0].symbolizers[0] as SquareSymbolizer;
          const olSquare: OlStyleRegularshape = olStyles[0][0].getImage() as OlStyleRegularshape;
          expect(olSquare).toBeDefined();

          expect(olSquare.getPoints()).toBeCloseTo(expecSymb.points);
          expect(olSquare.getRadius()).toBeCloseTo(expecSymb.radius);
          expect(olSquare.getAngle()).toBeCloseTo(expecSymb.angle * Math.PI / 180);
          expect(olSquare.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

          const olSquareFill: OlStyleFill = olSquare.getFill();
          expect(olSquareFill).toBeDefined();
          expect(olSquareFill.getColor()).toEqual(expecSymb.color);
        });
    });
    it('can write a OpenLayers RegularShape star', () => {
      expect.assertions(9);
      return styleParser.writeStyle(point_simplestar)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_simplestar.rules[0].symbolizers[0] as StarSymbolizer;
          const olStar: OlStyleRegularshape = olStyles[0][0].getImage() as OlStyleRegularshape;
          expect(olStar).toBeDefined();

          expect(olStar.getPoints()).toBeCloseTo(expecSymb.points);
          expect(olStar.getRadius()).toBeCloseTo(expecSymb.radius);
          expect(olStar.getRadius2()).toBeCloseTo(expecSymb.radius2);
          expect(olStar.getAngle()).toBeCloseTo(expecSymb.angle * Math.PI / 180);
          expect(olStar.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

          const olStarFill: OlStyleFill = olStar.getFill();
          expect(olStarFill).toBeDefined();
          expect(olStarFill.getColor()).toEqual(expecSymb.color);
        });
    });
    it('can write a OpenLayers RegularShape triangle', () => {
      expect.assertions(8);
      return styleParser.writeStyle(point_simpletriangle)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_simpletriangle.rules[0].symbolizers[0] as TriangleSymbolizer;
          const olTriangle: OlStyleRegularshape = olStyles[0][0].getImage() as OlStyleRegularshape;
          expect(olTriangle).toBeDefined();

          expect(olTriangle.getPoints()).toBeCloseTo(expecSymb.points);
          expect(olTriangle.getRadius()).toBeCloseTo(expecSymb.radius);
          expect(olTriangle.getAngle()).toBeCloseTo(expecSymb.angle * Math.PI / 180);
          expect(olTriangle.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

          const olTriangleFill: OlStyleFill = olTriangle.getFill();
          expect(olTriangleFill).toBeDefined();
          expect(olTriangleFill.getColor()).toEqual(expecSymb.color);
        });
    });
    it('can write a OpenLayers RegularShape cross', () => {
      expect.assertions(9);
      return styleParser.writeStyle(point_simplecross)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_simplecross.rules[0].symbolizers[0] as CrossSymbolizer;
          const olCross: OlStyleRegularshape = olStyles[0][0].getImage() as OlStyleRegularshape;
          expect(olCross).toBeDefined();

          expect(olCross.getPoints()).toBeCloseTo(expecSymb.points);
          expect(olCross.getRadius()).toBeCloseTo(expecSymb.radius);
          expect(olCross.getRadius2()).toBeCloseTo(expecSymb.radius2);
          expect(olCross.getAngle()).toBeCloseTo(expecSymb.angle * Math.PI / 180);
          expect(olCross.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

          const olCrossFill: OlStyleFill = olCross.getFill();
          expect(olCrossFill).toBeDefined();
          expect(olCrossFill.getColor()).toEqual(expecSymb.color);
        });
    });
    it('can write a OpenLayers RegularShape x', () => {
      expect.assertions(9);
      return styleParser.writeStyle(point_simplex)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_simplex.rules[0].symbolizers[0] as XSymbolizer;
          const olX: OlStyleRegularshape = olStyles[0][0].getImage() as OlStyleRegularshape;
          expect(olX).toBeDefined();

          expect(olX.getPoints()).toBeCloseTo(expecSymb.points);
          expect(olX.getRadius()).toBeCloseTo(expecSymb.radius);
          expect(olX.getRadius2()).toBeCloseTo(expecSymb.radius2);
          expect(olX.getAngle()).toBeCloseTo(expecSymb.angle * Math.PI / 180);
          expect(olX.getRotation()).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

          const olXFill: OlStyleFill = olX.getFill();
          expect(olXFill).toBeDefined();
          expect(olXFill.getColor()).toEqual(expecSymb.color);
        });
    });
    it('can write a OpenLayers LineSymbolizer', () => {
      expect.assertions(5);
      return styleParser.writeStyle(line_simpleline)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = line_simpleline.rules[0].symbolizers[0] as LineSymbolizer;
          const olStroke = olStyles[0][0].getStroke();

          expect(olStroke).toBeDefined();
          expect(olStroke.getColor()).toEqual(expecSymb.color);
          expect(olStroke.getWidth()).toBeCloseTo(expecSymb.width);
          expect(olStroke.getLineDash()).toEqual(expecSymb.dasharray);
        });
    });
    it('can write a OpenLayers PolygonSymbolizer', () => {
      expect.assertions(5);
      return styleParser.writeStyle(polygon_transparentpolygon)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = polygon_transparentpolygon.rules[0].symbolizers[0] as FillSymbolizer;
          const olStroke = olStyles[0][0].getStroke();

          expect(olStroke).toBeDefined();
          expect(olStroke.getColor()).toEqual(expecSymb.outlineColor);

          const olFill = olStyles[0][0].getFill();
          expect(olFill).toBeDefined();
          const expecSymbCol: string = expecSymb.color as string;
          const expecSymbOpac: number = expecSymb.opacity as number;
          expect(olFill.getColor()).toEqual(OlStyleUtil.getRgbaColor(expecSymbCol, expecSymbOpac));
        });
    });
    it('can write a OpenLayers TextSymbolizer', () => {
      expect.assertions(13);
      return styleParser.writeStyle(point_styledlabel)
        .then((olStyles: OlStyle[][] | OlStyleFunction[]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_styledlabel.rules[0].symbolizers[0] as TextSymbolizer;

          const dummyFeat = new OlFeature({
            name: 'GeoStyler'
          });
          const olStyleFn = olStyles[0][0] as OlStyleFunction;
          expect(olStyleFn).toBeDefined();
          // execute the returned StyleFunction and get the underlying OL style object
          const olStyle: OlStyle = olStyleFn(dummyFeat, 1) as OlStyle;

          const olText = olStyle.getText();
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
          expect(olTextContent).toEqual(dummyFeat.get('name'));

          const olTextRotation = olText.getRotation();
          expect(olTextRotation).toBeCloseTo(expecSymb.rotate * Math.PI / 180);

          const olTextOffsetX = olText.getOffsetX();
          const olTextOffsetY = olText.getOffsetY();
          const expectedOffsetX = expecSymb.offset ? expecSymb.offset[0] : null;
          const expectedOffsetY = expecSymb.offset ? expecSymb.offset[1] : null;
          expect(olTextOffsetX).toBeCloseTo(expectedOffsetX);
          expect(olTextOffsetY).toBeCloseTo(expectedOffsetY);
        });
    });
    it('can write an OpenLayers Style from multiple symbolizers in one Rule', () => {
      expect.assertions(6);
      return styleParser.writeStyle(multi_simplefillSimpleline)
        .then((olStyles: OlStyle[][]) => {
          expect(olStyles).toBeDefined();

          const expecFill = multi_simplefillSimpleline.rules[0].symbolizers[0] as FillSymbolizer;
          const expecLine = multi_simplefillSimpleline.rules[0].symbolizers[1] as LineSymbolizer;

          const olFill = olStyles[0][0].getFill();
          expect(olFill).toBeDefined();

          expect(olFill.getColor()).toEqual(expecFill.color);

          const olLine = olStyles[0][1].getStroke();
          expect(olLine).toBeDefined();

          expect(olLine.getColor()).toEqual(expecLine.color);
          expect(olLine.getWidth()).toBeCloseTo(expecLine.width);
        });
    });
    it('can write an OpenLayers Style from symbolizers in multiple Rules', () => {
      expect.assertions(7);
      return styleParser.writeStyle(multi_twoRulesSimplepoint)
        .then((olStyles: OlStyle[][] | OlStyleFunction[]) => {
          expect(olStyles).toBeDefined();

          const expecSymb1 = multi_twoRulesSimplepoint.rules[0].symbolizers[0] as CircleSymbolizer;
          const expecSymb2 = multi_twoRulesSimplepoint.rules[1].symbolizers[0] as CircleSymbolizer;
          
          const olCircle1 = olStyles[0][0].getImage() as OlStyleCircle;
          expect(olCircle1).toBeDefined();
          expect(olCircle1.getRadius()).toBeCloseTo(expecSymb1.radius);
          expect(olCircle1.getFill().getColor()).toEqual(expecSymb1.color);

          const olCircle2 = olStyles[1][0].getImage() as OlStyleCircle;
          expect(olCircle2).toBeDefined();
          expect(olCircle2.getRadius()).toBeCloseTo(expecSymb2.radius);
          expect(olCircle2.getFill().getColor()).toEqual(expecSymb2.color);
        });
    });
    it('transforms labels values based on fields to string ', () => {
      expect.assertions(4);
      // change the field as base for the label text to a numeric one
      const inSymb = point_styledlabel.rules[0].symbolizers[0] as TextSymbolizer;
      inSymb.field = 'id';
      return styleParser.writeStyle(point_styledlabel)
        .then((olStyles: OlStyle[][] | OlStyleFunction[]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_styledlabel.rules[0].symbolizers[0] as TextSymbolizer;

          const dummyFeat = new OlFeature({
            id: 1
          });
          const olStyleFn = olStyles[0][0] as OlStyleFunction;
          expect(olStyleFn).toBeDefined();
          // execute the returned StyleFunction and get the underlying OL style object
          const olStyle: OlStyle = olStyleFn(dummyFeat, 1) as OlStyle;

          const olText = olStyle.getText();
          const olTextContent = olText.getText();
          expect(typeof olTextContent).toEqual('string');
          expect(olTextContent).toEqual(dummyFeat.get('id') + '');

        });
    });
    // it('can write a OpenLayers style with a filter', () => {
    //   expect.assertions(2);
    //   return styleParser.writeStyle(point_simplepoint_filter)
    //     .then((sldString: string) => {
    //       expect(sldString).toBeDefined();
    //       // As string comparison between to XML-Strings is awkward and nonesens
    //       // we read it again and compare the json input with the parser output
    //       return styleParser.readStyle(sldString)
    //         .then(readStyle => {
    //           expect(readStyle).toEqual(point_simplepoint_filter);
    //         });
    //     });
    // });

    describe('#getRulesFromOlStyle', () => {
      it('is defined', () => {
        expect(styleParser.getRulesFromOlStyle).toBeDefined();
      });
    });

    describe('#getOlSymbolizerFromSymbolizer', () => {
      it('is defined', () => {
        expect(styleParser.getOlSymbolizerFromSymbolizer).toBeDefined();
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

    describe('#getOlPointSymbolizerFromCircleSymbolizer', () => {
      it('is defined', () => {
        expect(styleParser.getOlPointSymbolizerFromMarkSymbolizer).toBeDefined();
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

});

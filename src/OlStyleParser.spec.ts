import * as ol from 'openlayers';

import OlStyleParser from './OlStyleParser';

import point_simplepoint from '../data/styles/point_simplepoint';
import point_icon from '../data/styles/point_icon';
import line_simpleline from '../data/styles/line_simpleline';
import polygon_transparentpolygon from '../data/styles/polygon_transparentpolygon';
import point_styledlabel from '../data/styles/point_styledlabel';
import ol_point_simplepoint from '../data/olStyles/point_simplepoint';
import ol_point_icon from '../data/olStyles/point_icon';
import ol_line_simpleline from '../data/olStyles/line_simpleline';
import ol_polygon_transparentpolygon from '../data/olStyles/polygon_transparentpolygon';
import {
  CircleSymbolizer,
  LineSymbolizer,
  FillSymbolizer,
  TextSymbolizer,
  Style,
  IconSymbolizer
} from 'geostyler-style';

import OlStyleUtil from './Util/OlStyleUtil';

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
      return styleParser.readStyle(ol_point_simplepoint)
        .then((geoStylerStyle: Style) => {
          expect(geoStylerStyle).toBeDefined();
          expect(geoStylerStyle).toEqual(point_simplepoint);
        });
    });
    it('can read a OpenLayers LineSymbolizer', () => {
      expect.assertions(2);
      return styleParser.readStyle(ol_line_simpleline)
      .then((geoStylerStyle: Style) => {
        expect(geoStylerStyle).toBeDefined();
        expect(geoStylerStyle).toEqual(line_simpleline);
      });
    });
    it('can read a OpenLayers PolygonSymbolizer', () => {
      expect.assertions(2);
      return styleParser.readStyle(ol_polygon_transparentpolygon)
      .then((geoStylerStyle: Style) => {
        expect(geoStylerStyle).toBeDefined();
        expect(geoStylerStyle).toEqual(polygon_transparentpolygon);
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

    describe('#getSymbolizerFromOlStyle', () => {
      it('is defined', () => {
        expect(styleParser.getSymbolizerFromOlStyle).toBeDefined();
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

    // describe('#getTextSymbolizerFromOlSymbolizer', () => {
    //   it('is defined', () => {
    //     expect(styleParser.getTextSymbolizerFromOlSymbolizer).toBeDefined();
    //   });
    // });
  });

  describe('#writeStyle', () => {
    it('is defined', () => {
      expect(styleParser.writeStyle).toBeDefined();
    });
    it('can write a OpenLayers PointSymbolizer', () => {
      expect.assertions(4);
      return styleParser.writeStyle(point_simplepoint)
        .then((olStyles: ol.style.Style[]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_simplepoint.rules[0].symbolizer as CircleSymbolizer;
          const olCircle: ol.style.Circle = olStyles[0].getImage() as ol.style.Circle;

          expect(olCircle).toBeDefined();
          expect(olCircle.getRadius()).toEqual(expecSymb.radius);
          expect(olCircle.getFill().getColor()).toEqual(expecSymb.color);
        });
    });
    it('can write a OpenLayers IconSymbolizer', () => {
      expect.assertions(6);
      return styleParser.writeStyle(point_icon)
        .then((olStyles: ol.style.Style[]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_icon.rules[0].symbolizer as IconSymbolizer;
          const olIcon: ol.style.Icon = olStyles[0].getImage() as ol.style.Icon;

          expect(olIcon.getSrc()).toEqual(expecSymb.image);
          expect(olIcon.getScale()).toEqual(expecSymb.size);
          // Rotation in openlayers is radians while we use degree
          expect(olIcon.getRotation()).toEqual(expecSymb.rotate * Math.PI / 180);
          expect(olIcon.getOpacity()).toEqual(expecSymb.opacity);

          expect(olIcon).toBeDefined();
        });
    });
    it('can write a OpenLayers LineSymbolizer', () => {
      expect.assertions(5);
      return styleParser.writeStyle(line_simpleline)
        .then((olStyles: ol.style.Style[]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = line_simpleline.rules[0].symbolizer as LineSymbolizer;
          const olStroke = olStyles[0].getStroke();

          expect(olStroke).toBeDefined();
          expect(olStroke.getColor()).toEqual(expecSymb.color);
          expect(olStroke.getWidth()).toEqual(expecSymb.width);
          expect(olStroke.getLineDash()).toEqual(expecSymb.dasharray);
        });
    });
    it('can write a OpenLayers PolygonSymbolizer', () => {
      expect.assertions(5);
      return styleParser.writeStyle(polygon_transparentpolygon)
        .then((olStyles: ol.style.Style[]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = polygon_transparentpolygon.rules[0].symbolizer as FillSymbolizer;
          const olStroke = olStyles[0].getStroke();

          expect(olStroke).toBeDefined();
          expect(olStroke.getColor()).toEqual(expecSymb.outlineColor);

          const olFill = olStyles[0].getFill();
          expect(olFill).toBeDefined();
          const expecSymbCol: string = expecSymb.color as string;
          const expecSymbOpac: number = expecSymb.opacity as number;
          expect(olFill.getColor()).toEqual(OlStyleUtil.getRgbaColor(expecSymbCol, expecSymbOpac));
        });
    });
    it('can write a OpenLayers TextSymbolizer', () => {
      expect.assertions(11);
      return styleParser.writeStyle(point_styledlabel)
        .then((olStyles: ol.style.Style[] | ol.StyleFunction[]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_styledlabel.rules[0].symbolizer as TextSymbolizer;

          const dummyFeat = new ol.Feature({
            name: 'GeoStyler'
          });
          const olStyleFn = olStyles[0] as ol.StyleFunction;
          expect(olStyleFn).toBeDefined();
          // execute the returned StyleFunction and get the underlying OL style object
          const olStyle: ol.style.Style = olStyleFn(dummyFeat, 1) as ol.style.Style;

          const olText = olStyle.getText();
          expect(olText).toBeDefined();

          const olTextStroke = olText.getStroke();
          expect(olTextStroke).toBeDefined();
          expect(olTextStroke.getColor()).toEqual(expecSymb.color);

          const olTextFill = olText.getFill();
          expect(olTextFill).toBeDefined();
          expect(olTextFill.getColor()).toEqual(expecSymb.color);

          const olTextFont = olText.getFont();
          expect(olTextFont).toEqual(OlStyleUtil.getTextFont(expecSymb));

          const olTextContent = olText.getText();
          expect(olTextContent).toEqual(dummyFeat.get('name'));

          const olTextOffsetX = olText.getOffsetX();
          const olTextOffsetY = olText.getOffsetY();
          const expectedOffsetX = expecSymb.offset ? expecSymb.offset[0] : null;
          const expectedOffsetY = expecSymb.offset ? expecSymb.offset[1] : null;
          expect(olTextOffsetX).toEqual(expectedOffsetX);
          expect(olTextOffsetY).toEqual(expectedOffsetY);
        });
    });
    it('transforms labels values based on fields to string ', () => {
      expect.assertions(4);
      // change the field as base for the label text to a numeric one
      const inSymb = point_styledlabel.rules[0].symbolizer as TextSymbolizer;
      inSymb.field = 'id';
      return styleParser.writeStyle(point_styledlabel)
        .then((olStyles: ol.style.Style[] | ol.StyleFunction[]) => {
          expect(olStyles).toBeDefined();

          const expecSymb = point_styledlabel.rules[0].symbolizer as TextSymbolizer;

          const dummyFeat = new ol.Feature({
            id: 1
          });
          const olStyleFn = olStyles[0] as ol.StyleFunction;
          expect(olStyleFn).toBeDefined();
          // execute the returned StyleFunction and get the underlying OL style object
          const olStyle: ol.style.Style = olStyleFn(dummyFeat, 1) as ol.style.Style;

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
        expect(styleParser.getOlPointSymbolizerFromCircleSymbolizer).toBeDefined();
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

import OlStyleParser from './OlStyleParser';

it('SldStyleParser is defined', () => {
  expect(OlStyleParser).toBeDefined();
});

describe('SldStyleParser implements StyleParser', () => {
  let styleParser: OlStyleParser;

  beforeEach(() => {
    styleParser = new OlStyleParser();
  });

  describe('#readStyle', () => {
    it('is defined', () => {
      expect(styleParser.readStyle).toBeDefined();
    });
    it('can read a OpenLayers PointSymbolizer', () => {
      // expect.assertions(2);
      // const sld = fs.readFileSync( './data/slds/point_simplepoint.sld', 'utf8');
      // return styleParser.readStyle(sld)
      //   .then((geoStylerStyle: Style) => {
      //     expect(geoStylerStyle).toBeDefined();
      //     expect(geoStylerStyle).toEqual(point_simplepoint);
      //   });
    });
    it('can read a OpenLayers LineSymbolizer', () => {
      // expect.assertions(2);
      // const sld = fs.readFileSync( './data/slds/line_simpleline.sld', 'utf8');
      // return styleParser.readStyle(sld)
      // .then((geoStylerStyle: Style) => {
      //   expect(geoStylerStyle).toBeDefined();
      //   expect(geoStylerStyle).toEqual(line_simpleline);
      // });
    });
    it('can read a OpenLayers PolygonSymbolizer', () => {
      // expect.assertions(2);
      // const sld = fs.readFileSync( './data/slds/polygon_transparentpolygon.sld', 'utf8');
      // return styleParser.readStyle(sld)
      // .then((geoStylerStyle: Style) => {
      //   expect(geoStylerStyle).toBeDefined();
      //   expect(geoStylerStyle).toEqual(polygon_transparentpolygon);
      //   });
    });
    it('can read a OpenLayers TextSymbolizer', () => {
      // expect.assertions(2);
      // const sld = fs.readFileSync( './data/slds/point_styledlabel.sld', 'utf8');
      // return styleParser.readStyle(sld)
      //   .then((geoStylerStyle: Style) => {
      //     expect(geoStylerStyle).toBeDefined();
      //     expect(geoStylerStyle).toEqual(point_styledlabel);
      //   });
    });
    it('can read a OpenLayers style with a filter', () => {
      // expect.assertions(2);
      // const sld = fs.readFileSync( './data/slds/point_simplepoint_filter.sld', 'utf8');
      // return styleParser.readStyle(sld)
      //   .then((geoStylerStyle: Style) => {
      //     expect(geoStylerStyle).toBeDefined();
      //     expect(geoStylerStyle).toEqual(point_simplepoint_filter);
      //   });
    });

    describe('#getStyleTypeFromOlStyle', () => {
      it('is defined', () => {
        // expect(styleParser.getStyleTypeFromOlStyle).toBeDefined();
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

    // describe('#getPointSymbolizerFromSldSymbolizer', () => {
    //   it('is defined', () => {
    //     expect(styleParser.getPointSymbolizerFromSldSymbolizer).toBeDefined();
    //   });
    // });

    describe('#getLineSymbolizerFromOlSymbolizer', () => {
      // it('is defined', () => {
      //   expect(styleParser.getLineSymbolizerFromOlSymbolizer).toBeDefined();
      // });
    });

    describe('#getFillSymbolizerFromOlSymbolizer', () => {
      // it('is defined', () => {
      //   expect(styleParser.getFillSymbolizerFromSldSymbolizer).toBeDefined();
      // });
    });

    describe('#getTextSymbolizerFromOlSymbolizer', () => {
      // it('is defined', () => {
      //   expect(styleParser.getTextSymbolizerFromOlSymbolizer).toBeDefined();
      // });
    });

    // describe('#getSymbolizerFromRule', () => {
    //   it('is defined', () => {
    //     expect(styleParser.getSymbolizerFromRule).toBeDefined();
    //   });
    // });

    // describe('#getRulesFromSldObject', () => {
    //   it('is defined', () => {
    //     expect(styleParser.getRulesFromSldObject).toBeDefined();
    //   });
    // });

    describe('#olObjectToGeoStylerStyle', () => {
      // it('is defined', () => {
      //   expect(styleParser.olObjectToGeoStylerStyle).toBeDefined();
      // });
    });
  });

  describe('#writeStyle', () => {
    it('is defined', () => {
      expect(styleParser.writeStyle).toBeDefined();
    });
    it('can write a OpenLayers PointSymbolizer', () => {
      // expect.assertions(2);
      // return styleParser.writeStyle(point_simplepoint)
      //   .then((sldString: string) => {
      //     expect(sldString).toBeDefined();
      //     // As string comparison between to XML-Strings is awkward and nonesens
      //     // we read it again and compare the json input with the parser output
      //     return styleParser.readStyle(sldString)
      //       .then(readStyle => {
      //         expect(readStyle).toEqual(point_simplepoint);
      //       });
      //   });
    });
    it('can write a OpenLayers LineSymbolizer', () => {
      // expect.assertions(2);
      // return styleParser.writeStyle(line_simpleline)
      //   .then((sldString: string) => {
      //     expect(sldString).toBeDefined();
      //     // As string comparison between to XML-Strings is awkward and nonesens
      //     // we read it again and compare the json input with the parser output
      //     return styleParser.readStyle(sldString)
      //       .then(readStyle => {
      //         expect(readStyle).toEqual(line_simpleline);
      //       });
      //   });
    });
    it('can write a OpenLayers PolygonSymbolizer', () => {
      // expect.assertions(2);
      // return styleParser.writeStyle(polygon_transparentpolygon)
      //   .then((sldString: string) => {
      //     expect(sldString).toBeDefined();
      //     // As string comparison between to XML-Strings is awkward and nonesens
      //     // we read it again and compare the json input with the parser output
      //     return styleParser.readStyle(sldString)
      //       .then(readStyle => {
      //         expect(readStyle).toEqual(polygon_transparentpolygon);
      //       });
      //   });
    });
    it('can write a OpenLayers TextSymbolizer', () => {
      // expect.assertions(2);
      // return styleParser.writeStyle(point_styledlabel)
      //   .then((sldString: string) => {
      //     expect(sldString).toBeDefined();
      //     // As string comparison between to XML-Strings is awkward and nonesens
      //     // we read it again and compare the json input with the parser output
      //     return styleParser.readStyle(sldString)
      //       .then(readStyle => {
      //         expect(readStyle).toEqual(point_styledlabel);
      //       });
      //   });
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

    describe('#geoStylerStyleToOlObject', () => {
      // it('is defined', () => {
      //   expect(styleParser.geoStylerStyleToOlObject).toBeDefined();
      // });
    });

    // describe('#getSldRulesFromRules', () => {
    //   it('is defined', () => {
    //     expect(styleParser.getSldRulesFromRules).toBeDefined();
    //   });
    // });

    describe('#getOlSymbolizerFromSymbolizer', () => {
      // it('is defined', () => {
      //   expect(styleParser.getOlSymbolizerFromSymbolizer).toBeDefined();
      // });
    });

    describe('#getOlTextSymbolizerFromTextSymbolizer', () => {
      // it('is defined', () => {
      //   expect(styleParser.getOlTextSymbolizerFromTextSymbolizer).toBeDefined();
      // });
    });

    describe('#getOlPolygonSymbolizerFromFillSymbolizer', () => {
      // it('is defined', () => {
      //   expect(styleParser.getOlPolygonSymbolizerFromFillSymbolizer).toBeDefined();
      // });
    });

    describe('#getOlLineSymbolizerFromLineSymbolizer', () => {
      // it('is defined', () => {
      //   expect(styleParser.getOlLineSymbolizerFromLineSymbolizer).toBeDefined();
      // });
    });

    describe('#getOlPointSymbolizerFromCircleSymbolizer', () => {
      // it('is defined', () => {
      //   expect(styleParser.getOlPointSymbolizerFromCircleSymbolizer).toBeDefined();
      // });
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

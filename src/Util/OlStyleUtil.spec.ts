import OlStyleUtil, { DUMMY_MARK_SYMBOLIZER_FONT } from './OlStyleUtil';
import OlFeature from 'ol/Feature';
import OlGeomPoint from 'ol/geom/Point';
import { MarkSymbolizer, TextSymbolizer } from 'geostyler-style';

describe('OlStyleUtil', () => {

  it('OlStyleUtil is defined', () => {
    expect(OlStyleUtil).toBeDefined();
  });

  describe('#getRgbaColor', () => {
    it('is defined', () => {
      expect(OlStyleUtil.getRgbaColor).toBeDefined();
    });

    it('transforms correctly', () => {
      const rgba = OlStyleUtil.getRgbaColor('#808a08', 0.5);
      expect(rgba).toEqual('rgba(128, 138, 8, 0.5)');
    });

    it('doesn\'t transform rgba color', () => {
      const testString = 'rgba(248, 231, 28, 1)';
      const rgba = OlStyleUtil.getRgbaColor(testString, 0.9);
      expect(rgba).toEqual(testString);
    });

    it('returns undefined of no valid HEX string passed to function', () => {
      const rgba = OlStyleUtil.getRgbaColor('THIS IS NOT A COLOR STRING', 0.9);
      expect(rgba).toBeUndefined();
    });
  });

  describe('#splitRgbaColor', () => {
    it('is defined', () => {
      expect(OlStyleUtil.splitRgbaColor).toBeDefined();
    });

    it('transforms correctly', () => {
      const splitted = OlStyleUtil.splitRgbaColor('rgba(128, 138, 8, 0.5)');
      expect(splitted).toEqual([128, 138, 8, 0.5]);
    });
  });

  describe('#getHexColor', () => {
    it('is defined', () => {
      expect(OlStyleUtil.getHexColor).toBeDefined();
    });

    it('transforms rgb correctly', () => {
      const hex = OlStyleUtil.getHexColor('rgb(128, 138, 8)');
      expect(hex).toEqual('#808a08');
    });
    it('transforms rgba correctly', () => {
      const hex = OlStyleUtil.getHexColor('rgba(128, 138, 8, 0.5)');
      expect(hex).toEqual('#808a08');
    });
    it('returns given hex untransformed', () => {
      const hex = OlStyleUtil.getHexColor('#808a08');
      expect(hex).toEqual('#808a08');
    });
  });

  describe('#getOpacity', () => {
    it('is defined', () => {
      expect(OlStyleUtil.getOpacity).toBeDefined();
    });

    it('returns correct opacity', () => {
      const opac = OlStyleUtil.getOpacity('rgba(128, 138, 8, 0.5)');
      expect(opac).toEqual(0.5);
    });
    it('returns undefined when input is incorrect', () => {
      const opac = OlStyleUtil.getOpacity('rgb(128, 138, 8)');
      expect(opac).toBeUndefined();
    });
  });

  describe('#getTextFont', () => {
    it('is defined', () => {
      expect(OlStyleUtil.getTextFont).toBeDefined();
    });

    it('returns correct font', () => {
      const symb: TextSymbolizer = {
        kind: 'Text',
        color: '#000000',
        label: 'name',
        font: ['Arial'],
        size: 12,
        offset: [0, 5]
      };
      const opac = OlStyleUtil.getTextFont(symb);
      expect(opac).toEqual('Normal 12px Arial');
    });
  });

  describe('#getIsFontGlyphBased', () => {
    it('is defined', () => {
      expect(OlStyleUtil.getIsFontGlyphBased).toBeDefined();
    });

    it('returns false if wellknownname is not based on a font glyph', () => {
      const symb: MarkSymbolizer = {
        kind: 'Mark',
        color: '#000000',
        wellKnownName: 'shape://backslash'
      };
      const isGlyph = OlStyleUtil.getIsFontGlyphBased(symb);
      expect(isGlyph).toEqual(false);
    });

    it('returns true if wellknownname is based on a font glyph', () => {
      const symb: MarkSymbolizer = {
        kind: 'Mark',
        color: '#000000',
        wellKnownName: 'ttf://Webdings#0x0064'
      };
      const isGlyph = OlStyleUtil.getIsFontGlyphBased(symb);
      expect(isGlyph).toEqual(true);
    });
  });

  describe('#getIsMarkSymbolizerFont', () => {
    it('is defined', () => {
      expect(OlStyleUtil.getIsMarkSymbolizerFont).toBeDefined();
    });

    it('returns false if the font was not intended for a mark symbolizer', () => {
      const font = '12px \'Arial Black\'';
      const isMark = OlStyleUtil.getIsMarkSymbolizerFont(font);
      expect(isMark).toEqual(false);
    });

    it('returns true if the font was intended for a mark symbolizer', () => {
      const font = `Normal 12px 'Arial Black', ${DUMMY_MARK_SYMBOLIZER_FONT}`;
      const isMark = OlStyleUtil.getIsMarkSymbolizerFont(font);
      expect(isMark).toEqual(true);
    });
  });

  describe('#getTextFontForMarkSymbolizer', () => {
    it('is defined', () => {
      expect(OlStyleUtil.getTextFontForMarkSymbolizer).toBeDefined();
    });

    it('returns correct font', () => {
      const symb: MarkSymbolizer = {
        kind: 'Mark',
        color: '#000000',
        radius: 10,
        wellKnownName: 'ttf://Arial Black#0x0064'
      };
      const font = OlStyleUtil.getTextFontForMarkSymbolizer(symb);
      expect(font).toEqual(`Normal 10px 'Arial Black', ${DUMMY_MARK_SYMBOLIZER_FONT}`);
    });

    it('returns correct font (with default size)', () => {
      const symb: MarkSymbolizer = {
        kind: 'Mark',
        color: '#000000',
        wellKnownName: 'ttf://Arial Black#0x0064'
      };
      const font = OlStyleUtil.getTextFontForMarkSymbolizer(symb);
      expect(font).toEqual(`Normal 5px 'Arial Black', ${DUMMY_MARK_SYMBOLIZER_FONT}`);
    });
  });

  describe('#getCharacterForMarkSymbolizer', () => {
    it('is defined', () => {
      expect(OlStyleUtil.getCharacterForMarkSymbolizer).toBeDefined();
    });

    it('returns correct character', () => {
      const symb: MarkSymbolizer = {
        kind: 'Mark',
        color: '#000000',
        wellKnownName: 'ttf://Arial Black#0x0064'
      };
      const char = OlStyleUtil.getCharacterForMarkSymbolizer(symb);
      expect(char).toEqual('d');
    });
  });

  describe('#getFontNameFromOlFont', () => {
    it('is defined', () => {
      expect(OlStyleUtil.getFontNameFromOlFont).toBeDefined();
    });

    it('returns correct font name (1)', () => {
      const name = OlStyleUtil.getFontNameFromOlFont(`Normal 13px 'Arial Sans', sans-serif`);
      expect(name).toEqual('Arial Sans');
    });

    it('returns correct font name (2)', () => {
      const name = OlStyleUtil.getFontNameFromOlFont(`10px Arial`);
      expect(name).toEqual('Arial');
    });

    it('returns correct font name (3)', () => {
      const name = OlStyleUtil.getFontNameFromOlFont(`italic 1.2em "Fira Sans", serif`);
      expect(name).toEqual('Fira Sans');
    });
  });

  describe('#getSizeFromOlFont', () => {
    it('is defined', () => {
      expect(OlStyleUtil.getSizeFromOlFont).toBeDefined();
    });

    it('returns correct size in pixels (1)', () => {
      const size = OlStyleUtil.getSizeFromOlFont(`Normal 13px 'Arial Sans', sans-serif`);
      expect(size).toEqual(13);
    });

    it('returns correct size in pixels (2)', () => {
      const size = OlStyleUtil.getSizeFromOlFont(`10px Arial`);
      expect(size).toEqual(10);
    });

    it('returns 0 if no available size in pixels', () => {
      const size = OlStyleUtil.getSizeFromOlFont(`italic 1.2em "Fira Sans", serif`);
      expect(size).toEqual(0);
    });
  });

  describe('#resolveAttributeTemplate', () => {
    let coords: [number, number];
    let geom;
    let props: any;
    let feat: any;
    let featId;

    beforeEach(() => {
      featId = 'BVB.BORUSSIA';
      coords = [1909, 1909];
      geom = new OlGeomPoint(coords);
      props = {
        name: 'Shinji Kagawa',
        address: 'Borsigplatz 9',
        city: 'Dortmund',
        homepage: 'https://www.bvb.de/',
        'exists-and-is-undefined': undefined,
        'exists-and-is-null': null
      };
      feat = new OlFeature({
        geometry: geom
      });

      feat.setProperties(props);
      feat.setId(featId);
    });
    it('resolves the given template string with the feature attributes', () => {
      let template = '{{name}}';
      let got = OlStyleUtil.resolveAttributeTemplate(feat, template);
      expect(got).toBe(props.name);

      // It's case insensitive.
      template = '{{NAmE}}';
      got = OlStyleUtil.resolveAttributeTemplate(feat, template);
      expect(got).toBe(props.name);

      // It resolves static and non-static content.
      template = 'Contact information: {{name}} {{address}} {{city}}';
      got = OlStyleUtil.resolveAttributeTemplate(feat, template);
      expect(got).toBe(`Contact information: ${props.name} ${props.address} ${props.city}`);

      // It doesn't harm the template if not attribute placeholder is given.
      template = 'No attribute template';
      got = OlStyleUtil.resolveAttributeTemplate(feat, template);
      expect(got).toBe(template);
    });

    it('can be configured wrt handling inexistant / falsy values', () => {
      let template = '{{exists-and-is-undefined}}|{{exists-and-is-null}}|{{key-does-not-exist}}';
      let got = OlStyleUtil.resolveAttributeTemplate(feat, template);
      expect(got).toBe('undefined|null|n.v.');
      got = OlStyleUtil.resolveAttributeTemplate(
        feat,
        template,
        '',
        (key: string, val: any) => {return val ? val : ''; }
      );
      expect(got).toBe('||');
      const mockFn = jest.fn(() => {return 'FOO'; });
      got = OlStyleUtil.resolveAttributeTemplate(feat, template, '', mockFn);
      expect(mockFn.mock.calls.length).toBe(2);
      expect(mockFn.mock.calls[0][0]).toBe('exists-and-is-undefined');
      expect(mockFn.mock.calls[0][1]).toBe(undefined);
      expect(mockFn.mock.calls[1][0]).toBe('exists-and-is-null');
      expect(mockFn.mock.calls[1][1]).toBe(null);
      expect(got).toBe('FOO|FOO|');
    });

    it('resolves it with a placeholder if attribute could not be found', () => {
      let template = '{{notAvailable}}';
      let got = OlStyleUtil.resolveAttributeTemplate(feat, template);
      expect(got).toBe('n.v.');

      template = '{{name}} {{notAvailable}}';
      got = OlStyleUtil.resolveAttributeTemplate(feat, template);
      expect(got).toBe(`${props.name} n.v.`);

      // The placeholder is configurable.
      let notFoundPlaceHolder = '【ツ】';
      template = '{{name}} {{notAvailable}}';
      got = OlStyleUtil.resolveAttributeTemplate(feat, template, notFoundPlaceHolder);
      expect(got).toBe(`${props.name} ${notFoundPlaceHolder}`);
    });
  });

});

import OlStyleUtil from './OlStyleUtil';
import { TextSymbolizer } from 'geostyler-style';

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

    it('returns correct opacity', () => {
      const symb: TextSymbolizer = {
        kind: 'Text',
        color: '#000000',
        field: 'name',
        font: ['Arial'],
        size: 12,
        offset: [0, 5]
      };
      const opac = OlStyleUtil.getTextFont(symb);
      expect(opac).toEqual('Normal 12px Arial');
    });
  });

});

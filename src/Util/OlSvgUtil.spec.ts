import { getSvgSizes, getSizesFromSvg } from './OlSvgUtil';

describe('OlSvgUtil', () => {

  describe('getSvgSizes', () => {

    it('calculates correct sizes for basic input', () => {
      const radius = 10;
      const strokeWidth = 2;
      const unpaddedSizeSimpleV = 20;

      const result = getSvgSizes(radius, strokeWidth, unpaddedSizeSimpleV);

      expect(result).toBeDefined();
      expect(result.minV).toBeCloseTo(-12);
      expect(result.sizeV).toBeCloseTo(24);
      expect(result.heightPx).toBeCloseTo(24);
    });

    it('handles zero stroke width', () => {
      const radius = 15;
      const strokeWidth = 0;
      const unpaddedSizeSimpleV = 30;

      const result = getSvgSizes(radius, strokeWidth, unpaddedSizeSimpleV);

      // With zero stroke width, padding should still include clipping padding
      expect(result.minV).toBeCloseTo(-15);
      expect(result.sizeV).toBeCloseTo(30);
      expect(result.heightPx).toBeCloseTo(30);
    });

    it('handles different viewBox scaling', () => {
      const radius = 20;
      const strokeWidth = 3;
      const unpaddedSizeSimpleV = 100; // Different scale

      const result = getSvgSizes(radius, strokeWidth, unpaddedSizeSimpleV);

      expect(result.minV).toBeCloseTo(-57.5);
      expect(result.sizeV).toBeCloseTo(115);
      expect(result.heightPx).toBeCloseTo(46);
    });

    it('handles large stroke width', () => {
      const radius = 10;
      const strokeWidth = 100;
      const unpaddedSizeSimpleV = 20;

      const result = getSvgSizes(radius, strokeWidth, unpaddedSizeSimpleV);

      expect(result.minV).toBeCloseTo(-110);
      expect(result.sizeV).toBeCloseTo(220);
      expect(result.heightPx).toBeCloseTo(220);
    });
  });

  describe('getSizesFromSvg', () => {

    it('extracts radius and stroke width from SVG dimensions', () => {
      const widthPx = 24;
      const strokeWidthV = 2;
      const viewBox = '-12 -12 24 24';

      const result = getSizesFromSvg(widthPx, strokeWidthV, viewBox);

      expect(result).toBeDefined();
      expect(result.radius).toBeCloseTo(10);
      expect(result.strokeWidth).toBeCloseTo(2);
    });

    it('correctly reverses getSvgSizes calculation', () => {
      // Use the output from getSvgSizes as input to getSizesFromSvg
      const originalRadius = 10;
      const originalStrokeWidth = 2;
      const unpaddedSizeSimpleV = 20;

      const sizes = getSvgSizes(originalRadius, originalStrokeWidth, unpaddedSizeSimpleV);
      const viewBox = `${sizes.minV} ${sizes.minV} ${sizes.sizeV} ${sizes.sizeV}`;

      const result = getSizesFromSvg(sizes.heightPx, 2, viewBox);

      expect(result.radius).toBeCloseTo(originalRadius, 5);
      expect(result.strokeWidth).toBeCloseTo(originalStrokeWidth, 5);
    });

    it('handles SVG without stroke (NaN strokeWidthV)', () => {
      const widthPx = 20;
      const strokeWidthV = NaN;
      const viewBox = '0 0 20 20';

      const result = getSizesFromSvg(widthPx, strokeWidthV, viewBox);

      expect(result.radius).toBeDefined();
      expect(result.strokeWidth).toBeUndefined();
    });

    it('handles zero stroke width', () => {
      const widthPx = 30;
      const strokeWidthV = 0;
      const viewBox = '-15 -15 30 30';

      const result = getSizesFromSvg(widthPx, strokeWidthV, viewBox);

      expect(result.radius).toBeGreaterThan(0);
      expect(result.strokeWidth).toBeDefined();
    });
  });
});

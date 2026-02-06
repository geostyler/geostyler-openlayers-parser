import OlGraphicStrokeUtil from './OlGraphicStrokeUtil';
import OlLineString from 'ol/geom/LineString';
import OlGeomPoint from 'ol/geom/Point';
import { Style, MarkSymbolizer } from 'geostyler-style';

describe('OlGraphicStrokeUtil', () => {

  it('OlGraphicStrokeUtil is defined', () => {
    expect(OlGraphicStrokeUtil).toBeDefined();
  });

  describe('containsGraphicStroke', () => {
    it('returns true when style contains graphic stroke', () => {
      const style: Style = {
        name: 'Test Style',
        rules: [{
          name: 'Test Rule',
          symbolizers: [{
            kind: 'Line',
            color: '#000000',
            graphicStroke: {
              kind: 'Mark',
              wellKnownName: 'circle'
            } as MarkSymbolizer
          }]
        }]
      };
      const result = OlGraphicStrokeUtil.containsGraphicStroke(style);
      expect(result).toBe(true);
    });

    it('returns false when style does not contain graphic stroke', () => {
      const style: Style = {
        name: 'Test Style',
        rules: [{
          name: 'Test Rule',
          symbolizers: [{
            kind: 'Line',
            color: '#000000'
          }]
        }]
      };
      const result = OlGraphicStrokeUtil.containsGraphicStroke(style);
      expect(result).toBe(false);
    });
  });

  describe('getSegmentRotation', () => {

    it('returns 0 for horizontal line pointing right', () => {
      const start = [0, 0];
      const end = [10, 0];
      const rotation = OlGraphicStrokeUtil.getSegmentRotation(start, end);
      expect(rotation).toBeCloseTo(0, 5);
    });

    it('returns -180 for horizontal line pointing left', () => {
      const start = [10, 0];
      const end = [0, 0];
      const rotation = OlGraphicStrokeUtil.getSegmentRotation(start, end);
      expect(rotation).toBeCloseTo(-180, 5);
    });

    it('returns -90 for vertical line pointing up', () => {
      const start = [0, 0];
      const end = [0, 10];
      const rotation = OlGraphicStrokeUtil.getSegmentRotation(start, end);
      expect(rotation).toBeCloseTo(-90, 5);
    });

    it('returns 90 for vertical line pointing down', () => {
      const start = [0, 10];
      const end = [0, 0];
      const rotation = OlGraphicStrokeUtil.getSegmentRotation(start, end);
      expect(rotation).toBeCloseTo(90, 5);
    });

    it('returns -45 for diagonal line (northeast)', () => {
      const start = [0, 0];
      const end = [10, 10];
      const rotation = OlGraphicStrokeUtil.getSegmentRotation(start, end);
      expect(rotation).toBeCloseTo(-45, 5);
    });

    it('returns -135 for diagonal line (northwest)', () => {
      const start = [10, 0];
      const end = [0, 10];
      const rotation = OlGraphicStrokeUtil.getSegmentRotation(start, end);
      expect(rotation).toBeCloseTo(-135, 5);
    });
  });

  describe('getSegmentRotations', () => {
    it('returns correct rotations for a simple line with one segment', () => {
      const geom = new OlLineString([[0, 0], [10, 0]]);
      const rotations = OlGraphicStrokeUtil.getSegmentRotations(geom);
      expect(rotations).toHaveLength(1);
      expect(rotations[0]).toBeCloseTo(0, 5);
    });
    it('returns correct rotations for a simple line with two segments', () => {
      const geom = new OlLineString([[0, 0], [10, 0], [10, 10]]);
      const rotations = OlGraphicStrokeUtil.getSegmentRotations(geom);
      expect(rotations).toHaveLength(2);
      expect(rotations[0]).toBeCloseTo(0, 5);
      expect(rotations[1]).toBeCloseTo(-90, 5);
    });
  });

  describe('getPatternSize', () => {
    it('calculates pattern size correctly for simple dash array', () => {
      const dashArray = [10, 5];
      const resolution = 2;
      const patternSize = OlGraphicStrokeUtil.getPatternSize(dashArray, resolution);
      expect(patternSize).toBe(30); // (10 + 5) * 2
    });

    it('calculates pattern size correctly for complex dash array', () => {
      const dashArray = [10, 5, 2, 3];
      const resolution = 1;
      const patternSize = OlGraphicStrokeUtil.getPatternSize(dashArray, resolution);
      expect(patternSize).toBe(20); // (10 + 5 + 2 + 3) * 1
    });

    it('returns 0 for empty dash array', () => {
      const dashArray: number[] = [];
      const resolution = 2;
      const patternSize = OlGraphicStrokeUtil.getPatternSize(dashArray, resolution);
      expect(patternSize).toBe(0);
    });

    it('handles different resolutions correctly', () => {
      const dashArray = [8, 2];
      const resolution = 0.5;
      const patternSize = OlGraphicStrokeUtil.getPatternSize(dashArray, resolution);
      expect(patternSize).toBe(5); // (8 + 2) * 0.5
    });
  });

  describe('getSegmentFractions', () => {
    it('returns correct fractions for line', () => {
      const geom = new OlLineString([[0, 0], [10, 0], [20, 0]]);
      const fractions = OlGraphicStrokeUtil.getSegmentFractions(geom);
      expect(fractions).toHaveLength(2);
      expect(fractions[0]).toBeCloseTo(0.5, 5);
      expect(fractions[1]).toBeCloseTo(1.0, 5);
    });

    it('returns cumulative fractions', () => {
      const geom = new OlLineString([[0, 0], [10, 0], [20, 0], [30, 0]]);
      const fractions = OlGraphicStrokeUtil.getSegmentFractions(geom);
      expect(fractions).toHaveLength(3);
      expect(fractions[0]).toBeCloseTo(1/3, 5);
      expect(fractions[1]).toBeCloseTo(2/3, 5);
      expect(fractions[2]).toBeCloseTo(1.0, 5);
    });
  });

  describe('getDashAsFractions', () => {
    it('converts dash array to fractions correctly', () => {
      const dashArray = [10, 5];
      const resolution = 1;
      const lineLength = 100;
      const fractions = OlGraphicStrokeUtil.getDashAsFractions(dashArray, resolution, lineLength);
      expect(fractions).toHaveLength(2);
      expect(fractions[0]).toBeCloseTo(0.1, 5);
      expect(fractions[1]).toBeCloseTo(0.05, 5);
    });

    it('handles different resolutions', () => {
      const dashArray = [20, 10];
      const resolution = 2;
      const lineLength = 100;
      const fractions = OlGraphicStrokeUtil.getDashAsFractions(dashArray, resolution, lineLength);
      expect(fractions).toHaveLength(2);
      expect(fractions[0]).toBeCloseTo(0.4, 5);
      expect(fractions[1]).toBeCloseTo(0.2, 5);
    });
  });

  describe('tryAddTick', () => {
    it('adds tick when fraction is valid (between 0 and 1)', () => {
      const ticks: number[] = [];
      const result = OlGraphicStrokeUtil.tryAddTick(ticks, 0.5, 0.1, 0.3);
      expect(result).toBe(true);
      expect(ticks).toHaveLength(1);
      expect(ticks[0]).toBe(0.5);
    });

    it('does not add tick when right edge is greater than 1', () => {
      const ticks: number[] = [];
      const result = OlGraphicStrokeUtil.tryAddTick(ticks, 0.5, 0.1, 1.3);
      expect(result).toBe(false);
      expect(ticks).toHaveLength(0);
    });

    it('does not add tick when left edge is smaller than 0', () => {
      const ticks: number[] = [];
      const result = OlGraphicStrokeUtil.tryAddTick(ticks, 0.1, -0.1, 0.3);
      expect(result).toBe(true); // Returns true but doesn't add
      expect(ticks).toHaveLength(0);
    });

    it('adds tick with right edge at exactly 1.0', () => {
      const ticks: number[] = [];
      const result = OlGraphicStrokeUtil.tryAddTick(ticks, 0.5, 0.1, 1);
      expect(result).toBe(true);
      expect(ticks).toHaveLength(1);
      expect(ticks[0]).toBe(0.5);
    });

    it('adds tick with left edge at exactly 0', () => {
      const ticks: number[] = [];
      const result = OlGraphicStrokeUtil.tryAddTick(ticks, 0.5, 0, 0.3);
      expect(result).toBe(true);
      expect(ticks).toHaveLength(1);
      expect(ticks[0]).toBe(0.5);
    });
  });

  describe('getTickFractionsWithoutDash', () => {
    it('returns correct tick fractions for line', () => {
      const symbolSizeFraction = 0.2;
      const ticks = OlGraphicStrokeUtil.getTickFractionsWithoutDash(symbolSizeFraction);
      expect(ticks).toHaveLength(5);
      expect(ticks[0]).toBeCloseTo(0.1, 5);
      expect(ticks[1]).toBeCloseTo(0.3, 5);
      expect(ticks[2]).toBeCloseTo(0.5, 5);
      expect(ticks[3]).toBeCloseTo(0.7, 5);
      expect(ticks[4]).toBeCloseTo(0.9, 5);
    });
  });

  describe('getTickFractionsWithDash', () => {
    it('returns ticks only in dash portions, not gaps', () => {
      const dashArray = [2, 1]; // 2px dash, 1px gap
      const resolution = 1;
      const lineLength = 5;
      const symbolSizeFraction = 0.2; // 4 units
      const offsetFraction = 0;

      const ticks = OlGraphicStrokeUtil.getTickFractionsWithDash(
        dashArray, resolution, lineLength, symbolSizeFraction, offsetFraction
      );

      expect(ticks).toHaveLength(4);
      expect(ticks[0]).toBeCloseTo(0.1, 2);
      expect(ticks[1]).toBeCloseTo(0.3, 2);
      expect(ticks[2]).toBeCloseTo(0.7, 2);
      expect(ticks[3]).toBeCloseTo(0.9, 2);
    });

    it('uses the correct dash size, even if symbol size does not fit perfectly', () => {
      const dashArray = [2.5, 1]; // 2.5px dash, 1px gap
      const resolution = 1;
      const lineLength = 5;
      const symbolSizeFraction = 0.2; // 4 units
      const offsetFraction = 0;

      const ticks = OlGraphicStrokeUtil.getTickFractionsWithDash(
        dashArray, resolution, lineLength, symbolSizeFraction, offsetFraction
      );

      expect(ticks).toHaveLength(3);
      expect(ticks[0]).toBeCloseTo(0.1, 2);
      expect(ticks[1]).toBeCloseTo(0.3, 2);
      expect(ticks[2]).toBeCloseTo(0.8, 2);
    });

    it('handles odd-length dash arrays by duplicating', () => {
      const dashArray = [2]; // Should become [2, 2]
      const resolution = 1;
      const lineLength = 5;
      const symbolSizeFraction = 0.2;
      const offsetFraction = 0;

      const ticks = OlGraphicStrokeUtil.getTickFractionsWithDash(
        dashArray, resolution, lineLength, symbolSizeFraction, offsetFraction
      );

      expect(ticks.length).toBeGreaterThan(0);
    });

    it('handles offset correctly', () => {
      const dashArray = [2, 2];
      const resolution = 1;
      const lineLength = 5;
      const symbolSizeFraction = 0.2;
      const offsetFraction = 0.1;

      const ticks = OlGraphicStrokeUtil.getTickFractionsWithDash(
        dashArray, resolution, lineLength, symbolSizeFraction, offsetFraction
      );

      // First tick should be offset
      expect(ticks.length).toBeGreaterThan(0);
      expect(ticks[0]).toBeCloseTo(0.2, 5);
    });

    it('stops at line end', () => {
      const dashArray = [2, 1];
      const resolution = 1;
      const lineLength = 5;
      const symbolSizeFraction = 0.2;
      const offsetFraction = 0;

      const ticks = OlGraphicStrokeUtil.getTickFractionsWithDash(
        dashArray, resolution, lineLength, symbolSizeFraction, offsetFraction
      );

      ticks.forEach(tick => {
        expect(tick).toBeLessThan(1);
      });
    });
  });

  describe('#getTickFractions', () => {
    it('is defined', () => {
      expect(OlGraphicStrokeUtil.getTickFractions).toBeDefined();
    });

    it('returns empty array when symbol size is zero', () => {
      const geom = new OlLineString([[0, 0], [100, 0]]);
      const symbolSize = 0;
      const resolution = 1;

      const ticks = OlGraphicStrokeUtil.getTickFractions(geom, symbolSize, resolution);
      expect(ticks).toHaveLength(0);
    });

    it('returns empty array when symbol size is negative', () => {
      const geom = new OlLineString([[0, 0], [100, 0]]);
      const symbolSize = -10;
      const resolution = 1;

      const ticks = OlGraphicStrokeUtil.getTickFractions(geom, symbolSize, resolution);
      expect(ticks).toHaveLength(0);
    });

    it('calls getTickFractionsWithoutDash when no dash array provided', () => {
      const geom = new OlLineString([[0, 0], [100, 0]]);
      const symbolSize = 10;
      const resolution = 1;

      const spy = jest.spyOn(OlGraphicStrokeUtil, 'getTickFractionsWithoutDash');
      OlGraphicStrokeUtil.getTickFractions(geom, symbolSize, resolution);

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('calls getTickFractionsWithDash when dash array is provided', () => {
      const geom = new OlLineString([[0, 0], [100, 0]]);
      const symbolSize = 10;
      const resolution = 1;
      const dashArray = [10, 5];

      const spy = jest.spyOn(OlGraphicStrokeUtil, 'getTickFractionsWithDash');
      OlGraphicStrokeUtil.getTickFractions(geom, symbolSize, resolution, dashArray);

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    it('handles dash offset parameter', () => {
      const geom = new OlLineString([[0, 0], [100, 0]]);
      const symbolSize = 10;
      const resolution = 1;
      const dashArray = [10, 5];
      const dashOffset = 5;

      const ticks = OlGraphicStrokeUtil.getTickFractions(
        geom, symbolSize, resolution, dashArray, dashOffset
      );

      expect(ticks.length).toBeGreaterThanOrEqual(0);
    });

    it('returns ticks for simple case without dash', () => {
      const geom = new OlLineString([[0, 0], [100, 0]]);
      const symbolSize = 20;
      const resolution = 1;

      const ticks = OlGraphicStrokeUtil.getTickFractions(geom, symbolSize, resolution);
      expect(ticks.length).toBeGreaterThan(0);
    });
  });

  describe('#processLineStringGraphicStroke', () => {
    it('is defined', () => {
      expect(OlGraphicStrokeUtil.processLineStringGraphicStroke).toBeDefined();
    });

    it('generates styles for each tick position', () => {
      const geom = new OlLineString([[0, 0], [100, 0]]);
      const symbolSize = 20;
      const resolution = 1;
      const dashArray = undefined;
      const evaluatedDashOffset = 0;
      const evaluatedSymbolRotation = 0;
      const graphicStroke = {
        kind: 'Mark',
        wellKnownName: 'circle',
        radius: 5
      };

      const mockStyle = {
        clone: jest.fn().mockReturnThis(),
        setGeometry: jest.fn()
      };

      const symbolizerGenerator = jest.fn().mockReturnValue(mockStyle);

      const styles = OlGraphicStrokeUtil.processLineStringGraphicStroke(
        geom,
        symbolSize,
        resolution,
        dashArray,
        evaluatedDashOffset,
        evaluatedSymbolRotation,
        graphicStroke,
        symbolizerGenerator,
        OlGeomPoint
      );

      expect(styles.length).toBeGreaterThan(0);
      expect(symbolizerGenerator).toHaveBeenCalled();
    });

    it('applies rotation to graphic stroke', () => {
      const geom = new OlLineString([[0, 0], [100, 0], [100, 100]]);
      const symbolSize = 50;
      const resolution = 1;
      const dashArray = undefined;
      const evaluatedDashOffset = 0;
      const evaluatedSymbolRotation = 45;
      const graphicStroke = {
        kind: 'Mark',
        wellKnownName: 'circle',
        radius: 5
      };

      const mockStyle = {
        clone: jest.fn().mockReturnThis(),
        setGeometry: jest.fn()
      };

      const symbolizerGenerator = jest.fn().mockReturnValue(mockStyle);

      OlGraphicStrokeUtil.processLineStringGraphicStroke(
        geom,
        symbolSize,
        resolution,
        dashArray,
        evaluatedDashOffset,
        evaluatedSymbolRotation,
        graphicStroke,
        symbolizerGenerator,
        OlGeomPoint
      );

      // Check that symbolizerGenerator was called with rotated graphics
      const calls = symbolizerGenerator.mock.calls;
      calls.forEach(call => {
        const modifiedGraphic = call[0];
        expect(modifiedGraphic.rotate).toBeDefined();
      });
    });

    it('creates Point geometries at tick positions', () => {
      const geom = new OlLineString([[0, 0], [100, 0]]);
      const symbolSize = 50;
      const resolution = 1;
      const dashArray = undefined;
      const evaluatedDashOffset = 0;
      const evaluatedSymbolRotation = 0;
      const graphicStroke = {
        kind: 'Mark',
        wellKnownName: 'circle',
        radius: 5
      };

      const mockStyle = {
        clone: jest.fn().mockReturnThis(),
        setGeometry: jest.fn()
      };

      const symbolizerGenerator = jest.fn().mockReturnValue(mockStyle);

      OlGraphicStrokeUtil.processLineStringGraphicStroke(
        geom,
        symbolSize,
        resolution,
        dashArray,
        evaluatedDashOffset,
        evaluatedSymbolRotation,
        graphicStroke,
        symbolizerGenerator,
        OlGeomPoint
      );

      expect(mockStyle.setGeometry).toHaveBeenCalled();
      const setGeometryCalls = mockStyle.setGeometry.mock.calls;
      setGeometryCalls.forEach(call => {
        const geomArg = call[0];
        expect(geomArg).toBeInstanceOf(OlGeomPoint);
      });
    });

    it('handles dash array parameter', () => {
      const geom = new OlLineString([[0, 0], [100, 0]]);
      const symbolSize = 10;
      const resolution = 1;
      const dashArray = [20, 10];
      const evaluatedDashOffset = 0;
      const evaluatedSymbolRotation = 0;
      const graphicStroke = {
        kind: 'Mark',
        wellKnownName: 'circle',
        radius: 5
      };

      const mockStyle = {
        clone: jest.fn().mockReturnThis(),
        setGeometry: jest.fn()
      };

      const symbolizerGenerator = jest.fn().mockReturnValue(mockStyle);

      const styles = OlGraphicStrokeUtil.processLineStringGraphicStroke(
        geom,
        symbolSize,
        resolution,
        dashArray,
        evaluatedDashOffset,
        evaluatedSymbolRotation,
        graphicStroke,
        symbolizerGenerator,
        OlGeomPoint
      );

      expect(styles.length).toBeGreaterThanOrEqual(0);
    });
  });
});

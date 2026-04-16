import {
  Style,
} from 'geostyler-style';

import OlGeomPoint from 'ol/geom/Point';
import OlLineString from 'ol/geom/LineString';
import OlMultiLineString from 'ol/geom/MultiLineString';
import OlPolygon from 'ol/geom/Polygon';
import OlMultiPolygon from 'ol/geom/MultiPolygon';
import { Coordinate } from 'ol/coordinate';
import { Geometry } from 'ol/geom';

/**
 * Offers some utility functions to work with OpenLayers Graphic Strokes.
 */
class OlGraphicStrokeUtil {

  /**
   * Check if the given style contains a graphic stroke in any of its rules.
   * @param style The style to check.
   * @returns True if the style contains a graphic stroke, false otherwise.
   */
  public static containsGraphicStroke(style: Style) {
    return style.rules.some(rule =>
      rule.symbolizers?.some(
        symbolizer => symbolizer.kind === 'Line' && symbolizer.graphicStroke
      )
    );
  }

  /**
   * Get the rotation in degrees for a line segment defined by its start and
   * end coordinates.
   * @param start The start coordinate of the line segment.
   * @param end The end coordinate of the line segment.
   * @returns The rotation in degrees.
   */
  public static getSegmentRotation(start: Coordinate, end: Coordinate) {
    // taken from https://openlayers.org/en/latest/examples/line-arrows.html
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const rotation = Math.atan2(dy, dx);
    const RADIANS_TO_DEGREES = 180 / Math.PI;
    return -rotation * RADIANS_TO_DEGREES;
  }

  /**
   * Get the rotations in degrees for each segment of a LineString geometry.
   * @param geom The LineString geometry
   * @returns An array of rotations in degrees for each segment
   */
  public static getSegmentRotations(geom: OlLineString) {
    const segmentRotations: number[] = [];
    geom.forEachSegment((start, end) => {
      const rotation = OlGraphicStrokeUtil.getSegmentRotation(start, end);
      segmentRotations.push(rotation);
    });
    return segmentRotations;
  }

  /**
   * Get the total size of a dash pattern in map units.
   * @param dashArray The dash array in pixels.
   * @param resolution The map resolution.
   * @returns The total size of the dash pattern in map units.
   */
  public static getPatternSize(
    dashArray: number[],
    resolution: number
  ) {
    const patternSizePx = dashArray.reduce((sum, value) => sum + value, 0);
    const patternSizeMapUnit = resolution * patternSizePx;
    return patternSizeMapUnit;
  }

  /**
   * Get the normalized fractions along the line where each segment ends.
   * @param geom The LineString geometry
   * @returns An array of normalized fractions
   */
  public static getSegmentFractions(geom: OlLineString) {
    // creates a list of normalized fractions, where each segment ends
    // e.g. [0.3, 0.6, 1.0] for a line with 3 segments of equal length
    const segmentFractions: number[] = [];
    const lineLength = geom.getLength();
    let currentTotal = 0;
    geom.forEachSegment((start, end) => {
      const segment = new OlLineString([start, end]);
      const segmentLength = segment.getLength();
      const segmentFraction = segmentLength / lineLength;
      currentTotal += segmentFraction;
      segmentFractions.push(currentTotal);
    });
    return segmentFractions;
  }

  /**
   * Get the dash array as fractions of the total line length.
   * @param dashArray The dash array in pixels.
   * @param resolution The map resolution.
   * @param lineLength The total length of the line in map units.
   * @returns An array of fractions representing the dash lengths relative
   * to the line length.
   */
  public static getDashAsFractions(
    dashArray: number[],
    resolution: number,
    lineLength: number
  ) {
    const dashToFraction = (dash: number) => (dash * resolution) / lineLength;
    return dashArray.map(dash => dashToFraction(dash));
  }

  /**
   * Get the fractions along the line where ticks should be placed, considering
   * the symbol size, resolution, and optional dash pattern.
   * @param geom The LineString geometry
   * @param symbolSize The size of the symbol in pixels
   * @param resolution The map resolution
   * @param dashArray Optional dash array
   * @param dashOffset Optional dash offset
   * @returns An array of fractions along the line where ticks should be placed
   */
  public static getTickFractions(
    geom: OlLineString,
    symbolSize: number,
    resolution: number,
    dashArray?: number[],
    dashOffset?: number
  ) {
    if (symbolSize <= 0) {
      return [];
    }

    const lineLength = geom.getLength();
    const symbolSizeFraction = (symbolSize * resolution) / lineLength;
    const offsetFraction = (dashOffset ? dashOffset * resolution : 0) / lineLength;

    const hasDashArray = dashArray && dashArray.length > 0;
    if (hasDashArray) {
      return OlGraphicStrokeUtil.getTickFractionsWithDash(
        dashArray,
        resolution,
        lineLength,
        symbolSizeFraction,
        offsetFraction
      );
    }

    return OlGraphicStrokeUtil.getTickFractionsWithoutDash(
      symbolSizeFraction
    );
  }

  /**
   * Helper method to add a tick at the given fraction if it's within valid bounds.
   * @param ticks Array to add the tick to
   * @param currentFraction The fraction to potentially add
   * @returns True if the tick was added and we should continue, false if we've exceeded bounds
   */
  public static tryAddTick(ticks: number[], currentFraction: number, leftEdge: number, rightEdge: number): boolean {
    if (rightEdge > 1) {
      return false;
    }
    // Only add ticks with non-negative fractions (in case of negative offset)
    if (leftEdge >= 0) {
      ticks.push(currentFraction);
    }
    return true;
  }

  /**
   * Get tick fractions for a line without a dash pattern.
   * @param symbolSizeFraction The symbol size as a fraction of the line length
   * @param offsetFraction The offset as a fraction of the line length
   * @returns An array of fractions along the line where ticks should be placed
   */
  public static getTickFractionsWithoutDash(
    symbolSizeFraction: number
  ): number[] {
    const ticks: number[] = [];
    const symbolRadiusFraction = symbolSizeFraction / 2;
    let currentFraction = symbolRadiusFraction;

    while (true) {
      const nextFraction = currentFraction + symbolSizeFraction;
      const leftEdge = currentFraction - symbolRadiusFraction;
      const rightEdge = currentFraction + symbolRadiusFraction;
      const addedTick = OlGraphicStrokeUtil.tryAddTick(ticks, currentFraction, leftEdge, rightEdge);
      currentFraction = nextFraction;
      if (!addedTick) {
        break;
      }
    }

    return ticks;
  }

  /**
   * Get tick fractions for a line with a dash pattern.
   * @param dashArray The dash array in pixels
   * @param resolution The map resolution
   * @param lineLength The total length of the line in map units
   * @param symbolSizeFraction The symbol size as a fraction of the line length
   * @param offsetFraction The offset as a fraction of the line length
   * @returns An array of fractions along the line where ticks should be placed
   */
  public static getTickFractionsWithDash(
    dashArray: number[],
    resolution: number,
    lineLength: number,
    symbolSizeFraction: number,
    offsetFraction: number
  ): number[] {
    // Duplicate dash array if it has an odd number of elements
    const normalizedDash = dashArray.length % 2 === 0 ? dashArray : [...dashArray, ...dashArray];
    const dashFractions = OlGraphicStrokeUtil.getDashAsFractions(normalizedDash, resolution, lineLength);
    const symbolRadiusFraction = symbolSizeFraction / 2;

    const ticks: number[] = [];
    // Start at the initial offset plus half a symbol size to position the
    // first symbol directly at the beginning of the line.
    let currentFraction = offsetFraction + symbolRadiusFraction;
    let dashIndex = 0;

    while (currentFraction <= 1) {
      const isGap = dashIndex % 2 === 1;
      const dashItemFraction = dashFractions[dashIndex];

      if (isGap) {
        currentFraction += dashItemFraction;
      } else {
        const symbolsInDraw = dashItemFraction / symbolSizeFraction;
        const fullSymbolsInDraw = Math.floor(symbolsInDraw);
        for (let i = 0; i < fullSymbolsInDraw; i++) {
          const leftEdge = currentFraction - symbolRadiusFraction;
          const rightEdge = currentFraction + symbolRadiusFraction;
          const nextFraction = currentFraction + symbolSizeFraction;
          const addedTick = OlGraphicStrokeUtil.tryAddTick(ticks, currentFraction, leftEdge, rightEdge);
          currentFraction = nextFraction;
          if (!addedTick) {
            return ticks;
          }
        }
        // leftover part that does not fit a whole symbol, but still needs to
        // be added for correct offsetting of the next dash item
        const leftOver = (symbolsInDraw % 1) * symbolSizeFraction;
        currentFraction += leftOver;
      }

      // Cycle through the dash pattern
      dashIndex = (dashIndex + 1) % dashFractions.length;
    }

    return ticks;
  }

  /**
   * Process a single LineString geometry to generate graphic stroke styles.
   *
   * @param geom The LineString geometry to process
   * @param symbolSize The size of the symbol in pixels
   * @param resolution The map resolution
   * @param dashArray Optional dash array for dashed patterns
   * @param evaluatedDashOffset Evaluated dash offset value
   * @param evaluatedSymbolRotation Evaluated symbol rotation in degrees
   * @param graphicStroke The graphic stroke point symbolizer
   * @param symbolizerGenerator Function to generate OL styles from a modified graphic stroke
   * @param PointConstructor Constructor for creating OL Point geometries
   * @returns Array of OL styles for the graphic stroke
   */
  public static processLineStringGraphicStroke(
    geom: OlLineString,
    symbolSize: number,
    resolution: number,
    dashArray: number[] | undefined,
    evaluatedDashOffset: number,
    evaluatedSymbolRotation: number,
    graphicStroke: any,
    symbolizerGenerator: (modifiedGraphicStroke: any) => any,
    PointConstructor: typeof OlGeomPoint
  ): any[] {
    const tickFractions = OlGraphicStrokeUtil.getTickFractions(
      geom, symbolSize, resolution, dashArray, evaluatedDashOffset
    );
    const segmentFractions = OlGraphicStrokeUtil.getSegmentFractions(geom);
    const segmentRotations = OlGraphicStrokeUtil.getSegmentRotations(geom);

    const segmentStyles = segmentRotations.map((segmentRotation) => {
      const rotation = segmentRotation + evaluatedSymbolRotation;
      const graphicStrokeClone = structuredClone(graphicStroke);
      graphicStrokeClone.rotate = rotation;
      return symbolizerGenerator(graphicStrokeClone);
    });

    return tickFractions.map(tickFraction => {
      const coord = geom.getCoordinateAt(tickFraction);
      const tick = new PointConstructor(coord);
      const segmentIndex = segmentFractions.findIndex(
        segmentFraction => tickFraction <= segmentFraction
      );
      const styleClone = segmentStyles[segmentIndex].clone();
      styleClone.setGeometry(tick);
      return styleClone;
    });
  }

  public static getLineStringsFromGeometry(geom: Geometry | undefined, constructors: {
    LineString: typeof OlLineString;
    MultiLineString: typeof OlMultiLineString;
    Polygon: typeof OlPolygon;
    MultiPolygon: typeof OlMultiPolygon;
  }) {
    if (!geom) {
      throw new Error(
        'GraphicStroke can only be applied to features with geometries'
      );
    }
    if (geom instanceof constructors.LineString) {
      return [geom];
    } else if (geom instanceof constructors.MultiLineString) {
      return geom.getLineStrings();
    } else if (geom instanceof constructors.Polygon) {
      const linearRings = geom.getLinearRings();
      return linearRings.map(ring => new constructors.LineString(ring.getCoordinates()));
    } else if (geom instanceof constructors.MultiPolygon) {
      const polygons = geom.getPolygons();
      return polygons.flatMap(polygon => {
        const linearRings = polygon.getLinearRings();
        return linearRings.map(ring => new constructors.LineString(ring.getCoordinates()));
      });
    }

    throw new Error(
      'GraphicStroke can only be applied to (Multi-)LineString or (Multi-)Polygon geometries'
    );
  }
}

export default OlGraphicStrokeUtil;

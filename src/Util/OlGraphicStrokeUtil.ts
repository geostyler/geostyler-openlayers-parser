import {
  Style,
} from 'geostyler-style';

import OlGeomPoint from 'ol/geom/Point';
import OlLineString from 'ol/geom/LineString';
import { Coordinate } from 'ol/coordinate';

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

  public static getPointsOnLine(
    geom: OlLineString,
    numberOfTicks: number,
    normalizedBaseFraction: number,
    PointConstructor: typeof OlGeomPoint,
  ) {
    const points = Array.from({length: numberOfTicks})
      .map((_, idx) => {
        const fraction = normalizedBaseFraction * idx;
        return geom.getCoordinateAt(fraction);
      })
      .filter(tick => tick !== undefined && tick !== null)
      .map(coord => new PointConstructor(coord));

    return points;
  }

  public static getNumberOfTicksOnLine(
    geom: OlLineString,
    resolution: number,
    size: number,
  ) {
    const distanceInMapUnit = resolution * size;
    const lineLength = geom.getLength();
    const numberOfTicks = Math.floor(lineLength / distanceInMapUnit);
    return numberOfTicks;
  }

  public static getBaseFraction(
    geom: OlLineString,
    numberOfTicks: number,
  ) {
    const lineLength = geom.getLength();
    const baseFraction = Math.floor(lineLength / numberOfTicks);
    return baseFraction;
  }

  public static normalizeBaseFraction(
    geom: OlLineString,
    baseFraction: number,
  ) {
    const lineLength = geom.getLength();
    const normalizedBaseFraction = baseFraction / lineLength;
    return normalizedBaseFraction;
  }

  public static getSegmentRotation(start: Coordinate, end: Coordinate) {
    // taken from https://openlayers.org/en/latest/examples/line-arrows.html
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const rotation = Math.atan2(dy, dx);
    const RADIANS_TO_DEGREES = 180 / Math.PI;
    return -rotation * RADIANS_TO_DEGREES;
  }

  public static isOnSegmentX(
    idx: number,
    baseFraction: number,
    segmentMap: {rotation: number; length: number}[],
  ) {
    let distanceOnLine = baseFraction * idx;
    let segmentIndex = 0;
    while (segmentIndex < segmentMap.length && distanceOnLine > segmentMap[segmentIndex].length) {
      distanceOnLine -= segmentMap[segmentIndex].length;
      segmentIndex++;
    }
    return segmentIndex;
  }

  public static generateTicks(
    geom: OlLineString,
    resolution: number,
    symbolSize: number,
    PointConstructor: typeof OlGeomPoint,
  ) {
    const numberOfTicks = OlGraphicStrokeUtil.getNumberOfTicksOnLine(
      geom, resolution, symbolSize
    );
    const baseFraction = OlGraphicStrokeUtil.getBaseFraction(geom, numberOfTicks);
    const normalizedBaseFraction = OlGraphicStrokeUtil.normalizeBaseFraction(
      geom, baseFraction
    );

    // TODO provide info about the segment the tick is located on
    const ticks = OlGraphicStrokeUtil.getPointsOnLine(
      geom, numberOfTicks, normalizedBaseFraction, PointConstructor
    );

    return ticks;
  }

  public static getPatternSize(
    dashArray: number[],
    resolution: number,
  ) {
    const patternSizePx = dashArray.reduce((sum, value) => sum + value, 0);
    const patternSizeMapUnit = resolution * patternSizePx;
    return patternSizeMapUnit;
  }

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

  public static getSegmentRotations(geom: OlLineString) {
    const segmentRotations: number[] = [];
    geom.forEachSegment((start, end) => {
      const rotation = OlGraphicStrokeUtil.getSegmentRotation(start, end);
      segmentRotations.push(rotation);
    });
    return segmentRotations;
  }

  public static getTickFractions(
    geom: OlLineString,
    symbolSize: number,
    resolution: number,
    dashArray?: number[],
    dashOffset?: number
  ) {
    const lineLength = geom.getLength();
    const symbolSizeMapUnit = symbolSize * resolution;

    let tickFractions: number[];
    if (dashArray) {
      const offset = dashOffset ? dashOffset * resolution : 0;
      // duplicate dash array if it has an odd number of elements
      const dash = dashArray.length % 2 === 0 ? dashArray : [...dashArray, ...dashArray];
      const patternSize = OlGraphicStrokeUtil.getPatternSize(dash, resolution);
      const patternsInLine = Math.floor(lineLength / patternSize);
      // positions of the draw ticks
      const subPatternDrawTicksPositions: number[][] = [];
      let currentPatternLength = 0;
      const subPatternLengths: [number, number][] = [];

      // calculate lengths for a single pattern
      for (let i = 0; i < dash.length; i += 2) {
        const drawSizeMapUnit = dash[i] * resolution;
        const gapSizeMapUnit = dash[i + 1] * resolution;
        const symbolsInDraw = Math.floor(drawSizeMapUnit / symbolSizeMapUnit);

        const symbolDrawPositions = Array.from({length: symbolsInDraw})
          .map((_, idx) => symbolSizeMapUnit * idx);
        const symbolDrawTicks = symbolDrawPositions.map((tick, idx) => {
          return idx * tick + currentPatternLength;
        });
        subPatternDrawTicksPositions.push(symbolDrawTicks);
        currentPatternLength += drawSizeMapUnit + gapSizeMapUnit;
        subPatternLengths.push([drawSizeMapUnit, gapSizeMapUnit]);
      }

      const ticks = Array.from({length: patternsInLine})
        .flatMap((_, idx) => subPatternDrawTicksPositions.flat().map(
          tick => offset + tick + patternSize * idx)
        );

      // Fill gap with partial pattern if possible.
      // Only includes full subpatterns, no single symbols.
      // E.g.
      // - for dash array [10, 5, 2, 5] and leftover length of 12,
      // only the first subpattern (10, 5) is included, the second (2, 5) is not.
      // - for dash array [10, 5, 2, 5] and leftover length of 9,
      // no subpattern is included, even though part of the first
      // subpattern (10, 5) would fit.
      let leftoverLength =
        lineLength - (patternsInLine * currentPatternLength) - offset;
      let nextSubPatternIndex = 0;
      while (leftoverLength > 0) {
        const [drawSize, gapSize] = subPatternLengths[nextSubPatternIndex];
        if (leftoverLength > drawSize) {
          const subPatternTicksPosition = subPatternDrawTicksPositions[0];
          const newTicks = subPatternTicksPosition.map(tick => {
            return lineLength - leftoverLength + tick;
          });
          ticks.push(...newTicks);
          leftoverLength -= drawSize + gapSize;
          nextSubPatternIndex += 1;
        } else {
          break;
        }
      }
      tickFractions = ticks
        .map(tick => tick / lineLength)
        .filter(tick => tick >= 0 && tick <= 1);
    } else {
      const symbolsInLine = lineLength / symbolSizeMapUnit;
      tickFractions = Array.from({length: symbolsInLine})
        .map((_, idx) => (symbolSizeMapUnit * idx) / lineLength);
    }
    return tickFractions;
  }
}

export default OlGraphicStrokeUtil;

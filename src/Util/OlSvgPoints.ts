import { MarkSymbolizer } from 'geostyler-style';
import OlStyleUtil from './OlStyleUtil';
import { LINE_WELLKNOWNNAMES, NOFILL_WELLKNOWNNAMES, svgDefinition } from './OlSvgUtil';

// Shape definitions, all are roughly scaled to 20x20 in coordinates between (-10,-10) to (10,10)
export const pointSvgs: svgDefinition = {
  arrow: 'd="M 0,-10 L 5,-5 L 2.5,-5 L 2.5,10 L -2.5,10 L -2.5,-5 L -5,-5 L 0,-10 Z"',
  arrowhead: 'd="M -10 -10 L 0 0 L -10 10"',
  asterisk_fill: 'd="M -1.5,-10 L 1.5,-10L 1.5,-3.939 L 6.011,-8.132 L 8.132,-6.011 L 3.939,-1.5 L 10,-1.5 L 10,1.5 ' +
    'L 3.939,1.5 L 8.132,6.011 L 6.011,8.132 L 1.5,3.939 L 1.5,10 L -1.5,10 L -1.5,3.939 L -6.011,8.132 ' +
    'L -8.132,6.011 L -3.939,1.5 L -10,1.5 L -10,-1.5 L -3.939,-1.5 L -8.132,-6.011 L -6.011,-8.132 ' +
    'L -1.5,-3.939 L -1.5,-10 Z"',
  backslash: 'd="M -12 -12 L 12 12"',
  carrow: 'd="M -10 10 L 0 -10 L 10 10 Z"',
  circle: 'cx="0" cy="0" r="10"',
  cross: 'd="M -12 0 L 12 0 M 0 -12 L 0 12"',
  cross_fill: 'd="M -10,-2 L -10,-2 L -10,2 L -2,2 L -2,10 L 2,10 L 2,2 L 10,2 L 10,-2 L 2,-2 L 2,-10 L -2,-10 ' +
    'L -2,-2 L -10,-2 Z"',
  cross2: 'd="M -12 -12 L 12 12 M 12 -12 L -12 12"',
  decagon: 'points="5.878,8.09 9.511,3.09 9.511,-3.09 5.878,-8.09 0,-10 -5.878,-8.09 -9.511,-3.09 -9.511,3.09 ' +
    '-5.878,8.09 0,10 5.878,8.09"',
  diagonal_half_square: 'points="-10,-10 10,10 -10,10 -10,-10"',
  diamond: 'points="-10,0 0,10 10,0 0,-10 -10,0"',
  equilateral_triangle: 'points="-8.66,5 8.66,5 0,-10 -8.66,5"',
  filled_arrowhead: 'd="M 0,0 L -10,10 L -10,-10 L 0,0 Z"',
  half_arc: 'd="M -10 0 A 10 10 0 0 1 10 0"',
  half_square: 'points="-10,-10 0,-10 0,10 -10,10 -10,-10"',
  heart: 'd="M -9.5 -2 A 1 1 0 0 1 0 -7.5 A 1 1 0 0 1 9.5 -2 L 0 10 Z"',
  hexagon: 'points="-8.66,-5 -8.66,5 0,10 8.66,5 8.66,-5 0,-10 -8.66,-5"',
  horline: 'd="M -12 0 L 12 0"',
  left_half_triangle: 'points="0,10 10,10 0,-10 0,10"',
  line: 'd="M 0 -12 L 0 12"',
  oarrow: 'd="M -10 10 L 0 -10 L 10 10"',
  octagon: 'points="-4.142,10 4.142,10 10,4.142 10,-4.142 4.142,-10 -4.142,-10 -10,-4.142 -10,4.142 -4.142,10"',
  parallelogram_left: 'points="10,5 5,-5 -10,-5 -5,5 10,5"',
  parallelogram_right: 'points="5,5 10,-5 -5,-5 -10,5 5,5"',
  pentagon: 'points="-9.511,-3.09 -5.878,8.09 5.878,8.09 9.511,-3.09 0,-10 -9.511,-3.09"',
  quarter_arc: 'd="M 0 -10 A 10 10 0 0 0 -10 0"',
  quarter_circle: 'd="M 0 -10 A 10 10 0 0 0 -10 0 L 0 0 Z"',
  quarter_square: 'points="-10,-10 0,-10 0,0 -10,0 -10,-10"',
  right_half_triangle: 'points="-10,10 0,10 0,-10 -10,10"',
  rounded_square: 'x="-10" y="-10" width="20" height="20" rx="2.5" ry="2.5"',
  semi_circle: 'd="M -10 0 A 10 10 0 0 1 10 0 L 0 0 Z"',
  shield: 'points="10,5 10,-10 -10,-10 -10,5 0,10 10,5"',
  slash: 'd="M 12 -12 L -12 12"',
  square: 'points="-10,-10 10,-10 10,10 -10,10"',
  square_with_corners: 'points="-6.072,10 6.072,10 10,6.072 10,-6.072 6.072,-10 -6.072,-10 -10,-6.072 ' +
    '-10,6.072 -6.072,10"',
  star: 'd="M -2.24514,-3.09017 -9.51057,-3.09017 -3.63271,1.18034 -5.87785,8.09017 0,3.81966 ' +
    '5.87785,8.09017 3.63271,1.18034 9.51057,-3.09017 2.24514,-3.09017 0,-10 -2.24514,-3.09017 Z"',
  star_diamond: 'd="M -2.70091,-2.70091 -10,0 -2.70091,2.70091 0,10 2.70091,2.70091 10,0 2.70091,-2.70091 0,-10 Z"',
  third_arc: 'd="M 0 -10 A 10 10 0 0 0 -5 8.66"',
  third_circle: 'd="M 0 -10 A 10 10 0 0 0 -5 8.66 L 0 0 Z"',
  trapezoid: 'points="5,-5 10,5 -10,5 -5,-5 5,-5"',
  triangle: 'points="-10,10 10,10 0,-10 -10,10"'
};

export const cleanWellKnownName = (wellKnownName: string) => {
  let cleanedWellKnownName = wellKnownName.replace('shape://', '');
  cleanedWellKnownName = cleanedWellKnownName.replace('brush://', '');
  switch (cleanedWellKnownName) {
    case 'dot':
      return 'circle';
    case 'plus':
      return 'cross';
    case 'times':
    case 'x':
      return 'cross2';
    case 'vertline':
      return 'line';
    default:
      return cleanedWellKnownName;
  }
};

export const isPointDefinedAsSvg = (wellKnownName: string) => cleanWellKnownName(wellKnownName) in pointSvgs;

/**
 * Get the SVG string for a point symbolizer.
 *
 * @param symbolizer A GeoStyler-Style MarkSymbolizer.
 * @return The SVG string
 */
export const getPointSvg = (
  symbolizer: MarkSymbolizer
) => {
  const { wellKnownName, radius, color, fillOpacity, strokeColor, strokeWidth, strokeOpacity } = symbolizer;
  const dimensions = (radius as number ?? 6) * 2;  // Default to 12 pixels

  if (!isPointDefinedAsSvg(wellKnownName)) {
    throw new Error('Unknown wellKnownName: ' + wellKnownName);
  }

  const cleanedWellKnownName = cleanWellKnownName(wellKnownName);

  const svgHeader = '<svg xmlns="http://www.w3.org/2000/svg" ' +
    'width="' + dimensions + '" ' +
    'height="' + dimensions + '" ' +
    'viewBox="-12 -12 24 24">';
  const svgFooter = '</svg>';

  let svgBody = pointSvgs[cleanedWellKnownName] + ' ';

  // Depending on the wellKnownName definition use different SVG elements
  if (svgBody.startsWith('points=')) {
    svgBody = '<polygon id="' + cleanedWellKnownName + '" ' + svgBody;
  } else if (svgBody.startsWith('x=')) {
    svgBody = '<rect id="' + cleanedWellKnownName + '" ' + svgBody;
  } else if (svgBody.startsWith('cx=')) {
    svgBody = '<circle id="' + cleanedWellKnownName + '" ' + svgBody;
  } else {
    svgBody = '<path id="' + cleanedWellKnownName + '" ' + svgBody;
  }

  let svgStyle = '';
  if (color && !NOFILL_WELLKNOWNNAMES.includes(cleanedWellKnownName)) {
    svgStyle += 'fill:' + color + '; ';
  } else if (NOFILL_WELLKNOWNNAMES.includes(cleanedWellKnownName)) {
    svgStyle += 'fill:none; ';
  };
  if (OlStyleUtil.checkOpacity(fillOpacity) && !NOFILL_WELLKNOWNNAMES.includes(cleanedWellKnownName)) {
    svgStyle += 'fill-opacity:' + fillOpacity + '; ';
  };
  if (strokeColor) {
    svgStyle += 'stroke:' + strokeColor + '; ';
  };
  if (strokeWidth) {
    const scaleFactor = dimensions / 24;
    svgStyle += 'stroke-width:' + Number(strokeWidth) / scaleFactor + '; ';
  };
  if (OlStyleUtil.checkOpacity(strokeOpacity)) {
    svgStyle += 'stroke-opacity:' + strokeOpacity + '; ';
  };
  if (LINE_WELLKNOWNNAMES.includes(cleanedWellKnownName)) {
    svgStyle = svgStyle + 'stroke-linejoin: butt';
  };

  svgBody += 'style="' + svgStyle.trim() + '" />';

  return svgHeader + svgBody + svgFooter;
};

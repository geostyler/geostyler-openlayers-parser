import OlStyleUtil, { LINE_WELLKNOWNNAMES } from './OlStyleUtil';

export interface SvgOptions {
  id?: string;
  dimensions: number;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
}

type svgDefinition = {
  [key: string]: string;
};

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
  half_arc: 'd="M -10 0 A -10 -10 0 0 1 10 0"',
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
  semi_circle: 'd="M -10 0 A -10 -10 0 0 1 10 0 L 0 0 Z"',
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

export const removeDuplicateShapes = (shape: string) => {
  switch (shape) {
    case 'shape://backslash':
      return 'backslash';
    case 'shape://carrow':
      return 'carrow';
    case 'shape://dot':
      return 'circle';
    case 'shape://horline':
      return 'horline';
    case 'shape://oarrow':
      return 'oarrow';
    case 'shape://plus':
      return 'cross';
    case 'shape://slash':
      return 'slash';
    case 'shape://times':
    case 'x':
      return 'cross2';
    case 'shape://vertline':
      return 'line';
    default:
      return shape;
  }
};

export const isPointDefinedAsSvg = (shape: string) => shape in pointSvgs;

/**
 * Returns an SVG string for a given shape type with the specified options.
 *
 * @param {string} [shape='circle'] The shape type. Supported values are:
 *     'arrow', 'arrowhead', 'asterisk_fill', 'circle', 'cross', 'cross2', 'cross_fill',
 *     'decagon', 'diamond', 'diagonal_half_square', 'equilateral_triangle', 'filled_arrowhead',
 *     'half_arc', 'half_square', 'heart', 'hexagon', 'left_half_triangle', 'line',
 *     'octagon', 'parallelogram_left', 'parallelogram_right', 'pentagon', 'quarter_arc',
 *     'quarter_circle', 'quarter_square', 'right_half_triangle', 'rounded_square',
 *     'semi_circle', 'shield', 'square', 'square_with_corners', 'star', 'star_diamond',
 *     'third_arc', 'third_circle', 'trapezoid', 'triangle'
 * @param {SvgOptions} [options={}] The options to use for the shape.
 *     The following options are supported:
 *     - fill: The color to use for filling the shape. Default is '#fff'.
 *     - fillOpacity: The opacity to use for filling the shape. Default is '1'.
 *     - stroke: The color to use for the shape's stroke. Default is '#000'.
 *     - strokeWidth: The width of the shape's stroke. Default is '1'.
 *     - strokeOpacity: The opacity to use for the shape's stroke. Default is '1'.
 *     - dimensions: The width and height of the resulting SVG. Default is '40'.
 * @returns {string} An SVG string for the given shape type with the specified options.
 */
export const getShapeSvg = (
  shape = 'circle',
  options: SvgOptions = { dimensions: 40, fill: '#fff', fillOpacity: 1,
    stroke: '#000', strokeWidth: 1, strokeOpacity: 1 }
) => {
  const { dimensions, fill, fillOpacity, stroke, strokeWidth, strokeOpacity } = options;

  if (!isPointDefinedAsSvg(shape)) {
    throw new Error('Unknown shape: ' + shape);
  }

  const svgHeader = '<svg xmlns="http://www.w3.org/2000/svg" ' +
    'width="' + dimensions + '" ' +
    'height="' + dimensions + '" ' +
    'viewBox="-12 -12 24 24">';
  const svgFooter = '</svg>';

  let svgBody = pointSvgs[shape] + ' ';

  // Depending on the shape definition use different SVG elements
  if (svgBody.startsWith('points=')) {
    svgBody = '<polygon id="' + shape + '" ' + svgBody;
  } else if (svgBody.startsWith('x=')) {
    svgBody = '<rect id="' + shape + '" ' + svgBody;
  } else if (svgBody.startsWith('cx=')) {
    svgBody = '<circle id="' + shape + '" ' + svgBody;
  } else {
    svgBody = '<path id="' + shape + '" ' + svgBody;
  }

  let svgStyle = '';
  if (fill) {
    svgStyle += 'fill:' + fill + '; ';
  }
  if (OlStyleUtil.checkOpacity(fillOpacity)) {
    svgStyle += 'fill-opacity:' + fillOpacity + '; ';
  }
  if (stroke) {
    svgStyle += 'stroke:' + stroke + '; ';
  }
  if (strokeWidth) {
    svgStyle += 'stroke-width:' + strokeWidth + '; ';
  }
  if (OlStyleUtil.checkOpacity(strokeOpacity)) {
    svgStyle += 'stroke-opacity:' + strokeOpacity + '; ';
  }
  if (LINE_WELLKNOWNNAMES.includes(shape)) {
    svgStyle = svgStyle + 'stroke-linejoin: butt';
  }

  svgBody += 'style="' + svgStyle.trim() + '" />';

  return svgHeader + svgBody + svgFooter;
};

/**
 * Extracts the properties of an SVG string into an object.
 *
 * @param svgString the SVG string to parse
 * @returns an object containing the SVG properties
 */
export const getSvgProperties = (svgString: string): SvgOptions => {
  try {
    // Parse the XML string into a document
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(svgString, 'application/xml');

    // Check for parsing errors
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Invalid XML format');
    }

    // Get the first <svg> element
    const svgElement = xmlDoc.querySelector('svg');
    if (!svgElement) {
      throw new Error('<svg> element not found');
    }

    // If <svg> exists, return the value of the 'width' attribute
    const width = svgElement?.getAttribute('width');
    if (!width) {
      throw new Error('<svg> element must include dimensions (no width attribute exists)');
    }

    // Get the first child element of <svg>
    const firstChildElement = Array.from(svgElement?.children).find((child) => {
      return child instanceof Element;
    });

    // Get the id and style from the first child element
    const id = firstChildElement?.getAttribute('id') ?? '';
    const styleString = firstChildElement?.getAttribute('style') ?? '';

    // Split the style string into individual declarations
    const styles = styleString.split(';').filter((style) => style.trim() !== '');

    // Convert the declarations into a key-value map
    const styleMap: Record<string, string> = {};
    for (const style of styles) {
      const [key, value] = style.split(':').map((str) => str.trim());
      if (key && value) {
        styleMap[key] = value;
      }
    }

    const svgOpts: SvgOptions = {
      id,
      dimensions: Number(width),
      ...styleMap.fill && { fill: styleMap.fill },
      ...styleMap['fill-opacity'] && { fillOpacity: Number(styleMap['fill-opacity']) },
      ...styleMap.stroke && { stroke: styleMap.stroke },
      ...styleMap['stroke-width'] && { strokeWidth: Number(styleMap['stroke-width']) },
      ...styleMap['stroke-opacity'] && { strokeOpacity: Number(styleMap['stroke-opacity']) }
    };

    return svgOpts;
  } catch (error) {
    throw new Error('Error parsing SVG');
  }
};

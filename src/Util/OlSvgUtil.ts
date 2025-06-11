import { MarkSymbolizer, WellKnownName } from 'geostyler-style';
import OlStyleUtil, { DEGREES_TO_RADIANS } from './OlStyleUtil';

export const LINE_WELLKNOWNNAMES = ['horline', 'vertline', 'line'];
export const NOFILL_WELLKNOWNNAMES = [
  'horline',
  'vertline',
  'line',
  'cross',
  'cross2',
  'slash',
  'backslash',
  'oarrow',
  'x',
  'half_arc',
  'third_arc',
  'quarter_arc',
  'arrowhead'
];

const SVG_URI_SCHEME = 'data:image/svg+xml;utf8,';

export type svgDefinition = {
  [key: string]: string;
};

export const getEncodedSvg = (svgString: string) => {
  return SVG_URI_SCHEME + encodeURIComponent(svgString);
};

export const getDecodedSvg = (svgEncodedString: string) => {
  return decodeURIComponent(svgEncodedString).replace(SVG_URI_SCHEME, '');
};

export const getStyleComponents = (styleString: string) => {
  const styles = styleString.split(';').filter((style) => style.trim() !== '');

  // Convert the declarations into a key-value map
  const styleComponents: Record<string, string> = {};
  for (const style of styles) {
    const [key, value] = style.split(':').map((str) => str.trim());
    if (key && value) {
      styleComponents[key] = value;
    }
  };

  return styleComponents;
};

/**
 * Extracts the properties of an SVG string into a GeoStyler-Style MarkSymbolizer.
 *
 * @param svgString the SVG string to parse
 * @returns a GeoStyler-Style MarkSymbolizer
 */
export const getSvgProperties = (svgString: string): MarkSymbolizer | undefined => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgElement = svgDoc.querySelector('svg');
  const width = svgElement?.getAttribute('width');
  if (!svgElement) {
    return;
  };

  const firstChildElement = Array.from(svgElement.children).find((child) => {
    return child instanceof Element;
  });

  const wellKnownName = firstChildElement?.getAttribute('id') as WellKnownName;
  const styleString = firstChildElement?.getAttribute('style') ?? '';
  const styleComponents = getStyleComponents(styleString);

  const symbolizer: MarkSymbolizer = {
    kind: 'Mark',
    wellKnownName,
    radius: Number(width) / 2,
    ...styleComponents.fill && { color: styleComponents.fill },
    ...styleComponents['fill-opacity'] && { fillOpacity: Number(styleComponents['fill-opacity']) },
    ...styleComponents.stroke && { strokeColor: styleComponents.stroke },
    ...styleComponents['stroke-width'] && { strokeWidth: Number(styleComponents['stroke-width']) },
    ...styleComponents['stroke-opacity'] && { strokeOpacity: Number(styleComponents['stroke-opacity']) }
  };

  return symbolizer;
};

export const drawSvgToCanvas = (
  svgString: string,
  tmpContext: CanvasRenderingContext2D,
  canvasSize: number,
  rotation: number
) => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgElement = svgDoc.querySelector('svg');
  if (!svgElement) {
    return;
  }

  const viewBox = svgElement.getAttribute('viewBox') || '0 0 0 0';
  const viewBoxValues = viewBox.split(' ').map(parseFloat);
  const viewBoxSize = viewBoxValues[2];
  const isFillPattern = viewBoxSize === 8;
  const svgSize = parseFloat(svgElement.getAttribute('width') || '0');

  const scaleFactor = svgSize / viewBoxSize;
  const inverseScaleFactor = 1 / scaleFactor;

  tmpContext.save();

  // Fill patterns have all been define 8x8 with origin (0,0), and they don't require manipulation
  if (!isFillPattern) {
    tmpContext.translate(canvasSize / 2, canvasSize / 2);
    tmpContext.rotate(rotation * DEGREES_TO_RADIANS);
    tmpContext.scale(scaleFactor, scaleFactor);
  };

  const elements = svgElement.children;

  for (const element of elements) {
    const styleString = element.getAttribute('style') || '';
    const styleComponents = getStyleComponents(styleString);

    const fill = styleComponents.fill || '';
    const fillOpacity = Number(styleComponents['fill-opacity'] ?? 1);
    const fillHexAlpha = OlStyleUtil.getHexAlphaFromHexAndOpacity(fill, fillOpacity);
    const stroke = styleComponents.stroke || '';
    const strokeWidth = styleComponents['stroke-width'];
    const strokeOpacity = Number(styleComponents['stroke-opacity'] ?? 1);
    const strokeHexAlpha = OlStyleUtil.getHexAlphaFromHexAndOpacity(stroke, strokeOpacity);

    if (fillHexAlpha) {
      tmpContext.fillStyle = fillHexAlpha;
    } else {
      tmpContext.fillStyle = 'none';
    }

    if (strokeHexAlpha) {
      tmpContext.strokeStyle = strokeHexAlpha;
      // We are scaling the symbol, but we want maintain the stroke width
      tmpContext.lineWidth = Number(strokeWidth) * inverseScaleFactor;
    } else {
      tmpContext.strokeStyle = 'none';
      tmpContext.lineWidth = 0;
    }

    switch (element.tagName) {
      case 'rect':
        const x = parseFloat(element.getAttribute('x') || '0');
        const y = parseFloat(element.getAttribute('y') || '0');
        let width = parseFloat(String(element.getAttribute('width')));
        let height = parseFloat(String(element.getAttribute('height')));

        if (fillHexAlpha) {
          tmpContext.fillRect(x, y, width, height);
        };
        if (strokeHexAlpha) {
          tmpContext.strokeRect(x, y, width, height);
        };
        break;
      case 'circle':
        const cx = parseFloat(element.getAttribute('cx') || '0');
        const cy = parseFloat(element.getAttribute('cy') || '0');
        const r = parseFloat(element.getAttribute('r') || '0');

        tmpContext.beginPath();
        tmpContext.arc(cx, cy, r, 0, 2 * Math.PI);
        if (fillHexAlpha) {
          tmpContext.fill();
        };
        if (strokeHexAlpha) {
          tmpContext.stroke();
        };
        break;
      case 'polygon':
        const points = element.getAttribute('points')?.split(' ');
        if (!points) {break;}

        tmpContext.beginPath();
        for (let i = 0; i < points.length; i++) {
          const point = points[i].split(',');

          if (i === 0) {
            tmpContext.moveTo(parseFloat(point[0]), parseFloat(point[1]));
          } else {
            tmpContext.lineTo(parseFloat(point[0]), parseFloat(point[1]));
          }
        }
        tmpContext.closePath();
        if (fillHexAlpha) {
          tmpContext.fill();
        };
        if (strokeHexAlpha) {
          tmpContext.stroke();
        }
        break;
      case 'path':
        const d = element.getAttribute('d');
        if (!d) {break;}

        const commands = d.match(/[MALZ][^MALZ]*/g);
        if (!commands) {break;}

        tmpContext.beginPath();
        let currentX = 0;
        let currentY = 0;

        for (const command of commands) {
          const cmd = command[0];
          const args = command
            .split(/[, ]+/)
            .slice(1)
            .map(parseFloat);
          switch (cmd) {
            case 'M': // moveto
              for (let i = 0; i < args.length - 1; i += 2) {
                if (i < 2) {
                  tmpContext.moveTo(args[i], args[i + 1]);
                } else {
                  tmpContext.lineTo(args[i], args[i + 1]);
                };
                currentX = args[i];
                currentY = args[i + 1];
              };
              break;
            case 'L': // lineto
              for (let i = 0; i < args.length - 1; i += 2) {
                tmpContext.lineTo(args[i], args[i + 1]);
                currentX = args[i];
                currentY = args[i + 1];
              }
              break;
            case 'A': // elliptical arc
              // Convert SVG arc to canvas arc
              svgArcToCanvas(
                tmpContext,
                currentX,
                currentY,
                args[0],
                args[1],
                args[2],
                args[3],
                args[4],
                args[5],
                args[6]
              );

              currentX = args[5];
              currentY = args[6];
              break;
            case 'Z': // closepath
              tmpContext.closePath();
              break;
            default:
              break;
          }
        }
        if (fillHexAlpha) {
          tmpContext.fill();
        };
        if (strokeHexAlpha) {
          tmpContext.stroke();
        };
        break;
      default:
        break;
    }
  }

  tmpContext.restore();
};

/**
 * Converts an SVG elliptical arc command into a canvas arc and draws it.
 *
 * @param ctx - The canvas rendering context to draw on.
 * @param x1 - The x-coordinate of the starting point of the arc.
 * @param y1 - The y-coordinate of the starting point of the arc.
 * @param rx - The x-radius of the ellipse.
 * @param ry - The y-radius of the ellipse.
 * @param xAxisRotation - The rotation of the ellipse in degrees.
 * @param largeArcFlag - The large-arc flag (1 if the arc spans more than 180 degrees, 0 otherwise).
 * @param sweepFlag - The sweep flag (1 if the arc is drawn in a positive-angle direction, 0 otherwise).
 * @param x2 - The x-coordinate of the ending point of the arc.
 * @param y2 - The y-coordinate of the ending point of the arc.
 */
const svgArcToCanvas = (
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,  // Start point
  rx: number, ry: number,  // Radii
  xAxisRotation: number,   // Rotation in degrees
  largeArcFlag: number, sweepFlag: number, // Arc flags
  x2: number, y2: number   // End point
) => {
  const rad = (angle: number) => (angle * Math.PI) / 180;

  // Convert SVG elliptical arc to canvas-friendly parameters
  const dx = (x1 - x2) / 2;
  const dy = (y1 - y2) / 2;
  const cosRot = Math.cos(rad(xAxisRotation));
  const sinRot = Math.sin(rad(xAxisRotation));

  // Compute transformed start and end points
  const x1p = cosRot * dx + sinRot * dy;
  const y1p = -sinRot * dx + cosRot * dy;

  // Correct radii if necessary
  let rxsq = rx * rx;
  let rysq = ry * ry;
  let x1psq = x1p * x1p;
  let y1psq = y1p * y1p;

  let radiiCheck = x1psq / rxsq + y1psq / rysq;
  if (radiiCheck > 1) {
    rx *= Math.sqrt(radiiCheck);
    ry *= Math.sqrt(radiiCheck);
    rxsq = rx * rx;
    rysq = ry * ry;
  }

  // Compute center of the ellipse
  const sign = largeArcFlag !== sweepFlag ? 1 : -1;
  const coef = sign * Math.sqrt(
    Math.max(0, (rxsq * rysq - rxsq * y1psq - rysq * x1psq) / (rxsq * y1psq + rysq * x1psq))
  );

  const cxp = coef * ((rx * y1p) / ry);
  const cyp = coef * (-(ry * x1p) / rx);

  // Compute center in original coordinate system
  const cx = cosRot * cxp - sinRot * cyp + (x1 + x2) / 2;
  const cy = sinRot * cxp + cosRot * cyp + (y1 + y2) / 2;

  // Compute start and end angles
  const startAngle = Math.atan2((y1p - cyp) / ry, (x1p - cxp) / rx);
  let endAngle = Math.atan2((-y1p - cyp) / ry, (-x1p - cxp) / rx);

  // Adjust end angle based on sweep flag
  if (!sweepFlag && endAngle > startAngle) {
    endAngle -= 2 * Math.PI;
  } else if (sweepFlag && endAngle < startAngle) {
    endAngle += 2 * Math.PI;
  }

  // Draw the arc
  ctx.arc(cx, cy, rx, startAngle, endAngle, !sweepFlag);
};

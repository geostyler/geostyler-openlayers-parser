import type OlImageState from 'ol/ImageState';
import type OlFeature from 'ol/Feature';

import type OlStyle from 'ol/style/Style';
import type OlStyleImage from 'ol/style/Image';
import type OlStyleStroke from 'ol/style/Stroke';
import type OlStyleText from 'ol/style/Text';
import type OlStyleCircle from 'ol/style/Circle';
import type OlStyleFill from 'ol/style/Fill';
import type OlStyleIcon from 'ol/style/Icon';
import type OlStyleRegularshape from 'ol/style/RegularShape';

import type OlLineString from 'ol/geom/LineString';
import type OlMultiLineString from 'ol/geom/MultiLineString';
import type OlPolygon from 'ol/geom/Polygon';
import type OlMultiPolygon from 'ol/geom/MultiPolygon';
import type OlGeomPoint from 'ol/geom/Point';

export interface OlRuntime {
  style: {
    Style: typeof OlStyle;
    Image: typeof OlStyleImage;
    Fill: typeof OlStyleFill;
    Stroke: typeof OlStyleStroke;
    Text: typeof OlStyleText;
    Circle: typeof OlStyleCircle;
    Icon: typeof OlStyleIcon;
    Regularshape: typeof OlStyleRegularshape;
  };
  geom: {
    LineString: typeof OlLineString;
    MultiLineString: typeof OlMultiLineString;
    Polygon: typeof OlPolygon;
    MultiPolygon: typeof OlMultiPolygon;
    Point: typeof OlGeomPoint;
  };
  Feature: typeof OlFeature;
  ImageState: typeof OlImageState;
}

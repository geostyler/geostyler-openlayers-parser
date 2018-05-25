import * as ol from 'openlayers';
import {
  Style,
  StyleParser,
  Rule,
  Symbolizer,
  CircleSymbolizer,
  LineSymbolizer,
  FillSymbolizer,
  TextSymbolizer
} from 'geostyler-style';
import OlStyleUtil from './Util/OlStyleUtil';

/**
 * This parser can be used with the GeoStyler.
 * It implements the GeoStyler-Style Parser interface to work with OpenLayers styles.
 *
 * @class OlStyleParser
 * @implements StyleParser
 */
class OlStyleParser implements StyleParser {

  olStyleToGeoStylerStyle(olStyle: ol.style.Style): any {
    return null;
  }

  /**
   * The readStyle implementation of the GeoStyler-Style StyleParser interface.
   * It reads an OpenLayers style instance and returns a Promise.
   * The Promise itself resolves with a GeoStyler-Style Style.
   *
   * @param {string} olStyle An OpenLayers style instance
   * @return {Promise} The Promise resolving with the GeoStyler-Style Style
   */
  readStyle(olStyle: ol.style.Style): Promise<Style> {
    return new Promise<Style>((resolve, reject) => {
      try {

        const geoStylerStyle: Style = this.olStyleToGeoStylerStyle(olStyle);
        resolve(geoStylerStyle);

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * The writeStyle implementation of the GeoStyler-Style StyleParser interface.
   * It reads a GeoStyler-Style Style and returns a Promise.
   * The Promise itself resolves with an OpenLayers style object.
   *
   * @param {Style} geoStylerStyle A GeoStyler-Style Style.
   * @return {Promise} The Promise resolving with an OpenLayers style instance.
   */
  writeStyle(geoStylerStyle: Style): Promise<ol.style.Style[]> {
    return new Promise<any>((resolve, reject) => {
      try {

        const olStyles = this.geoStylerStyleToOlStyle(geoStylerStyle);
        resolve(olStyles);

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get the OpenLayers Style object from an GeoStyler-Style Style
   *
   * @param {Style} geoStylerStyle A GeoStyler-Style Style.
   * @return {ol.style.Style} An OpenLayers style instance
   */
  geoStylerStyleToOlStyle(geoStylerStyle: Style): any {

    const rules = geoStylerStyle.rules;

    let symbArr: any[] = [];
    rules.forEach((rule: Rule) => {
      symbArr.push(this.getOlSymbolizerFromSymbolizer(rule.symbolizer));
    });

    return symbArr;
  }

  /**
   * Get the OpenLayers Style object or an OL StyleFunction from an
   * GeoStyler-Style Symbolizer.
   *
   * @param {Symbolizer} symbolizer A GeoStyler-Style Symbolizer.
   * @return {object} The OpenLayers Style object or a StyleFunction
   */
  getOlSymbolizerFromSymbolizer(symbolizer: Symbolizer): any {
    let olSymbolizer: ol.style.Style | ol.StyleFunction;
    switch (symbolizer.kind) {
      case 'Circle':
        olSymbolizer = this.getOlPointSymbolizerFromCircleSymbolizer(symbolizer);
        break;
      // case 'Icon':
      //   // TODO Implement logic for IconSymbolizer parsing
      //   // sldSymbolizer = this.getSldPointSymbolizerFromIconSymbolizer(symbolizer);
      //   break;
      case 'Text':
        olSymbolizer = this.getOlTextSymbolizerFromTextSymbolizer(symbolizer);
        break;
      case 'Line':
        olSymbolizer = this.getOlLineSymbolizerFromLineSymbolizer(symbolizer);
        break;
      case 'Fill':
        olSymbolizer = this.getOlPolygonSymbolizerFromFillSymbolizer(symbolizer);
        break;
      default:
        // Return the OL default style since the TS type binding does not allow
        // us to set olSymbolizer to undefined
        var fill = new ol.style.Fill({
          color: 'rgba(255,255,255,0.4)'
        });
        var stroke = new ol.style.Stroke({
          color: '#3399CC',
          width: 1.25
        });
        olSymbolizer = new ol.style.Style({
          image: new ol.style.Circle({
            fill: fill,
            stroke: stroke,
            radius: 5
          }),
          fill: fill,
          stroke: stroke
        });
        break;
    }
    return olSymbolizer;
  }

  /**
   * Get the OL Style object  from an GeoStyler-Style CircleSymbolizer.
   *
   * @param {CircleSymbolizer} circleSymbolizer A GeoStyler-Style CircleSymbolizer.
   * @return {object} The OL Style object
   */
  getOlPointSymbolizerFromCircleSymbolizer(symbolizer: CircleSymbolizer): ol.style.Style {
    let stroke;
    if (symbolizer.strokeColor) {
      stroke = new ol.style.Stroke({
        color: symbolizer.strokeColor,
        width: symbolizer.strokeWidth
      });
    }

    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: symbolizer.radius || 5,
        fill: new ol.style.Fill({
          color: (symbolizer.color && symbolizer.opacity) ?
            OlStyleUtil.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color
        }),
        stroke: stroke
      })
    });
  }

  /**
   * Get the OL Style object from an GeoStyler-Style LineSymbolizer.
   *
   * @param {LineSymbolizer} lineSymbolizer A GeoStyler-Style LineSymbolizer.
   * @return {object} The OL Style object
   */
  getOlLineSymbolizerFromLineSymbolizer(symbolizer: LineSymbolizer) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: (symbolizer.color && symbolizer.opacity) ?
          OlStyleUtil.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color,
        width: symbolizer.width
      })
    });
  }

  /**
   * Get the OL Style object from an GeoStyler-Style FillSymbolizer.
   *
   * @param {FillSymbolizer} fillSymbolizer A GeoStyler-Style FillSymbolizer.
   * @return {object} The OL Style object
   */
  getOlPolygonSymbolizerFromFillSymbolizer(symbolizer: FillSymbolizer) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: symbolizer.outlineColor
      }),
      fill: new ol.style.Fill({
        color: (symbolizer.color && symbolizer.opacity) ?
          OlStyleUtil.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color
      })
    });
  }

  /**
   * Get the OL StyleFunction object from an GeoStyler-Style TextSymbolizer.
   *
   * @param {TextSymbolizer} textSymbolizer A GeoStyler-Style TextSymbolizer.
   * @return {object} The OL StyleFunction
   */
  getOlTextSymbolizerFromTextSymbolizer(symbolizer: TextSymbolizer): ol.StyleFunction {

    const olPointStyledLabelFn = (feature: ol.Feature, res: number) => {

      const text = new ol.style.Text({
        font: OlStyleUtil.getTextFont(symbolizer),
        text: feature.get(symbolizer.field || ''),
        fill: new ol.style.Fill({
          color: (symbolizer.color && symbolizer.opacity) ?
            OlStyleUtil.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color
        }),
        stroke: new ol.style.Stroke({
          color: (symbolizer.color && symbolizer.opacity) ?
            OlStyleUtil.getRgbaColor(symbolizer.color, symbolizer.opacity) : symbolizer.color
        }),
        offsetX: symbolizer.offset ? symbolizer.offset[0] : 0,
        offsetY: symbolizer.offset ? symbolizer.offset[1] : 0,
        // TODO check why props match
        // textAlign: symbolizer.pitchAlignment,
        // textBaseline: symbolizer.anchor
      });

      const style = new ol.style.Style({
        text: text
      });

      return style;
    };

    return olPointStyledLabelFn;
  }

}

export default OlStyleParser;

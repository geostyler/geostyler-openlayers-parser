import { Style, StyleParser } from 'geostyler-style';

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
  writeStyle(geoStylerStyle: Style): Promise<string> {
    return new Promise<any>((resolve, reject) => {
      try {

        const olStyle = this.geoStylerStyleToOlStyle(geoStylerStyle);
        resolve(olStyle);

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
    return null;
  }

}

export default OlStyleParser;

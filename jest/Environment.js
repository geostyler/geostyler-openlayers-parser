import Environment from 'jest-environment-jsdom';

/**
 * A custom environment to set the TextEncoder.
 */
module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    // https://github.com/jsdom/jsdom/issues/3363
    this.global.structuredClone = structuredClone;
  }
};

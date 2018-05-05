// @flow

import path from 'path';
import ComponentScan from '../ComponentScan';
import componentContainer from '../ComponentContainer';

const FIRST_COMPONENT = 'FirstComponent';
const SECOND_COMPONENT = 'SecondComponent';
const JS_EXT = '.js';
const BASE_PATH = path.resolve(__dirname, '../__fixtures__/scanService');

const COMPONENT_PATHS = [
  path.resolve(BASE_PATH, FIRST_COMPONENT + JS_EXT),
  path.resolve(BASE_PATH, SECOND_COMPONENT + JS_EXT),
];

afterEach(() => {
  componentContainer.registered = {};
});

it('should do component scan on directory', async () => {
  ComponentScan.scan(COMPONENT_PATHS);

  expect(componentContainer.registered.FirstComponent).toBeDefined();
  expect(componentContainer.registered.SecondComponent).toBeDefined();
});

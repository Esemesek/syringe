// @flow

import InjectorService from '../InjectorService';
import componentContainer from '../ComponentContainer';

const COMPONENT_NAME = 'SOME_COMPONENT';
const COMPONENT = {
  something: 'anything',
};

afterEach(() => {
  componentContainer.components = {};
});

it('should get components from container', () => {
  (componentContainer.components: any)[COMPONENT_NAME] = COMPONENT;

  expect(InjectorService.get(COMPONENT_NAME)).toEqual(COMPONENT);
});

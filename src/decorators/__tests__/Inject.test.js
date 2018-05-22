// @flow

import Inject from '../Inject';
import componentContainer from '../../services/ComponentContainer';

const COMPONENT_NAME = 'SOME_COMPONENT';
const COMPONENT = {
  something: 'anything',
};

afterEach(() => {
  componentContainer.components = {};
});

it('should inject existing component', () => {
  (componentContainer.components: any)[COMPONENT_NAME] = COMPONENT;

  class Component {
    @Inject(COMPONENT_NAME)
    component;
  }

  expect(new Component().component).toEqual(COMPONENT);
});

it('should throw error for not existent component', () => {
  expect(() => {
    class Component { // eslint-disable-line no-unused-vars
      @Inject(COMPONENT_NAME)
      component;
    }
  }).toThrowError();
});

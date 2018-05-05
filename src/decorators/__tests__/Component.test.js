// @flow

import Component from '../Component';
import componentContainer from '../../services/ComponentContainer';

const COMPONENT_NAME: string = 'SomeComponent';
const DEPENDENCIES: string[] = ['FirstComponent', 'SecondComponent'];

afterEach(() => {
  componentContainer.registered = {};
});

it('should register component without dependencies', () => {
  @Component({
    name: COMPONENT_NAME,
  })
  class SomeComponent {
  }

  expect(componentContainer.registered[COMPONENT_NAME]).toEqual({
    name: COMPONENT_NAME,
    dependencies: [],
    constructor: SomeComponent,
  });
});

it('should register component with dependencies', () => {
  @Component({
    name: COMPONENT_NAME,
    dependencies: DEPENDENCIES,
  })
  class SomeComponent {
  }

  expect(componentContainer.registered[COMPONENT_NAME]).toEqual({
    name: COMPONENT_NAME,
    dependencies: DEPENDENCIES,
    constructor: SomeComponent,
  });
});

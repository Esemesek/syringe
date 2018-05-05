// @flow

import type { ComponentDefinition } from '../ComponentContainer';

class SomeComponent {
}

class AnotherComponent {
  someComponent: SomeComponent;

  constructor(someComponent: SomeComponent) {
    this.someComponent = someComponent;
  }
}

export const SOME_COMPONENT: ComponentDefinition = {
  name: 'SomeComponent',
  constructor: SomeComponent,
  dependencies: [],
};

export const ANOTHER_COMPONENT: ComponentDefinition = {
  name: 'AnotherComponent',
  constructor: AnotherComponent,
  dependencies: ['SomeComponent'],
};

export const CIRCULAR_COMPONENT: ComponentDefinition = {
  name: 'SomeComponent',
  constructor: AnotherComponent,
  dependencies: ['AnotherComponent'],
};

export const SELF_CIRCULAR_COMPONENT: ComponentDefinition = {
  name: 'SelfCircularComponent',
  constructor: SomeComponent,
  dependencies: ['SelfCircularComponent'],
};

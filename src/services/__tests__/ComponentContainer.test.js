// @flow

import { ComponentContainer } from '../ComponentContainer';
import CircularDependencyError from '../../errors/CircularDependencyError';
import DuplicateError from '../../errors/DuplicateError';
import NotFoundError from '../../errors/NotFoundError';
import {
  SOME_COMPONENT,
  ANOTHER_COMPONENT,
  CIRCULAR_COMPONENT,
  SELF_CIRCULAR_COMPONENT,
} from '../__fixtures__/components';

let componentContainer;

beforeEach(() => {
  componentContainer = new ComponentContainer();
});

it('should register component', () => {
  componentContainer.register(SOME_COMPONENT);

  expect(componentContainer.registered[SOME_COMPONENT.name]).toEqual(SOME_COMPONENT);
});

it('should not register duplicate components', () => {
  componentContainer.register(SOME_COMPONENT);

  expect(() => {
    componentContainer.register(SOME_COMPONENT);
  }).toThrowError(new DuplicateError(SOME_COMPONENT.name));
  expect(componentContainer.registered[SOME_COMPONENT.name]).toEqual(SOME_COMPONENT);
});

it('should throw exception on getting non existent component', () => {
  const NON_EXISTENT_COMPONENT = 'NonExistentComponent';
  componentContainer.register(SOME_COMPONENT);

  expect(() => {
    componentContainer.getComponent(NON_EXISTENT_COMPONENT);
  }).toThrowError(new NotFoundError(NON_EXISTENT_COMPONENT));
});

it('should create registered components without dependencies', () => {
  componentContainer.register(SOME_COMPONENT);

  componentContainer.start();

  expect(componentContainer.getComponent(SOME_COMPONENT.name))
    .toBeInstanceOf(SOME_COMPONENT.constructor);
});

it('should create registered components with dependencies', () => {
  componentContainer.register(ANOTHER_COMPONENT);
  componentContainer.register(SOME_COMPONENT);

  componentContainer.start();

  const anotherComponent = componentContainer.getComponent(ANOTHER_COMPONENT.name);

  expect(anotherComponent).toBeInstanceOf(ANOTHER_COMPONENT.constructor);
  expect(anotherComponent.someComponent).toBeInstanceOf(SOME_COMPONENT.constructor);
});

it('should throw exception when registered component have undefined dependency', () => {
  componentContainer.register(ANOTHER_COMPONENT);

  expect(() => {
    componentContainer.start();
  }).toThrowError(new NotFoundError(SOME_COMPONENT.name));
});

it('should throw exception for self circular component', () => {
  componentContainer.register(SELF_CIRCULAR_COMPONENT);

  expect(() => {
    componentContainer.start();
  }).toThrowError(new CircularDependencyError());
});

it('should throw exception for circular component', () => {
  componentContainer.register(ANOTHER_COMPONENT);
  componentContainer.register(CIRCULAR_COMPONENT);

  expect(() => {
    componentContainer.start();
  }).toThrowError(new CircularDependencyError());
});

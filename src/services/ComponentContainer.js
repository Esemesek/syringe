// @flow

import CircularDependencyError from '../errors/CircularDependencyError';
import DuplicateError from '../errors/DuplicateError';
import NotFoundError from '../errors/NotFoundError';

export type ComponentDefinition = {
  name: string,
  constructor: Function,
  dependencies: string[],
};

export type ComponentDefinitionMap = {
  [string]: ComponentDefinition,
};

export class ComponentContainer {
  registered: ComponentDefinitionMap = {};
  components = {};

  register({ name, constructor, dependencies }: ComponentDefinition): void {
    if (this.registered[name]) {
      throw new DuplicateError(name);
    }

    this.registered[name] = {
      name,
      constructor,
      dependencies,
    };
  }

  start(): void {
    if (this.areDependenciesCyclic()) {
      throw new CircularDependencyError();
    }

    this.createDependencies();
  }

  getComponent = (name: string): any => {
    const component = this.components[name];
    if (component === undefined) {
      throw new NotFoundError(name);
    }

    return component;
  }

  createDependencies = () => Object.keys(this.registered).forEach(this.createDependency);

  createNodeDependencies = (key: string) => {
    this.registered[key].dependencies.forEach(this.createDependency);
  }

  createDependency = (dep: string) => {
    if (this.components[dep] === undefined) {
      if (this.registered[dep].dependencies.length > 0) {
        this.createNodeDependencies(dep);
      }

      this.components[dep] = new this.registered[dep]
        .constructor(...this.getDependenciesFromContainer(this.registered[dep].dependencies));
    }
  }

  getDependenciesFromContainer = (dependencies: string[]): any[] =>
    dependencies.map(this.getComponent)

  areDependenciesCyclic(): boolean {
    return Object.keys(this.registered).some(this.isComponentCyclic);
  }

  isComponentCyclic = (key: string): boolean => this.registered[key].dependencies.includes(key)
      || this.checkComponentDependencies(key, this.registered[key].dependencies)

  checkComponentDependencies(key: string, dependencies: string[]): boolean {
    return dependencies.some((dep: string) => {
      if (this.registered[dep] === undefined) {
        throw new NotFoundError(dep);
      }

      return dependencies.includes(key)
        || this.checkComponentDependencies(key, this.registered[dep].dependencies);
    });
  }
}

export default new ComponentContainer();

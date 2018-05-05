// @flow

export default class CircularDependencyError extends Error {
  constructor() {
    super('There is a cycle in dependencies');
  }
}

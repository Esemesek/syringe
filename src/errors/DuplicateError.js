// @flow

export default class DuplicateError extends Error {
  constructor(name: string) {
    super(`Multiple components with the same name: ${name}`);
  }
}

// @flow

export default class NotFoundError extends Error {
  constructor(name: string) {
    super(`Component ${name} not found`);
  }
}

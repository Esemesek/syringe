// @flow

import glob from 'glob';

export default class ComponentScan {
  static scan = (paths: string[]): void => {
    paths
      .reduce(ComponentScan.getPaths, [])
      .forEach(require);
  }

  static getPaths = (acc: string[], path: string) => [
    ...acc,
    ...glob.sync(path),
  ]
}

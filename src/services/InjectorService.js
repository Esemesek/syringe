// @flow

import componentContainer from './ComponentContainer';

export default class InjectorService {
  static get(name: string) {
    return componentContainer.getComponent(name);
  }
}

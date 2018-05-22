// @flow

import InjectorService from '../services/InjectorService';

const Inject = (name: string) => () => ({
  value: InjectorService.get(name),
});

export default Inject;

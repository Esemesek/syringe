// @flow

import componentContainer from '../services/ComponentContainer';

type ComponentConfig = {
  name: string,
  dependencies: string[],
};

const Component = ({ name, dependencies = [] }: ComponentConfig) => (target: any) => {
  componentContainer.register({ name, dependencies, constructor: target });
};

export default Component;

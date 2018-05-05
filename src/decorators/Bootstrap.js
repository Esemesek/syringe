// @flow

import componentContainer from '../services/ComponentContainer';
import ComponentScan from '../services/ComponentScan';

const Bootstrap = ({ scan }: { scan: string[] }) => (target: any) => {
  ComponentScan.scan(scan);

  componentContainer.start();

  target.main();
};

export default Bootstrap;

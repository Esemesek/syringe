// @flow

import componentContainer from '../../services/ComponentContainer';
import ComponentScan from '../../services/ComponentScan';
import Component from '../Component';
import Bootstrap from '../Bootstrap';

const scanMock = jest.fn();
const COMPONENT_PATHS = [
  '/one/path',
  '/second/path',
];

ComponentScan.scan = scanMock;

afterEach(() => {
  componentContainer.components = {};
  componentContainer.registered = {};
  scanMock.mockReset();
});

it('should bootstrap container', () => {
  const COMPONENT_NAME: string = 'SomeComponent';

  @Component({
    name: COMPONENT_NAME,
  })
  class SomeComponent {
  }

  @Bootstrap({
    scan: COMPONENT_PATHS,
  })
  class Main {
    static main = jest.fn();
  }

  expect(componentContainer.getComponent(COMPONENT_NAME)).toBeInstanceOf(SomeComponent);
  expect(Main.main.mock.calls.length).toEqual(1);
  expect(scanMock.mock.calls[0][0]).toEqual(COMPONENT_PATHS);
});

// @flow

import Component from '../../../decorators/Component';

@Component({
  name: 'SecondComponent',
  dependencies: ['FirstComponent'],
})
export default class SecondComponent {
}

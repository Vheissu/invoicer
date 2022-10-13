import { customElement } from 'aurelia';
import { IRouteableComponent } from '@aurelia/router';

@customElement({
  name: 'not-found',
  template: `<h1>Not found</h1>`
})
export class NotFound implements IRouteableComponent {

}
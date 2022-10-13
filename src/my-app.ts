import { IRouteableComponent, IRoute } from '@aurelia/router';

export class MyApp implements IRouteableComponent {

  static routes: IRoute[] = [
    {
      path: '',
      title: 'Home',
      component: () => import('./components/home'),
    },
    {
      path: 'invoice/:invoidId',
      title: 'Invoice',
      component: () => import('./components/invoice'),
    },
    {
      path: 'invoices',
      title: 'Invoices',
      component: () => import('./components/invoices'),
    },
    {
      path: 'create-invoice',
      title: 'Create Invoice',
      component: () => import('./components/create-invoice'),
    },
    {
      path: 'contacts',
      title: 'Contacts',
      component: () => import('./components/contacts'),
    },
    {
      path: 'settings',
      title: 'Settings',
      component: () => import('./components/settings'),
    },
    {
      path: '*',
      title: 'Not found',
      component: () => import('./components/not-found'),
    }
  ];

}

import { IRouteableComponent, IRoute } from '@aurelia/router';

export class MyApp implements IRouteableComponent {

  static routes: IRoute[] = [
    {
      path: '',
      title: 'Home',
      component: () => import('./components/home/home-page'),
    },
    {
      path: 'invoice/:invoiceId',
      title: 'Invoice',
      component: () => import('./components/invoice/invoice-page'),
    },
    {
      path: 'invoices',
      title: 'Invoices',
      component: () => import('./components/invoices/invoices-page'),
    },
    {
      path: 'create-invoice',
      title: 'Create Invoice',
      component: () => import('./components/create-invoice/create-invoice'),
    },
    {
      path: 'contacts',
      title: 'Contacts',
      component: () => import('./components/contacts/contacts-page'),
    },
    {
      path: 'settings',
      title: 'Settings',
      component: () => import('./components/settings/settings-page'),
    },
    {
      path: '*',
      title: 'Not found',
      component: () => import('./components/not-found/not-found'),
    }
  ];

}

import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';

export const errorRoute: Routes = [
  {
    path: '404/:error',
    component: ErrorComponent,
    data: {
      errorTitle: 'Page not found',
    },
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      errorTitle: 'Page not found',
      errorMessage: 'The page you’re looking for doesn’t exist.',
    },
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

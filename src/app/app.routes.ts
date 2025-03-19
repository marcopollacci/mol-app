import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/components/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'operations',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/operations/components/home-operations/home-operations.component'
          ).then((m) => m.HomeOperationsComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

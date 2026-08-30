import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'guide',
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'program',
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'price',
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      ),
  },
];
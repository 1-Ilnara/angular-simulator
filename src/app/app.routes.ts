import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from './interceptors/auth.guard';
import { postResolver } from './services/post.resolver';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.components').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'guide',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'program',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'price',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'blog',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'contacts',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'user',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (m) => m.UsersPageComponent
      ),
  },
  {
    path: 'posts',
    canActivate: [authGuard],
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'posts/create',
    canActivate: [authGuard],
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/post-create/post-create.component').then(
        (m) => m.PostCreateComponent
      ),
  },
  {
    path: 'posts/:id',
    canActivate: [authGuard],
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent
      ),
    resolve: {
      post: postResolver,
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      ),
  },
];
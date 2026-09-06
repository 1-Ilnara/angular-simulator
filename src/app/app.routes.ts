import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { postResolver } from './services/post.resolver';

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
    path: 'posts',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'posts/create',
    loadComponent: (): Promise<Type<unknown>> =>
      import('./pages/post-create/post-create.component').then(
        (m) => m.PostCreateComponent
      ),
  },
  {
    path: 'posts/:id',
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
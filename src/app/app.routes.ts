import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from './interceptors/auth.guard';
import { adminGuard } from './interceptors/admin.guard';
import { postResolver } from './services/post.resolver';
import { productResolver } from './features/products/routing/product.resolver';

export const routes: Routes = [
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: (): Promise<Type<unknown>> =>
      import('./features/products/pages/product-list-page/product-list-page.component').then(
        (m) => m.ProductListPageComponent,
      ),
  },
  {
    path: 'products/:id',
    canActivate: [authGuard],
    loadComponent: (): Promise<Type<unknown>> =>
      import('./features/products/pages/product-detail-page/product-detail-page.component').then(
        (m) => m.ProductDetailPageComponent,
      ),
    resolve: { product: productResolver },
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: (): Promise<Type<unknown>> =>
      import('./features/products/pages/cart-page/cart-page.component').then(
        (m) => m.CartPageComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.components').then((m) => m.LoginComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'guide',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'program',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'price',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'blog',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'contacts',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then((m) => m.UsersPageComponent),
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/users-page/users-page.component').then((m) => m.UsersPageComponent),
      },
    ],
  },
  {
    path: 'posts',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        loadComponent: (): Promise<Type<unknown>> =>
          import('./pages/posts/posts.component').then((m) => m.PostsComponent),
      },
      {
        path: 'create',
        loadComponent: (): Promise<Type<unknown>> =>
          import('./pages/post-create/post-create.component').then((m) => m.PostCreateComponent),
      },
      {
        path: ':id',
        loadComponent: (): Promise<Type<unknown>> =>
          import('./pages/post-detail/post-detail.component').then((m) => m.PostDetailComponent),
        resolve: {
          post: postResolver,
        },
      },
    ],
  },
  {
    path: 'homework-28',
    loadComponent: (): Promise<Type<unknown>> =>
      import('../homework-28/homework-28.component').then((m) => m.Homework28Component),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];

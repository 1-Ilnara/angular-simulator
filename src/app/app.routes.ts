import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'users',
    component: UsersPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

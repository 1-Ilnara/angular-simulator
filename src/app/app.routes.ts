import { Routes } from '@angular/router';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

export const routes: Routes = [
  { path: '', component: UsersPageComponent },
  { path: 'guide', component: UsersPageComponent },
  { path: 'program', component: UsersPageComponent },
  { path: 'price', component: UsersPageComponent },
  { path: 'blog', component: UsersPageComponent },
  { path: 'contacts', component: UsersPageComponent },
  { path: 'user', component: UsersPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

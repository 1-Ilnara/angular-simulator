import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface INavigationItem {
  label: string;
  path: string;
  id: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  navigationItems: INavigationItem[] = [
    {
      label: 'Главная',
      path: '/',
      id: 'nav-link-home'
    },
    {
      label: 'Пользователи',
      path: '/users',
      id: 'nav-link-users'
    }
  ];
}

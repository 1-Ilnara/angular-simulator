import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INavigation } from '../../../interfaces/INavigation';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  navigationItems: INavigation[] = [ 
    { label: 'Главная', path: '/' },
    { label: 'Про гида', path: '/guide' },
    { label: 'Программа тура', path: '/program' },
    { label: 'Стоимость', path: '/price' },
    { label: 'Блог', path: '/blog' },
    { label: 'Контакты', path: '/contacts' }
  ]; 
}
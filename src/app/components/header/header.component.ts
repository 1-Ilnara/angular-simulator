import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; 

interface INavigation {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navigation: INavigation[] = [ 
    { label: 'Главная', path: '/' },
    { label: 'Про гида', path: '/guide' },
    { label: 'Программа тура', path: '/program' },
    { label: 'Стоимость', path: '/price' },
    { label: 'Блог', path: '/blog' },
    { label: 'Контакты', path: '/contacts' }
  ]; 
  companyName: string = 'РумТибет';
}
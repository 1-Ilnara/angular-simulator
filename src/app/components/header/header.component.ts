import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { INavigation } from '../../../interfaces/INavigation';
import { ThemeService } from '../../services/theme.service';
import { PresetTheme } from '../../../enums/preset-theme';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../../interfaces/IUser';

interface IThemeOption {
  label: string;
  value: PresetTheme;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    ToggleSwitchModule,
    SelectButtonModule,
    ButtonModule,
    FontAwesomeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private themeService: ThemeService = inject(ThemeService);
  private authService: AuthService = inject(AuthService);

  companyName: string = 'РумТибет';

  INavigation: INavigation[] = [
    { label: 'Главная', path: '/' },
    { label: 'Про гида', path: '/guide' },
    { label: 'Программа тура', path: '/program' },
    { label: 'Стоимость', path: '/price' },
    { label: 'Блог', path: '/blog' },
    { label: 'Контакты', path: '/contacts' }
  ];

  adminNavigation: INavigation[] = [
    { label: 'Посты', path: '/posts' },
    { label: 'Пользователи', path: '/users' }
  ];

  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;

  isDarkMode$ = this.themeService.isDarkMode$;
  currentTheme$ = this.themeService.currentTheme$;
  currentUser$: Observable<IUser | null> = this.authService.currentUser$;

  isAdmin$: Observable<boolean> = this.authService.currentUser$.pipe(
    map((user: IUser | null) => user?.role === 'admin')
  );

  themeOptions: IThemeOption[] = [
    { label: 'Aura', value: PresetTheme.Aura },
    { label: 'Lara', value: PresetTheme.Lara },
    { label: 'Nora', value: PresetTheme.Nora }
  ];

  onDarkModeToggle(event: ToggleSwitchChangeEvent): void {
    if (event.checked !== undefined) {
      this.themeService.toggleDarkMode(event.checked);
    }
  }

  onThemeChange(event: SelectButtonChangeEvent): void {
    const theme = event.value as PresetTheme;
    if (theme) {
      this.themeService.setTheme(theme);
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}
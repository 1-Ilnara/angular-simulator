import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router'; 

import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { INavigation } from '../../../interfaces/INavigation';
import { ThemeService } from '../../services/theme.service';
import { PresetTheme } from '../../../enums/preset-theme';

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
    FontAwesomeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
 companyName: string = 'РумТибет';

  INavigation: INavigation[] = [ 
    { label: 'Главная', path: '/' },
    { label: 'Про гида', path: '/guide' },
    { label: 'Программа тура', path: '/program' },
    { label: 'Стоимость', path: '/price' },
    { label: 'Блог', path: '/blog' },
    { label: 'Контакты', path: '/contacts' }
  ];

  private readonly themeService: ThemeService = inject(ThemeService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

   faSun: IconDefinition = faSun;
   faMoon: IconDefinition = faMoon;

  isDarkMode: boolean = false;
  selectedTheme: PresetTheme = PresetTheme.Aura;

  themeOptions: IThemeOption[] = [
    { label: 'Aura', value: PresetTheme.Aura },
    { label: 'Lara', value: PresetTheme.Lara },
    { label: 'Nora', value: PresetTheme.Nora }
  ];

  ngOnInit(): void {
  this.themeService.isDarkMode$.pipe(
    tap((isDark: boolean) => {
      this.isDarkMode = isDark;
    }),
    takeUntilDestroyed(this.destroyRef)
  ).subscribe();

  this.themeService.currentTheme$.pipe(
    tap((presetTheme) => {
      this.selectedTheme = presetTheme as PresetTheme;
    }),
    takeUntilDestroyed(this.destroyRef)
  ).subscribe();
}

  onDarkModeToggle(event: ToggleSwitchChangeEvent): void {
    const isChecked = event.checked ?? this.isDarkMode;
    this.themeService.toggleDarkMode(isChecked);
  }

  onThemeChange(event: SelectButtonChangeEvent): void {
    const theme = (event.value as PresetTheme) ?? this.selectedTheme;
    if (theme) {
      this.themeService.setTheme(theme);
    }
  }

}
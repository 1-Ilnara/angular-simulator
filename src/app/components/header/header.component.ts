import { INavigation } from './../../../interfaces/INavigation';
import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router'; 

import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { ThemeService, PresetTheme } from '../../services/theme.service';

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

  private themeService: ThemeService = inject(ThemeService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;

  isDarkMode: boolean = false;
  selectedTheme: PresetTheme = 'Aura';

  themeOptions: { label: string; value: PresetTheme }[] = [
    { label: 'Aura', value: 'Aura' },
    { label: 'Lara', value: 'Lara' },
    { label: 'Nora', value: 'Nora' }
  ];

  ngOnInit(): void {
    this.themeService.isDarkMode$.pipe(
      tap((isDark: boolean) => (this.isDarkMode = isDark)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();

    this.themeService.currentTheme$.pipe(
      tap((theme: PresetTheme) => (this.selectedTheme = theme)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  onDarkModeToggle(): void {
    this.themeService.toggleDarkMode(this.isDarkMode);
  }

  onThemeChange(): void {
    if (this.selectedTheme) {
      this.themeService.setTheme(this.selectedTheme);
    }
  }

}
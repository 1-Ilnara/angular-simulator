import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

export type PresetTheme = 'Aura' | 'Lara' | 'Nora';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private readonly DARK_MODE_KEY: string = 'is_dark_mode';
  private readonly THEME_KEY: string = 'selected_theme';

  private initialIsDark: boolean = this.localStorageService.getItem<boolean>(this.DARK_MODE_KEY) ?? false;
  private initialTheme: PresetTheme = this.localStorageService.getItem<PresetTheme>(this.THEME_KEY) ?? 'Aura';

  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.initialIsDark);
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  private currentThemeSubject: BehaviorSubject<PresetTheme> = new BehaviorSubject<PresetTheme>(this.initialTheme);
  currentTheme$: Observable<PresetTheme> = this.currentThemeSubject.asObservable();

  constructor() {
    this.applyDarkMode(this.initialIsDark);
    this.applyPresetTheme(this.initialTheme);
  }

  toggleDarkMode(isDark: boolean): void {
    this.isDarkModeSubject.next(isDark);
    this.localStorageService.setItem(this.DARK_MODE_KEY, isDark);
    this.applyDarkMode(isDark);
  }

  setTheme(theme: PresetTheme): void {
    this.currentThemeSubject.next(theme);
    this.localStorageService.setItem(this.THEME_KEY, theme);
    this.applyPresetTheme(theme);
  }

  private applyDarkMode(isDark: boolean): void {
    const element: HTMLElement = document.documentElement;
    if (isDark) {
      element.classList.add('my-app-dark');
    } else {
      element.classList.remove('my-app-dark');
    }
  }

  private applyPresetTheme(theme: PresetTheme): void {
    const presets: Record<PresetTheme, typeof Aura> = { Aura, Lara, Nora };
    usePreset(presets[theme]);
  }
  
}
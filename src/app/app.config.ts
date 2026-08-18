import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { PresetTheme } from '../enums/preset-theme';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { routes } from './app.routes';

const themePresets: Record<PresetTheme, unknown> = {
  [PresetTheme.Aura]: Aura,
  [PresetTheme.Lara]: Lara,
  [PresetTheme.Nora]: Nora
};

function getInitialPreset(): unknown {
  try {
    const rawTheme = localStorage.getItem('selected_theme');
    if (rawTheme) {
      const parsedTheme = JSON.parse(rawTheme) as PresetTheme;
      return themePresets[parsedTheme] ?? Aura;
    }
  } catch {
    const rawTheme = localStorage.getItem('selected_theme') as PresetTheme;
    if (rawTheme && themePresets[rawTheme]) {
      return themePresets[rawTheme];
    }
  }
  return Aura;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: getInitialPreset(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    })
  ]
};
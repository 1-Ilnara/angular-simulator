import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

import { routes } from './app.routes';

const themePresets: Record<string, any> = {
  Aura,
  Lara,
  Nora
};

function getInitialPreset(): any {
  try {
    const rawTheme = localStorage.getItem('app-theme'); 
    if (rawTheme) {
      const parsedTheme = JSON.parse(rawTheme);
      return themePresets[parsedTheme] || Aura;
    }
  } catch (e) {
    const rawTheme = localStorage.getItem('app-theme');
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
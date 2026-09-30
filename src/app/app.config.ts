import { ApplicationConfig, APP_INITIALIZER, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { PresetTheme } from '../enums/preset-theme';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';

const themePresets: Record<PresetTheme, unknown> = {
  [PresetTheme.Aura]: Aura,
  [PresetTheme.Lara]: Lara,
  [PresetTheme.Nora]: Nora,
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

function initAuth(authService: AuthService) {
  return () => (authService.isAuthenticated ? authService.getCurrentUser() : Promise.resolve());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: getInitialPreset(),
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService],
      multi: true,
    },
  ],
};
import {
  ApplicationConfig,
  APP_INITIALIZER,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PresetTheme } from './core/enums/PresetTheme';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './features/auth/data-access/auth.service';
import { IUser } from './core/interfaces/IUser';
import { IAppConfig } from './core/tokens/IAppConfig';
import { APP_CONFIG } from './core/tokens/app-config.token';

const appSettings: IAppConfig = {
  companyName: 'РумТибет',
  enableLogs: true,
  enableNotifications: true,
  enableTheming: true,
  sessionTimeout: 30,
};

const themePresets: Record<PresetTheme, unknown> = {
  [PresetTheme.AURA]: Aura,
  [PresetTheme.LARA]: Lara,
  [PresetTheme.NORA]: Nora,
};

function getInitialPreset(): unknown {
  if (!appSettings.enableTheming) {
    return Aura;
  }
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

function initAuth(authService: AuthService): () => Observable<IUser | null> {
  return (): Observable<IUser | null> =>
    authService.accessToken
      ? authService.getCurrentUser().pipe(catchError(() => of(null)))
      : of(null);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
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
    { provide: APP_CONFIG, useValue: appSettings },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd.MM.yyyy HH:mm' },
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService],
      multi: true,
    },
  ],
};

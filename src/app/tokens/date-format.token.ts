import { InjectionToken } from '@angular/core';

export const DATE_FORMAT = new InjectionToken<string>('DATE_FORMAT', {
  providedIn: 'root',
  factory: () => 'dd.MM.yyyy HH:mm',
});

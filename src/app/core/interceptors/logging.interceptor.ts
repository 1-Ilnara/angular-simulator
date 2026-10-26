import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { APP_CONFIG } from '../tokens/app-config.token';
import { IAppConfig } from '../tokens/IAppConfig';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const config: IAppConfig = inject(APP_CONFIG);

  if (!config.enableLogs) {
    return next(req);
  }

  const startTime: number = performance.now();
  const { method, urlWithParams } = req;

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>): void => {
        if (event instanceof HttpResponse) {
          const elapsedTime: string = (performance.now() - startTime).toFixed(2);
          console.warn(
            `[HTTP Success] ${method} ${urlWithParams} | Status: ${event.status} | Time: ${elapsedTime}ms`,
          );
        }
      },
      error: (error: HttpErrorResponse): void => {
        const elapsedTime: string = (performance.now() - startTime).toFixed(2);
        console.error(
          `[HTTP Error] ${method} ${urlWithParams} | Status: ${error.status || 'Unknown'} | Time: ${elapsedTime}ms`,
        );
      },
    }),
  );
};

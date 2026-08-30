import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = performance.now();
  const { method, urlWithParams } = req;

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const elapsedTime = (performance.now() - startTime).toFixed(2);
          console.log(
            `[HTTP Success] ${method} ${urlWithParams} | Status: ${event.status} | Time: ${elapsedTime}ms`
          );
        }
      },
      error: (error) => {
        const elapsedTime = (performance.now() - startTime).toFixed(2);
        console.error(
          `[HTTP Error] ${method} ${urlWithParams} | Status: ${error.status || 'Unknown'} | Time: ${elapsedTime}ms`
        );
      },
    })
  );
};
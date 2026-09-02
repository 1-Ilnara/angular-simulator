import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageType } from '../../enums/MessageType';
import { MessageService } from '../services/message.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<never> => {
      if (error.status >= 500 && error.status < 600) {
        messageService.setMessage({
          id: Date.now(),
          type: MessageType.ERROR,
          title: 'Ошибка сервера',
          text: 'Произошла системная ошибка на сервере. Попробуйте позже.',
        });
      }

      return throwError(() => error);
    })
  );
};
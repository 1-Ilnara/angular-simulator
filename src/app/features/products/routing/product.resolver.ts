import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ProductApiService } from '../data-access/product-api.service';
import { IProduct } from '../interfaces/IProduct';

export const productResolver: ResolveFn<IProduct> = (
  route: ActivatedRouteSnapshot,
): Observable<IProduct> => {
  const router: Router = inject(Router);
  const id: number = Number(route.paramMap.get('id'));

  return inject(ProductApiService)
    .getProductById(id)
    .pipe(
      catchError((): Observable<never> => {
        void router.navigate(['/products']);

        return EMPTY;
      }),
    );
};

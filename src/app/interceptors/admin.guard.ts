import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { IUser } from '../../interfaces/IUser';
import { UserRole } from '../../enums/user-role';

export const adminGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const checkAdmin = (user: IUser | null): boolean | UrlTree => {
    if (!user) {
      return router.createUrlTree(['/login']);
    }

    if (user.role === UserRole.Admin) {
      return true;
    }

    return router.createUrlTree(['/']);
  };

  if (authService.isAuthenticated) {
    return authService.currentUser$.pipe(take(1), map(checkAdmin));
  }

  return authService.getCurrentUser().pipe(
    map(checkAdmin),
    catchError(() => of(router.createUrlTree(['/login'])))
  );
};
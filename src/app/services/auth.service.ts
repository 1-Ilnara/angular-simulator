import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {IAuthResponse}from '../../interfaces/IAuthResponse';
import { IUser } from '../../interfaces/IUser';
import { IRefreshResponse } from '../../interfaces/IRefreshResponse';
import { ILoginCredentials} from '../../interfaces/ILoginCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private API_URL = 'https://dummyjson.com/auth';
  private ACCESS_TOKEN_KEY = 'accessToken';
  private REFRESH_TOKEN_KEY = 'refreshToken';

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$: Observable<IUser | null> =
    this.currentUserSubject.asObservable();

  get accessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  get isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  login(credentials: ILoginCredentials): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(`${this.API_URL}/login`, {
        ...credentials,
        expiresInMins: credentials.expiresInMins ?? 30,
      })
      .pipe(
        tap((response: IAuthResponse) => {
          this.setTokens(response.accessToken, response.refreshToken);
          const { accessToken, refreshToken, ...user } = response;
          this.currentUserSubject.next(user as IUser);
        })
      );
  }

  getCurrentUser(): Observable<IUser | null> {
    if (!this.accessToken) {
      this.logout();
      return of(null);
    }

    return this.http.get<IUser>(`${this.API_URL}/me`).pipe(
      tap((user: IUser) => {
        this.currentUserSubject.next(user);
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  refreshTokenSession(): Observable<IRefreshResponse> {
    const token = this.refreshToken;
    if (!token) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<IRefreshResponse>(`${this.API_URL}/refresh`, {
        refreshToken: token,
        expiresInMins: 30,
      })
      .pipe(
        tap((response: IRefreshResponse) => {
          this.setTokens(response.accessToken, response.refreshToken);
        }),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }
}
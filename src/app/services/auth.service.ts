import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { IAuthResponse } from '../../interfaces/IAuthResponse';
import { IUser } from '../../interfaces/IUser';
import { IToken } from '../../interfaces/IToken';
import { ILoginCredentials } from '../../interfaces/ILoginCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private API_URL = 'https://dummyjson.com/auth';
  private TOKENS_KEY = 'tokens';

  private currentUserSubject: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  currentUser$: Observable<IUser | null> =
    this.currentUserSubject.asObservable();

  get accessToken(): string | null {
    const tokens: IToken | null = this.localStorageService.getItem<IToken>(this.TOKENS_KEY);
    return tokens?.accessToken ?? null;
  }

  get refreshToken(): string | null {
    const tokens: IToken | null = this.localStorageService.getItem<IToken>(this.TOKENS_KEY);
    return tokens?.refreshToken ?? null;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  login(credentials: ILoginCredentials): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(`${this.API_URL}/login`, {
        ...credentials,
        expiresInMins: credentials.expiresInMins ?? 30,
      })
      .pipe(
        tap((response: IAuthResponse) => {
          this.setTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });
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
      catchError((error: HttpErrorResponse) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  refreshTokenSession(): Observable<IToken> {
    const token: string | null = this.refreshToken;
    if (!token) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http
      .post<IToken>(`${this.API_URL}/refresh`, {
        refreshToken: token,
        expiresInMins: 30,
      })
      .pipe(
        tap((response: IToken) => {
          this.setTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });
        }),
        catchError((error: HttpErrorResponse) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    this.localStorageService.removeItem(this.TOKENS_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setTokens(tokens: IToken): void {
    this.localStorageService.setItem(this.TOKENS_KEY, tokens);
  }
}
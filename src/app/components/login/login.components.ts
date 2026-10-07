import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { catchError, tap, EMPTY } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.components.html',
})
export class LoginComponent {
    
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage: string | null = null;
  isLoading: boolean = false;

  loginForm = this.fb.group({
    username: ['emilys', [Validators.required]],
    password: ['emilyspass', [Validators.required]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.router.navigate(['/posts']);
        }),
        catchError((err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Неверное имя пользователя или пароль';
          return EMPTY;
        })
      )
      .subscribe();
  }
}
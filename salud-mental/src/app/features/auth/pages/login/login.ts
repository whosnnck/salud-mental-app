import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.auth.login(credentials).subscribe({
      next: (res: any) => {
        // Use AuthService to set token/user safely
        try {
          this.auth.setAuth(res.token, res.user);
          console.debug('Login successful, token set');
          console.debug('AuthService getToken after set:', this.auth.getToken());
        } catch (e) {
          // fallback
          try {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
          } catch (e) {}
        }

        if (res.user.role === 'HR') {
          this.router.navigate(['/hr']);
        } else {
          this.router.navigate(['/employee']);
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        // Manejo robusto de errores - intenta obtener message de varias fuentes
        this.errorMessage =
          err?.error?.message ||
          err?.error?.error ||
          err?.message ||
          'Usuario o contraseña incorrectos. Por favor, intenta de nuevo.';
        // Mostrar sólo una advertencia concisa en consola
        console.warn('Login fallido:', this.errorMessage);
      },
    });
  }

  closeError() {
    this.errorMessage = '';
  }
}

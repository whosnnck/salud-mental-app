import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    // Debug: show whether token is present and when header is added
    try {
      console.debug('AuthInterceptor - token present?', !!token);
    } catch (e) {}

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      try {
        console.debug('AuthInterceptor - Authorization header set');
      } catch (e) {}
    } else {
      try {
        console.debug('AuthInterceptor - no token, request sent without Authorization');
      } catch (e) {}
    }

    return next.handle(request);
  }
}

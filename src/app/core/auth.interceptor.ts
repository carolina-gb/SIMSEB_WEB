// src/app/shared/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar token si existe
    const token = localStorage.getItem('token');
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Aquí puedes centralizar el manejo de errores
        if (error.status === 401) {
          // Ejemplo: redireccionar a login si no autorizado
        }
        // Puedes lanzar un toast o notificación global aquí
        return throwError(() => error);
      })
    );
  }
}

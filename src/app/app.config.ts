import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorFn } from './core/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptorFn])),
    provideRouter(routes),
  ],
};

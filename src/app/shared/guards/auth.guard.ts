// src/app/guards/auth-type.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthTypeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userString = localStorage.getItem('token');
    if (!userString) {
      console.log("Entro")
      // this.router.navigate(['/login']);
      return false;
    }
    const user = JSON.parse(userString);
    if (user.typeId === 3) {
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

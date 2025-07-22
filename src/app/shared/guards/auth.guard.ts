import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { jwtDecode  as jwt_decode} from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthTypeGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(): boolean {
    console.log('Guard ejecutado');
    const token = localStorage.getItem('token');
    // if (!token) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    let payload: any = {};
    try {
      if (!token) {
        this.router.navigate(['/login']);
        return false;
      }
      payload = jwt_decode(token);
      console.log('Payload JWT:', payload);
    } catch (e) {
      console.error('JWT inválido');
      this.router.navigate(['/login']);
      return false;
    }
    if (payload.typeId === '3') {
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
      return false;
    }
    // Verificar expiración
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }
}

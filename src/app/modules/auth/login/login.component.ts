import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { AlertModalComponent } from '../../../shared/components/alert-modal/alert-modal.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FormsModule,
    CommonModule,
    LoadingSpinnerComponent,
    AlertModalComponent,
  ],
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword: boolean = false;
  loading = false;
  error = '';
  loginError = false;
  // Para la alerta popup
  showAlert = false;
  alertType: 'success' | 'error' | 'info' | 'warning' = 'info';
  alertTitle = '';
  alertMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  get canLogin() {
    return this.username?.trim() && this.password?.trim();
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    this.error = '';
    this.loading = true;
    try {
      const resp = await this.api.login({
        input: this.username,
        password: this.password,
      });
      if (resp.code == 200) {
        localStorage.setItem('token', resp.data!.token);
        console.log('Entro a 200');
        const payload = jwt_decode(resp.data!.token) as any;
        if (payload.typeId !== '3') {
          this.router.navigate(['/emergencies']);
        } else {
          this.mostrarAlerta(
            'warning',
            'Rol no autorizado',
            'Usted tiene un rol no autorizado'
          );
        }
      } else {
        this.loginError = true;
        this.error = resp.message;
      }
    } catch (err: any) {
      this.loginError = true;
      this.error = err.message || 'Error de login';
    } finally {
      this.loading = false;
    }
  }
  mostrarAlerta(
    tipo: 'success' | 'error' | 'info' | 'warning',
    titulo: string,
    mensaje: string
  ) {
    this.alertType = tipo;
    this.alertTitle = titulo;
    this.alertMessage = mensaje;
    this.showAlert = true;
  }
  cerrarAlerta() {
    this.showAlert = false;
  }
}

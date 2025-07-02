import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertModalComponent } from '../../shared/components/alert-modal/alert-modal.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserI } from '../../shared/interfaces/user.interface'; // ajusta el path si es necesario
import { ApiService } from '../../shared/services/services';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule, AlertModalComponent, LoadingSpinnerComponent, NgIf],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  user: UserI | null = null;
  loading = false;
  // Para la alerta popup
  showAlert = false;
  alertType: 'success' | 'error' | 'info' | 'warning' = 'info';
  alertTitle = '';
  alertMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private services: ApiService
  ) {}

  async ngOnInit() {
    this.loading = true;
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.user = await this.services.getUserById(userId);
    this.loading = false;
    if (!this.user) {
      this.mostrarAlerta(
        'error',
        'Usuario no encontrado',
        'El usuario solicitado no existe.'
      );
      setTimeout(() => this.goToBack(), 2000);
    }
  }

  async guardarCambios() {
    if (
      !this.user?.full_name ||
      !this.user.username ||
      !this.user.email ||
      !this.user.type?.name ||
      !this.user.status.name ||
      !this.isEmailValid(this.user.email)
    ) {
      this.mostrarAlerta(
        'error',
        'Datos incompletos',
        'Completa todos los campos obligatorios con datos válidos.'
      );
      return;
    }
    this.loading = true;
    const result = await this.services.updateUser(this.user.user_id, this.user);
    this.loading = false;
    if (result.success) {
      this.mostrarAlerta(
        'success',
        'Usuario actualizado',
        'Los cambios fueron guardados correctamente.'
      );
    } else {
      this.mostrarAlerta('error', 'Error', 'No se pudo actualizar el usuario.');
    }
  }

  isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  goToBack() {
    this.router.navigate(['/users']);
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

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertModalComponent } from '../../shared/components/alert-modal/alert-modal.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserI } from '../../shared/interfaces/user.interface'; // ajusta el path si es necesario
import { ApiService } from '../../shared/services/services';
import { UserUpdateRequest } from '../../shared/interfaces/request.interface';

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
    const userId = this.route.snapshot.paramMap.get('userId')!;
    await this.loadUser(userId);
  }

  async loadUser(userId: string) {
    this.loading = true;
    try {
      const resp = await this.services.getUserById(userId);
      if (resp.code === 200 && resp.data && resp.data.data.length > 0) {
        this.user = resp.data.data[0];
      } else {
        this.user = null;
        this.mostrarAlerta(
          'error',
          'Usuario no encontrado',
          'No pudimos encontrar un usuario con ese ID.'
        );
      }
    } catch (err) {
      this.user = null;
      this.mostrarAlerta(
        'error',
        'Error al buscar usuario',
        'Algo salió mal buscando el usuario. Intenta de nuevo, bro.'
      );
    } finally {
      this.loading = false;
    }
  }

  async guardarCambios() {
    // Primero, separa el nombre y el apellido
    if (!this.user?.fullName) return; // Validación rápida

    // Aquí separas por el primer espacio (puedes mejorar esto si tus usuarios son de nombre compuesto)
    const [name, ...lastNameArr] = this.user.fullName.trim().split(' ');
    const lastName = lastNameArr.join(' ');

    // Arma el DTO para actualizar
    const userUpdate: UserUpdateRequest = {
      userId: this.user.userId,
      username: this.user.username,
      name: name,
      lastName: lastName,
      identification: this.user.identification,
      email: this.user.email,
      typeId: this.getTypeIdByName(this.user.type?.name),
      // otros campos si necesitas
    };
    // Puedes validar aquí (¡opcional!)
    if (!this.camposValidos(userUpdate)) {
      this.mostrarAlerta(
        'error',
        'Datos incompletos',
        'Completa todos los campos obligatorios con datos válidos.'
      );
      return;
    }

    // Llama al servicio para actualizar el usuario
    const resp = await this.services.updateUserById(userUpdate);

    if (resp.code === 200) {
      this.mostrarAlerta(
        'success',
        'Usuario actualizado',
        resp.message
      );
      // Opcional: redireccionar o refrescar
      // this.router.navigate(['/users', resp.data]);
    } else {
      this.mostrarAlerta(
        'error',
        'Error al actualizar',
        resp.message || 'No se pudo actualizar el usuario.'
      );
    }
  }
  getTypeIdByName(typeName: string | undefined): number {
    switch (typeName) {
      case 'superuser':
        return 1;
      case 'administrator':
        return 2;
      case 'user':
        return 3;
      default:
        return 0;
    }
  }

  isEmailValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  camposValidos(data: UserUpdateRequest): boolean {
    return !!(
      data.username &&
      data.name &&
      data.lastName &&
      data.identification &&
      data.email &&
      data.typeId
    );
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

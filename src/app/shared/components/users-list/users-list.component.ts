import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { SummaryModalComponent } from '../summary-modal/summary-modal.component';
import { Router } from '@angular/router';
import { ApiService } from '../../services/services';
import { UserI } from '../../interfaces/user.interface';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal.component';
import { UserCreateRequestI } from '../../interfaces/request.interface';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    LoadingSpinnerComponent,
    AlertModalComponent,
    SummaryModalComponent,
    UserCreateModalComponent,
    ConfirmModalComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  constructor(private router: Router, private services: ApiService) {}
  users: UserI[] = [];
  loading = false;
  userPage = 1;
  userPageSize = 5;
  showSummary = false;
  summaryType: 'reporte' | 'infraccion' | 'usuario' = 'reporte';
  summaryData: any = {};
  showConfirm = false;
  showSuccess = false;
  eliminarEnProgreso = false;
  userTotalCount = 0;
  showAlert = false;
  alertType: 'success' | 'error' | 'info' | 'warning' = 'info';
  alertTitle = '';
  alertMessage = '';
  userToReset = '';

  async ngOnInit() {
    await this.getAllUsers();
  }

  async getAllUsers() {
    const skip = (this.userPage - 1) * this.userPageSize;
    this.loading = true;
    try {
      const resp = await this.services.getUserList(skip);
      console.log(resp);
      if (resp.code === 200) {
        this.users = resp.data!.data;
        this.userTotalCount = resp.data!.count;
      } else {
        this.users = [];
        this.userTotalCount = 0;
      }
    } catch (err) {
      this.users = [];
      this.userTotalCount = 0;
      // Opcional: mostrar alerta aquí
    } finally {
      this.loading = false;
    }
  }

  async goToDetail(userId: string) {
    this.router.navigate(['/users', userId]);
  }

  get pagedUsers() {
    const start = (this.userPage - 1) * this.userPageSize;
    return this.users.slice(start, start + this.userPageSize);
  }
  get userTotalPages() {
    return Math.ceil(this.userTotalCount / this.userPageSize);
  }
  async changeUserPage(newPage: number) {
    if (newPage < 1 || newPage > this.userTotalPages) return;
    this.userPage = newPage;
    await this.getAllUsers();
  }

  onClickEliminar() {
    this.showConfirm = true;
  }

  cerrarSuccess() {
    this.showSuccess = false;
  }
  // Ejemplo getStatusClass:
  getStatusClass(status: string) {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-600';
      case 'in_onservarion':
        return 'bg-red-100 text-red-600';
      case 'bad':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
  abrirResumen(tipo: 'reporte' | 'infraccion' | 'usuario', data: any) {
    this.summaryType = tipo;
    this.summaryData = data;
    this.showSummary = true;
  }
  cerrarResumen() {
    this.showSummary = false;
  }
  showUserCreate = false;

  async crearUsuario(user: UserCreateRequestI) {
    const resp = await this.services.createUser(user);

    if (resp.code === 201) {
      // Si quieres recargar usuarios:
      await this.getAllUsers();
      // Muestra la alerta
      this.mostrarAlerta('success', 'Usuario creado con éxito', resp.message);
      this.showSuccess = true;
    } else {
      this.mostrarAlerta(
        'error',
        'Error al actualizar',
        resp.message || 'No se pudo actualizar el usuario.'
      );
    }
  }
  mostrarAlertadialog(username: string) {
    this.showConfirm = true;
    this.userToReset = username;
  }
  async resetearContrasena() {
    console.log(this.userToReset);
    const resp = await this.services.resetUserPasswrd({
      targetUsername: this.userToReset,
      adminUsername: 'admin',
    });
    this.showConfirm = false;
    if (resp.code === 200) {
      // Muestra la alerta
      const message = `${resp.message}, 
      su nueva contraseña es: ${resp.data}`;
      this.mostrarAlerta('success', 'Usuario actualizado', message);
      this.showSuccess = true;
    } else {
      this.mostrarAlerta(
        'error',
        'Error al actualizar',
        resp.message || 'No se pudo actualizar el usuario.'
      );
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

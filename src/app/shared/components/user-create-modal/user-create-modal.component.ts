import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertModalComponent],
  templateUrl: './user-create-modal.component.html',
  styleUrl: './user-create-modal.component.css',
})
export class UserCreateModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  identificationInvalid = false;
  show = true;
  isSuperuser = false;
  showAlert = false;
  alertType: 'success' | 'error' | 'info' | 'warning' = 'info';
  alertTitle = '';
  alertMessage = '';
  user = {
    name: '',
    lastName: '',
    identification: '',
    email: '',
    typeName: '',
  };
  ngOnInit() {
    let payload: any = {};
    // Aquí ajusta cómo recuperas el tipo real del usuario logueado
    const token = localStorage.getItem('token');
    payload = jwt_decode(token!);
    this.isSuperuser = payload.typeId == 1;
  }

  typeOptions = [
    { value: 'superuser', label: 'Superusuario' },
    { value: 'administrator', label: 'Administrador' },
    { value: 'user', label: 'Usuario' },
  ];

  onIdentificationBlur() {
    this.identificationInvalid = !this.validateEcuadorianID(
      this.user.identification
    );
  }

  get typeId() {
    switch (this.user.typeName) {
      case 'superuser':
        return 1;
      case 'administrator':
        return 2;
      case 'user':
        return 3;
      default:
        return 3;
    }
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validateEcuadorianID(cedula: string): boolean {
    if (!/^\d{10}$/.test(cedula)) return false;

    const province = parseInt(cedula.substring(0, 2), 10);
    if (province < 1 || province > 24) return false;

    const thirdDigit = parseInt(cedula.charAt(2), 10);
    if (thirdDigit >= 6) return false;

    const digits = cedula.split('').map(Number);
    let total = 0;

    for (let i = 0; i < 9; i++) {
      let value = digits[i];
      if (i % 2 === 0) {
        value *= 2;
        if (value > 9) value -= 9;
      }
      total += value;
    }

    const checkDigit = (10 - (total % 10)) % 10;
    return checkDigit === digits[9];
  }

  onSubmit() {
    if (
      !this.user.name ||
      !this.user.lastName ||
      !this.validateEcuadorianID(this.user.identification) ||
      !this.user.email ||
      !this.isValidEmail(this.user.email)
    ) {
      this.mostrarAlerta(
        'warning',
        'Campos incompletos',
        'Por favor, completa todos los campos correctamente, verifique su identifcacion o su correo esté correcto.'
      );
      return;
    }
    // Emitir usuario listo para API
    this.create.emit({
      ...this.user,
      typeId: this.typeId,
    });
    this.close.emit();
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
  onClose() {
    this.close.emit();
  }
}

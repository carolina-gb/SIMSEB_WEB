import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode as jwt_decode } from 'jwt-decode';

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-create-modal.component.html',
  styleUrl: './user-create-modal.component.css',
})
export class UserCreateModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  show = true;
  isSuperuser = false;
  user = {
    username: '',
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
  isValidIdentification(identification: string): boolean {
    return /^\d{10}$/.test(identification);
  }
  onSubmit() {
    if (
      !this.user.username ||
      !this.user.name ||
      !this.user.lastName ||
      !this.isValidIdentification(this.user.identification) ||
      !this.user.email ||
      !this.isValidEmail(this.user.email)
    ) {
      alert(
        'Por favor, completa todos los campos correctamente, verifica que la identifcacion sean 10 dígitos o que el correo esté correcto.'
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

  onClose() {
    this.close.emit();
  }
}

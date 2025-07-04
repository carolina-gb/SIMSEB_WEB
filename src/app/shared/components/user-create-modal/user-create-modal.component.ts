import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-create-modal.component.html',
  styleUrl: './user-create-modal.component.css',
})
export class UserCreateModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<any>();

  show = true;

  user = {
    username: '',
    name: '',
    lastName: '',
    identification: '',
    email: '',
    typeName: '',
  };

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
        return 0;
    }
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  onSubmit() {
    if (
      !this.user.username ||
      !this.user.name ||
      !this.user.lastName ||
      !this.user.identification ||
      !this.user.email ||
      !this.user.typeName ||
      !this.isValidEmail(this.user.email)
    ) {
      alert('Por favor, completa todos los campos correctamente.');
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

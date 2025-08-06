import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { UserI } from '../../interfaces/user.interface';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-infraction-create-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, ComboBoxComponent, AlertModalComponent],
  templateUrl: './infraction-create-modal.component.html',
  styleUrl: './infraction-create-modal.component.css',
})
export class InfractionCreateModalComponent implements OnInit {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<{ userId: string; typeId: number }>();

  infraction = {
    userId: '',
    typeId: 0,
  };

  typeOptions = [
    { id: 1, label: 'Alta' },
    { id: 2, label: 'Media' },
    { id: 3, label: 'Baja' },
  ];
  showAlert = false;
  alertType: 'success' | 'error' | 'info' | 'warning' = 'info';
  alertTitle = '';
  alertMessage = '';
  selectedUser: UserI | null = null;

  ngOnInit() {
    // Aquí podrías hacer lógica futura si necesitas cargar algo al abrir
  }

  isValidUuid(id: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id
    );
  }

  onUserSelected(user: UserI) {
    this.selectedUser = user;
    this.infraction.userId = user.userId;
    // Puedes guardar más datos si quieres mostrar resumen, etc.
  }

  onSubmit() {
    if (
      !this.isValidUuid(this.infraction.userId) ||
      this.infraction.typeId === 0
    ) {
      this.mostrarAlerta(
        'warning',
        'Campos imcompletos',
        'Selecciona un usuario válido y el tipo de infracción.'
      );
      return;
    }
    this.create.emit({ ...this.infraction });
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

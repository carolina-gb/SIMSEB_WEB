import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infraction-create-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './infraction-create-modal.component.html',
  styleUrl: './infraction-create-modal.component.css',
})
export class InfractionCreateModalComponent {
  /* --- Eventos --- */
  @Input() open = false;
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<{
    userId: string;
    typeId: number;
  }>();

  /* --- Estado --- */
  infraction = {
    userId: '',
    typeId: 0,
  };

  /* --- Tipos de infracción (ejemplo) --- */
  typeOptions = [
    { id: 1, label: 'Alta' },
    { id: 2, label: 'Media' },
    { id: 3, label: 'Baja' },
  ];

  /* --- Validaciones simples --- */
  private isValidUuid(id: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id
    );
  }

  onSubmit() {
    if (
      !this.isValidUuid(this.infraction.userId) ||
      this.infraction.typeId === 0
    ) {
      alert('Completa un UUID válido y selecciona el tipo de infracción.');
      return;
    }

    // Emitir DTO listo para el servicio
    this.create.emit({ ...this.infraction });
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}

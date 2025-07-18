import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent } from '../combo-box/combo-box.component';
import { UserI } from '../../interfaces/user.interface';

@Component({
  selector: 'app-infraction-create-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, ComboBoxComponent],
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
      alert('Selecciona un usuario válido y el tipo de infracción.');
      return;
    }
    this.create.emit({ ...this.infraction });
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}

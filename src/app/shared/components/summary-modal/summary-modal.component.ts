import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

type EntityType = 'reporte' | 'infraccion' | 'usuario';

@Component({
  selector: 'app-summary-modal',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './summary-modal.component.html',
})
export class SummaryModalComponent {
  @Input() open = false;
  @Input() type: EntityType = 'reporte';
  @Input() data: any = {};
  @Output() close = new EventEmitter<void>();

  cerrar() {
    this.close.emit();
  }

  get campos() {
    switch (this.type) {
      case 'reporte':
        return [
          { label: 'N° de reporte', value: this.data.case_number },
          { label: 'Usuario', value: this.data.username },
          { label: 'Descripción', value: this.data.description },
          { label: 'Estado', value: this.data.stage_name },
          { label: 'Fecha', value: this.data.created_at },
        ];
      case 'infraccion':
        return [
          { label: 'N° de infracción', value: this.data.infraction_number },
          { label: 'Usuario', value: this.data.username },
          { label: 'Tipo', value: this.data.type_name },
          { label: 'Monto', value: this.data.amount },
          { label: 'Estado', value: this.data.active ? 'Activa' : 'Inactiva' },
          { label: 'Fecha', value: this.data.created_at },
        ];
      case 'usuario':
        return [
          { label: 'Nombre de usuario', value: this.data.username },
          { label: 'Nombre completo', value: this.data.full_name },
          { label: 'Identificación', value: this.data.identification },
          { label: 'Correo', value: this.data.email },
          { label: 'Tipo', value: this.data.type_name },
          { label: 'Estado', value: this.data.status },
          { label: 'Creado el', value: this.data.created_at },
        ];
      default:
        return [];
    }
  }
}

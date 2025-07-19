import { Component, Input, Output, EventEmitter } from '@angular/core';
import { formatDate, NgFor, NgIf } from '@angular/common';

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
  private formatea(valor: any) {
    const fecha = new Date(valor);
    return isNaN(fecha.getTime())
      ? valor
      : formatDate(fecha, 'd/M/yy, h:mm a', 'en-US');
  }
  private mapFechas(arr: { label: string; value: any }[]) {
    return arr.map((c) =>
      c.label == 'Fecha'  ||  c.label == 'Creado el'
        ? { ...c, value: this.formatea(c.value) }
        : c
    );
  }

  get campos() {

    switch (this.type) {
      case 'reporte':
        return this.mapFechas([
          { label: 'N° de reporte', value: this.data.caseNumber },
          { label: 'Descripción', value: this.data.description },
          { label: 'Estado', value: this.data.stage },
          { label: 'Fecha', value: this.data.createdAt },
        ]);

      case 'infraccion':
        return this.mapFechas([
          { label: 'N° de infracción', value: this.data.infractionNumber },
          { label: 'Usuario', value: this.data.user.fullName },
          { label: 'Tipo', value: this.data.type.showName },
          { label: 'Monto', value: this.data.amount },
          { label: 'Estado', value: this.data.active ? 'Activa' : 'Inactiva' },
          { label: 'Fecha', value: this.data.createdAt },
        ]);

      case 'usuario':
        return this.mapFechas([
          { label: 'Nombre de usuario', value: this.data.username },
          { label: 'Nombre completo', value: this.data.full_name },
          { label: 'Identificación', value: this.data.identification },
          { label: 'Correo', value: this.data.email },
          { label: 'Tipo', value: this.data.type_name },
          { label: 'Estado', value: this.data.status },
          { label: 'Creado el', value: this.data.created_at },
        ]);

      default:
        return [];
    }
  }
}

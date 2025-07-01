// report-detail.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TrackingStep, TrackingTimelineComponent } from '../../shared/components/tracking-timeline/tracking-timeline.component';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [TrackingTimelineComponent, FormsModule, NgIf],
  templateUrl: './report-details.component.html',
})
export class ReportDetailsComponent {
  selectedStatus: string = 'Pendiente';
  motivoRechazo: string = '';
  constructor(private router: Router) {}
  trackingSteps: TrackingStep[] = [
    { color: 'bg-blue-400', title: 'Creado el', subtitle: '2025-05-15' },
    {
      color: 'bg-sky-400',
      title: 'Pendiente.',
      subtitle: 'Creado por Gabriel Yagual',
    },
    { color: 'bg-pink-400', title: 'En progreso.' },
    {
      color: 'bg-red-500',
      title: 'Rechazado.',
      subtitle: 'Información insuficiente.',
    },
    { color: 'bg-green-500', title: 'Resuelto el', subtitle: '2025-05-17' },
  ];
  guardarCambios() {
    // Aquí pones la lógica para guardar los cambios, por ejemplo:
    if (this.selectedStatus === 'Rechazado' && !this.motivoRechazo) {
      alert('Por favor, ingresa el motivo de rechazo.');
      return;
    }
    // Llama a tu API, actualiza el estado, etc...
    alert(
      `Estado guardado: ${this.selectedStatus}` +
        (this.selectedStatus === 'Rechazado'
          ? `\nMotivo: ${this.motivoRechazo}`
          : '')
    );
  }
  goToBack() {
    this.router.navigate(['/reports']);
  }
}

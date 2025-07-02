import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {
  TrackingStep,
  TrackingTimelineComponent,
} from '../../shared/components/tracking-timeline/tracking-timeline.component';
import { ApiService } from '../../shared/services/services';
import { AlertModalComponent } from '../../shared/components/alert-modal/alert-modal.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ReportI } from '../../shared/interfaces/report.interface';

@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [
    TrackingTimelineComponent,
    FormsModule,
    NgIf,
    AlertModalComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './report-details.component.html',
})
export class ReportDetailsComponent implements OnInit {
  selectedStatus: string = 'Pendiente';
  motivoRechazo: string = '';
  loading = false;
  reportId: number | null = null;
  report: ReportI | null = null;

  // Para la alerta popup
  showAlert = false;
  alertType: 'success' | 'error' | 'info' | 'warning' = 'info';
  alertTitle = '';
  alertMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiServices: ApiService
  ) {}

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

  ngOnInit() {
    const idStr = this.route.snapshot.paramMap.get('id');
    this.reportId = idStr ? +idStr : null;

    if (this.reportId) {
      this.loading = true;
      this.apiServices
        .getReportById(this.reportId)
        .then((report) => {
          this.report = report ?? null;
          // Sincroniza el estado con el del reporte real
          if (report) {
            this.selectedStatus =
              report.stage[report.stage.length - 1].name ?? 'Pendiente';
            this.motivoRechazo = report.reject_reason ?? '';
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.mostrarAlerta('error', 'Error', 'No se pudo cargar el reporte.');
        });
    } else {
      this.mostrarAlerta('error', 'Error', 'No se encontró el ID del reporte.');
    }
  }

  guardarCambios() {
    if (!this.reportId || !this.report) return;

    if (this.selectedStatus === 'Rechazado' && !this.motivoRechazo) {
      this.mostrarAlerta(
        'warning',
        'Motivo requerido',
        'Debes ingresar el motivo de rechazo.'
      );
      return;
    }

    this.loading = true;
    // Simula update solo de estado y motivo rechazo
    this.apiServices
      .updateReport(this.reportId, {
        // stage: { ...this.report.stage, name: this.selectedStatus },
        reject_reason:
          this.selectedStatus === 'Rechazado' ? this.motivoRechazo : null,
      })
      .then((resp) => {
        this.loading = false;
        if (resp && resp.success) {
          this.mostrarAlerta(
            'success',
            '¡Éxito!',
            'El estado se actualizó correctamente.'
          );
        } else {
          this.mostrarAlerta(
            'error',
            'Error',
            'No se pudo actualizar el estado.'
          );
        }
      })
      .catch(() => {
        this.loading = false;
        this.mostrarAlerta(
          'error',
          'Error',
          'No se pudo actualizar el estado.'
        );
      });
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
  goToBack() {
    this.router.navigate(['/reports']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {
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
  motivoRechazo: string = '';
  loading = false;
  reportId: string | null = null;
  report: ReportI | null = null;

  // Para la alerta popup
  showAlert = false;
  alertType: 'success' | 'error' | 'info' | 'warning' = 'info';
  alertTitle = '';
  alertMessage = '';

  // Nuevo: opciones para el combo de estado
  reportStages = [
    { reportStageId: 1, name: 'opened', show_name: 'Ingresado' },
    { reportStageId: 2, name: 'in_course', show_name: 'En curso' },
    { reportStageId: 3, name: 'rejected', show_name: 'Rechazado' },
    { reportStageId: 4, name: 'approved', show_name: 'Aprobado' },
  ];
  selectedStageId: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiServices: ApiService
  ) {}

  ngOnInit() {
    const idStr = this.route.snapshot.paramMap.get('id');
    this.reportId = idStr;

    if (this.reportId) {
      this.loading = true;
      this.apiServices
        .getReportById(this.reportId)
        .then((resp) => {
          this.report = resp.data ?? null;
          if (this.report && this.report.stage) {
            // Si tu backend devuelve "stage" como objeto, usa así:
            // this.selectedStageId = this.report.stage.reportStageId ?? 1;
            // Si devuelve array, usa el último:
            if (Array.isArray(this.report.stage)) {
              this.selectedStageId =
                this.report.stage.at(-1)?.reportStageId ?? 1;
            } else {
              this.selectedStageId = this.report.stage.reportStageId ?? 1;
            }
            this.motivoRechazo = this.report.rejectReason ?? '';
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

    if (this.selectedStageId === 3 && !this.motivoRechazo) {
      this.mostrarAlerta(
        'warning',
        'Motivo requerido',
        'Debes ingresar el motivo de rechazo.'
      );
      return;
    }

    this.loading = true;
    this.apiServices
      .updateReport({
        reportId: this.reportId,
        stageId: this.selectedStageId, // Envía el número de estado
        rejectReason: this.selectedStageId === 3 ? this.motivoRechazo : '',
      })
      .then((resp) => {
        this.loading = false;
        if (resp.code === 200 || resp.code === 201) {
          this.mostrarAlerta(
            'success',
            '¡Éxito!',
            resp.message || 'El estado se actualizó correctamente.'
          );
        } else {
          this.mostrarAlerta(
            'error',
            'Error',
            resp.message || 'No se pudo actualizar el estado.'
          );
        }
      })
      .catch((error) => {
        this.loading = false;
        this.mostrarAlerta(
          'error',
          'Error',
          error?.message || 'No se pudo actualizar el estado.'
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

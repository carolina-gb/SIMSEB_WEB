import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import {
  TrackingTimelineComponent,
} from '../../shared/components/tracking-timeline/tracking-timeline.component';
import { ApiService } from '../../shared/services/services';
import { AlertModalComponent } from '../../shared/components/alert-modal/alert-modal.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ReportI } from '../../shared/interfaces/report.interface';
import { TimelineStep } from '../../shared/components/tracking-timeline/tracking-timeline.component';
@Component({
  selector: 'app-report-details',
  standalone: true,
  imports: [
    TrackingTimelineComponent,
    FormsModule,
    NgIf,
    NgFor,
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
  selectedStageId: number = 1;
  // Para la alerta popup
  showAlert = false;
  alertType: 'success' | 'error' | 'info' | 'warning' = 'info';
  alertTitle = '';
  alertMessage = '';

  /** Pasos estáticos posibles */
  private readonly STAGES = [
    { color: 'bg-blue-400', name: 'opened', title: 'Ingresado' },
    { color: 'bg-sky-400', name: 'in_course', title: 'En curso' },
    { color: 'bg-red-500', name: 'rejected', title: 'Rechazado' },
    { color: 'bg-green-500', name: 'approved', title: 'Aprobado' },
  ];

  /** Lo que realmente envías al timeline */
  steps: TimelineStep[] = [];
  reportStages = [
    { reportStageId: 1, name: 'opened', show_name: 'Ingresado' },
    { reportStageId: 2, name: 'in_course', show_name: 'En curso' },
    { reportStageId: 3, name: 'rejected', show_name: 'Rechazado' },
    { reportStageId: 4, name: 'approved', show_name: 'Aprobado' },
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiServices: ApiService
  ) {}

  ngOnInit() {
    this.reportId = this.route.snapshot.paramMap.get('id');
    if (!this.reportId) {
      this.mostrarAlerta('error', 'Error', 'No se encontró el ID del reporte.');
      return;
    }

    this.loading = true;
    this.apiServices
      .getReportById(this.reportId)
      .then((resp) => {
        this.report = resp.data ?? null;
        this.loading = false;

        if (!this.report?.stage) {
          return;
        }

        /* ───── Calculamos el array de pasos ───── */
        const stageName = Array.isArray(this.report.stage)
          ? this.report.stage.at(-1)?.name
          : this.report.stage.name;

        // 1️⃣  Filtra las etapas según el estado actual
        let stagesFiltradas = this.STAGES;

        // - Si el estado final es “approved”, descartamos “rejected”.
        if (stageName === 'approved') {
          stagesFiltradas = this.STAGES.filter((s) => s.name !== 'rejected');
        }

        // (Si quisieras la lógica inversa -ocultar approved cuando el actual
        // es rejected- ya se cumple porque el slice se detiene antes de llegar
        // a “approved”; no hace falta filtrar.)

        // 2️⃣  Calcula el índice en la lista filtrada
        const idx = stagesFiltradas.findIndex((s) => s.name === stageName);

        // 3️⃣  Construye los pasos que enviará al timeline
        this.steps = stagesFiltradas.slice(0, idx + 1).map((s) => ({
          color: s.color,
          title: s.title,
          active: true,
          subtitle:
            s.name === stageName
              ? this.formatearFecha(this.report!.createdAt)
              : undefined,
        }));
      })
      .catch(() => {
        this.loading = false;
        this.mostrarAlerta('error', 'Error', 'No se pudo cargar el reporte.');
      });
  }

  /** Formateo simple */
  private formatearFecha(fechaISO: Date): string {
    const d = new Date(fechaISO);
    return d.toLocaleString('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
    this.router.navigate(['/reports', this.reportId]);
  }
  goToBack() {
    this.router.navigate(['/reports']);
  }
}

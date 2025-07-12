import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { SummaryModalComponent } from '../summary-modal/summary-modal.component';
import { ApiService } from '../../services/services';
import { ReportI, SumaryReportI } from '../../interfaces/report.interface';

@Component({
  selector: 'app-report-list',
  standalone: true,
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
  imports: [
    CommonModule,
    AlertModalComponent,
    ConfirmModalComponent,
    LoadingSpinnerComponent,
    SummaryModalComponent,
  ],
})
export class ReportListComponent implements OnInit {
  reports: ReportI[] = [];
  loading = false;

  reportPage = 1;
  reportPageSize = 5;
  showSummary = false;
  summaryType: 'reporte' | 'infraccion' | 'usuario' = 'reporte';
  summaryData: SumaryReportI | null = null;

  showConfirm = false;
  showSuccess = false;
  eliminarEnProgreso = false;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.loading = true;
    this.apiService
      .getReportList()
      .then((res) => {
        this.reports = res.data?.data || [];
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        // Aquí podrías mostrar una alerta de error si quieres
      });
  }

  get pagedReports() {
    const start = (this.reportPage - 1) * this.reportPageSize;
    return this.reports.slice(start, start + this.reportPageSize);
  }
  get reportTotalPages() {
    return Math.ceil(this.reports.length / this.reportPageSize) || 1;
  }
  changeReportPage(newPage: number) {
    if (newPage < 1 || newPage > this.reportTotalPages) return;
    this.reportPage = newPage;
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'opened':
        return 'bg-gray-100 text-gray-700';
      case 'in_course':
        return 'bg-gray-100 text-gray-700';
      case 'rejected':
        return 'bg-gray-100 text-red-500';
      case 'approved':
        return 'bg-gray-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  goToDetail(reportId: string) {
    this.router.navigate(['/reports', reportId]);
  }

  eliminarReporte() {
    this.showConfirm = false;
    this.eliminarEnProgreso = true;
    setTimeout(() => {
      this.eliminarEnProgreso = false;
      this.showSuccess = true;
    }, 1500); // Simula 1.5s de eliminación
  }

  onClickEliminar() {
    this.showConfirm = true;
  }

  cerrarSuccess() {
    this.showSuccess = false;
  }

  abrirResumen(tipo: 'reporte' | 'infraccion' | 'usuario', data: SumaryReportI) {
    // Arma el objeto de resumen con los campos necesarios
    this.summaryType = tipo;
    this.summaryData = {
      caseNumber: data.caseNumber,
      description: data.description,
      stage: data.stage || null,
      createdAt: data.createdAt,
    };
    console.log(data);
    this.showSummary = true;
  }

  cerrarResumen() {
    this.showSummary = false;
  }
}

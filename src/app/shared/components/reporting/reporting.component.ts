import { Component } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/services';
import { ReportingEmergencies, ReportingInfraccion, ReportingReports } from '../../interfaces/reporting.interface';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor, LoadingSpinnerComponent, CurrencyPipe],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.css',
})
export class ReporteriaComponent {
  fechaInicio: string = '';
  fechaFin: string = '';
  tipoReporte: string = 'Reporte';
  loading = false;

  datos: ReportingReports | ReportingEmergencies | ReportingInfraccion | null =
    null;
  reportes: ReportingReports | null = null;
  emergencias: ReportingEmergencies | null = null;
  infracciones: ReportingInfraccion | null = null;
  categorias: string[] = [];
  datosVisibles: boolean = false;
  noDatos: boolean = false;

  constructor(private services: ApiService) {}

  async buscarReportes() {
    this.loading = true;
    this.noDatos = false;
    this.datosVisibles = false;

    this.reportes = null;
    this.emergencias = null;
    this.infracciones = null;

    if (!this.fechaInicio || !this.fechaFin) {
      alert('Por favor selecciona ambas fechas.');
      return;
    }

    const payload = {
      initialDate: this.convertToUTC(this.fechaInicio),
      endDate: this.convertToUTC(this.fechaFin),
      reportingType: this.tipoReporte,
    };
    console.log(payload);
    try {
      const resp = await this.services.getReporting(payload);
      console.log(resp);
      if (resp.code === 201) {
        if (this.tipoReporte === 'Reporte' && resp.data?.reportingReports) {
          this.reportes = resp.data.reportingReports;
          this.categorias = Object.keys(this.reportes.reportes || {});
          this.datosVisibles = this.categorias.length > 0;
        } else if (
          this.tipoReporte === 'Emergencia' &&
          resp.data?.reportingEmergencies
        ) {
          this.emergencias = resp.data.reportingEmergencies;
          this.categorias = Object.keys(this.emergencias.emergencias || {});
          this.datosVisibles = this.categorias.length > 0;
        } else if (
          this.tipoReporte === 'Infraccion' &&
          resp.data?.reportingInfraccion
        ) {
          this.infracciones = resp.data.reportingInfraccion;
          this.categorias = Object.keys(this.infracciones.infracciones || {});
          this.datosVisibles = this.categorias.length > 0;
        } else {
          this.noDatos = true;
        }
      } else {
        this.noDatos = true;
      }
    } catch (error) {
      this.noDatos = true;
    } finally {
      this.loading = false;
    }
  }
  convertToUTC(dateStr: string): string {
    const date = new Date(dateStr);
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    ).toISOString();
  }
  exportarExcel() {
    let dataParaExportar: any[] = [];
    let nombreArchivo = '';

    if (this.tipoReporte === 'Reporte' && this.reportes) {
      dataParaExportar = Object.entries(this.reportes.reportes).map(
        ([categoria, datos]: any) => ({
          Categoría: categoria,
          Ingresados: datos.reportesIngresados,
          'En Curso': datos.reportesEnCurso,
          Rechazados: datos.reportesRechazados,
          Aprobados: datos.reportesAprobados,
          Total: datos.totalReportes,
        })
      );
      nombreArchivo = 'reporte_general.xlsx';
    } else if (this.tipoReporte === 'Emergencia' && this.emergencias) {
      dataParaExportar = Object.entries(this.emergencias.emergencias).map(
        ([tipo, datos]: any) => ({
          Tipo: tipo,
          Total: datos.total,
        })
      );
      nombreArchivo = 'reporte_emergencias.xlsx';
    } else if (this.tipoReporte === 'Infracción' && this.infracciones) {
      dataParaExportar = Object.entries(this.infracciones.infracciones).map(
        ([nivel, datos]: any) => ({
          Nivel: nivel,
          'Total Infracciones': datos.totalInfracciones,
          'Monto Total': datos.montoTotal,
        })
      );
      nombreArchivo = 'reporte_infracciones.xlsx';
    }

    // Si no hay datos, no exporta
    if (dataParaExportar.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataParaExportar);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    XLSX.writeFile(workbook, nombreArchivo);
  }
}

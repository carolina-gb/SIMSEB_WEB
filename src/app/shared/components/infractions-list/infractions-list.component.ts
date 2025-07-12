import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, CurrencyPipe, DatePipe } from '@angular/common';
import { SummaryModalComponent } from '../summary-modal/summary-modal.component';
import { ApiService } from '../../services/services';
import { InfractionI } from '../../interfaces/infraction.interface';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { InfractionCreateModalComponent } from '../infraction-create-modal/infraction-create-modal.component';
import { InfractionCreateRequestI } from '../../interfaces/request.interface';

@Component({
  selector: 'app-infractions-list',
  standalone: true,
  templateUrl: './infractions-list.component.html',
  styleUrls: ['./infractions-list.component.css'],
  imports: [
    NgClass,
    NgFor,
    SummaryModalComponent,
    DatePipe,
    CurrencyPipe,
    LoadingSpinnerComponent,
    InfractionCreateModalComponent,
  ],
})
export class InfractionsListComponent implements OnInit {
  // -------------------- Estado básico --------------------
  infractions: InfractionI[] = [];
  totalCount = 0;
  loading = false;
  errorMsg: string | null = null;
  showInfractionCreate = false;

  // paginador
  page = 1;
  pageSize = 5;

  // modal
  showSummary = false;
  summaryType: 'reporte' | 'infraccion' | 'usuario' = 'infraccion';
  summaryData: any = {};

  constructor(private services: ApiService) {}

  // -------------------- Ciclo de vida --------------------
  async ngOnInit() {
    await this.fetchPage(); // carga inicial
  }

  // -------------------- API --------------------
  private async fetchPage() {
    try {
      this.loading = true;
      this.errorMsg = null;

      const skip = (this.page - 1) * this.pageSize;
      const resp = await this.services.getInfractions(skip);

      if (resp.code === 200 && resp.data) {
        this.infractions = resp.data.data;
        this.totalCount = resp.data.count;
        console.log(this.infractions);
      } else {
        throw new Error(resp.message);
      }
    } catch (e: any) {
      this.errorMsg = e.message ?? 'Ups, no se pudo cargar 😢';
    } finally {
      this.loading = false;
    }
  }

  async toggleActive(infraction: InfractionI) {
    this.loading = true;
    const resp = await this.services.inactiveInfractionById(
      infraction.infractionId
    );
    this.loading = false;
    if (resp.code === 200) {
      // parche local
      this.infractions = this.infractions.map((i) =>
        i.infractionId === infraction.infractionId
          ? { ...i, active: !i.active }
          : i
      );
    } else {
      alert(resp.message);
    }
  }

  // -------------------- Paginador --------------------
  get pagedInfractions() {
    // Si tu backend ya retorna la página filtrada,
    // simplemente devuelve this.infractions.
    return this.infractions;
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  async changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
    await this.fetchPage();
  }

  // -------------------- Modal helpers --------------------
  abrirResumen(tipo: 'reporte' | 'infraccion' | 'usuario', data: any) {
    console.log(true);
    this.summaryType = tipo;
    this.summaryData = data;
    this.showSummary = true;
  }

  cerrarResumen() {
    this.showSummary = false;
  }
  cerrarCreateModal() {
    this.showInfractionCreate = false;
  }
  crearInfraction(req: InfractionCreateRequestI) {
    this.services.createInfraction(req).then((resp) => {
      // refrescar lista, toast, etc.
    });
  }
}

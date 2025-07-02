import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SummaryModalComponent } from '../summary-modal/summary-modal.component';

@Component({
  selector: 'app-infractions-list',
  standalone: true,
  templateUrl: './infractions-list.component.html',
  styleUrls: ['./infractions-list.component.css'],
  imports: [NgClass, NgFor, SummaryModalComponent],
})
export class InfractionsListComponent {
  // ¡Pon tus datos reales aquí!
  infractions = [
    {
      infraction_id: 1,
      infraction_number: 'INF-001',
      user: {
        user_id: 101,
        username: 'juandelgado',
        full_name: 'Juan Delgado',
        email: 'juan.delgado@mail.com',
      },
      type: {
        infraction_type_id: 1,
        name: 'Ruido excesivo',
        show_name: 'Ruido Excesivo',
      },
      active: true,
      amount: 25.0,
      created_at: '2025-05-10',
      updated_at: '2025-05-10',
      suspension_weeks: 2,
    },
    {
      infraction_id: 2,
      infraction_number: 'INF-002',
      user: {
        user_id: 102,
        username: 'maria',
        full_name: 'Maria Villacis',
        email: 'maria@mail.com',
      },
      type: {
        infraction_type_id: 2,
        name: 'Basura en la vía',
        show_name: 'Basura en la vía',
      },
      active: true,
      amount: 15.0,
      created_at: '2025-05-11',
      updated_at: '2025-05-11',
      suspension_weeks: 1,
    },
    {
      infraction_id: 3,
      infraction_number: 'INF-003',
      user: {
        user_id: 103,
        username: 'carlos',
        full_name: 'Carlos Gonzalez',
        email: 'carlos.g@mail.com',
      },
      type: {
        infraction_type_id: 1,
        name: 'Alteración del orden',
        show_name: 'Alteración del orden',
      },
      active: false,
      amount: 40.0,
      created_at: '2025-05-11',
      updated_at: '2025-05-13',
      suspension_weeks: 3,
    },
    {
      infraction_id: 4,
      infraction_number: 'INF-004',
      user: {
        user_id: 104,
        username: 'angie',
        full_name: 'Angie Bustos',
        email: 'angie@mail.com',
      },
      type: {
        infraction_type_id: 2,
        name: 'Basura en la vía',
        show_name: 'Basura en la vía',
      },
      active: true,
      amount: 10.0,
      created_at: '2025-05-13',
      updated_at: '2025-05-13',
      suspension_weeks: 2,
    },
    {
      infraction_id: 5,
      infraction_number: 'INF-005',
      user: {
        user_id: 105,
        username: 'karla',
        full_name: 'Karla Narváez',
        email: 'karla@mail.com',
      },
      type: {
        infraction_type_id: 3,
        name: 'Vehículo mal estacionado',
        show_name: 'Vehículo mal estacionado',
      },
      active: true,
      amount: 35.0,
      created_at: '2025-05-13',
      updated_at: '2025-05-13',
      suspension_weeks: 1,
    },
    {
      infraction_id: 5,
      infraction_number: 'INF-006',
      user: {
        user_id: 105,
        username: 'karla',
        full_name: 'Karla Narváez',
        email: 'karla@mail.com',
      },
      type: {
        infraction_type_id: 3,
        name: 'Vehículo mal estacionado',
        show_name: 'Vehículo mal estacionado',
      },
      active: true,
      amount: 35.0,
      created_at: '2025-05-13',
      updated_at: '2025-05-13',
      suspension_weeks: 1,
    },
    {
      infraction_id: 5,
      infraction_number: 'INF-007',
      user: {
        user_id: 105,
        username: 'karla',
        full_name: 'Karla Narváez',
        email: 'karla@mail.com',
      },
      type: {
        infraction_type_id: 3,
        name: 'Vehículo mal estacionado',
        show_name: 'Vehículo mal estacionado',
      },
      active: true,
      amount: 35.0,
      created_at: '2025-05-13',
      updated_at: '2025-05-13',
      suspension_weeks: 1,
    },
    // ...agrega más si necesitas
  ];

  // Paginador
  page = 1;
  pageSize = 5;
  showSummary = false;
  summaryType: 'reporte' | 'infraccion' | 'usuario' = 'reporte';
  summaryData: any = {};

  get pagedInfractions() {
    const start = (this.page - 1) * this.pageSize;
    return this.infractions.slice(start, start + this.pageSize);
  }
  get totalPages() {
    return Math.ceil(this.infractions.length / this.pageSize);
  }
  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
  }
  abrirResumen(tipo: 'reporte' | 'infraccion' | 'usuario', data: any) {
    this.summaryType = tipo;
    this.summaryData = data;
    this.showSummary = true;
  }
  cerrarResumen() {
    this.showSummary = false;
  }
}

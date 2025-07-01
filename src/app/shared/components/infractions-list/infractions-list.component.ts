import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-infractions-list',
  standalone: true,
  templateUrl: './infractions-list.component.html',
  styleUrls: ['./infractions-list.component.css'],
  imports: [NgClass, NgFor],
})
export class InfractionsListComponent {
  // ¡Pon tus datos reales aquí!
  infractions = [
    // ... 15-20 objetos de ejemplo
    {
      code: 'INF-001',
      user: 'Juan Delgado',
      type: 'Ruido excesivo',
      date: '2025-05-10',
      dateSupend: 2,
    },
    {
      code: 'INF-002',
      user: 'Maria',
      type: 'Basura en la vía',
      date: '2025-05-11',
      dateSupend: 1,
    },
    {
      code: 'INF-003',
      user: 'Carlos',
      type: 'Alteración del orden',
      date: '2025-05-11',
      dateSupend: 3,
    },
    {
      code: 'INF-003',
      user: 'Carlos Gonzalez',
      type: 'Alteración del orden',
      date: '2025-05-11',
      dateSupend: 3,
    },
    {
      code: 'INF-003',
      user: 'Carlos',
      type: 'Alteración del orden',
      date: '2025-05-11',
      dateSupend: 3,
    },
    {
      code: 'INF-003',
      user: 'Carlos',
      type: 'Alteración del orden',
      date: '2025-05-11',
      dateSupend: 3,
    },
    {
      code: 'INF-003',
      user: 'Carlos',
      type: 'Alteración del orden',
      date: '2025-05-11',
      dateSupend: 3,
    },
    // ...más datos
  ];

  // Paginador
  page = 1;
  pageSize = 5;

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
}

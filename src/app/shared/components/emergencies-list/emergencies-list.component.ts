import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-emergencies-list',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './emergencies-list.component.html',
  styleUrl: './emergencies-list.component.css',
})
export class EmergenciesListComponent {
  emergencies = [
    {
      code: 'EME-001',
      user: 'Gabrielym',
      type: 'Alteración del orden público',
      date: '2025-05-15',
      status: 'Pendiente',
    },
    {
      code: 'EME-002',
      user: 'Angienb',
      type: 'Problemas de salubridad',
      date: '2025-05-15',
      status: 'Rechazado',
    },
    {
      code: 'EME-003',
      user: 'Karenmg',
      type: 'Problemas con vecinos',
      date: '2025-05-15',
      status: 'Resuelto',
    },
  ];

  emergencyPage = 1;
  emergencyPageSize = 5;

  get pagedEmergencies() {
    const start = (this.emergencyPage - 1) * this.emergencyPageSize;
    return this.emergencies.slice(start, start + this.emergencyPageSize);
  }
  get emergencyTotalPages() {
    return Math.ceil(this.emergencies.length / this.emergencyPageSize);
  }
  changeEmergencyPage(newPage: number) {
    if (newPage < 1 || newPage > this.emergencyTotalPages) return;
    this.emergencyPage = newPage;
  }

  // Ejemplo de getStatusClass (opcional, personalízalo como quieras)
  getStatusClass(status: string) {
    switch (status) {
      case 'Pendiente':
        return 'bg-gray-100 text-gray-700';
      case 'Rechazado':
        return 'bg-gray-100 text-red-500';
      case 'Resuelto':
        return 'bg-gray-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}

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
      emergency_id: 1,
      emergency_number: 'EME-001',
      user: {
        user_id: 201,
        username: 'Gabrielym',
        full_name: 'Gabriel Yagual',
        email: 'gabrielyagual@mail.com',
      },
      type: {
        emergency_type_id: 1,
        name: 'Alteración del orden público',
      },
      created_at: '2025-05-15',
      updated_at: '2025-05-15',
    },
    {
      emergency_id: 2,
      emergency_number: 'EME-002',
      user: {
        user_id: 202,
        username: 'Angienb',
        full_name: 'Angie Bustos',
        email: 'angie@mail.com',
      },
      type: {
        emergency_type_id: 2,
        name: 'Problemas de salubridad',
      },
      created_at: '2025-05-15',
      updated_at: '2025-05-16',
    },
    {
      emergency_id: 3,
      emergency_number: 'EME-003',
      user: {
        user_id: 203,
        username: 'Karenmg',
        full_name: 'Karen Montaño',
        email: 'karen@mail.com',
      },
      type: {
        emergency_type_id: 3,
        name: 'Problemas con vecinos',
      },
      created_at: '2025-05-15',
      updated_at: '2025-05-17',
    },
    // ...agrega más si necesitas
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

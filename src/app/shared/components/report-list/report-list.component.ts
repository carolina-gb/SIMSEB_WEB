import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-list',
  standalone: true,
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
  imports: [CommonModule],
})
export class ReportListComponent {
  reports = [
    {
      code: 'REP-001',
      user: 'Gabrielym',
      type: 'Alteración del orden público',
      date: '2025-05-15',
      status: 'Pendiente',
    },
    {
      code: 'REP-002',
      user: 'Angienb',
      type: 'Problemas de salubridad',
      date: '2025-05-15',
      status: 'Rechazado',
    },
    {
      code: 'REP-003',
      user: 'Karenmg',
      type: 'Problemas con vecinos',
      date: '2025-05-15',
      status: 'Resuelto',
    },
  ];

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

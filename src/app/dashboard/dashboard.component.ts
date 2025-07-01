// dashboard.component.ts
import { Component } from '@angular/core';
import { ReportChartComponent } from '../shared/components/report-chart/report-chart.component';
import { EmergenciesComponent } from '../shared/components/emergencies/emergencies.component';
import { ActiveUsersComponent } from '../shared/components/active-users/active-users.component';

@Component({
    selector: 'app-dashboard',
    imports: [ReportChartComponent, EmergenciesComponent, ActiveUsersComponent],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  emergencies = [
    { code: 'EME-001', user: 'Ligia León' },
    { code: 'EME-002', user: 'Ronald Neira' },
    { code: 'EME-003', user: 'Allan González' },
    { code: 'EME-004', user: 'Carmela Carabajo' }
  ];

  users = [
    { name: 'Gabrielym', reports: 10 },
    { name: 'Angienb', reports: 6 },
    { name: 'Karenmg', reports: 9 },
    { name: 'Dennymg', reports: 11 }
  ];
}

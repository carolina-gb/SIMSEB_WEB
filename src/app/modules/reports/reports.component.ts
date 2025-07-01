import { Component } from '@angular/core';
import { ReportListComponent } from '../../shared/components/report-list/report-list.component';
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReportListComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}

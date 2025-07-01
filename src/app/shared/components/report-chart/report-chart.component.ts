import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-chart',
  standalone: true,
  templateUrl: './report-chart.component.html',
})
export class ReportChartComponent {
  @Input() title = 'Total de reportes';
}

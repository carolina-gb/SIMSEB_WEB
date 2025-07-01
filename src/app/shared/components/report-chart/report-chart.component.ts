import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexStroke, ApexXAxis, ApexYAxis, ChartType, NgxApexchartsModule } from 'ngx-apexcharts';

@Component({
  selector: 'app-report-chart',
  standalone: true,
  imports: [NgxApexchartsModule],
  templateUrl: './report-chart.component.html',
})
export class ReportChartComponent {
  public series: ApexAxisChartSeries = [{
    name: 'Reportes',
    data: [8, 15, 12, 18, 16, 19, 23]
  }];
  public chart: ApexChart = {
    type: 'line' as ChartType, // <-- EL FIX AQUÍ!
    height: 220,
    toolbar: { show: false }
  };
  public stroke: ApexStroke = {
    width: 3,
    curve: 'smooth',
    colors: ['#a259f7']
  };
  public fill: ApexFill = {
    type: 'gradient',
    gradient: { shadeIntensity: 0.5, opacityFrom: 0.4, opacityTo: 0 }
  };
  public xaxis: ApexXAxis = {
    categories: [
      '28 de mayo', '29 de mayo', '30 de mayo', '31 de mayo', '1 de junio', '2 de junio', '3 de junio'
    ]
  };
  public yaxis: ApexYAxis = { min: 0 };
  public dataLabels: ApexDataLabels = { enabled: false };
  public grid: ApexGrid = { borderColor: '#f3f4f6' };
  public legend: ApexLegend = { show: false };
}

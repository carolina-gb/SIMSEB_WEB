import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Component, OnInit, viewChild } from '@angular/core';
import { ApiService } from '../../services/services';
import { EmergencyI } from '../../interfaces/emergency.interface';
import { ViewChild } from '@angular/core';
import { ModalMapaComponent } from '../modal-mapa/modal-mapa.component';

@Component({
  selector: 'app-emergencies-list',
  standalone: true,
  imports: [NgFor, NgClass, ModalMapaComponent, DatePipe],
  templateUrl: './emergencies-list.component.html',
  styleUrl: './emergencies-list.component.css',
})
export class EmergenciesListComponent implements OnInit {
  emergencies: EmergencyI[] = [];
  emergencyTotalCount = 0;

  emergencyPage = 1;
  emergencyPageSize = 5;
  loading = false;

  constructor(private services: ApiService) {}

  async ngOnInit() {
    this.loading = true;
    const resp = await this.services.getEmergencies();
    this.emergencies = resp.data!.data;
    this.loading = false;
  }
  selectedLat = -2.216637;
  selectedLng = -79.927899;

  @ViewChild('modalMapa') modalMapa!: ModalMapaComponent;

  openMap(emergency: EmergencyI) {
    console.log('[EmergenciesListComponent] openMap llamado con:', emergency);
    this.selectedLat = emergency.latitude ?? -2.216637;
    this.selectedLng = emergency.longitude ?? -79.927899;
    setTimeout(() => {
      console.log('[EmergenciesListComponent] Abriendo modalMapa...');
      this.modalMapa.open = true;
    }, 10);
  }

  async getEmergencies() {
    const skip = (this.emergencyPage - 1) * this.emergencyPageSize;
    const resp = await this.services.getEmergencies(skip);
    // Si tu servicio devuelve { count, data }
    console.log(resp);
    this.emergencies = resp.data!.data;
    this.emergencyTotalCount = resp.data!.count;
  }

  get pagedEmergencies() {
    // Si usas paginación de backend, retorna solo this.emergencies;
    // Si no, puedes seguir usando el slice local, pero no es necesario si backend ya te da la data paginada
    return this.emergencies;
  }

  get emergencyTotalPages() {
    // Calcula usando el total real
    return Math.ceil(this.emergencyTotalCount / this.emergencyPageSize);
  }

  async changeEmergencyPage(newPage: number) {
    if (newPage < 1 || newPage > this.emergencyTotalPages) return;
    this.emergencyPage = newPage;
    await this.getEmergencies();
  }

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

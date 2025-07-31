import { AfterViewChecked, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-modal-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-mapa.component.html',
  // Si tienes estilos separados:
  styleUrl: './modal-mapa.component.css',
})
export class ModalMapaComponent implements AfterViewChecked {
  @Input() lat = 0;
  @Input() lng = 0;
  open = false;
  private map: any;
  private marker: any;
  private mapLoaded = false;

  ngAfterViewChecked() {
    if (this.open && !this.mapLoaded) {
      const div = document.getElementById('view-map');
      if (div && div.offsetHeight > 0) {
        this.initMap();
        this.mapLoaded = true;
      }
    }
    if (!this.open && this.mapLoaded) {
      this.mapLoaded = false; // permite que al volver a abrir se re-inicialice
    }
  }

  initMap() {
    if (this.map) {
      this.map.off().remove();
    }

    this.map = L.map('view-map').setView([this.lat, this.lng], 18);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    const customIcon = L.icon({
      iconUrl: 'assets/pointer.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    this.marker = L.marker([this.lat, this.lng], { icon: customIcon }).addTo(
      this.map
    );
  }
}

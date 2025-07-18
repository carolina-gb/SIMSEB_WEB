import { AfterViewChecked, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    // ...tu código del mapa...
    import('leaflet').then((L) => {
      if (this.map) {
        this.map.off();
        this.map.remove();
      }
      this.map = L.map('view-map').setView([this.lat, this.lng], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);
      this.marker = L.marker([this.lat, this.lng]).addTo(this.map);
    });
  }
}

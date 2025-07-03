import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

declare global {
  interface Window {
    lucide: any;
  }
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [RouterLink, RouterLinkActive], // <-- AGREGA ESTO AQUÍ
})
export class SidebarComponent implements AfterViewInit {
  @Input() open = false; // Controla visibilidad
  @Output() close = new EventEmitter<void>();
  constructor(private router: Router) {}
  ngAfterViewInit() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  closeSidebar() {
    this.close.emit();
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

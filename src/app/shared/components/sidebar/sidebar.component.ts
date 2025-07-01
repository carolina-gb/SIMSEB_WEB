import { Component, AfterViewInit } from '@angular/core';
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
  constructor(private router: Router) {}

  ngAfterViewInit() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}

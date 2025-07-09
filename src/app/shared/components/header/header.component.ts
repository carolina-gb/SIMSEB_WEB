import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { NotificationsBellComponent } from '../notifications-bell/notifications-bell.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [NotificationsBellComponent],
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();

  onToggleMenu() {
    this.toggleMenu.emit();
  }
  showNotifications = false;
  notifications = [
    { text: 'Nueva denuncia creada', date: new Date() },
    {
      text: 'Tu cuenta fue verificada',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    // ...más notificaciones
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  // BONUS: Cerrar al hacer click fuera (opcional)
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.mr-4')) {
      this.showNotifications = false;
    }
  }
}

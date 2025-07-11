import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../socket/signalR.service';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/services';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { EmergencyI } from '../../interfaces/emergency.interface';

@Component({
  standalone: true,
  selector: 'app-notifications-bell',
  imports: [NgIf, NgFor],
  templateUrl: './notifications-bell.component.html',
  styleUrl: './notifications-bell.component.css',
})
export class NotificationsBellComponent implements OnInit {
  notifications: EmergencyI[] = [];
  showNotifications = false;
  unreadCount = 0;

  constructor(
    private signalRService: SignalRService,
    private services: ApiService
  ) {}

  async ngOnInit() {
    // 1. Cargar notificaciones viejas
    const resp = await this.services.getEmergencies();
    const initial = resp.data?.data || [];
    this.notifications = initial;
    this.signalRService.loadInitialNotifications(initial);
    // 2. Suscribirse al observable
    this.signalRService.notifications$.subscribe((nots) => {
      console.log('Notificaciones actualizadas', nots);
      this.notifications = nots;
    });
    this.signalRService.unreadCount$.subscribe((count) => {
      console.log('Count badge actualizado:', count);
      this.unreadCount = count;
    });
    // 3. Arranca SignalR SOLO si tienes userId, por ejemplo:
    let user: any = {};
    // Aquí ajusta cómo recuperas el tipo real del usuario logueado
    const token = localStorage.getItem('token');
    user = jwt_decode(token!);
    if (user?.userId) this.signalRService.startConnection(user.userId);
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.signalRService.unreadCountSubject.next(0); // Limpiar badge al abrir
    }
  }
}

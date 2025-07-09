// src/app/socket/signalR.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  public unreadCountSubject = new BehaviorSubject<number>(0);
  public unreadCount$ = this.unreadCountSubject.asObservable();

  // Llama esto UNA sola vez al iniciar sesión
  startConnection(userId: string) {
    if (this.hubConnection) return; // Evita múltiples conexiones

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5255/hub/notifications', {
        accessTokenFactory: () => localStorage.getItem('token') || '',
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR conectado');
        this.hubConnection?.invoke('JoinGroup', userId);
      })
      .catch((err) => console.error('Error SignalR:', err));

    this.hubConnection.on('ReceiveNotification', (notification: any) => {
      console.log('Notificación recibida:', notification);
      const current = this.notificationsSubject.value;
      this.notificationsSubject.next([notification, ...current]);
      this.unreadCountSubject.next(this.unreadCountSubject.value + 1); // Suma al badge
    });
  }

  // Llama esto con la respuesta de getInitialNotifications
  loadInitialNotifications(initial: any[]) {
    this.notificationsSubject.next(initial ?? []);
    this.unreadCountSubject.next(initial?.length || 0);
  }
}

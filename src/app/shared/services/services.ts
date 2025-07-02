// src/app/shared/services/api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  // --- LOGIN ---
  async login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === '1234') {
          resolve({
            success: true,
            token: 'FAKE_TOKEN',
            user: { username: 'admin', name: 'Administrador' }
          });
        } else {
          reject({ success: false, message: 'Credenciales incorrectas' });
        }
      }, 900);
    });
  }

  // --- REPORTES ---
  async updateReportStatus(reportId: string, status: string, motivoRechazo?: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, updatedStatus: status });
      }, 900);
    });
  }

  // --- USUARIOS ---
  async getUserList(): Promise<any[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Carlos', email: 'carlos@mail.com' },
          { id: 2, name: 'Ana', email: 'ana@mail.com' }
        ]);
      }, 800);
    });
  }

  // --- EMERGENCIAS ---
  async getEmergencies(): Promise<any[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { code: 'EME-001', user: 'Gabriela', type: 'Accidente' },
          { code: 'EME-002', user: 'Luis', type: 'Robo' }
        ]);
      }, 800);
    });
  }

  // ...más métodos para tus otras entidades...
}

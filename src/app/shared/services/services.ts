// src/app/shared/services/api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserI } from '../interfaces/user.interface';
import { InfractionI } from '../interfaces/infraction.interface';
import { EmergencyI } from '../interfaces/emergency.interface';
import { ReportI } from '../interfaces/report.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  // ==== MOCK DATA ====
  private reports: ReportI[] = [
    {
      report_id: 1,
      case_number: 'REP-001',
      type: { report_type_id: 1, name: 'Alteración del orden público' },
      evidence_file: null,
      user: {
        user_id: 1,
        username: 'gabrielym',
        identification: '0951111111',
        email: 'gabriel@mail.com',
      },
      description: 'Personas haciendo ruido en la madrugada.',
      reject_reason: null,
      reject_by: null,
      stage: [{ report_stage_id: 1, name: 'in_course', show_name: 'En curso' }],
      created_at: new Date('2025-05-15T12:00:00'),
      updated_at: new Date('2025-05-15T12:00:00'),
    },
    {
      report_id: 2,
      case_number: 'REP-002',
      type: {
        report_type_id: 2,
        name: 'Problemas de salubridad',
        show_name: 'Problemas de salubridad',
      },
      evidence_file: null,
      user: {
        user_id: 2,
        username: 'angienb',
        identification: '0952222222',
        email: 'angie@mail.com',
      },
      description: 'Basura acumulada en la esquina.',
      reject_reason: 'No hay evidencia suficiente.',
      reject_by: 1,
      stage: [{ report_stage_id: 3, name: 'rejected', show_name: 'Rechazado' }],
      created_at: new Date('2025-05-16T09:00:00'),
      updated_at: new Date('2025-05-16T09:00:00'),
    },
    // ...más reportes
  ];

  private infractions: InfractionI[] = [
    {
      infraction_id: 1,
      infraction_number: 'INF-001',
      user: {
        user_id: 1,
        username: 'gabrielym',
        identification: '0951111111',
        email: 'gabriel@mail.com',
      },
      type: { infraction_type_id: 1, name: 'Ruido excesivo' },
      active: true,
      amount: 50,
      created_at: new Date('2025-06-01T10:00:00'),
      updated_at: new Date('2025-06-01T10:00:00'),
    },
    // ...más infracciones
  ];

  private emergencies: EmergencyI[] = [
    {
      emergency_id: 1,
      type: { emergency_type_id: 1, name: 'Incendio' },
      user: {
        user_id: 1,
        username: 'gabrielym',
        identification: '0951111111',
        email: 'gabriel@mail.com',
      },
      created_at: new Date('2025-06-28T18:00:00'),
    },
    // ...más emergencias
  ];

  private users: UserI[] = [
    {
      user_id: 301,
      username: 'eramirez',
      identification: '0951553049',
      full_name: 'Edinson Ramirez Rios',
      email: 'eramirez@gmail.com',
      status: {
        user_status_id: 1,
        name: 'good',
        show_name: 'Bueno',
        created_at: new Date('2025-06-30T10:22:00Z'),
      },
      type: {
        user_type_id: 1,
        name: 'Administrador',
        show_name: 'Admin',
        created_at: new Date('2025-01-01'),
      },
      created_at: new Date('2025-06-30T10:22:00Z'),
      updated_at: new Date('2025-06-30T10:22:00Z'),
      deleted_at: null,
      details: '',
    },
    {
      user_id: 302,
      username: 'cgonzalez',
      identification: '0951553048',
      full_name: 'Carolina González Bernabé',
      email: 'cgonzalez@gmail.com',
      status: {
        user_status_id: 1,
        name: 'bad',
        show_name: 'Malo',
        created_at: new Date('2025-06-30T10:22:00Z'),
      },
      type: {
        user_type_id: 2,
        name: 'Vecino',
        show_name: 'Vecino',
        created_at: new Date('2025-01-01'),
      },
      created_at: new Date('2025-05-12T08:00:00Z'),
      updated_at: new Date('2025-06-29T16:08:00Z'),
      details: '',
    },
    {
      user_id: 303,
      username: 'mvillegas',
      identification: '0951553047',
      full_name: 'Manuel Villegas',
      email: 'mvillegas@gmail.com',
      status: {
        user_status_id: 1,
        name: 'in_observation',
        show_name: 'En observacion',
        created_at: new Date('2025-06-30T10:22:00Z'),
      },
      type: {
        user_type_id: 2,
        name: 'Vecino',
        show_name: 'Vecino',
        created_at: new Date('2025-01-01'),
      },
      created_at: new Date('2025-06-01T08:00:00Z'),
      updated_at: null,
      details: '',
    },
  ];

  // --- LOGIN ---
  async login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === '1234') {
          resolve({
            success: true,
            token: 'FAKE_TOKEN',
            user: { username: 'admin', name: 'Administrador' },
          });
        } else {
          reject({ success: false, message: 'Credenciales incorrectas' });
        }
      }, 900);
    });
  }

  // ==== REPORTES ====
  async getReportList(): Promise<ReportI[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.reports), 800)
    );
  }

  async getReportById(report_id: number): Promise<ReportI | undefined> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(this.reports.find((r) => r.report_id === report_id)),
        500
      )
    );
  }

  async updateReport(
    report_id: number,
    data: Partial<ReportI>
  ): Promise<{ success: boolean; updated?: ReportI }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const idx = this.reports.findIndex((r) => r.report_id === report_id);
        if (idx >= 0) {
          this.reports[idx] = {
            ...this.reports[idx],
            ...data,
            updated_at: new Date(),
          };
          resolve({ success: true, updated: this.reports[idx] });
        } else {
          resolve({ success: false });
        }
      }, 800);
    });
  }

  // ==== INFRACCIONES ====
  async getInfractionList(): Promise<InfractionI[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.infractions), 800)
    );
  }

  async getInfractionById(
    infraction_id: number
  ): Promise<InfractionI | undefined> {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            this.infractions.find((i) => i.infraction_id === infraction_id)
          ),
        500
      )
    );
  }

  async updateInfraction(
    infraction_id: number,
    data: Partial<InfractionI>
  ): Promise<{ success: boolean; updated?: InfractionI }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const idx = this.infractions.findIndex(
          (i) => i.infraction_id === infraction_id
        );
        if (idx >= 0) {
          this.infractions[idx] = {
            ...this.infractions[idx],
            ...data,
            updated_at: new Date(),
          };
          resolve({ success: true, updated: this.infractions[idx] });
        } else {
          resolve({ success: false });
        }
      }, 800);
    });
  }

  // ==== EMERGENCIAS ====
  async getEmergencyList(): Promise<EmergencyI[]> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.emergencies), 800)
    );
  }

  // --- USUARIOS ---
  async getUserList(): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 800);
    });
  }
  async getUserById(id: number): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users.find((u) => u.user_id === id));
      }, 600);
    });
  }

  async updateUser(id: number, newData: any): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const idx = this.users.findIndex((u) => u.user_id === id);
        if (idx >= 0) {
          this.users[idx] = { ...this.users[idx], ...newData };
          resolve({ success: true, user: { ...this.users[idx] } });
        } else {
          resolve({ success: false });
        }
      }, 1000);
    });
  }
}

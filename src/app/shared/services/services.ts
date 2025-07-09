// src/app/shared/services/api.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { InfractionI } from '../interfaces/infraction.interface';
import { EmergencyI } from '../interfaces/emergency.interface';
import { ReportI } from '../interfaces/report.interface';
import {
  LoginRequest,
  UserResetRequest,
  UserUpdateRequest,
} from '../interfaces/request.interface';
import {
  ApiResponse,
  LoginResponseData,
  UserListData,
} from '../interfaces/response.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;
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
  isAuthenticated(): boolean {
    // Aquí tu lógica real, por ejemplo, chequear si hay token en localStorage:
    return !!localStorage.getItem('token');
    // O según como manejes la autenticación en tu app
  }
  // --- LOGIN ---
  async login(
    credentials: LoginRequest
  ): Promise<ApiResponse<LoginResponseData>> {
    const url = `${this.baseUrl}/auth/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    try {
      const resp = await firstValueFrom(
        this.http.post<ApiResponse<LoginResponseData>>(url, credentials, {
          headers,
        })
      );
      if (!resp) {
        // Maneja el caso improbable, pero siempre retorna un ApiResponse válido
        return {
          code: 500,
          message: 'No response from server',
          data: { token: '' },
        };
      }
      return resp;
    } catch (error: any) {
      // Convierte el error a un ApiResponse para mantener el tipo
      return {
        code: error?.status || 500,
        message: error?.error?.message || 'Error de red',
        data: { token: '' },
      };
    }
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
  async createUser(userData: {
    username: string;
    name: string;
    lastName: string;
    identification: string;
    email: string;
    typeId: number;
  }): Promise<
    ApiResponse<{
      userId: string;
      username: string;
      email: string;
      password: string;
    }>
  > {
    const url = `${this.baseUrl}/User/create`;
    try {
      const resp = await firstValueFrom(
        this.http.post<
          ApiResponse<{
            userId: string;
            username: string;
            email: string;
            password: string;
          }>
        >(url, userData)
      );
      if (resp) return resp;
      return {
        code: 500,
        message: 'No response from server',
        data: {
          userId: '',
          username: '',
          email: '',
          password: '',
        },
      };
    } catch (error: any) {
      return {
        code: error?.status || 500,
        message: error?.error?.message || 'Error de red',
        data: {
          userId: '',
          username: '',
          email: '',
          password: '',
        },
      };
    }
  }

  async getUserList(skip = 0): Promise<ApiResponse<UserListData>> {
    const url = `${this.baseUrl}/User/get/all`;
    const params = new HttpParams().set('skip', skip.toString());
    try {
      const resp = await firstValueFrom(
        this.http.get<ApiResponse<UserListData>>(url, { params })
      );
      if (resp) return resp;
      return {
        code: 500,
        message: 'No response from server',
        data: { count: 0, data: [] },
      };
    } catch (error: any) {
      return {
        code: error?.status || 500,
        message: error?.error?.message || 'Error de red',
        data: { count: 0, data: [] },
      };
    }
  }

  async getUserById(userId: string): Promise<ApiResponse<UserListData>> {
    const url = `${this.baseUrl}/User/get/by-id`;
    const params = new HttpParams().set('userId', userId);
    try {
      const resp = await firstValueFrom(
        this.http.get<ApiResponse<UserListData>>(url, { params })
      );
      if (resp) return resp;
      return {
        code: 500,
        message: 'No response from server',
        data: { count: 0, data: [] },
      };
    } catch (error: any) {
      return {
        code: error?.status || 500,
        message: error?.error?.message || 'Error de red',
        data: { count: 0, data: [] },
      };
    }
  }

  async updateUserById(userData: UserUpdateRequest): Promise<ApiResponse<any>> {
    const url = `${this.baseUrl}/User/update`;
    try {
      const resp = await firstValueFrom(
        this.http.put<ApiResponse<any>>(url, userData)
      );
      if (resp.code == 200 || resp.code == 201) {
        return resp;
      } else {
        return {
          code: 500,
          message: 'No response from server',
          data: { count: 0, data: [] },
        };
      }
    } catch (error: any) {
      return {
        code: error?.status || 500,
        message: error?.error?.message || 'Error de red',
        data: { count: 0, data: [] },
      };
    }
  }

  async resetUserPasswrd(paramsObj: {
    [key: string]: string;
  }): Promise<ApiResponse<any>> {
    const url = `${this.baseUrl}/UserManagement/clear-password`;
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj[key]) {
        params = params.set(key, paramsObj[key]);
      }
    }
    try {
      const resp = await firstValueFrom(
        this.http.put<ApiResponse<any>>(url, null, { params: params })
      );
      if (resp) return resp;
      return {
        code: 500,
        message: 'No response from server',
        data: { count: 0, data: [] },
      };
    } catch (error: any) {
      return {
        code: error?.status || 500,
        message: error?.error?.message || 'Error de red',
        data: { count: 0, data: [] },
      };
    }
  }
  //Emergencies
  async getInitialNotifications(skip = 0) {
    const url = `${this.baseUrl}/Emergency?skip=${skip}`;
    return await firstValueFrom(this.http.get<any>(url));
  }
}

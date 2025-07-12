// src/app/shared/services/api.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { InfractionI } from '../interfaces/infraction.interface';
import { ReportI } from '../interfaces/report.interface';
import {
  LoginRequest,
  ReportUpdateRequest,
  UserUpdateRequest,
} from '../interfaces/request.interface';
import {
  ApiResponse,
  EmergencyListData,
  LoginResponseData,
  ReportListData,
  UserListData,
} from '../interfaces/response.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  // ==== MOCK DATA ====

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
  async getReportList(skip = 0): Promise<ApiResponse<ReportListData>> {
    const url = `${this.baseUrl}/Report/all?skip=${skip}`;
    try {
      const resp = await firstValueFrom(
        this.http.get<ApiResponse<ReportListData>>(url)
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

  async getReportById(userId: string): Promise<ApiResponse<ReportI>> {
    const url = `${this.baseUrl}/Report/${userId}`;
    try {
      const resp = await firstValueFrom(
        this.http.get<ApiResponse<ReportI>>(url)
      );
      if (resp) return resp;
      return {
        code: 500,
        message: 'No response from server',
        data: null,
      };
    } catch (error: any) {
      return {
        code: error?.status || 500,
        message: error?.error?.message || 'Error de red',
        data: null,
      };
    }
  }

  async updateReport(data: ReportUpdateRequest): Promise<ApiResponse<any>> {
    const url = `${this.baseUrl}/Report/stage`;
    try {
      const resp = await firstValueFrom(
        this.http.put<ApiResponse<any>>(url, data)
      );
      if (resp.code == 200 || resp.code == 201) {
        return resp;
      } else {
        return {
          code: 500,
          message: 'No response from server',
          data: null,
        };
      }
    } catch (error: any) {
      return {
        code: error?.status || 500,
        message: error?.error?.message || 'Error de red',
        data: null,
      };
    }
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
  async getEmergencies(skip = 0): Promise<ApiResponse<EmergencyListData>> {
    const url = `${this.baseUrl}/Emergency?skip=${skip}`;
    try {
      const resp = await firstValueFrom(
        this.http.get<ApiResponse<EmergencyListData>>(url)
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
}

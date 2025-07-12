// src/app/shared/services/api.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { InfractionI } from '../interfaces/infraction.interface';
import { ReportI } from '../interfaces/report.interface';
import {
  InfractionCreateRequestI,
  LoginRequestI,
  ReportUpdateRequestI,
  UserUpdateRequestI,
} from '../interfaces/request.interface';
import {
  ApiResponse,
  EmergencyListData,
  InfractionListData,
  LoginResponseData,
  ReportListData,
  UserListData,
} from '../interfaces/response.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    // Aquí tu lógica real, por ejemplo, chequear si hay token en localStorage:
    return !!localStorage.getItem('token');
    // O según como manejes la autenticación en tu app
  }
  // --- LOGIN ---
  async login(
    credentials: LoginRequestI
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

  async updateReport(data: ReportUpdateRequestI): Promise<ApiResponse<any>> {
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
  async createInfraction(
    data: InfractionCreateRequestI
  ): Promise<ApiResponse<InfractionI>> {
    const url = `${this.baseUrl}/Infraction`;
    try {
      const resp = await firstValueFrom(
        this.http.post<ApiResponse<InfractionI>>(url, data)
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

  async getInfractions(skip = 0): Promise<ApiResponse<InfractionListData>> {
    const url = `${this.baseUrl}/Infraction/all?skip=${skip}`;
    try {
      const resp = await firstValueFrom(
        this.http.get<ApiResponse<InfractionListData>>(url)
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

  async getInfractionById(userId: string): Promise<ApiResponse<InfractionI>> {
    const url = `${this.baseUrl}/Infraction/${userId}`;
    try {
      const resp = await firstValueFrom(
        this.http.get<ApiResponse<InfractionI>>(url)
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

  async inactiveInfractionById(userId: string): Promise<ApiResponse<string>> {
    const url = `${this.baseUrl}/Infraction/toggle/${userId}`;
    try {
      const resp = await firstValueFrom(
        this.http.put<ApiResponse<string>>(url, null)
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

  async updateInfraction(
    data: InfractionCreateRequestI
  ): Promise<ApiResponse<String>> {
    const url = `${this.baseUrl}/Infraction/update-type`;
    try {
      const resp = await firstValueFrom(
        this.http.put<ApiResponse<String>>(url, data)
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

  async updateUserById(
    userData: UserUpdateRequestI
  ): Promise<ApiResponse<any>> {
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

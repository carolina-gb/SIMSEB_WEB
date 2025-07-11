import { EmergencyI } from './emergency.interface';
import { UserI } from './user.interface';

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T | null;
}

export interface LoginResponseData {
  token: string;
}

export interface UserListData {
  count: number;
  data: UserI[];
}

export interface EmergencyListData {
  count: number;
  data: EmergencyI[];
}
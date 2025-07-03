import { UserI } from './user.interface';

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface LoginResponseData {
  token: string;
}

export interface UserListData {
  count: number;
  data: UserI[];
}

export interface LoginRequest {
  input: string;
  password: string;
}

export interface UserUpdateRequest {
  userId: string;
  username: string;
  name: string;
  lastName: string;
  identification: string;
  email: string;
  typeId: number;
}

export interface UserCreateI {
  username: string;
  name: string;
  lastName: string;
  identification: string;
  email: string;
  typeId: number;
}

export interface UserResetRequest {
  targetUsername: string;
  adminUsername: string;
}

export interface ReportUpdateRequest {
  reportId: string;
  stageId: number;
  rejectReason: string;
}
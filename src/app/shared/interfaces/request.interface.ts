export interface LoginRequestI {
  input: string;
  password: string;
}

export interface UserUpdateRequestI {
  userId: string;
  username: string;
  name: string;
  lastName: string;
  identification: string;
  email: string;
  typeId: number;
}

export interface UserCreateRequestI {
  name: string;
  lastName: string;
  identification: string;
  email: string;
  typeId: number;
}

export interface UserResetRequestI {
  targetUsername: string;
  adminUsername: string;
}

export interface ReportUpdateRequestI {
  reportId: string;
  stageId: number;
  rejectReason: string;
}

export interface InfractionCreateRequestI {
  userId: string,
  typeId: number
}

export interface ReportingRequestI {
  initialDate: Date | string;
  endDate: Date | string;
  reportingType: string;
}
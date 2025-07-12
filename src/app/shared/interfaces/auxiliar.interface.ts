// Usuario simple
export interface UserShortI {
  userId: number;
  username: string;
  fullName?: string; // puedes componerlo con first/last name
  identification: string;
  email: string;
}

// Tipo de reporte
export interface ReportTypeI {
  report_type_id: number;
  name: string;
  showName?: string;
  createdAt?: Date;
}

// Archivo
export interface FileDataI {
  file_id: number;
  path: string;
  type: string;
  uploaded_at: Date;
}

// Estado del reporte (stage)
export interface ReportStageI {
  reportStageId: number;
  name: string;
  showName?: string;
  createdAt?: Date;
}

// Tipo de infracción
export interface InfractionTypeI {
  infractionTypeId: number;
  name: string;
  showName: string;
  createdAt: Date;
}

// Tipo de emergencia
export interface EmergencyTypeI {
  emergency_type_id: number;
  name: string;
  show_name?: string;
  created_at?: Date;
}

export interface UserTypeI {
  userTypeId: number;
  name: string;
  showName: string;
  createdAt: Date;
}

export interface UserStatusI {
  userStatusId: number;
  name: string;
  showName: string;
  createdAt: Date;
}
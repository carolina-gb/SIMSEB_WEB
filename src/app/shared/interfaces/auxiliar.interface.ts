// Usuario simple
export interface UserShortI {
  user_id: number;
  username: string;
  full_name?: string; // puedes componerlo con first/last name
  identification: string;
  email: string;
}

// Tipo de reporte
export interface ReportTypeI {
  report_type_id: number;
  name: string;
  show_name?: string;
  created_at?: Date;
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
  report_stage_id: number;
  name: string;
  show_name?: string;
  created_at?: Date;
}

// Tipo de infracción
export interface InfractionTypeI {
  infraction_type_id: number;
  name: string;
  show_name?: string;
  created_at?: Date;
}

// Tipo de emergencia
export interface EmergencyTypeI {
  emergency_type_id: number;
  name: string;
  show_name?: string;
  created_at?: Date;
}

export interface UserTypeI {
  user_type_id: number;
  name: string;
  show_name: string;
  created_at: Date;
}

export interface UserStatusI {
  user_status_id: number;
  name: string;
  show_name: string;
  created_at: Date;
}
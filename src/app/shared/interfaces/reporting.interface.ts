export interface ReporteDetalle {
  reportesIngresados: number;
  reportesEnCurso: number;
  reportesRechazados: number;
  reportesAprobados: number;
  totalReportes: number;
}

export interface ReportingReports {
  fechaInicio: string;
  fechaFin: string;
  reportes: {
    [categoria: string]: ReporteDetalle;
  };
}

export interface EmergenciaDetalle {
  total: number;
}

export interface ReportingEmergencies {
  fechaInicio: string;
  fechaFin: string;
  emergencias: {
    [tipo: string]: EmergenciaDetalle; // Ej: "Incendio", "Pelea", etc.
  };
}

export interface InfraccionDetalle {
  totalInfracciones: number;
  montoTotal: number;
}

export interface ReportingInfraccion {
  fechaInicio: string;
  fechaFin: string;
  infracciones: {
    [nivel: string]: InfraccionDetalle; // Ej: "Alta", "Moderada", etc.
  };
}

export interface ServiceResponseData {
  reportingReports: ReportingReports | null;
  reportingEmergencies: ReportingEmergencies | null;
  reportingInfraccion: ReportingInfraccion | null;
}

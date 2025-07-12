import { FileDataI, ReportStageI, ReportTypeI, UserShortI } from "./auxiliar.interface";

export interface ReportI {
  reportId: string;
  caseNumber: string;
  description: string;
  rejectReason: string | null;
  rejectBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  evidenceFile: FileDataI | null;
  type: ReportTypeI;
  stage: ReportStageI;
  // user?: UserShortI; // Descomenta si tu respuesta lo incluye en otro endpoint
}

export interface SumaryReportI {
  caseNumber: string;
  description: string;
  stage: any;
  createdAt: Date;
}
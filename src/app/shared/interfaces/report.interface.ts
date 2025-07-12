import { FileDataI, ReportStageI, ReportTypeI, UserShortI } from "./auxiliar.interface";

export interface ReportI {
  reportId: string;
  caseNumber: string;
  description: string;
  rejectReason: string | null;
  rejectBy: string | null;
  createdAt: string;
  updatedAt: string;
  evidenceFile: FileDataI | null;
  type: ReportTypeI;
  stage: ReportStageI;
  // user?: UserShortI; // Descomenta si tu respuesta lo incluye en otro endpoint
}

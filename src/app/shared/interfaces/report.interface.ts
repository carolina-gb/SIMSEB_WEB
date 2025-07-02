import { FileDataI, ReportStageI, ReportTypeI, UserShortI } from "./auxiliar.interface";

export interface ReportI {
  report_id: number;
  case_number: string;
  type: ReportTypeI;
  evidence_file?: FileDataI | null;
  user: UserShortI;
  description: string;
  reject_reason?: string | null;
  reject_by?: number | null;
  stage: ReportStageI[];
  created_at: Date;
  updated_at: Date;
}

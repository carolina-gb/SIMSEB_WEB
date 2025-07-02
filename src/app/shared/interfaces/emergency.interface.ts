import { EmergencyTypeI, UserShortI } from './auxiliar.interface';

export interface EmergencyI {
  emergency_id: number;
  type: EmergencyTypeI;
  user: UserShortI;
  created_at: Date;
}

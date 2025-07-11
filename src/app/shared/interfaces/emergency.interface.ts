import { EmergencyTypeI, UserShortI } from './auxiliar.interface';

export interface EmergencyI {
  emergencyId: number;
  typeId: number;
  typeName: string;
  userId: string;
  username: string;
  createdAt: Date;
}

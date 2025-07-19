export interface EmergencyI {
  emergencyId: number;
  typeId: number;
  typeName: string;
  userId: string;
  username: string;
  latitude?: number; // pon “?” si en la BD puede venir null
  longitude?: number;
  createdAt: Date;
}

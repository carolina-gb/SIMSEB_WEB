import { UserStatusI, UserTypeI } from "./auxiliar.interface";

export interface UserI {
  user_id: number;
  username: string;
  fullName: string;
  identification: string;
  email: string;
  status: UserStatusI;
  created_at: Date; // o Date si lo manejas así
  updated_at?: Date | null; // o Date
  deleted_at?: Date | null; // o Date
  details?: string;
  type?: UserTypeI;
}
  
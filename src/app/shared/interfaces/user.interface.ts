import { UserStatusI, UserTypeI } from "./auxiliar.interface";

export interface UserI {
  userId: string;
  username: string;
  fullName: string;
  identification: string;
  email: string;
  userStatus: UserStatusI;
  createdAt: Date; // o Date si lo manejas así
  updatedAt?: Date | null; // o Date
  deletedAt?: Date | null; // o Date
  details?: string;
  type?: UserTypeI;
}
  
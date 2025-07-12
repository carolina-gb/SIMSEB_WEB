import { InfractionTypeI, UserShortI } from "./auxiliar.interface";

export interface InfractionI {
  infractionId: string;
  infractionNumber: string;
  user: UserShortI;
  type: InfractionTypeI;
  amount: number;
  active: boolean;
  createdAt: Date | string;
  updatedAt?: string;
}
import { InfractionTypeI, UserShortI } from "./auxiliar.interface";

export interface InfractionI {
  infraction_id: number;
  infraction_number: string;
  user: UserShortI;
  type: InfractionTypeI;
  active: boolean;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

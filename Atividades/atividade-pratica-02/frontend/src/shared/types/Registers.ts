import { Equipment } from './Equipment';
import { User } from './User';

export interface Registers {
  id: string;
  description: string;
  deadline: string;
  type: number;
  equipment: Equipment;
  user: User;
}

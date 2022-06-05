import { Registers } from './Registers';

export interface Equipment {
  id: string;
  name: string;
  registers: Registers[];
}

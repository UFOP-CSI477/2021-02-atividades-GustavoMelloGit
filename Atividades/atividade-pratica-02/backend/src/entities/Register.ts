import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { v4 } from 'uuid';
import { Equipment } from './Equipment';
import { User } from './User';

@Entity()
export class Register {
  @PrimaryColumn()
  readonly id!: string;

  @Column()
  description!: string;

  @Column()
  deadline!: Date;

  @Column()
  type!: number;

  @ManyToOne(() => Equipment, (equipment) => equipment.registers)
  equipment!: Equipment;

  @ManyToOne(() => User, (user) => user.registers)
  user!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

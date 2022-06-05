import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { v4 } from "uuid";
import { Register } from "./Register";

@Entity()
export class Equipment {
  @PrimaryColumn()
  readonly id!: string;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => Register, (register) => register.equipment)
  registers!: Register[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}

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
export class User {
  @PrimaryColumn()
  readonly id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  is_admin!: boolean;

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

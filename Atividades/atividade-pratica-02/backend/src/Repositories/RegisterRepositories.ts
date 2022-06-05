import { EntityRepository, Repository } from "typeorm";
import { Register } from "../entities/Register";


@EntityRepository(Register)
export class RegisterRepositories extends Repository<Register> {}

import { EntityRepository, Repository } from "typeorm";
import { Equipment } from "../entities/Equipment";

@EntityRepository(Equipment)
export class EquipmentRepositories extends Repository<Equipment> {}

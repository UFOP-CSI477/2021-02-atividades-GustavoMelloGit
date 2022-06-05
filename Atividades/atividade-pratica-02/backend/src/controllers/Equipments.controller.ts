import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import ICreateEquipmentDTO from "../DTOs/EquipmentsDTOs/ICreateEquipmentDTO";
import { EquipmentRepositories } from "../Repositories/EquipmentRepositories";
import { RegisterRepositories } from "../Repositories/RegisterRepositories";


export default class EquipmentsController {
  static async create(req: Request, res: Response) {
    const { name }: ICreateEquipmentDTO = req.body;
    const equipmentRepository = getCustomRepository(EquipmentRepositories);

    if (!name)
      return res
        .status(400)
        .json({ error: "O nome do equipamento é obrigatório!" });

    const equipmentAlreadyExists = await equipmentRepository.findOne({ name });

    if (equipmentAlreadyExists)
      return res.status(400).json({ error: "Equipamento já existe!" });

    const equipment = equipmentRepository.create({
      name,
    });

    await equipmentRepository.save(equipment);

    return res.status(200).json(equipment);
  }

  static async read(req: Request, res: Response) {
    const equipmentRepository = getCustomRepository(EquipmentRepositories);

    const equipments = await equipmentRepository.find();

    return res.status(200).json(equipments);
  }

  static async readOne(req: Request, res: Response) {
    const { id } = req.params;
    const equipmentRepository = getCustomRepository(EquipmentRepositories);

    const equipment = await equipmentRepository.findOne(id);

    if (!equipment)
      return res.status(404).json({ error: "Equipamento não encontrado!" });

    return res.status(200).json(equipment);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const equipmentRepository = getCustomRepository(EquipmentRepositories);

    const equipment = await equipmentRepository.findOne(id);

    if (!equipment)
      return res.status(404).json({ error: "Equipamento não encontrado!" });

    const equipmentAlreadyExists = await equipmentRepository.findOne({ name });

    if (equipmentAlreadyExists)
      return res
        .status(400)
        .json({ error: "Já existe um equipamento com esse nome!" });

    equipment.name = name;

    await equipmentRepository.save(equipment);

    return res.status(200).json(equipment);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const equipmentRepository = getCustomRepository(EquipmentRepositories);
    const registerRepository = getCustomRepository(RegisterRepositories)

    if(!id) return res.status(400).json({ error: "Id do equipamento é obrigatório!" });

    const equipment = await equipmentRepository.findOne(id);

    if (!equipment)
      return res.status(404).json({ error: "Equipamento não encontrado!" });

    const equipmentHasMaintenance = await registerRepository.findOne({ equipment })

    if (equipmentHasMaintenance) return res.status(400).json({ error: "Esse equipamento possui uma manutenção programada e não pode ser deletado nesse momento!" })

    await equipmentRepository.delete(id);

    return res.status(200).json({ message: "Equipamento deletado com sucesso!" });
  }
}

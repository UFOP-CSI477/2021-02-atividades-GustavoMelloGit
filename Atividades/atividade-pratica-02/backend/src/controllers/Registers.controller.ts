import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { v4 } from 'uuid';
import ICreateRegisterDTO from '../DTOs/RegistersDTOs/ICreateRegisterDTO';
import IUpdateRegisterDTO from '../DTOs/RegistersDTOs/IUpdateRegisterDTO';
import { EquipmentRepositories } from '../Repositories/EquipmentRepositories';
import { RegisterRepositories } from '../Repositories/RegisterRepositories';
import { UserRepositories } from '../Repositories/UserRepositories';
import {
  dateFormatVerifier,
  dateVerifier,
  toDate,
  compareTwoDates,
} from '../utils/dates';

export default class RegisterController {
  static async create(req: Request, res: Response): Promise<Response> {
    const { description, deadline, equipment_id, type }: ICreateRegisterDTO =
      req.body;

    const registerRepository = getCustomRepository(RegisterRepositories);
    const equipmentRepository = getCustomRepository(EquipmentRepositories);
    const userRepository = getCustomRepository(UserRepositories);

    if (!description)
      return res
        .status(400)
        .json({ error: 'A descrição da manutenção é obrigatória!' });

    if (!type)
      return res
        .status(400)
        .json({ error: 'O tipo da manutenção é obrigatório!' });

    if (type < 1 || type > 3)
      return res.status(400).json({ error: 'Tipo de manutenção inválida!' });

    if (!deadline)
      return res
        .status(400)
        .json({ error: 'A data limite da manutenção é obrigatória!' });

    if (!dateFormatVerifier(deadline))
      return res
        .status(400)
        .json({ error: 'Data inválida! Formatos aceitos: dd/mm/aaaa' });

    if (!dateVerifier(deadline))
      return res
        .status(400)
        .json({ error: 'A data limite deve ser maior ou igual a data atual!' });

    const convertedDate = toDate(deadline);

    if (!equipment_id)
      return res
        .status(400)
        .json({ error: 'O id do equipamento é obrigatório!' });

    const equipmentAlreadyExists = await equipmentRepository.findOne({
      id: equipment_id,
    });

    if (!equipmentAlreadyExists)
      return res.status(400).json({ error: 'Equipamento não encontrado!' });

    const currentUser = await userRepository.findOne({ id: req.user_id });

    const newMaintenance = registerRepository.create({
      id: v4(),
      description,
      deadline: convertedDate,
      type,
      equipment: equipmentAlreadyExists,
      user: currentUser,
    });

    await registerRepository.save(newMaintenance);

    const maintenance = {
      id: newMaintenance.id,
      description: newMaintenance.description,
      deadline: newMaintenance.deadline,
      type: newMaintenance.type,
      equipment_id: newMaintenance.equipment.id,
      user_id: newMaintenance.user.id,
      created_at: newMaintenance.created_at,
      updated_at: newMaintenance.updated_at,
    };

    return res.status(200).json(maintenance);
  }

  static async read(req: Request, res: Response): Promise<Response> {
    const registerRepository = getCustomRepository(RegisterRepositories);

    const registers = await registerRepository.find({
      select: ['id', 'description', 'deadline', 'type', 'equipment', 'user'],
      relations: ['equipment', 'user'],
    });

    return res.status(200).json(registers);
  }

  static async readOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const registerRepository = getCustomRepository(RegisterRepositories);

    const register = await registerRepository.findOne(id, {
      select: ['id', 'description', 'deadline', 'type', 'equipment', 'user'],
      loadEagerRelations: true,
    });

    if (!register)
      return res
        .status(404)
        .json({ error: 'Nenhuma manutenção encontrada com o id solicitado!' });

    return res.status(200).json(register);
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const { deadline, type, description }: IUpdateRegisterDTO = req.body;
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ error: 'O id da manutenção é obrigatório!' });

    const registerRepository = getCustomRepository(RegisterRepositories);
    const register = await registerRepository.findOne(id);

    if (!register)
      return res
        .status(404)
        .json({ error: 'Nenhuma manutenção encontrada com o id solicitado!' });

    if (deadline) {
      if (!dateFormatVerifier(deadline))
        return res
          .status(400)
          .json({ error: 'Data inválida! Formatos aceitos: dd/mm/aaaa' });

      register.deadline = toDate(deadline);
    }

    if (type) {
      if (type < 1 || type > 3)
        return res.status(400).json({ error: 'Tipo de manutenção inválida!' });

      register.type = type;
    }

    if (description) register.description = description;
    await registerRepository.save(register);

    return res.status(200).json(register);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const registerRepository = getCustomRepository(RegisterRepositories);

    if (!id)
      return res
        .status(400)
        .json({ error: 'O id da manutenção é obrigatório!' });

    const register = await registerRepository.findOne(id);

    if (!register)
      return res
        .status(404)
        .json({ error: 'Nenhuma manutenção encontrada com o id solicitado!' });

    await registerRepository.delete(id);

    return res
      .status(200)
      .json({ message: 'Manutenção deletada com sucesso!' });
  }
}

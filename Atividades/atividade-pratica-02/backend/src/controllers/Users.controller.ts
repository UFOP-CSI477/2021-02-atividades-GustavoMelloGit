import { compare, hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import ICreateUserDTO from '../DTOs/UsersDTOs/ICreateUserDTO';
import IUpdateUserDTO from '../DTOs/UsersDTOs/IUpdateUserDTO';
import { TokenRepositories } from '../Repositories/TokenRepositories';
import { UserRepositories } from '../Repositories/UserRepositories';

export default class UsersController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email)
      return res.status(400).json({ error: 'Email e/ou senha incorretos!' });
    if (!password)
      return res.status(400).json({ error: 'Email e/ou senha incorretos!' });

    const userRepository = getCustomRepository(UserRepositories);

    const user = await userRepository.findOne(
      { email },
      { select: ['id', 'name', 'is_admin', 'password'] }
    );

    if (!user)
      return res.status(404).json({ error: 'Email e/ou senha incorretos!' });

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(401).json({ error: 'Email e/ou senha incorretos!' });

    const token = sign(
      {
        name: user.name,
        id: user.id,
        is_admin: user.is_admin,
        email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      }
    );

    return res.status(200).json({ token });
  }

  static async create(req: Request, res: Response) {
    const { name, email, password, is_admin }: ICreateUserDTO = req.body;

    if (!name)
      return res.status(400).json({
        error: 'O nome do usuário é obrigatório!',
      });

    if (!email)
      return res.status(400).json({
        error: 'O email do usuário é obrigatório!',
      });

    if (!password)
      return res.status(400).json({
        error: 'A senha do usuário é obrigatória!',
      });

    const userRepository = getCustomRepository(UserRepositories);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists)
      return res
        .status(409)
        .json({ error: 'Já existe um usuário com esse email!' });

    const hashPassword = await hash(password, 10);
    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
      is_admin: is_admin ? is_admin : false,
    });

    await userRepository.save(user);

    return res.status(200).json(user);
  }

  static async readAll(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepositories);

    const users = await userRepository.find();

    return res.status(200).json(users);
  }

  static async readOne(req: Request, res: Response) {
    const { id } = req.params;

    const userRepository = getCustomRepository(UserRepositories);

    const user = await userRepository.findOne(id);

    if (!user)
      return res.status(404).json({ error: 'Usuário não encontrado!' });

    return res.status(200).json(user);
  }

  static async update(req: Request, res: Response) {
    const { email, password }: IUpdateUserDTO = req.body;
    let hasUpdatedAnyField = false;

    const userRepository = getCustomRepository(UserRepositories);
    const tokenRepository = getCustomRepository(TokenRepositories);

    const user = await userRepository.findOne(req.user_id);

    if (!user)
      return res.status(404).json({ error: 'Usuário não encontrado!' });

    if (email) {
      user.email = email;
      hasUpdatedAnyField = true;
    }

    if (password) {
      user.password = await hash(password, 10);
      hasUpdatedAnyField = true;
    }

    if (!hasUpdatedAnyField) return res.status(200).end();

    await tokenRepository.save({
      token: req.headers.authorization?.split(' ')[1],
    });

    await userRepository.save(user);

    return res.status(200).json(user);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const userRepository = getCustomRepository(UserRepositories);
    const tokenRepository = getCustomRepository(TokenRepositories);

    const user = await userRepository.findOne(id);

    if (!user)
      return res.status(404).json({ error: 'Usuário não encontrado!' });

    await tokenRepository.save({
      token: req.headers.authorization?.split(' ')[1],
    });

    await userRepository.delete(id);

    return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  }
}

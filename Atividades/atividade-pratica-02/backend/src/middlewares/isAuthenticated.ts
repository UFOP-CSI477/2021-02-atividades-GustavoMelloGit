import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { TokenRepositories } from '../Repositories/TokenRepositories';

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const tokenRepository = getCustomRepository(TokenRepositories);
  if (!authorization) return res.status(401).json({ error: 'Não autorizado' });

  const [, token] = authorization.split(' ');

  const tokenIsBlackListed = await tokenRepository.findOne({ token });

  if (tokenIsBlackListed)
    return res.status(401).json({ error: 'Não autorizado' });

  const { id } = verify(token, process.env.JWT_SECRET as string) as {
    id: string;
  };

  if (!id) return res.status(401).json({ error: 'Não autorizado' });

  req.user_id = id;

  return next();
}

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  name: string;
  user_id: string;
  is_admin: boolean;
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  const [, token] = authorization.split(" ");

  const { is_admin } = verify(token, process.env.JWT_SECRET) as ITokenPayload;

  if (!is_admin) {
    return res.status(401).json({ error: "Operação não autorizada!" });
  }

  return next();
}

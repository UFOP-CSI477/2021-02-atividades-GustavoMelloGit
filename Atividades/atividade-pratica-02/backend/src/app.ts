import express, { NextFunction, Request, Response } from 'express';
import { routes } from './Routes/Routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error)
    return res.status(400).json({ message: err.message });

  return res.status(500).json({ message: 'Internal server error' });
});

export { app };

import { Router } from 'express';
import UsersController from '../controllers/Users.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const route = Router();

// crud
route.post('/create', UsersController.create);
route.get('/', UsersController.readAll);
route.get('/:id', isAuthenticated, UsersController.readOne);
route.put('/me/update', isAuthenticated, UsersController.update);
route.delete('/delete/:id', isAuthenticated, UsersController.delete);

export { route };

import { Router } from 'express';
import RegisterController from '../controllers/Registers.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const route = Router();

route.post('/new', isAuthenticated, RegisterController.create);
route.get('/', RegisterController.read);
route.get('/:id', RegisterController.readOne);
route.put('/update/:id', isAuthenticated, RegisterController.update);
route.delete('/delete/:id', isAuthenticated, RegisterController.delete);

export { route };

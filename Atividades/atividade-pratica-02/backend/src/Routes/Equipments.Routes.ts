import { Router } from 'express';
import EquipmentsController from '../controllers/Equipments.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const route = Router();

route.post('/create', isAuthenticated, EquipmentsController.create);
route.get('/', EquipmentsController.read);
route.get('/:id', EquipmentsController.readOne);
route.put('/update/:id', isAuthenticated, EquipmentsController.update);
route.delete('/delete/:id', isAuthenticated, EquipmentsController.delete);

export { route };

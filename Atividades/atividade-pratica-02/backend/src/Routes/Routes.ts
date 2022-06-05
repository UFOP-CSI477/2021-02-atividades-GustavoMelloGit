import { Router } from 'express';
import { route as userRoutes } from './User.Routes';
import { route as equipmentsRoutes } from './Equipments.Routes';
import { route as maintenanceRoutes } from './Maintenance.Routes';
import UsersController from '../controllers/Users.controller';

const routes = Router();

routes.post('/login', UsersController.login);

// users routes
routes.use('/users', userRoutes);
routes.use('/equipments', equipmentsRoutes);
routes.use('/maintenance', maintenanceRoutes);

export { routes };

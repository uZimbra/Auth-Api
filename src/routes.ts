import { Router } from 'express';

import authMiddleware from './middlewares/authMiddleware';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

const routes = Router();

routes.get('/users', authMiddleware, UserController.index);
routes.post('/users', UserController.create);

routes.post('/auth', AuthController.authenticate);

export default routes;

import { Router } from 'express';

import TaskController from './controllers/TaskController';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

import authMiddleware from './middlewares/auth';


const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/session', SessionController.login);

routes.use(authMiddleware);

routes.get('/task', TaskController.index);
routes.post('/task', TaskController.store);
routes.put('/task/:taskId', TaskController.update);
routes.delete('/task/:taskId', TaskController.delete);
routes.delete('/session', SessionController.logout);

export default routes;
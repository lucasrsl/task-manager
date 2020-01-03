import { Router } from 'express';

import TaskController from './controllers/TaskController';
import UserController from './controllers/UserController';


const routes = new Router();

routes.post('/task', TaskController.store);
routes.post('/user', UserController.store);

export default routes;
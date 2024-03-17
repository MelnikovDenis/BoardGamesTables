import { Router } from 'express';
import BoardController from '../controllers/BoardController.js';

const boardRouter = new Router();

boardRouter.post('/', BoardController.create);
boardRouter.get('/', BoardController.read);
boardRouter.put('/:id(\\d+)', BoardController.update);
boardRouter.delete('/:id(\\d+)', BoardController.delete);

export default boardRouter;
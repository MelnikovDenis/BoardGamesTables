import { Router } from 'express';
import BoardMemberController from '../controllers/BoardMemberControlles.js';

const boardMemberRouter = new Router();

boardMemberRouter.post('/', BoardMemberController.create);
boardMemberRouter.get('/', BoardMemberController.read);
boardMemberRouter.put('/:boardId(\\d+)/:memberId(\\d+)', BoardMemberController.update);
boardMemberRouter.delete('/:boardId(\\d+)/:memberId(\\d+)', BoardMemberController.delete);

export default boardMemberRouter;
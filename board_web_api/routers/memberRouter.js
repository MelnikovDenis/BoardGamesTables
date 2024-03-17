import { Router } from 'express';
import MemberController from '../controllers/MemberController.js';

const memberRouter = new Router();

memberRouter.post('/', MemberController.create);
memberRouter.get('/', MemberController.read);
memberRouter.put('/:id(\\d+)', MemberController.update);
memberRouter.delete('/:id(\\d+)', MemberController.delete);

export default memberRouter;
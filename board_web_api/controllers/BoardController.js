import BoardRepository from "../persistence/reposotories/BoardRepository.js";
import { AlreadyExistsError, NotFoundError } from '../errors/CustomErrors.js';

export default class BoardController {
      static async create(req, res, next) {
            try {
                  const name = req.body?.name;

                  const board = await BoardRepository.createBoard(name);

                  res.status(200).json(board);
            }
            catch(e) {
                  if(e?.code == '23505')
                        next(new AlreadyExistsError('Настольная игра с таким названием уже добавлена'));
                  else
                        next(e);
            }
            
      }
      static async read(req, res, next) {
            try {
                  const boards = await BoardRepository.readBoards();

                  res.status(200).json(boards);
            }
            catch(e) {
                  next(e);
            }
      }
      static async update(req, res, next) {
            try {
                  const id = parseInt(req.params.id);
                  const name = req.body?.name;

                  const board = await BoardRepository.updateBoard(id, name);

                  if(!board)
                        throw new NotFoundError('Настольной игры с таким id не существует');

                  res.status(200).json(board);
            }
            catch(e) {
                  next(e);
            }
      }
      static async delete(req, res, next) {
            try {
                  const id = parseInt(req.params.id);

                  const board = await BoardRepository.deleteBoard(id);

                  if(!board)
                        throw new NotFoundError('Настольной игры с таким id не существует');

                  res.status(200).json(board);
            }
            catch(e) {
                  next(e);
            }
      }
}
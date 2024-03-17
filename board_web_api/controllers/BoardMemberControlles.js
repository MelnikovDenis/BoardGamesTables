import BoardMemberRepository from "../persistence/reposotories/BoardMemberRepository.js";
import { AlreadyExistsError, NotFoundError } from '../errors/CustomErrors.js';

export default class BoardMemberController {
      static async create(req, res, next) {
            try {
                  const boardId = req.body?.boardId;
                  const memberId = req.body?.memberId;

                  const boardMember = await BoardMemberRepository.createBoardMember(boardId, memberId);

                  res.status(200).json(boardMember);
            }
            catch(e) {
                  if(e?.code == '23505')
                        next(new AlreadyExistsError('Запись о том, что у данного человека есть данная игра, уже добавлена'));
                  if(e?.code == '23503')
                        next(new NotFoundError('Пользователя или игры с таким id не существует'));
                  else
                        next(e);
            }
      }
      static async read(req, res, next) {
            try {
                  const boardsMembers = await BoardMemberRepository.readBoardsMembers();

                  res.status(200).json(boardsMembers);
            }
            catch(e) {
                  next(e);
            }
      }
	  static async update(req, res, next) {
            try {
                  const oldBoardId = parseInt(req.params.boardId);
                  const oldMemberId = parseInt(req.params.memberId);
				  
                  const newBoardId = req.body?.boardId;
                  const newMemberId = req.body?.memberId;
				  
			const boardMember = await BoardMemberRepository.updateBoardMember(oldBoardId, oldMemberId, newBoardId, newMemberId);	  

                  res.status(200).json(boardMember);
            }
            catch(e) {
                  if(e?.code == '23505')
                        next(new AlreadyExistsError('Запись о том, что у данного человека есть данная игра, уже добавлена'));
                  if(e?.code == '23503')
                        next(new NotFoundError('Пользователя или игры с таким id не существует'));
                  else
                        next(e);
            }
      }
      static async delete(req, res, next) {
            try {
                  const boardId = parseInt(req.params.boardId);
                  const memberId = parseInt(req.params.memberId);

                  const boardMember = await BoardMemberRepository.deleteBoardMember(boardId, memberId);

                  if(!boardMember)
                        throw new NotFoundError('Запись о том, что у данного человека есть данная игра, не существует');

                  res.status(200).json(boardMember);
            }
            catch(e) {
                  next(e);
            }
      }
}
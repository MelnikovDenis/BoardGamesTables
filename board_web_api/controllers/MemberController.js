import MemberRepository from "../persistence/reposotories/MemberReposotory.js";
import { AlreadyExistsError, NotFoundError } from '../errors/CustomErrors.js';

export default class MemberController {
      static async create(req, res, next) {
            try {
                  const name = req.body?.name;
                  const email = req.body?.email;
                  
                  const member = await MemberRepository.createMember(name, email);

                  res.status(200).json(member);
            }
            catch(e) {
                  if(e?.code == '23505')
                        next(new AlreadyExistsError('Человек с таким email уже добавлен'));
                  else
                        next(e);
            }
      }
      static async read(req, res, next) {
            try {
                  const members = await MemberRepository.readMembers();
                  res.status(200).json(members);
            }
            catch(e) {
                  next(e);
            }
      }
      static async update(req, res, next) {
            try {
                  const id = parseInt(req.params.id);
                  const name = req.body?.name;
                  const email = req.body?.email;

                  const member = await MemberRepository.updateMember(id, name, email);
                  
                  if(!member)
                        throw new NotFoundError('Настольной игры с таким id не существует');

                  res.status(200).json(member);
            }
            catch(e) {
                  next(e);
            }
      }
      static async delete(req, res, next) {
            try {
                  const id = parseInt(req.params.id);

                  const member = await MemberRepository.deleteMember(id);

                  if(!member)
                        throw new NotFoundError('Настольной игры с таким id не существует');

                  res.status(200).json(member);
            }
            catch(e) {
                  next(e);
            }
      }
}
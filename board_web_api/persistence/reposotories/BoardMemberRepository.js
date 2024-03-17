import { query, getClient } from '../db.js';

export default class BoardMemberRepository {
      static async createBoardMember(boardId, memberId) {
            const paramQuery = {
                  text: 'INSERT INTO boards_members(boardId, memberId) VALUES($1, $2) RETURNING *',
                  values: [boardId, memberId]
            };
            const result = await query(paramQuery);
            return { 
                  boardId: result.rows[0].boardid,
                  memberId: result.rows[0].memberid
            }
      }
      static async readBoardsMembers() {
            const result = await query(
                  'SELECT BM.boardId AS boardId, boards.name AS boardName, ' + 
                  'BM.memberId AS memberId, members.name AS memberName, members.email AS memberEmail ' + 
                  'FROM boards_members AS BM ' +
                  'JOIN boards ON boards.id = BM.boardId ' +
                  'JOIN members ON members.id = BM.memberId');
            let boardsMembers = [];
            for(let i = 0; i < result.rowCount; ++i)
                  boardsMembers.push({
                        boardId: result.rows[i].boardid,
                        boardName: result.rows[i].boardname,
                        memberId: result.rows[i].memberid,
                        memberName: result.rows[i].membername,
                        memberEmail: result.rows[i].memberemail
                  });
            return boardsMembers;
      }
      static async updateBoardMember(oldBoardId, oldMemberId, newBoardId, newMemberId) {
            const client = await getClient();
            try {
                  await client.query('BEGIN');

                  const insertParamQuery = {
                        text: 'INSERT INTO boards_members(boardId, memberId) VALUES($1, $2) RETURNING *',
                        values: [newBoardId, newMemberId]
                  };
                  const insertResult = await client.query(insertParamQuery);

                  const deleteParamQuery = {
                        text: 'DELETE FROM boards_members WHERE boardId = $1 AND memberId = $2 RETURNING *',
                        values: [oldBoardId, oldMemberId]
                  };
                  await client.query(deleteParamQuery);

                  await client.query('COMMIT');

                  if(insertResult.rowCount === 0)
                        return null;

                  return { 
                        boardId: insertResult.rows[0].boardid,
                        memberId: insertResult.rows[0].memberid
                  }
            }
            catch (e) {
                  await client.query('ROLLBACK');
                  throw e;
            } 
            finally {
                  client.release()
            }
      }
      static async deleteBoardMember(boardId, memberId) {
            const paramQuery = {
                  text: 'DELETE FROM boards_members WHERE boardId = $1 AND memberId = $2 RETURNING *',
                  values: [boardId, memberId]
            };
            const result = await query(paramQuery);

            if(result.rowCount === 0)
                  return null;

            return { 
                  boardId: result.rows[0].boardid,
                  memberId: result.rows[0].memberid
            }
}

}
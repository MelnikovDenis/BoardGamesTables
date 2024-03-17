import { query } from '../db.js';

export default class BoardRepository 
{
      static async createBoard(name) {
            const paramQuery = {
                  text: 'INSERT INTO boards(name) VALUES($1) RETURNING *',
                  values: [name]
            };
            const result = await query(paramQuery);
            return { 
                  id: result.rows[0].id,
                  name: result.rows[0].name
            }
      }
      static async readBoards() {
            const result = await query('SELECT * FROM boards');
            let boards = [];
            for(let i = 0; i < result.rowCount; ++i)
                  boards.push({
                        id: result.rows[i].id,
                        name: result.rows[i].name
                  });
            return boards;
      }
      static async updateBoard(id, name) {
            const paramQuery = {
                  text: 'UPDATE boards SET name = $1 WHERE id = $2 RETURNING *',
                  values: [name, id]
            };
            const result = await query(paramQuery);

            if(result.rowCount === 0)
                  return null;

            return { 
                  id: result.rows[0].id,
                  name: result.rows[0].name
            }
      }
      static async deleteBoard(id) {
            const paramQuery = {
                  text: 'DELETE FROM boards WHERE id = $1 RETURNING *',
                  values: [id]
            };
            const result = await query(paramQuery);

            if(result.rowCount === 0)
                  return null;

            return { 
                  id: result.rows[0].id,
                  name: result.rows[0].name
            }
      }
}
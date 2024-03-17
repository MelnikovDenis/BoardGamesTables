import { query } from '../db.js';

export default class MemberRepository 
{
      static async createMember(name, email) {
            const paramQuery = {
                  text: 'INSERT INTO members(name, email) VALUES($1, $2) RETURNING *',
                  values: [name, email]
            };
            const result = await query(paramQuery);
            return { 
                  id: result.rows[0].id,
                  name: result.rows[0].name,
                  email: result.rows[0].email
            }
      }
      static async readMembers() {
            const result = await query('SELECT * FROM members');
            let members = [];
            for(let i = 0; i < result.rowCount; ++i)
                  members.push({
                        id: result.rows[i].id,
                        name: result.rows[i].name,
                        email: result.rows[i].email
                  });
            return members;
      }
      static async updateMember(id, name, email) {
            const paramQuery = {
                  text: 'UPDATE members SET name = $1, email = $2 WHERE id = $3 RETURNING *',
                  values: [name, email, id]
            };
            const result = await query(paramQuery);

            if(result.rowCount === 0)
                  return null;

            return { 
                  id: result.rows[0].id,
                  name: result.rows[0].name,
                  email: result.rows[0].email
            }
      }
      static async deleteMember(id) {
            const paramQuery = {
                  text: 'DELETE FROM members WHERE id = $1 RETURNING *',
                  values: [id]
            };
            const result = await query(paramQuery);

            if(result.rowCount === 0)
                  return null;

            return { 
                  id: result.rows[0].id,
                  name: result.rows[0].name,
                  email: result.rows[0].email
            }
      }
}
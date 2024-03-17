import api from "../http/api.js";

export default class BoardMemberService {
      static async createBoardMember(boardId, memberId) {
            return api.post("/boardsMembers", { boardId: boardId, memberId: memberId });
      }
      static async readBoardsMembers() {            
            return api.get("/boardsMembers");
      }
      static async updateBoardMember(oldBoardId, oldMemberId, newBoardId, newMemberId) {            
            return api.put(`/boardsMembers/${oldBoardId}/${oldMemberId}`, { boardId: newBoardId, memberId: newMemberId });
      }
      static async deleteBoardMember(boardId, memberId) {
            return api.delete(`/boardsMembers/${boardId}/${memberId}`);
      }
}
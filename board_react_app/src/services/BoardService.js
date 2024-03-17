import api from "../http/api.js";

export default class BoardService {
      static async createBoard(name) {
            return api.post("/boards", { name: name });
      }
      static async readBoards() {            
            return api.get("/boards");
      }
      static async updateBoard(id, name) {
            return api.put(`/boards/${id}`, { name: name });
      }
      static async deleteBoard(id) {
            return api.delete(`/boards/${id}`);
      }
}
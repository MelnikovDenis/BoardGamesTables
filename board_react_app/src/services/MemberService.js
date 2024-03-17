import api from "../http/api.js";

export default class MemberService {
      static async createMember(name, email) {
            return api.post("/members", { name: name, email: email });
      }
      static async readMembers() {            
            return api.get("/members");
      }
      static async updateMember(id, name, email) {
            return api.put(`/members/${id}`, { name: name, email: email });
      }
      static async deleteMember(id) {
            return api.delete(`/members/${id}`);
      }
}
import { Log } from "../decorators/Log";
import { Auth } from "../decorators/Auth";
import { Role } from "../decorators/Role";

export class UserService {

  private users = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" }
  ];

  @Log
  @Auth
  async getUserInfo(userId: number) {
    return this.users.find(u => u.id === userId) || null;
  }

  @Log
  @Auth
  @Role("admin")
  async deleteUser(userId: number) {
    this.users = this.users.filter(u => u.id !== userId);
    return { message: `User ${userId} deleted` };
  }
}

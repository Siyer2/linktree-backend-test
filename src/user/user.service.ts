import users from "../../data/users.json";
import { User } from "./user.entity";

/**
 * Get user by user ID
 * @param userId
 * @returns a user
 */
export function getUserById(userId: string): User {
  const user = users.find((user) => user.id === userId) as User;
  return user;
}

import { type User } from "../model/User";

export interface LoginRepository {
  login(): Promise<User[]>;
}

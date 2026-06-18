
import { LoginResponse } from "../../data/model/LoginResponse";

export interface AuthRepository {
  login(
    username: string,
    password: string
  ): Promise<LoginResponse>;
}
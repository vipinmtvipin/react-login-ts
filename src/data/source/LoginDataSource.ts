
import type { User } from "../../domain/model/User";

export interface LoginDataSource {

  login(request: {'':''}): Promise<User>;
}

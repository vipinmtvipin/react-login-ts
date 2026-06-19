import { LoginResponse } from "../../data/model/LoginResponse";

import { LoginRequest } from "../../data/model/LoginRequest";

export interface AuthRepository {
  login(request: LoginRequest): Promise<LoginResponse>;
}

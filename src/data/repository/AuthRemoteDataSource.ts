import { http } from "../../core/network/AxiosUtil";
import { API_ENDPOINTS } from "../../core/constants/ApiConstants";

import { LoginRequest } from "../model/LoginRequest";
import { LoginResponse } from "../model/LoginResponse";

export class AuthRemoteDataSource {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await http.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      request,
    );

    return response.data;
  }
}

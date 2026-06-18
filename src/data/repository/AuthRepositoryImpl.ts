import { AuthRepository } from "../../domain/repository/AuthRepository";
import { AuthRemoteDataSource } from "../../data/repository/AuthRemoteDataSource";

import { LoginRequest } from "../model/LoginRequest";
import { LoginResponse } from "../model/LoginResponse";

export class AuthRepositoryImpl implements AuthRepository {
  private remoteDataSource: AuthRemoteDataSource;

  constructor(remoteDataSource: AuthRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    return await this.remoteDataSource.login(request);
  }
}

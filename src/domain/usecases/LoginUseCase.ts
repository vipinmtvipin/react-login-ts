import { AuthRepository } from "../../domain/repository/AuthRepository";

import { LoginResponse } from "../../data/model/LoginResponse";

import { LoginRequest } from "../../data/model/LoginRequest";

export class LoginUseCase {
  private repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  execute(request: LoginRequest): Promise<LoginResponse> {
    return this.repository.login(request);
  }
}

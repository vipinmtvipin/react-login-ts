import { type AuthRepository } from '../repository/AuthRepository';
import { type User } from '../entity/User';


export class LoginUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(username: string, password: string): Promise<User> {
    const result = await this.authRepository.login(username, password);
    return result;
  }
}

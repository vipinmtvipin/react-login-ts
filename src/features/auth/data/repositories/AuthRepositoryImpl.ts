import { BaseRepository } from '../../../../core/api/BaseRepository';
import { TokenStorage } from '../../../../core/storage/TokenStorage';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { AuthSession } from '../../domain/entities/AuthSession';
import type { LoginCredentials } from '../../domain/entities/LoginCredentials';
import type { User } from '../../domain/entities/User';
import type { AuthRemoteDataSource } from '../datasource/AuthRemoteDataSource';
import type { LoginRequestDto } from '../models/LoginRequestDto';
import type { LoginResponseDto } from '../models/LoginResponseDto';

/**
 * `AuthRepositoryImpl` — concrete implementation of `AuthRepository`.
 *
 * ## Responsibilities
 * 1. Map **domain types → DTOs** before calling the data source.
 * 2. Map **DTOs → domain types** before returning to the use case.
 * 3. Persist / retrieve the access token via `TokenStorage`.
 *
 * ## Why a separate mapping step?
 * The domain must not know about the shape of the API response.
 * If the backend renames a field or changes its type, only this class needs
 * to be updated — use cases and UI components are unaffected.
 */
export class AuthRepositoryImpl extends BaseRepository implements AuthRepository {
  private readonly remoteDataSource: AuthRemoteDataSource;

  constructor(remoteDataSource: AuthRemoteDataSource) {
    super();
    this.remoteDataSource = remoteDataSource;
  }

  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const dto: LoginRequestDto = {
      username: credentials.username,
      password: credentials.password,
    };

    const response: LoginResponseDto = await this.handleRequest(() =>
      this.remoteDataSource.login(dto),
    );

    const user: User = {
      id: response.id,
      username: response.username,
    };

    const session: AuthSession = {
      user,
      accessToken: response.token,
    };

    // Persist the token so the Axios interceptor can attach it automatically.
    TokenStorage.save(session.accessToken);

    return session;
  }

  async logout(): Promise<void> {
    TokenStorage.remove();
    // If the backend exposes a logout endpoint, call it here:
    // await this.handleRequest(() => this.remoteDataSource.logout());
  }

  async restoreSession(): Promise<AuthSession | null> {
    const token = TokenStorage.get();
    if (!token) return null;

    // In a real application you would validate the token with the server
    // (e.g. GET /auth/me) and return the full session.  For this project
    // we return a minimal session so the user stays logged in on refresh.
    return {
      user: { id: '', username: '' },
      accessToken: token,
    };
  }
}

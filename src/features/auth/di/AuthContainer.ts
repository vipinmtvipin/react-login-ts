import { AuthRemoteDataSource } from '../data/datasource/AuthRemoteDataSource';
import { AuthRepositoryImpl } from '../data/repositories/AuthRepositoryImpl';
import { LoginUseCase } from '../domain/usecases/LoginUseCase';
import { LogoutUseCase } from '../domain/usecases/LogoutUseCase';
import { RestoreSessionUseCase } from '../domain/usecases/RestoreSessionUseCase';

/**
 * Auth feature DI container.
 *
 * Wires together the concrete implementations and exposes ready-to-use
 * use-case singletons.
 *
 * ## Why a manual DI container instead of a library?
 * For a project of this size, a lightweight manual container keeps the
 * dependency graph explicit and avoids decorator / reflect-metadata
 * boilerplate.  Swap for InversifyJS or tsyringe when the application
 * outgrows manual wiring.
 *
 * ## Dependency graph
 * ```
 * LoginUseCase
 *   └─ AuthRepositoryImpl (implements AuthRepository)
 *        └─ AuthRemoteDataSource
 *             └─ http (ApiClient)
 * ```
 */
const remoteDataSource = new AuthRemoteDataSource();
const authRepository = new AuthRepositoryImpl(remoteDataSource);

export const loginUseCase = new LoginUseCase(authRepository);
export const logoutUseCase = new LogoutUseCase(authRepository);
export const restoreSessionUseCase = new RestoreSessionUseCase(authRepository);

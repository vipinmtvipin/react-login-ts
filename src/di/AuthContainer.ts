import { AuthRemoteDataSource } from "../data/repository/AuthRemoteDataSource";
import { AuthRepositoryImpl } from "../data/repository/AuthRepositoryImpl";
import { LoginUseCase } from "../domain/usecases/LoginUseCase";

const remoteDataSource = new AuthRemoteDataSource();

const authRepository = new AuthRepositoryImpl(remoteDataSource);

export const loginUseCase = new LoginUseCase(authRepository);

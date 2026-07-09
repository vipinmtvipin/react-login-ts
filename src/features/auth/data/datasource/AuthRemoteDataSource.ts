import { http } from '../../../../core/api/ApiClient';
import { API_ENDPOINTS } from '../../../../core/constants/ApiConstants';
import type { LoginRequestDto } from '../models/LoginRequestDto';
import type { LoginResponseDto } from '../models/LoginResponseDto';

/**
 * `AuthRemoteDataSource`
 *
 * Responsible for all **HTTP communication** related to authentication.
 * It knows how to talk to the network but has no knowledge of domain
 * entities or business rules — it only works with DTOs.
 *
 * The `AuthRepositoryImpl` depends on this class and maps its output to
 * domain types.
 */
export class AuthRemoteDataSource {
  /**
   * Sends a POST request to the login endpoint.
   * @returns The raw API response DTO.
   * @throws {AppError} (via the Axios response interceptor) on failure.
   */
  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await http.post<LoginResponseDto>(
      API_ENDPOINTS.AUTH.LOGIN,
      request,
    );
    return response.data;
  }
}

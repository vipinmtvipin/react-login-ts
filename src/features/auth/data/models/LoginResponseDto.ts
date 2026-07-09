/**
 * `LoginResponseDto` — data-layer transfer object.
 *
 * Mirrors the JSON body returned by the login API endpoint.
 * The `AuthRepositoryImpl` maps this DTO to the domain `AuthSession` and
 * `User` entities so that no data-layer type leaks into the domain.
 */
export interface LoginResponseDto {
  /** Server-assigned identifier for the user resource. */
  id: string;
  /** The user's login handle as stored on the server. */
  username: string;
  /**
   * Opaque access token (JWT or session token) returned by the server.
   * Stored via `TokenStorage` and injected into subsequent requests by
   * the Axios request interceptor.
   */
  token: string;
}

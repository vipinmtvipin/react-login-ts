/**
 * `LoginRequestDto` — data-layer transfer object.
 *
 * Mirrors the JSON body expected by the login API endpoint.
 * This DTO lives in the **data** layer and must NOT be referenced by the
 * domain layer.  The `AuthRepositoryImpl` maps from the domain's
 * `LoginCredentials` to this DTO before calling the data source.
 */
export interface LoginRequestDto {
  username: string;
  password: string;
}

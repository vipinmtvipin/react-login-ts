/**
 * `LoginCredentials` value object.
 *
 * Carries the username and password entered by the user into the login form.
 * Defined in the **domain** layer so that use cases can accept it without
 * depending on any data-layer DTO.
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

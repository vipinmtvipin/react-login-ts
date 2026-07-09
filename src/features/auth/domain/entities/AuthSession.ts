import type { User } from '../entities/User';

/**
 * `AuthSession` value object.
 *
 * Represents a successfully established authentication session.
 * The access token is a domain concept here because it is required for
 * authorised requests — it is not merely an infrastructure detail.
 *
 * The `AuthRepositoryImpl` constructs this object from the raw API
 * response and the `AuthContext` stores it in memory for the lifetime
 * of the browser session.
 */
export interface AuthSession {
  /** The authenticated user's profile data. */
  user: User;
  /** JWT (or opaque) access token to be included in subsequent requests. */
  accessToken: string;
}

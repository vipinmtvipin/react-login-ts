/**
 * `User` domain entity.
 *
 * Represents an authenticated user from the application's perspective.
 * This interface lives in the **domain** layer and must NOT reference any
 * data-transfer objects, Axios types, or API response shapes.
 *
 * Only add fields here that have genuine business meaning.  Infrastructure
 * concerns (raw API tokens, HTTP status codes) belong in the data layer.
 */
export interface User {
  /** Unique identifier assigned by the backend. */
  id: string;
  /** The display name / login handle of the user. */
  username: string;
}

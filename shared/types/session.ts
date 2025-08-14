/**
 * Session interface for JWT payload
 * Contains only essential user information needed for authentication
 */
export interface Session {
  /** User unique identifier */
  id: string;
  /** User email address */
  email: string;
  /** User display name (derived from firstName or email) */
  name: string;
}

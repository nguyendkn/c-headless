import { Session } from './session';

// ===== AUTH CREDENTIALS =====
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordCredentials {
  email: string;
}

export interface ChangePasswordCredentials {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ===== AUTH RESPONSES =====
export interface LoginResponse {
  session: Session;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface SignUpResponse {
  session: Session;
  accessToken: string;
  refreshToken: string;
}

// ===== AUTH CONTEXT =====
export interface AuthContextData {
  // State
  isAuthenticated: boolean;
  currentUser: Session | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;

  // Actions
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => void;
  refreshSession: () => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

// ===== AUTH STORAGE =====
export interface AuthStorageKeys {
  readonly CURRENT_USER: 'currentUser';
  readonly REFRESH_TOKEN: 'refreshToken';
}

export interface AuthCookieNames {
  readonly ACCESS_TOKEN: 'accessToken';
}

// ===== AUTH ERRORS =====
export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export class TokenExpiredError extends AuthError {
  constructor(message = 'Token has expired') {
    super(message, 'TOKEN_EXPIRED', 401);
    this.name = 'TokenExpiredError';
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message = 'Invalid credentials') {
    super(message, 'INVALID_CREDENTIALS', 401);
    this.name = 'InvalidCredentialsError';
  }
}

export class SessionNotFoundError extends AuthError {
  constructor(message = 'Session not found') {
    super(message, 'SESSION_NOT_FOUND', 404);
    this.name = 'SessionNotFoundError';
  }
}

// ===== MIDDLEWARE TYPES =====
export interface AuthenticatedRequest {
  user: Session;
  token: string;
  correlationId: string;
}

export interface MiddlewareContext {
  correlationId: string;
  startTime: number;
  userAgent?: string;
  ipAddress?: string;
  pathname: string;
  method: string;
}

export interface AuthMiddlewareConfig {
  publicPaths: string[];
  protectedPaths: string[];
  apiPaths: string[];
  cookieName: string;
  headerName: string;
  skipPaths: string[];
}

export interface MiddlewareResult {
  success: boolean;
  user?: Session;
  token?: string;
  error?: AuthError;
  redirect?: string;
}

export interface TokenValidationResult {
  valid: boolean;
  session?: Session;
  error?: string;
  expired?: boolean;
}

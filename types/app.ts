import { Feature } from './feature';
import { Filter } from './filter';
import { Form } from './form';
import { Report } from './report';
import { AuditableDocument, SoftDeletable } from './shared';
import { Table } from './table';
import { PermissionLevel } from './type';
import { View } from './view';

/**
 * Project represents a complete application/workspace
 * Contains all tables, features, views, forms, filters, and reports
 */
export interface Project extends AuditableDocument, SoftDeletable {
  /** Project name (used as identifier) */
  name: string;
  /** Display title for the project */
  title: string;
  /** Optional description of the project */
  description?: string;
  /** Project configuration */
  config: ProjectConfig;
  /** Project tables */
  tables: Table[];
  /** Project features */
  features: Feature[];
  /** Project views */
  views: View[];
  /** Project forms */
  forms: Form[];
  /** Project filters */
  filters: Filter[];
  /** Project reports */
  reports: Report[];
  /** Project permissions */
  permissions?: ProjectPermissions;
  /** Project settings */
  settings?: ProjectSettings;
  /** Project integrations */
  integrations?: ProjectIntegration[];
}

/**
 * Project configuration
 */
export interface ProjectConfig {
  /** Project version */
  version: string;
  /** Project environment */
  environment: 'development' | 'staging' | 'production';
  /** Database configuration */
  database?: DatabaseConfig;
  /** API configuration */
  api?: ApiConfig;
  /** UI configuration */
  ui?: UiConfig;
  /** Security configuration */
  security?: SecurityConfig;
  /** Backup configuration */
  backup?: BackupConfig;
  /** Monitoring configuration */
  monitoring?: MonitoringConfig;
}

/**
 * Database configuration
 */
export interface DatabaseConfig {
  /** Database type */
  type: 'postgresql' | 'mysql' | 'sqlite' | 'mongodb' | 'firebase';
  /** Connection string or configuration */
  connection: string | Record<string, unknown>;
  /** Database schema name */
  schema?: string;
  /** Connection pool settings */
  pool?: PoolConfig;
  /** Migration settings */
  migrations?: MigrationConfig;
}

/**
 * Connection pool configuration
 */
export interface PoolConfig {
  /** Minimum connections */
  min?: number;
  /** Maximum connections */
  max?: number;
  /** Connection timeout */
  timeout?: number;
  /** Idle timeout */
  idle_timeout?: number;
}

/**
 * Migration configuration
 */
export interface MigrationConfig {
  /** Migration directory */
  directory?: string;
  /** Auto-run migrations */
  auto_run?: boolean;
  /** Migration table name */
  table_name?: string;
}

/**
 * API configuration
 */
export interface ApiConfig {
  /** Base URL for the API */
  base_url?: string;
  /** API version */
  version?: string;
  /** Default response format */
  format?: 'json' | 'xml' | 'yaml';
  /** Rate limiting */
  rate_limit?: RateLimit;
  /** CORS settings */
  cors?: CorsConfig;
  /** Authentication settings */
  auth?: AuthConfig;
  /** Caching settings */
  cache?: CacheConfig;
}

/**
 * Rate limiting configuration
 */
export interface RateLimit {
  /** Requests per minute */
  requests_per_minute?: number;
  /** Requests per hour */
  requests_per_hour?: number;
  /** Requests per day */
  requests_per_day?: number;
  /** Rate limit strategy */
  strategy?: 'fixed_window' | 'sliding_window' | 'token_bucket';
}

/**
 * CORS configuration
 */
export interface CorsConfig {
  /** Allowed origins */
  origins?: string[];
  /** Allowed methods */
  methods?: string[];
  /** Allowed headers */
  headers?: string[];
  /** Whether to allow credentials */
  credentials?: boolean;
  /** Max age for preflight cache */
  max_age?: number;
}

/**
 * Authentication configuration
 */
export interface AuthConfig {
  /** Authentication type */
  type: 'jwt' | 'session' | 'api_key' | 'oauth' | 'none';
  /** JWT settings */
  jwt?: JwtConfig;
  /** OAuth settings */
  oauth?: OAuthConfig;
  /** Session settings */
  session?: SessionConfig;
}

/**
 * JWT configuration
 */
export interface JwtConfig {
  /** JWT secret */
  secret: string;
  /** Token expiration */
  expires_in?: string;
  /** Refresh token expiration */
  refresh_expires_in?: string;
  /** JWT algorithm */
  algorithm?: string;
}

/**
 * OAuth configuration
 */
export interface OAuthConfig {
  /** OAuth providers */
  providers: OAuthProvider[];
  /** Redirect URL */
  redirect_url?: string;
  /** Success URL */
  success_url?: string;
  /** Error URL */
  error_url?: string;
}

/**
 * OAuth provider
 */
export interface OAuthProvider {
  /** Provider name */
  name: string;
  /** Client ID */
  client_id: string;
  /** Client secret */
  client_secret: string;
  /** Authorization URL */
  auth_url?: string;
  /** Token URL */
  token_url?: string;
  /** User info URL */
  user_url?: string;
  /** Scopes */
  scopes?: string[];
}

/**
 * Session configuration
 */
export interface SessionConfig {
  /** Session secret */
  secret: string;
  /** Session timeout */
  timeout?: number;
  /** Session store type */
  store?: 'memory' | 'redis' | 'database';
  /** Store configuration */
  store_config?: Record<string, unknown>;
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  /** Cache type */
  type: 'memory' | 'redis' | 'memcached' | 'none';
  /** Cache TTL in seconds */
  ttl?: number;
  /** Cache configuration */
  config?: Record<string, unknown>;
}

/**
 * UI configuration
 */
export interface UiConfig {
  /** UI theme */
  theme?: UiTheme;
  /** UI layout */
  layout?: UiLayout;
  /** UI components */
  components?: UiComponents;
  /** UI localization */
  localization?: UiLocalization;
}

/**
 * UI theme configuration
 */
export interface UiTheme {
  /** Primary color */
  primary_color?: string;
  /** Secondary color */
  secondary_color?: string;
  /** Background color */
  background_color?: string;
  /** Text color */
  text_color?: string;
  /** Font family */
  font_family?: string;
  /** Font size */
  font_size?: string;
  /** Custom CSS */
  custom_css?: string;
}

/**
 * UI layout configuration
 */
export interface UiLayout {
  /** Layout type */
  type?: 'sidebar' | 'topbar' | 'minimal';
  /** Sidebar configuration */
  sidebar?: SidebarConfig;
  /** Header configuration */
  header?: HeaderConfig;
  /** Footer configuration */
  footer?: FooterConfig;
}

/**
 * Sidebar configuration
 */
export interface SidebarConfig {
  /** Whether sidebar is collapsible */
  collapsible?: boolean;
  /** Default collapsed state */
  collapsed?: boolean;
  /** Sidebar width */
  width?: string;
  /** Sidebar position */
  position?: 'left' | 'right';
}

/**
 * Header configuration
 */
export interface HeaderConfig {
  /** Whether to show header */
  show?: boolean;
  /** Header height */
  height?: string;
  /** Header title */
  title?: string;
  /** Header logo */
  logo?: string;
}

/**
 * Footer configuration
 */
export interface FooterConfig {
  /** Whether to show footer */
  show?: boolean;
  /** Footer height */
  height?: string;
  /** Footer text */
  text?: string;
}

/**
 * UI components configuration
 */
export interface UiComponents {
  /** Button styles */
  buttons?: ComponentStyle;
  /** Input styles */
  inputs?: ComponentStyle;
  /** Table styles */
  tables?: ComponentStyle;
  /** Card styles */
  cards?: ComponentStyle;
}

/**
 * Component style configuration
 */
export interface ComponentStyle {
  /** Default variant */
  default_variant?: string;
  /** Available variants */
  variants?: Record<string, Record<string, string>>;
  /** Custom CSS classes */
  css_classes?: string[];
}

/**
 * UI localization configuration
 */
export interface UiLocalization {
  /** Default locale */
  default_locale?: string;
  /** Available locales */
  locales?: string[];
  /** Locale messages */
  messages?: Record<string, Record<string, string>>;
}

/**
 * Security configuration
 */
export interface SecurityConfig {
  /** Encryption settings */
  encryption?: EncryptionConfig;
  /** Access control */
  access_control?: AccessControlConfig;
  /** Audit logging */
  audit_log?: AuditLogConfig;
  /** Security headers */
  headers?: SecurityHeaders;
}

/**
 * Encryption configuration
 */
export interface EncryptionConfig {
  /** Encryption algorithm */
  algorithm?: string;
  /** Encryption key */
  key?: string;
  /** Fields to encrypt */
  encrypted_fields?: string[];
}

/**
 * Access control configuration
 */
export interface AccessControlConfig {
  /** Default access level */
  default_access?: PermissionLevel;
  /** Role-based access control */
  rbac?: boolean;
  /** Attribute-based access control */
  abac?: boolean;
  /** IP whitelist */
  ip_whitelist?: string[];
  /** IP blacklist */
  ip_blacklist?: string[];
}

/**
 * Audit log configuration
 */
export interface AuditLogConfig {
  /** Whether audit logging is enabled */
  enabled?: boolean;
  /** Events to log */
  events?: string[];
  /** Log retention period in days */
  retention_days?: number;
  /** Log storage type */
  storage?: 'database' | 'file' | 'external';
}

/**
 * Security headers configuration
 */
export interface SecurityHeaders {
  /** Content Security Policy */
  csp?: string;
  /** X-Frame-Options */
  frame_options?: string;
  /** X-Content-Type-Options */
  content_type_options?: string;
  /** Strict-Transport-Security */
  hsts?: string;
}

/**
 * Backup configuration
 */
export interface BackupConfig {
  /** Whether backups are enabled */
  enabled?: boolean;
  /** Backup frequency */
  frequency?: 'hourly' | 'daily' | 'weekly' | 'monthly';
  /** Backup retention period */
  retention?: number;
  /** Backup storage */
  storage?: BackupStorage;
}

/**
 * Backup storage configuration
 */
export interface BackupStorage {
  /** Storage type */
  type: 'local' | 's3' | 'gcs' | 'azure';
  /** Storage configuration */
  config: Record<string, unknown>;
}

/**
 * Monitoring configuration
 */
export interface MonitoringConfig {
  /** Whether monitoring is enabled */
  enabled?: boolean;
  /** Metrics to collect */
  metrics?: string[];
  /** Monitoring provider */
  provider?: 'prometheus' | 'datadog' | 'newrelic' | 'custom';
  /** Provider configuration */
  config?: Record<string, unknown>;
}

/**
 * Project permissions
 */
export interface ProjectPermissions {
  /** Project owner */
  owner: string;
  /** Project administrators */
  admins?: string[];
  /** Project members */
  members?: string[];
  /** Public access level */
  public?: PermissionLevel;
  /** Role-based permissions */
  roles?: Record<string, ProjectRole>;
}

/**
 * Project role
 */
export interface ProjectRole {
  /** Role name */
  name: string;
  /** Role description */
  description?: string;
  /** Role permissions */
  permissions: string[];
  /** Role members */
  members?: string[];
}

/**
 * Project settings
 */
export interface ProjectSettings {
  /** Timezone */
  timezone?: string;
  /** Date format */
  date_format?: string;
  /** Time format */
  time_format?: string;
  /** Currency */
  currency?: string;
  /** Language */
  language?: string;
  /** Custom settings */
  custom?: Record<string, unknown>;
}

/**
 * Project integration
 */
export interface ProjectIntegration {
  /** Integration name */
  name: string;
  /** Integration type */
  type: string;
  /** Integration configuration */
  config: Record<string, unknown>;
  /** Whether integration is enabled */
  enabled?: boolean;
  /** Integration credentials */
  credentials?: Record<string, string>;
}

import { Document } from './shared';
import { HttpMethod, PermissionLevel } from './type';

/**
 * Feature definition for application functionality
 * Represents modular functionality that can be enabled/disabled
 */
export interface Feature extends Document {
  /** Feature name (used as identifier) */
  name: string;
  /** Display title for the feature */
  title: string;
  /** Optional description of the feature's purpose */
  description?: string;
  /** Feature category for organization */
  category?: string;
  /** Feature type */
  type: FeatureType;
  /** Feature configuration */
  config: FeatureConfig;
  /** Whether the feature is enabled */
  enabled?: boolean;
  /** Feature dependencies */
  dependencies?: string[];
  /** Feature permissions */
  permissions?: FeaturePermissions;
  /** Feature settings */
  settings?: FeatureSettings;
  /** Feature version */
  feature_version?: string;
  /** Feature author */
  author?: string;
  /** Feature tags */
  tags?: string[];
}

/**
 * Feature types
 */
export enum FeatureType {
  /** Core system feature */
  CORE = 'core',
  /** User interface feature */
  UI = 'ui',
  /** API endpoint feature */
  API = 'api',
  /** Data processing feature */
  DATA = 'data',
  /** Integration feature */
  INTEGRATION = 'integration',
  /** Authentication feature */
  AUTH = 'auth',
  /** Notification feature */
  NOTIFICATION = 'notification',
  /** Reporting feature */
  REPORTING = 'reporting',
  /** Workflow feature */
  WORKFLOW = 'workflow',
  /** Custom feature */
  CUSTOM = 'custom',
}

/**
 * Feature configuration based on feature type
 */
export type FeatureConfig =
  | CoreFeatureConfig
  | UiFeatureConfig
  | ApiFeatureConfig
  | DataFeatureConfig
  | IntegrationFeatureConfig
  | AuthFeatureConfig
  | NotificationFeatureConfig
  | ReportingFeatureConfig
  | WorkflowFeatureConfig
  | CustomFeatureConfig;

/**
 * Core feature configuration
 */
export interface CoreFeatureConfig {
  /** Core functionality identifier */
  functionality: string;
  /** Configuration parameters */
  parameters?: Record<string, unknown>;
  /** Required system resources */
  resources?: ResourceRequirement[];
}

/**
 * UI feature configuration
 */
export interface UiFeatureConfig {
  /** UI component type */
  component_type: 'page' | 'widget' | 'modal' | 'sidebar' | 'toolbar' | 'menu';
  /** Component configuration */
  component_config: UiComponentConfig;
  /** UI routes */
  routes?: UiRoute[];
  /** UI permissions */
  ui_permissions?: UiPermissions;
}

/**
 * UI component configuration
 */
export interface UiComponentConfig {
  /** Component name */
  name: string;
  /** Component props */
  props?: Record<string, unknown>;
  /** Component styling */
  styling?: ComponentStyling;
  /** Component layout */
  layout?: ComponentLayout;
}

/**
 * Component styling
 */
export interface ComponentStyling {
  /** CSS classes */
  css_classes?: string[];
  /** Inline styles */
  styles?: Record<string, string>;
  /** Theme variables */
  theme_variables?: Record<string, string>;
}

/**
 * Component layout
 */
export interface ComponentLayout {
  /** Layout position */
  position?: 'fixed' | 'relative' | 'absolute' | 'sticky';
  /** Layout dimensions */
  dimensions?: { width?: string; height?: string };
  /** Layout spacing */
  spacing?: { margin?: string; padding?: string };
}

/**
 * UI route
 */
export interface UiRoute {
  /** Route path */
  path: string;
  /** Route component */
  component: string;
  /** Route permissions */
  permissions?: string[];
  /** Route metadata */
  metadata?: Record<string, unknown>;
}

/**
 * UI permissions
 */
export interface UiPermissions {
  /** Who can view this UI feature */
  view?: string[];
  /** Who can interact with this UI feature */
  interact?: string[];
  /** Role-based UI permissions */
  roles?: Record<string, UiPermissionLevel>;
}

/**
 * UI permission level
 */
export interface UiPermissionLevel {
  /** Can view the UI */
  view?: boolean;
  /** Can interact with the UI */
  interact?: boolean;
  /** Can customize the UI */
  customize?: boolean;
}

/**
 * API feature configuration
 */
export interface ApiFeatureConfig {
  /** API endpoints */
  endpoints: ApiEndpoint[];
  /** API authentication */
  authentication?: ApiAuthentication;
  /** API rate limiting */
  rate_limiting?: ApiRateLimit;
  /** API documentation */
  documentation?: ApiDocumentation;
}

/**
 * API endpoint
 */
export interface ApiEndpoint {
  /** Endpoint path */
  path: string;
  /** HTTP method */
  method: HttpMethod;
  /** Endpoint handler */
  handler: string;
  /** Request schema */
  request_schema?: Record<string, unknown>;
  /** Response schema */
  response_schema?: Record<string, unknown>;
  /** Endpoint permissions */
  permissions?: string[];
  /** Endpoint middleware */
  middleware?: string[];
}

/**
 * API authentication
 */
export interface ApiAuthentication {
  /** Authentication required */
  required: boolean;
  /** Authentication methods */
  methods: ('jwt' | 'api_key' | 'oauth' | 'basic')[];
  /** Authentication configuration */
  config?: Record<string, unknown>;
}

/**
 * API rate limiting
 */
export interface ApiRateLimit {
  /** Rate limit enabled */
  enabled: boolean;
  /** Requests per minute */
  requests_per_minute?: number;
  /** Requests per hour */
  requests_per_hour?: number;
  /** Rate limit scope */
  scope: 'global' | 'user' | 'ip' | 'endpoint';
}

/**
 * API documentation
 */
export interface ApiDocumentation {
  /** Documentation title */
  title?: string;
  /** Documentation description */
  description?: string;
  /** OpenAPI specification */
  openapi_spec?: Record<string, unknown>;
  /** Examples */
  examples?: ApiExample[];
}

/**
 * API example
 */
export interface ApiExample {
  /** Example name */
  name: string;
  /** Example description */
  description?: string;
  /** Example request */
  request?: Record<string, unknown>;
  /** Example response */
  response?: Record<string, unknown>;
}

/**
 * Resource requirement
 */
export interface ResourceRequirement {
  /** Resource type */
  type: 'memory' | 'cpu' | 'storage' | 'network' | 'database';
  /** Resource amount */
  amount: number;
  /** Resource unit */
  unit: string;
  /** Whether the resource is required */
  required: boolean;
}

/**
 * Data feature configuration
 */
export interface DataFeatureConfig {
  /** Data processing type */
  processing_type: 'etl' | 'stream' | 'batch' | 'real_time';
  /** Data sources */
  sources: DataSource[];
  /** Data transformations */
  transformations: DataTransformation[];
  /** Data destinations */
  destinations: DataDestination[];
}

/**
 * Data source
 */
export interface DataSource {
  /** Source name */
  name: string;
  /** Source type */
  type: 'database' | 'api' | 'file' | 'stream';
  /** Source configuration */
  config: Record<string, unknown>;
}

/**
 * Data transformation
 */
export interface DataTransformation {
  /** Transformation name */
  name: string;
  /** Transformation type */
  type: 'filter' | 'map' | 'reduce' | 'aggregate' | 'join' | 'sort';
  /** Transformation configuration */
  config: Record<string, unknown>;
}

/**
 * Data destination
 */
export interface DataDestination {
  /** Destination name */
  name: string;
  /** Destination type */
  type: 'database' | 'api' | 'file' | 'cache';
  /** Destination configuration */
  config: Record<string, unknown>;
}

/**
 * Integration feature configuration
 */
export interface IntegrationFeatureConfig {
  /** Integration type */
  integration_type: 'webhook' | 'api' | 'database' | 'file' | 'message_queue';
  /** Integration configuration */
  config: IntegrationConfig;
  /** Integration authentication */
  authentication?: IntegrationAuth;
  /** Integration mapping */
  mapping?: IntegrationMapping;
}

/**
 * Integration configuration
 */
export interface IntegrationConfig {
  /** Integration endpoint */
  endpoint?: string;
  /** Integration method */
  method?: HttpMethod;
  /** Integration headers */
  headers?: Record<string, string>;
  /** Integration parameters */
  parameters?: Record<string, unknown>;
}

/**
 * Integration authentication
 */
export interface IntegrationAuth {
  /** Authentication type */
  type: 'none' | 'basic' | 'bearer' | 'api_key' | 'oauth';
  /** Authentication credentials */
  credentials: Record<string, string>;
}

/**
 * Integration mapping
 */
export interface IntegrationMapping {
  /** Input mapping */
  input?: Record<string, string>;
  /** Output mapping */
  output?: Record<string, string>;
  /** Field transformations */
  transformations?: FieldTransformation[];
}

/**
 * Field transformation
 */
export interface FieldTransformation {
  /** Source field */
  source: string;
  /** Target field */
  target: string;
  /** Transformation function */
  transform?: string;
}

/**
 * Auth feature configuration
 */
export interface AuthFeatureConfig {
  /** Authentication providers */
  providers: AuthProvider[];
  /** Authentication settings */
  settings: AuthSettings;
  /** Session configuration */
  session?: SessionConfig;
}

/**
 * Authentication provider
 */
export interface AuthProvider {
  /** Provider name */
  name: string;
  /** Provider type */
  type: 'local' | 'oauth' | 'saml' | 'ldap' | 'jwt';
  /** Provider configuration */
  config: Record<string, unknown>;
  /** Whether the provider is enabled */
  enabled: boolean;
}

/**
 * Authentication settings
 */
export interface AuthSettings {
  /** Password requirements */
  password_requirements?: PasswordRequirements;
  /** Session timeout */
  session_timeout?: number;
  /** Multi-factor authentication */
  mfa?: MfaSettings;
  /** Account lockout settings */
  lockout?: LockoutSettings;
}

/**
 * Password requirements
 */
export interface PasswordRequirements {
  /** Minimum length */
  min_length?: number;
  /** Require uppercase */
  require_uppercase?: boolean;
  /** Require lowercase */
  require_lowercase?: boolean;
  /** Require numbers */
  require_numbers?: boolean;
  /** Require special characters */
  require_special?: boolean;
}

/**
 * MFA settings
 */
export interface MfaSettings {
  /** Whether MFA is enabled */
  enabled: boolean;
  /** MFA methods */
  methods: ('totp' | 'sms' | 'email' | 'backup_codes')[];
  /** Whether MFA is required */
  required?: boolean;
}

/**
 * Account lockout settings
 */
export interface LockoutSettings {
  /** Maximum failed attempts */
  max_attempts?: number;
  /** Lockout duration in minutes */
  lockout_duration?: number;
  /** Whether to enable lockout */
  enabled?: boolean;
}

/**
 * Session configuration
 */
export interface SessionConfig {
  /** Session timeout in minutes */
  timeout?: number;
  /** Session storage type */
  storage?: 'memory' | 'redis' | 'database';
  /** Session configuration */
  config?: Record<string, unknown>;
}

/**
 * Notification feature configuration
 */
export interface NotificationFeatureConfig {
  /** Notification channels */
  channels: NotificationChannel[];
  /** Notification templates */
  templates: NotificationTemplate[];
  /** Notification settings */
  settings?: NotificationSettings;
}

/**
 * Notification channel
 */
export interface NotificationChannel {
  /** Channel name */
  name: string;
  /** Channel type */
  type: 'email' | 'sms' | 'push' | 'webhook' | 'slack' | 'discord';
  /** Channel configuration */
  config: Record<string, unknown>;
  /** Whether the channel is enabled */
  enabled: boolean;
}

/**
 * Notification template
 */
export interface NotificationTemplate {
  /** Template name */
  name: string;
  /** Template subject */
  subject?: string;
  /** Template body */
  body: string;
  /** Template variables */
  variables?: string[];
  /** Template format */
  format: 'text' | 'html' | 'markdown';
}

/**
 * Notification settings
 */
export interface NotificationSettings {
  /** Default channel */
  default_channel?: string;
  /** Retry settings */
  retry?: RetrySettings;
  /** Rate limiting */
  rate_limit?: NotificationRateLimit;
}

/**
 * Retry settings
 */
export interface RetrySettings {
  /** Maximum retries */
  max_retries?: number;
  /** Retry delay in seconds */
  delay?: number;
  /** Backoff strategy */
  backoff?: 'linear' | 'exponential';
}

/**
 * Notification rate limit
 */
export interface NotificationRateLimit {
  /** Maximum notifications per minute */
  per_minute?: number;
  /** Maximum notifications per hour */
  per_hour?: number;
  /** Maximum notifications per day */
  per_day?: number;
}

/**
 * Reporting feature configuration
 */
export interface ReportingFeatureConfig {
  /** Report types */
  report_types: ReportType[];
  /** Export formats */
  export_formats: ExportFormat[];
  /** Scheduling options */
  scheduling?: SchedulingOptions;
}

/**
 * Report type
 */
export interface ReportType {
  /** Type name */
  name: string;
  /** Type description */
  description?: string;
  /** Report template */
  template: string;
  /** Available fields */
  fields: string[];
}

/**
 * Export format
 */
export interface ExportFormat {
  /** Format name */
  name: string;
  /** Format type */
  type: 'pdf' | 'excel' | 'csv' | 'json' | 'xml';
  /** Format configuration */
  config?: Record<string, unknown>;
}

/**
 * Scheduling options
 */
export interface SchedulingOptions {
  /** Available frequencies */
  frequencies: ('once' | 'daily' | 'weekly' | 'monthly')[];
  /** Maximum scheduled reports */
  max_scheduled?: number;
  /** Default timezone */
  default_timezone?: string;
}

/**
 * Workflow feature configuration
 */
export interface WorkflowFeatureConfig {
  /** Workflow definitions */
  workflows: WorkflowDefinition[];
  /** Workflow triggers */
  triggers: WorkflowTrigger[];
  /** Workflow actions */
  actions: WorkflowAction[];
}

/**
 * Workflow definition
 */
export interface WorkflowDefinition {
  /** Workflow name */
  name: string;
  /** Workflow description */
  description?: string;
  /** Workflow steps */
  steps: WorkflowStep[];
  /** Workflow conditions */
  conditions?: WorkflowCondition[];
}

/**
 * Workflow step
 */
export interface WorkflowStep {
  /** Step name */
  name: string;
  /** Step type */
  type: 'action' | 'condition' | 'loop' | 'parallel';
  /** Step configuration */
  config: Record<string, unknown>;
  /** Next steps */
  next?: string[];
}

/**
 * Workflow condition
 */
export interface WorkflowCondition {
  /** Condition name */
  name: string;
  /** Condition expression */
  expression: string;
  /** True branch */
  true_branch?: string;
  /** False branch */
  false_branch?: string;
}

/**
 * Workflow trigger
 */
export interface WorkflowTrigger {
  /** Trigger name */
  name: string;
  /** Trigger type */
  type: 'manual' | 'scheduled' | 'event' | 'webhook';
  /** Trigger configuration */
  config: Record<string, unknown>;
}

/**
 * Workflow action
 */
export interface WorkflowAction {
  /** Action name */
  name: string;
  /** Action type */
  type: 'email' | 'api_call' | 'database' | 'file' | 'notification';
  /** Action configuration */
  config: Record<string, unknown>;
}

/**
 * Custom feature configuration
 */
export interface CustomFeatureConfig {
  /** Custom configuration */
  config: Record<string, unknown>;
  /** Custom scripts */
  scripts?: CustomScript[];
  /** Custom hooks */
  hooks?: CustomHook[];
}

/**
 * Custom script
 */
export interface CustomScript {
  /** Script name */
  name: string;
  /** Script language */
  language: 'javascript' | 'python' | 'sql' | 'shell';
  /** Script content */
  content: string;
  /** Script parameters */
  parameters?: Record<string, unknown>;
}

/**
 * Custom hook
 */
export interface CustomHook {
  /** Hook name */
  name: string;
  /** Hook event */
  event: string;
  /** Hook handler */
  handler: string;
  /** Hook priority */
  priority?: number;
}

/**
 * Feature permissions
 */
export interface FeaturePermissions {
  /** Default permission level */
  default?: PermissionLevel;
  /** Role-based permissions */
  roles?: Record<string, FeaturePermissionLevel>;
  /** User-specific permissions */
  users?: Record<string, FeaturePermissionLevel>;
  /** Whether the feature is public */
  public?: boolean;
}

/**
 * Feature permission level
 */
export interface FeaturePermissionLevel {
  /** Can use the feature */
  use?: boolean;
  /** Can configure the feature */
  configure?: boolean;
  /** Can enable/disable the feature */
  manage?: boolean;
}

/**
 * Feature settings
 */
export interface FeatureSettings {
  /** Feature-specific settings */
  settings: Record<string, unknown>;
  /** Settings schema */
  schema?: Record<string, unknown>;
  /** Settings validation */
  validation?: Record<string, unknown>;
}

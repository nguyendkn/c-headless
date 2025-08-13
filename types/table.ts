import { Field } from './field';
import { AuditableDocument, Publishable, SoftDeletable } from './shared';
import { PermissionLevel } from './type';

/**
 * Table definition for data storage and management
 * Represents a collection of structured data with defined fields
 */
export interface Table extends AuditableDocument, SoftDeletable, Publishable {
  /** Table name (used as database table name) */
  name: string;
  /** Display label for the table */
  label: string;
  /** Optional description of the table's purpose */
  description?: string;
  /** Table fields/columns */
  fields: Field[];
  /** Table configuration */
  config: TableConfig;
  /** Table permissions */
  permissions?: TablePermissions;
  /** Table indexes for performance */
  indexes?: TableIndex[];
  /** Table relationships */
  relationships?: TableRelationship[];
  /** Table hooks/triggers */
  hooks?: TableHooks;
  /** Table validation rules */
  validation?: TableValidation;
  /** Table display settings */
  display?: TableDisplay;
}

/**
 * Table configuration
 */
export interface TableConfig {
  /** Whether the table supports soft deletes */
  soft_delete?: boolean;
  /** Whether the table supports versioning */
  versioning?: boolean;
  /** Whether the table supports audit logging */
  audit_log?: boolean;
  /** Whether the table supports publishing workflow */
  publishable?: boolean;
  /** Whether the table supports localization */
  localizable?: boolean;
  /** Primary key field name */
  primary_key?: string;
  /** Whether to auto-generate primary key */
  auto_pk?: boolean;
  /** Table storage engine */
  engine?: string;
  /** Table character set */
  charset?: string;
  /** Table collation */
  collation?: string;
  /** Table comment */
  comment?: string;
  /** Maximum number of records */
  max_records?: number;
  /** Whether the table is read-only */
  readonly?: boolean;
  /** Whether the table is system-managed */
  system?: boolean;
}

/**
 * Table permissions
 */
export interface TablePermissions {
  /** Default permission level */
  default?: PermissionLevel;
  /** Role-based permissions */
  roles?: Record<string, TablePermissionLevel>;
  /** User-specific permissions */
  users?: Record<string, TablePermissionLevel>;
  /** Public access level */
  public?: TablePermissionLevel;
  /** API access permissions */
  api?: ApiPermissions;
}

/**
 * Table permission level
 */
export interface TablePermissionLevel {
  /** Can read records */
  read?: boolean;
  /** Can create records */
  create?: boolean;
  /** Can update records */
  update?: boolean;
  /** Can delete records */
  delete?: boolean;
  /** Can manage table structure */
  manage?: boolean;
  /** Can export data */
  export?: boolean;
  /** Can import data */
  import?: boolean;
  /** Row-level security filter */
  row_filter?: string;
}

/**
 * API access permissions
 */
export interface ApiPermissions {
  /** Whether API access is enabled */
  enabled?: boolean;
  /** API key required */
  require_api_key?: boolean;
  /** Rate limiting */
  rate_limit?: RateLimit;
  /** Allowed HTTP methods */
  allowed_methods?: string[];
  /** CORS configuration */
  cors?: CorsConfig;
}

/**
 * Rate limiting configuration
 */
export interface RateLimit {
  /** Maximum requests per window */
  max_requests: number;
  /** Time window in seconds */
  window_seconds: number;
  /** Rate limit scope */
  scope: 'global' | 'user' | 'ip';
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
 * Table index for performance optimization
 */
export interface TableIndex {
  /** Index name */
  name: string;
  /** Index type */
  type: 'btree' | 'hash' | 'gin' | 'gist' | 'fulltext';
  /** Fields included in the index */
  fields: string[];
  /** Whether the index is unique */
  unique?: boolean;
  /** Whether the index is partial */
  partial?: boolean;
  /** Partial index condition */
  condition?: string;
  /** Index comment */
  comment?: string;
}

/**
 * Table relationship definition
 */
export interface TableRelationship {
  /** Relationship name */
  name: string;
  /** Related table */
  table: string;
  /** Relationship type */
  type: 'one_to_one' | 'one_to_many' | 'many_to_one' | 'many_to_many';
  /** Local field(s) */
  local_field: string | string[];
  /** Foreign field(s) */
  foreign_field: string | string[];
  /** Join table for many-to-many */
  join_table?: string;
  /** Whether to cascade deletes */
  cascade_delete?: boolean;
  /** Relationship constraints */
  constraints?: Record<string, unknown>;
}

/**
 * Table hooks/triggers
 */
export interface TableHooks {
  /** Before create hooks */
  before_create?: Hook[];
  /** After create hooks */
  after_create?: Hook[];
  /** Before update hooks */
  before_update?: Hook[];
  /** After update hooks */
  after_update?: Hook[];
  /** Before delete hooks */
  before_delete?: Hook[];
  /** After delete hooks */
  after_delete?: Hook[];
  /** Before read hooks */
  before_read?: Hook[];
  /** After read hooks */
  after_read?: Hook[];
}

/**
 * Hook definition
 */
export interface Hook {
  /** Hook name */
  name: string;
  /** Hook function */
  function: string;
  /** Hook priority (lower = earlier) */
  priority?: number;
  /** Whether the hook is enabled */
  enabled?: boolean;
  /** Hook conditions */
  conditions?: HookCondition[];
}

/**
 * Hook condition
 */
export interface HookCondition {
  /** Field to check */
  field: string;
  /** Condition operator */
  operator: string;
  /** Value to compare */
  value: unknown;
}

/**
 * Table validation rules
 */
export interface TableValidation {
  /** Cross-field validation rules */
  cross_field?: CrossFieldValidation[];
  /** Custom validation functions */
  custom?: CustomValidation[];
  /** Business rules */
  business_rules?: BusinessRule[];
}

/**
 * Cross-field validation
 */
export interface CrossFieldValidation {
  /** Validation name */
  name: string;
  /** Fields involved */
  fields: string[];
  /** Validation rule */
  rule: string;
  /** Error message */
  message: string;
}

/**
 * Custom validation
 */
export interface CustomValidation {
  /** Validation name */
  name: string;
  /** Validation function */
  function: string;
  /** Error message */
  message: string;
  /** When to run validation */
  trigger: 'create' | 'update' | 'delete' | 'all';
}

/**
 * Business rule
 */
export interface BusinessRule {
  /** Rule name */
  name: string;
  /** Rule description */
  description: string;
  /** Rule condition */
  condition: string;
  /** Rule action */
  action: string;
  /** Whether the rule is enabled */
  enabled?: boolean;
}

/**
 * Table display settings
 */
export interface TableDisplay {
  /** Default list view configuration */
  list_view?: ListView;
  /** Default form view configuration */
  form_view?: FormView;
  /** Default detail view configuration */
  detail_view?: DetailView;
  /** Available views */
  views?: Record<string, ViewConfig>;
}

/**
 * List view configuration
 */
export interface ListView {
  /** Fields to show in list */
  fields: string[];
  /** Default sort field */
  sort_field?: string;
  /** Default sort direction */
  sort_direction?: 'asc' | 'desc';
  /** Items per page */
  page_size?: number;
  /** Whether to show filters */
  show_filters?: boolean;
  /** Whether to show search */
  show_search?: boolean;
  /** Whether to show export button */
  show_export?: boolean;
}

/**
 * Form view configuration
 */
export interface FormView {
  /** Form layout */
  layout: 'single_column' | 'two_column' | 'tabs' | 'accordion';
  /** Field groups */
  groups?: FormGroup[];
  /** Fields to show */
  fields?: string[];
  /** Fields to hide */
  hidden_fields?: string[];
}

/**
 * Form group
 */
export interface FormGroup {
  /** Group name */
  name: string;
  /** Group label */
  label: string;
  /** Fields in group */
  fields: string[];
  /** Whether group is collapsible */
  collapsible?: boolean;
}

/**
 * Detail view configuration
 */
export interface DetailView {
  /** Fields to show */
  fields: string[];
  /** Field layout */
  layout: 'single_column' | 'two_column' | 'tabs';
  /** Related data to show */
  related?: RelatedDataConfig[];
}

/**
 * Related data configuration
 */
export interface RelatedDataConfig {
  /** Relationship name */
  relationship: string;
  /** Display label */
  label: string;
  /** Fields to show */
  fields: string[];
  /** Maximum items to show */
  limit?: number;
}

/**
 * View configuration
 */
export interface ViewConfig {
  /** View type */
  type: 'list' | 'form' | 'detail' | 'chart' | 'calendar' | 'kanban';
  /** View configuration */
  config: Record<string, unknown>;
}

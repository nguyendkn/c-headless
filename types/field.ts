import { Document } from './shared';
import {
  DataType,
  FieldInputType,
  RelationshipType,
  ValidationType,
} from './type';

/**
 * Field definition for tables and forms
 * Represents a column in a table or a field in a form
 */
export interface Field extends Document {
  /** Field name (used as database column name) */
  name: string;
  /** Display label for the field */
  label: string;
  /** Data type of the field */
  type: DataType;
  /** Input type for forms */
  input_type?: FieldInputType;
  /** Optional description of the field */
  description?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is unique */
  unique?: boolean;
  /** Whether the field is indexed for faster queries */
  indexed?: boolean;
  /** Default value for the field */
  default_value?: unknown;
  /** Field validation rules */
  validation?: FieldValidationRule[];
  /** Field options for select/enum fields */
  options?: FieldOption[];
  /** Relationship configuration if this is a relationship field */
  relationship?: FieldRelationship;
  /** Field constraints */
  constraints?: FieldConstraints;
  /** Field display configuration */
  display?: FieldDisplay;
  /** Whether the field is system-managed (read-only) */
  system?: boolean;
  /** Whether the field is encrypted */
  encrypted?: boolean;
  /** Field permissions */
  permissions?: FieldPermissions;
}

/**
 * Field validation rule
 */
export interface FieldValidationRule {
  /** Type of validation */
  type: ValidationType;
  /** Validation value/parameter */
  value?: unknown;
  /** Custom error message */
  message?: string;
  /** Whether this validation is a warning (non-blocking) */
  warning?: boolean;
  /** Validation function for custom validations */
  validator?: string;
}

/**
 * Field option for select/enum fields
 */
export interface FieldOption {
  /** Option value */
  value: string | number | boolean;
  /** Display label for the option */
  label: string;
  /** Optional description */
  description?: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Option color/styling */
  color?: string;
  /** Option icon */
  icon?: string;
  /** Option group */
  group?: string;
  /** Option order */
  order?: number;
}

/**
 * Field relationship configuration
 */
export interface FieldRelationship {
  /** Type of relationship */
  type: RelationshipType;
  /** Target table/entity */
  target_table: string;
  /** Target field (for foreign keys) */
  target_field?: string;
  /** Field to display as label in UI */
  display_field?: string;
  /** Whether to cascade deletes */
  cascade_delete?: boolean;
  /** Whether to allow null values */
  nullable?: boolean;
  /** Join table for many-to-many relationships */
  join_table?: string;
  /** Additional relationship constraints */
  constraints?: RelationshipConstraints;
}

/**
 * Relationship constraints
 */
export interface RelationshipConstraints {
  /** Minimum number of related records */
  min_count?: number;
  /** Maximum number of related records */
  max_count?: number;
  /** Filter conditions for related records */
  filter?: Record<string, unknown>;
  /** Sort order for related records */
  sort?: { field: string; direction: 'asc' | 'desc' }[];
}

/**
 * Field constraints
 */
export interface FieldConstraints {
  /** Minimum length for string fields */
  min_length?: number;
  /** Maximum length for string fields */
  max_length?: number;
  /** Minimum value for numeric fields */
  min_value?: number;
  /** Maximum value for numeric fields */
  max_value?: number;
  /** Regular expression pattern */
  pattern?: string;
  /** Allowed file types for file fields */
  allowed_file_types?: string[];
  /** Maximum file size in bytes */
  max_file_size?: number;
  /** Custom constraint function */
  custom_constraint?: string;
}

/**
 * Field display configuration
 */
export interface FieldDisplay {
  /** Whether to show the field in lists */
  show_in_list?: boolean;
  /** Whether to show the field in forms */
  show_in_form?: boolean;
  /** Whether to show the field in details view */
  show_in_detail?: boolean;
  /** Field width in list view */
  list_width?: number;
  /** Field order in forms */
  form_order?: number;
  /** Field group in forms */
  form_group?: string;
  /** Field help text */
  help_text?: string;
  /** Field placeholder text */
  placeholder?: string;
  /** Field prefix */
  prefix?: string;
  /** Field suffix */
  suffix?: string;
  /** Number format for numeric fields */
  number_format?: NumberFormat;
  /** Date format for date fields */
  date_format?: string;
  /** Whether to show field as badge/chip */
  show_as_badge?: boolean;
  /** Badge color configuration */
  badge_color?: BadgeColorConfig;
}

/**
 * Number format configuration
 */
export interface NumberFormat {
  /** Number of decimal places */
  decimal_places?: number;
  /** Thousands separator */
  thousands_separator?: string;
  /** Decimal separator */
  decimal_separator?: string;
  /** Currency symbol */
  currency_symbol?: string;
  /** Currency position */
  currency_position?: 'before' | 'after';
  /** Whether to show percentage symbol */
  show_percentage?: boolean;
}

/**
 * Badge color configuration
 */
export interface BadgeColorConfig {
  /** Default color */
  default?: string;
  /** Color mapping based on field value */
  value_colors?: Record<string, string>;
  /** Color mapping based on conditions */
  conditional_colors?: ConditionalColor[];
}

/**
 * Conditional color configuration
 */
export interface ConditionalColor {
  /** Condition to evaluate */
  condition: string;
  /** Color to apply when condition is true */
  color: string;
  /** Optional text color */
  text_color?: string;
}

/**
 * Field permissions
 */
export interface FieldPermissions {
  /** Who can read this field */
  read?: string[];
  /** Who can write to this field */
  write?: string[];
  /** Who can see this field in lists */
  list?: string[];
  /** Role-based permissions */
  roles?: Record<string, FieldPermissionLevel>;
}

/**
 * Field permission level
 */
export interface FieldPermissionLevel {
  /** Can read the field */
  read?: boolean;
  /** Can write to the field */
  write?: boolean;
  /** Can see the field in lists */
  list?: boolean;
  /** Can see the field in forms */
  form?: boolean;
}

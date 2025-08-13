import { Document } from './shared';
import { FieldInputType, HttpMethod, ValidationType } from './type';

/**
 * Form configuration for data entry and editing
 */
export interface Form extends Document {
  /** Display name of the form */
  name: string;
  /** Optional description of the form's purpose */
  description?: string;
  /** HTTP method used when submitting the form */
  method: HttpMethod;
  /** Target URL for form submission */
  action?: string;
  /** Form fields configuration */
  fields: FormField[];
  /** Form validation rules */
  validation?: FormValidation;
  /** Form layout configuration */
  layout?: FormLayout;
  /** Form submission settings */
  submission?: FormSubmission;
}

/**
 * Individual form field configuration
 */
export interface FormField {
  /** Unique identifier for the field */
  id: string;
  /** Field name (used as form input name) */
  name: string;
  /** Display label for the field */
  label: string;
  /** Input type for the field */
  type: FieldInputType;
  /** Whether the field is required */
  required?: boolean;
  /** Default value for the field */
  default_value?: unknown;
  /** Placeholder text */
  placeholder?: string;
  /** Help text or description */
  help_text?: string;
  /** Field validation rules */
  validation?: FieldValidation[];
  /** Field options for select/radio/checkbox fields */
  options?: FieldOption[];
  /** Field dependencies and conditional logic */
  conditions?: FieldCondition[];
  /** Field styling and layout */
  styling?: FieldStyling;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field is read-only */
  readonly?: boolean;
}

/**
 * Field validation rule
 */
export interface FieldValidation {
  /** Type of validation */
  type: ValidationType;
  /** Validation value/parameter */
  value?: unknown;
  /** Custom error message */
  message?: string;
  /** Whether this validation is a warning (non-blocking) */
  warning?: boolean;
}

/**
 * Field option for select/radio/checkbox fields
 */
export interface FieldOption {
  /** Option value */
  value: string | number | boolean;
  /** Display label for the option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Optional description */
  description?: string;
  /** Option group (for grouped selects) */
  group?: string;
}

/**
 * Field conditional logic
 */
export interface FieldCondition {
  /** Field to watch for changes */
  field: string;
  /** Condition operator */
  operator:
    | 'equals'
    | 'not_equals'
    | 'contains'
    | 'not_contains'
    | 'greater_than'
    | 'less_than'
    | 'in'
    | 'not_in';
  /** Value to compare against */
  value: unknown;
  /** Action to take when condition is met */
  action: 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'optional';
}

/**
 * Field styling configuration
 */
export interface FieldStyling {
  /** CSS classes to apply */
  css_classes?: string[];
  /** Inline styles */
  styles?: Record<string, string>;
  /** Field width (in grid columns) */
  width?: number;
  /** Field order/position */
  order?: number;
}

/**
 * Form validation configuration
 */
export interface FormValidation {
  /** Whether to validate on field blur */
  validate_on_blur?: boolean;
  /** Whether to validate on form submission */
  validate_on_submit?: boolean;
  /** Custom validation functions */
  custom_validators?: CustomValidator[];
}

/**
 * Custom validation function
 */
export interface CustomValidator {
  /** Validator name/identifier */
  name: string;
  /** Validation function (as string for serialization) */
  function: string;
  /** Error message template */
  message: string;
  /** Fields this validator applies to */
  fields?: string[];
}

/**
 * Form layout configuration
 */
export interface FormLayout {
  /** Layout type */
  type:
    | 'single_column'
    | 'two_column'
    | 'grid'
    | 'tabs'
    | 'accordion'
    | 'wizard';
  /** Number of columns for grid layout */
  columns?: number;
  /** Field groups/sections */
  sections?: FormSection[];
  /** Whether to show field labels */
  show_labels?: boolean;
  /** Label position */
  label_position?: 'top' | 'left' | 'right' | 'floating';
}

/**
 * Form section/group
 */
export interface FormSection {
  /** Section identifier */
  id: string;
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Fields in this section */
  fields: string[];
  /** Whether the section is collapsible */
  collapsible?: boolean;
  /** Whether the section is initially collapsed */
  collapsed?: boolean;
}

/**
 * Form submission configuration
 */
export interface FormSubmission {
  /** Success message */
  success_message?: string;
  /** Error message */
  error_message?: string;
  /** Redirect URL after successful submission */
  redirect_url?: string;
  /** Whether to reset form after submission */
  reset_after_submit?: boolean;
  /** Whether to show loading state during submission */
  show_loading?: boolean;
  /** Submission timeout in milliseconds */
  timeout?: number;
}

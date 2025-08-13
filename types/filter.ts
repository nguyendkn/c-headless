import { Document } from './shared';
import { FilterOperator } from './view';

/**
 * Filter definition for data querying and searching
 * Represents reusable filter configurations that can be applied to views
 */
export interface Filter extends Document {
  /** Filter name (used as identifier) */
  name: string;
  /** Display title for the filter */
  title: string;
  /** Optional description of the filter's purpose */
  description?: string;
  /** Target table for this filter */
  table_id: string;
  /** Filter conditions */
  conditions: FilterCondition[];
  /** Filter logic (how conditions are combined) */
  logic?: FilterLogic;
  /** Whether the filter is active by default */
  default_active?: boolean;
  /** Whether the filter is public */
  public?: boolean;
  /** Filter category for organization */
  category?: string;
  /** Filter tags */
  tags?: string[];
}

/**
 * Filter condition
 */
export interface FilterCondition {
  /** Condition ID */
  id: string;
  /** Field to filter */
  field_id: string;
  /** Filter operator */
  operator: FilterOperator;
  /** Filter value */
  value: FilterValue;
  /** Whether the condition is enabled */
  enabled?: boolean;
  /** Condition group (for complex logic) */
  group?: string;
}

/**
 * Filter value types
 */
export type FilterValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | number[]
  | FilterRange
  | FilterRelativeDate
  | FilterDynamicValue;

/**
 * Filter range for between operations
 */
export interface FilterRange {
  /** Start value */
  start: string | number | Date;
  /** End value */
  end: string | number | Date;
}

/**
 * Relative date filter
 */
export interface FilterRelativeDate {
  /** Relative date type */
  type: 'days' | 'weeks' | 'months' | 'years';
  /** Number of units */
  value: number;
  /** Direction (past or future) */
  direction: 'past' | 'future';
  /** Reference point */
  reference?:
    | 'now'
    | 'start_of_day'
    | 'start_of_week'
    | 'start_of_month'
    | 'start_of_year';
}

/**
 * Dynamic filter value
 */
export interface FilterDynamicValue {
  /** Dynamic value type */
  type:
    | 'current_user'
    | 'current_date'
    | 'current_time'
    | 'session_variable'
    | 'url_parameter';
  /** Parameter name (for session variables and URL parameters) */
  parameter?: string;
  /** Default value if parameter is not available */
  default?: unknown;
}

/**
 * Filter logic for combining conditions
 */
export interface FilterLogic {
  /** Root logic operator */
  operator: 'AND' | 'OR';
  /** Logic groups for complex conditions */
  groups?: FilterLogicGroup[];
}

/**
 * Filter logic group
 */
export interface FilterLogicGroup {
  /** Group ID */
  id: string;
  /** Group operator */
  operator: 'AND' | 'OR';
  /** Condition IDs in this group */
  conditions: string[];
  /** Nested groups */
  groups?: FilterLogicGroup[];
}

/**
 * Saved filter preset
 */
export interface FilterPreset extends Document {
  /** Preset name */
  name: string;
  /** Preset description */
  description?: string;
  /** Target table */
  table_id: string;
  /** Filter configuration */
  filter: Filter;
  /** Whether the preset is public */
  public?: boolean;
  /** Preset category */
  category?: string;
  /** Usage count */
  usage_count?: number;
  /** Last used timestamp */
  last_used?: string;
}

/**
 * Quick filter for common operations
 */
export interface QuickFilter {
  /** Filter ID */
  id: string;
  /** Filter label */
  label: string;
  /** Filter icon */
  icon?: string;
  /** Field to filter */
  field_id: string;
  /** Filter operator */
  operator: FilterOperator;
  /** Filter value */
  value: FilterValue;
  /** Filter color */
  color?: string;
  /** Filter order */
  order?: number;
}

/**
 * Advanced search configuration
 */
export interface AdvancedSearch {
  /** Search fields */
  fields: SearchField[];
  /** Search operators */
  operators: SearchOperator[];
  /** Search options */
  options?: SearchOptions;
}

/**
 * Search field configuration
 */
export interface SearchField {
  /** Field ID */
  field_id: string;
  /** Field label */
  label: string;
  /** Field weight for relevance scoring */
  weight?: number;
  /** Whether the field is searchable */
  searchable?: boolean;
  /** Search type */
  search_type?: 'exact' | 'partial' | 'fuzzy' | 'phonetic';
}

/**
 * Search operator configuration
 */
export interface SearchOperator {
  /** Operator value */
  value: FilterOperator;
  /** Operator label */
  label: string;
  /** Operator description */
  description?: string;
  /** Applicable field types */
  field_types?: string[];
}

/**
 * Search options
 */
export interface SearchOptions {
  /** Whether to enable fuzzy search */
  fuzzy_search?: boolean;
  /** Fuzzy search threshold */
  fuzzy_threshold?: number;
  /** Whether to enable phonetic search */
  phonetic_search?: boolean;
  /** Whether to highlight search terms */
  highlight_terms?: boolean;
  /** Maximum number of results */
  max_results?: number;
  /** Search timeout in milliseconds */
  timeout?: number;
}

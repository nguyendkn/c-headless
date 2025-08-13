import { FilterCondition } from './filter';
import { Document } from './shared';
import { ChartType, PermissionLevel } from './type';

/**
 * Report definition for data analysis and visualization
 * Represents complex data queries with charts, tables, and analytics
 */
export interface Report extends Document {
  /** Report name (used as identifier) */
  name: string;
  /** Display title for the report */
  title: string;
  /** Optional description of the report's purpose */
  description?: string;
  /** Report category for organization */
  category?: string;
  /** Report tags */
  tags?: string[];
  /** Data sources for the report */
  data_sources: ReportDataSource[];
  /** Report sections */
  sections: ReportSection[];
  /** Report parameters */
  parameters?: ReportParameter[];
  /** Report filters */
  filters?: FilterCondition[];
  /** Report permissions */
  permissions?: ReportPermissions;
  /** Report schedule */
  schedule?: ReportSchedule;
  /** Report export settings */
  export_settings?: ReportExportSettings;
  /** Whether the report is public */
  public?: boolean;
  /** Report layout */
  layout?: ReportLayout;
}

/**
 * Report data source
 */
export interface ReportDataSource {
  /** Data source ID */
  id: string;
  /** Data source name */
  name: string;
  /** Source type */
  type: 'table' | 'view' | 'query' | 'api' | 'file';
  /** Source configuration */
  config: Record<string, unknown>;
  /** Data transformations */
  transformations?: DataTransformation[];
  /** Data refresh settings */
  refresh?: DataRefreshSettings;
}

/**
 * Data transformation
 */
export interface DataTransformation {
  /** Transformation ID */
  id: string;
  /** Transformation type */
  type:
    | 'filter'
    | 'aggregate'
    | 'join'
    | 'pivot'
    | 'unpivot'
    | 'calculate'
    | 'sort'
    | 'group';
  /** Transformation configuration */
  config: Record<string, unknown>;
  /** Transformation order */
  order?: number;
}

/**
 * Data refresh settings
 */
export interface DataRefreshSettings {
  /** Refresh mode */
  mode: 'manual' | 'scheduled' | 'real_time';
  /** Refresh interval (for scheduled mode) */
  interval?: RefreshInterval;
  /** Cache duration in seconds */
  cache_duration?: number;
}

/**
 * Refresh interval
 */
export interface RefreshInterval {
  /** Interval type */
  type: 'minutes' | 'hours' | 'days' | 'weeks';
  /** Interval value */
  value: number;
}

/**
 * Report section
 */
export interface ReportSection {
  /** Section ID */
  id: string;
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Section type */
  type: 'chart' | 'table' | 'metric' | 'text' | 'image' | 'divider';
  /** Section configuration */
  config: SectionConfig;
  /** Section layout */
  layout?: SectionLayout;
  /** Section visibility conditions */
  visibility?: VisibilityCondition[];
}

/**
 * Section configuration
 */
export type SectionConfig =
  | ChartSectionConfig
  | TableSectionConfig
  | MetricSectionConfig
  | TextSectionConfig
  | ImageSectionConfig
  | DividerSectionConfig;

/**
 * Chart section configuration
 */
export interface ChartSectionConfig {
  /** Chart type */
  chart_type: ChartType;
  /** Data source */
  data_source: string;
  /** Chart configuration */
  chart_config: ChartConfig;
}

/**
 * Chart configuration
 */
export interface ChartConfig {
  /** X-axis field */
  x_axis?: string;
  /** Y-axis fields */
  y_axis?: string[];
  /** Series field */
  series?: string;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Chart options */
  options?: Record<string, unknown>;
}

/**
 * Table section configuration
 */
export interface TableSectionConfig {
  /** Data source */
  data_source: string;
  /** Columns to display */
  columns: TableColumn[];
  /** Table options */
  options?: TableOptions;
}

/**
 * Table column
 */
export interface TableColumn {
  /** Field name */
  field: string;
  /** Column title */
  title?: string;
  /** Column width */
  width?: number | string;
  /** Column format */
  format?: ColumnFormat;
  /** Column alignment */
  align?: 'left' | 'center' | 'right';
}

/**
 * Column format
 */
export interface ColumnFormat {
  /** Format type */
  type:
    | 'text'
    | 'number'
    | 'currency'
    | 'percentage'
    | 'date'
    | 'datetime'
    | 'boolean';
  /** Format options */
  options?: Record<string, unknown>;
}

/**
 * Table options
 */
export interface TableOptions {
  /** Show row numbers */
  show_row_numbers?: boolean;
  /** Enable sorting */
  sortable?: boolean;
  /** Enable filtering */
  filterable?: boolean;
  /** Page size */
  page_size?: number;
  /** Show pagination */
  show_pagination?: boolean;
}

/**
 * Metric section configuration
 */
export interface MetricSectionConfig {
  /** Data source */
  data_source: string;
  /** Metric field */
  field: string;
  /** Metric aggregation */
  aggregation: 'sum' | 'avg' | 'count' | 'min' | 'max';
  /** Metric format */
  format?: MetricFormat;
  /** Comparison settings */
  comparison?: MetricComparison;
}

/**
 * Metric format
 */
export interface MetricFormat {
  /** Format type */
  type: 'number' | 'currency' | 'percentage';
  /** Decimal places */
  decimal_places?: number;
  /** Prefix */
  prefix?: string;
  /** Suffix */
  suffix?: string;
}

/**
 * Metric comparison
 */
export interface MetricComparison {
  /** Comparison type */
  type: 'previous_period' | 'target' | 'baseline';
  /** Comparison value */
  value?: number;
  /** Show percentage change */
  show_percentage?: boolean;
  /** Show trend indicator */
  show_trend?: boolean;
}

/**
 * Text section configuration
 */
export interface TextSectionConfig {
  /** Text content */
  content: string;
  /** Text format */
  format: 'plain' | 'markdown' | 'html';
  /** Text style */
  style?: TextStyle;
}

/**
 * Text style
 */
export interface TextStyle {
  /** Font size */
  font_size?: string;
  /** Font weight */
  font_weight?: 'normal' | 'bold';
  /** Text color */
  color?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'justify';
}

/**
 * Image section configuration
 */
export interface ImageSectionConfig {
  /** Image URL */
  url: string;
  /** Alt text */
  alt?: string;
  /** Image width */
  width?: number | string;
  /** Image height */
  height?: number | string;
}

/**
 * Divider section configuration
 */
export interface DividerSectionConfig {
  /** Divider style */
  style?: 'solid' | 'dashed' | 'dotted';
  /** Divider color */
  color?: string;
  /** Divider thickness */
  thickness?: number;
}

/**
 * Section layout
 */
export interface SectionLayout {
  /** Section width */
  width?: number | string;
  /** Section height */
  height?: number | string;
  /** Section position */
  position?: { x: number; y: number };
  /** Section padding */
  padding?: number | string;
  /** Section margin */
  margin?: number | string;
}

/**
 * Visibility condition
 */
export interface VisibilityCondition {
  /** Parameter name */
  parameter: string;
  /** Condition operator */
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'in' | 'not_in';
  /** Condition value */
  value: unknown;
}

/**
 * Report parameter
 */
export interface ReportParameter {
  /** Parameter name */
  name: string;
  /** Parameter label */
  label: string;
  /** Parameter type */
  type: 'string' | 'number' | 'boolean' | 'date' | 'select' | 'multiselect';
  /** Default value */
  default_value?: unknown;
  /** Parameter options (for select types) */
  options?: ParameterOption[];
  /** Whether parameter is required */
  required?: boolean;
  /** Parameter description */
  description?: string;
}

/**
 * Parameter option
 */
export interface ParameterOption {
  /** Option value */
  value: unknown;
  /** Option label */
  label: string;
}

/**
 * Report permissions
 */
export interface ReportPermissions {
  /** Default permission level */
  default?: PermissionLevel;
  /** Role-based permissions */
  roles?: Record<string, ReportPermissionLevel>;
  /** User-specific permissions */
  users?: Record<string, ReportPermissionLevel>;
  /** Whether the report is public */
  public?: boolean;
}

/**
 * Report permission level
 */
export interface ReportPermissionLevel {
  /** Can view the report */
  view?: boolean;
  /** Can edit the report */
  edit?: boolean;
  /** Can export the report */
  export?: boolean;
  /** Can schedule the report */
  schedule?: boolean;
  /** Can share the report */
  share?: boolean;
}

/**
 * Report schedule
 */
export interface ReportSchedule {
  /** Whether scheduling is enabled */
  enabled: boolean;
  /** Schedule frequency */
  frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  /** Schedule configuration */
  config: ScheduleConfig;
  /** Recipients */
  recipients: ScheduleRecipient[];
  /** Email settings */
  email_settings?: EmailSettings;
}

/**
 * Schedule configuration
 */
export type ScheduleConfig =
  | OnceScheduleConfig
  | DailyScheduleConfig
  | WeeklyScheduleConfig
  | MonthlyScheduleConfig
  | QuarterlyScheduleConfig
  | YearlyScheduleConfig;

/**
 * Once schedule configuration
 */
export interface OnceScheduleConfig {
  /** Execution date and time */
  datetime: string;
}

/**
 * Daily schedule configuration
 */
export interface DailyScheduleConfig {
  /** Execution time */
  time: string;
  /** Interval in days */
  interval?: number;
}

/**
 * Weekly schedule configuration
 */
export interface WeeklyScheduleConfig {
  /** Day of week (0 = Sunday) */
  day_of_week: number;
  /** Execution time */
  time: string;
  /** Interval in weeks */
  interval?: number;
}

/**
 * Monthly schedule configuration
 */
export interface MonthlyScheduleConfig {
  /** Day of month */
  day_of_month: number;
  /** Execution time */
  time: string;
  /** Interval in months */
  interval?: number;
}

/**
 * Quarterly schedule configuration
 */
export interface QuarterlyScheduleConfig {
  /** Month of quarter (1-3) */
  month_of_quarter: number;
  /** Day of month */
  day_of_month: number;
  /** Execution time */
  time: string;
}

/**
 * Yearly schedule configuration
 */
export interface YearlyScheduleConfig {
  /** Month of year (1-12) */
  month_of_year: number;
  /** Day of month */
  day_of_month: number;
  /** Execution time */
  time: string;
}

/**
 * Schedule recipient
 */
export interface ScheduleRecipient {
  /** Recipient type */
  type: 'user' | 'email' | 'role' | 'group';
  /** Recipient identifier */
  identifier: string;
  /** Delivery format */
  format?: 'pdf' | 'excel' | 'csv' | 'html' | 'link';
}

/**
 * Email settings
 */
export interface EmailSettings {
  /** Email subject */
  subject?: string;
  /** Email body */
  body?: string;
  /** Whether to attach report */
  attach_report?: boolean;
  /** Attachment format */
  attachment_format?: 'pdf' | 'excel' | 'csv';
}

/**
 * Report export settings
 */
export interface ReportExportSettings {
  /** Available export formats */
  formats: ExportFormat[];
  /** Default export format */
  default_format?: string;
  /** Export options */
  options?: ExportOptions;
}

/**
 * Export format
 */
export interface ExportFormat {
  /** Format type */
  type: 'pdf' | 'excel' | 'csv' | 'html' | 'json' | 'xml';
  /** Format label */
  label: string;
  /** Format options */
  options?: Record<string, unknown>;
}

/**
 * Export options
 */
export interface ExportOptions {
  /** Include charts */
  include_charts?: boolean;
  /** Include data */
  include_data?: boolean;
  /** Page orientation for PDF */
  page_orientation?: 'portrait' | 'landscape';
  /** Page size for PDF */
  page_size?: 'A4' | 'A3' | 'Letter' | 'Legal';
}

/**
 * Report layout
 */
export interface ReportLayout {
  /** Layout type */
  type: 'single_column' | 'two_column' | 'grid' | 'dashboard';
  /** Layout configuration */
  config?: LayoutConfig;
}

/**
 * Layout configuration
 */
export interface LayoutConfig {
  /** Number of columns for grid layout */
  columns?: number;
  /** Column widths */
  column_widths?: string[];
  /** Row heights */
  row_heights?: string[];
  /** Gap between sections */
  gap?: number | string;
}

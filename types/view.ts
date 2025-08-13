import { Document } from './shared';
import { ChartType, PermissionLevel, ViewType } from './type';

/**
 * View definition for displaying and interacting with data
 * Represents different ways to visualize and manipulate table data
 */
export interface View extends Document {
  /** View name (used as identifier) */
  name: string;
  /** Display title for the view */
  title: string;
  /** Optional description of the view's purpose */
  description?: string;
  /** Type of view */
  type: ViewType;
  /** Target table for this view */
  table_id: string;
  /** View configuration */
  config: ViewConfig;
  /** View permissions */
  permissions?: ViewPermissions;
  /** View filters */
  filters?: ViewFilter[];
  /** View sorting */
  sorting?: ViewSort[];
  /** View grouping */
  grouping?: ViewGrouping;
  /** View aggregations */
  aggregations?: ViewAggregation[];
  /** Whether the view is public */
  public?: boolean;
  /** Whether the view is the default for the table */
  default?: boolean;
}

/**
 * View configuration based on view type
 */
export type ViewConfig =
  | TableViewConfig
  | FormViewConfig
  | ChartViewConfig
  | CardViewConfig
  | ListViewConfig
  | GridViewConfig
  | CalendarViewConfig
  | KanbanViewConfig
  | TimelineViewConfig
  | MapViewConfig;

/**
 * Table view configuration
 */
export interface TableViewConfig {
  /** Fields to display as columns */
  columns: TableColumn[];
  /** Row height */
  row_height?: 'compact' | 'normal' | 'comfortable';
  /** Whether to show row numbers */
  show_row_numbers?: boolean;
  /** Whether to enable row selection */
  row_selection?: boolean;
  /** Whether to enable column resizing */
  column_resizing?: boolean;
  /** Whether to enable column reordering */
  column_reordering?: boolean;
  /** Whether to show column headers */
  show_headers?: boolean;
  /** Whether to enable horizontal scrolling */
  horizontal_scroll?: boolean;
  /** Whether to enable virtual scrolling */
  virtual_scroll?: boolean;
  /** Page size for pagination */
  page_size?: number;
  /** Whether to show pagination */
  show_pagination?: boolean;
}

/**
 * Table column configuration
 */
export interface TableColumn {
  /** Field ID */
  field_id: string;
  /** Column title */
  title?: string;
  /** Column width */
  width?: number | string;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Whether the column is filterable */
  filterable?: boolean;
  /** Whether the column is resizable */
  resizable?: boolean;
  /** Column alignment */
  align?: 'left' | 'center' | 'right';
  /** Column format */
  format?: ColumnFormat;
  /** Whether the column is pinned */
  pinned?: 'left' | 'right';
  /** Whether the column is hidden */
  hidden?: boolean;
}

/**
 * Column format configuration
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
    | 'time'
    | 'boolean'
    | 'badge'
    | 'link'
    | 'image';
  /** Format options */
  options?: Record<string, unknown>;
}

/**
 * Form view configuration
 */
export interface FormViewConfig {
  /** Form layout */
  layout:
    | 'single_column'
    | 'two_column'
    | 'grid'
    | 'tabs'
    | 'accordion'
    | 'wizard';
  /** Number of columns for grid layout */
  columns?: number;
  /** Form sections */
  sections?: FormSection[];
  /** Fields to include */
  fields?: string[];
  /** Fields to exclude */
  excluded_fields?: string[];
  /** Whether to show field labels */
  show_labels?: boolean;
  /** Label position */
  label_position?: 'top' | 'left' | 'right' | 'floating';
  /** Field spacing */
  field_spacing?: 'compact' | 'normal' | 'comfortable';
}

/**
 * Form section
 */
export interface FormSection {
  /** Section ID */
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
  /** Section layout */
  layout?: 'single_column' | 'two_column' | 'grid';
  /** Number of columns for grid layout */
  columns?: number;
}

/**
 * Chart view configuration
 */
export interface ChartViewConfig {
  /** Chart type */
  chart_type: ChartType;
  /** X-axis field */
  x_axis?: string;
  /** Y-axis field(s) */
  y_axis?: string[];
  /** Series field for grouping */
  series?: string;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Chart options */
  options?: ChartOptions;
  /** Data aggregation */
  aggregation?: ChartAggregation;
}

/**
 * Chart options
 */
export interface ChartOptions {
  /** Chart width */
  width?: number | string;
  /** Chart height */
  height?: number | string;
  /** Chart colors */
  colors?: string[];
  /** Whether to show legend */
  show_legend?: boolean;
  /** Legend position */
  legend_position?: 'top' | 'bottom' | 'left' | 'right';
  /** Whether to show grid */
  show_grid?: boolean;
  /** Whether to show tooltips */
  show_tooltips?: boolean;
  /** Whether to enable zoom */
  enable_zoom?: boolean;
  /** Whether to enable pan */
  enable_pan?: boolean;
  /** Custom chart options */
  custom?: Record<string, unknown>;
}

/**
 * Chart aggregation
 */
export interface ChartAggregation {
  /** Aggregation function */
  function: 'count' | 'sum' | 'avg' | 'min' | 'max' | 'median' | 'mode';
  /** Field to aggregate */
  field?: string;
  /** Group by field */
  group_by?: string;
  /** Time interval for time-based grouping */
  time_interval?: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
}

/**
 * Card view configuration
 */
export interface CardViewConfig {
  /** Card template */
  template: CardTemplate;
  /** Cards per row */
  cards_per_row?: number;
  /** Card spacing */
  spacing?: 'compact' | 'normal' | 'comfortable';
  /** Card size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show card borders */
  show_borders?: boolean;
  /** Whether to show card shadows */
  show_shadows?: boolean;
}

/**
 * Card template
 */
export interface CardTemplate {
  /** Card title field */
  title_field?: string;
  /** Card subtitle field */
  subtitle_field?: string;
  /** Card description field */
  description_field?: string;
  /** Card image field */
  image_field?: string;
  /** Additional fields to display */
  fields?: CardField[];
  /** Card actions */
  actions?: CardAction[];
}

/**
 * Card field
 */
export interface CardField {
  /** Field ID */
  field_id: string;
  /** Field label */
  label?: string;
  /** Field format */
  format?: ColumnFormat;
  /** Field position */
  position?: 'header' | 'body' | 'footer';
}

/**
 * Card action
 */
export interface CardAction {
  /** Action ID */
  id: string;
  /** Action label */
  label: string;
  /** Action icon */
  icon?: string;
  /** Action type */
  type: 'button' | 'link' | 'dropdown';
  /** Action URL or function */
  action: string;
  /** Action style */
  style?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

/**
 * List view configuration
 */
export interface ListViewConfig {
  /** List item template */
  template: ListTemplate;
  /** List item spacing */
  spacing?: 'compact' | 'normal' | 'comfortable';
  /** Whether to show dividers */
  show_dividers?: boolean;
  /** Whether to enable item selection */
  item_selection?: boolean;
  /** Whether to show item numbers */
  show_numbers?: boolean;
}

/**
 * List template
 */
export interface ListTemplate {
  /** Primary text field */
  primary_text?: string;
  /** Secondary text field */
  secondary_text?: string;
  /** Tertiary text field */
  tertiary_text?: string;
  /** Avatar/image field */
  avatar_field?: string;
  /** Icon field */
  icon_field?: string;
  /** Badge field */
  badge_field?: string;
  /** Additional metadata fields */
  metadata?: string[];
}

/**
 * Grid view configuration
 */
export interface GridViewConfig {
  /** Grid item template */
  template: GridTemplate;
  /** Number of columns */
  columns?: number;
  /** Grid item aspect ratio */
  aspect_ratio?: string;
  /** Grid spacing */
  spacing?: number;
  /** Whether to enable masonry layout */
  masonry?: boolean;
}

/**
 * Grid template
 */
export interface GridTemplate {
  /** Image field */
  image_field?: string;
  /** Title field */
  title_field?: string;
  /** Subtitle field */
  subtitle_field?: string;
  /** Description field */
  description_field?: string;
  /** Overlay fields */
  overlay_fields?: string[];
}

/**
 * Calendar view configuration
 */
export interface CalendarViewConfig {
  /** Date field */
  date_field: string;
  /** End date field (for events with duration) */
  end_date_field?: string;
  /** Title field */
  title_field?: string;
  /** Description field */
  description_field?: string;
  /** Color field */
  color_field?: string;
  /** Calendar type */
  calendar_type?: 'month' | 'week' | 'day' | 'agenda';
  /** Whether to show weekends */
  show_weekends?: boolean;
  /** First day of week */
  first_day_of_week?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Time format */
  time_format?: '12h' | '24h';
}

/**
 * Kanban view configuration
 */
export interface KanbanViewConfig {
  /** Status field for columns */
  status_field: string;
  /** Card template */
  card_template: KanbanCardTemplate;
  /** Column configuration */
  columns?: KanbanColumn[];
  /** Whether to allow drag and drop */
  drag_and_drop?: boolean;
  /** Whether to show column counts */
  show_counts?: boolean;
  /** Whether to allow adding new columns */
  allow_new_columns?: boolean;
}

/**
 * Kanban card template
 */
export interface KanbanCardTemplate {
  /** Title field */
  title_field?: string;
  /** Description field */
  description_field?: string;
  /** Assignee field */
  assignee_field?: string;
  /** Due date field */
  due_date_field?: string;
  /** Priority field */
  priority_field?: string;
  /** Tags field */
  tags_field?: string;
  /** Additional fields */
  fields?: string[];
}

/**
 * Kanban column
 */
export interface KanbanColumn {
  /** Column ID */
  id: string;
  /** Column title */
  title: string;
  /** Column color */
  color?: string;
  /** Column limit */
  limit?: number;
  /** Whether the column is collapsed */
  collapsed?: boolean;
}

/**
 * Timeline view configuration
 */
export interface TimelineViewConfig {
  /** Date field */
  date_field: string;
  /** Title field */
  title_field?: string;
  /** Description field */
  description_field?: string;
  /** Category field for grouping */
  category_field?: string;
  /** Timeline orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Whether to show dates */
  show_dates?: boolean;
  /** Date format */
  date_format?: string;
  /** Whether to group by category */
  group_by_category?: boolean;
}

/**
 * Map view configuration
 */
export interface MapViewConfig {
  /** Location field (lat/lng or address) */
  location_field: string;
  /** Title field for markers */
  title_field?: string;
  /** Description field for markers */
  description_field?: string;
  /** Map type */
  map_type?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  /** Default zoom level */
  zoom?: number;
  /** Default center coordinates */
  center?: { lat: number; lng: number };
  /** Whether to show clustering */
  clustering?: boolean;
  /** Marker style */
  marker_style?: MarkerStyle;
}

/**
 * Map marker style
 */
export interface MarkerStyle {
  /** Marker color */
  color?: string;
  /** Marker icon */
  icon?: string;
  /** Marker size */
  size?: 'small' | 'medium' | 'large';
  /** Custom marker image */
  custom_icon?: string;
}

/**
 * View permissions
 */
export interface ViewPermissions {
  /** Default permission level */
  default?: PermissionLevel;
  /** Role-based permissions */
  roles?: Record<string, PermissionLevel>;
  /** User-specific permissions */
  users?: Record<string, PermissionLevel>;
  /** Whether the view is public */
  public?: boolean;
}

/**
 * View filter
 */
export interface ViewFilter {
  /** Filter ID */
  id: string;
  /** Field to filter */
  field_id: string;
  /** Filter operator */
  operator: FilterOperator;
  /** Filter value */
  value: unknown;
  /** Filter condition (AND/OR) */
  condition?: 'AND' | 'OR';
  /** Whether the filter is enabled */
  enabled?: boolean;
}

/**
 * Filter operators
 */
export type FilterOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'ends_with'
  | 'greater_than'
  | 'greater_than_or_equal'
  | 'less_than'
  | 'less_than_or_equal'
  | 'between'
  | 'not_between'
  | 'in'
  | 'not_in'
  | 'is_null'
  | 'is_not_null'
  | 'is_empty'
  | 'is_not_empty';

/**
 * View sorting
 */
export interface ViewSort {
  /** Field to sort by */
  field_id: string;
  /** Sort direction */
  direction: 'asc' | 'desc';
  /** Sort priority (for multi-column sorting) */
  priority?: number;
}

/**
 * View grouping
 */
export interface ViewGrouping {
  /** Field to group by */
  field_id: string;
  /** Grouping direction */
  direction?: 'asc' | 'desc';
  /** Whether to show group headers */
  show_headers?: boolean;
  /** Whether to show group counts */
  show_counts?: boolean;
  /** Whether groups are collapsible */
  collapsible?: boolean;
}

/**
 * View aggregation
 */
export interface ViewAggregation {
  /** Aggregation ID */
  id: string;
  /** Field to aggregate */
  field_id: string;
  /** Aggregation function */
  function: 'count' | 'sum' | 'avg' | 'min' | 'max' | 'median' | 'mode';
  /** Aggregation label */
  label?: string;
  /** Where to display the aggregation */
  display?: 'footer' | 'header' | 'both';
}

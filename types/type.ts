/**
 * Core data types supported by the system
 * These represent the fundamental data types that can be stored and manipulated
 */
export enum DataType {
  /** Text string data */
  STRING = 'string',
  /** Numeric data (integer or float) */
  NUMBER = 'number',
  /** Boolean true/false values */
  BOOLEAN = 'boolean',
  /** Date and time values */
  DATE = 'date',
  /** Date only values */
  DATE_ONLY = 'date_only',
  /** Time only values */
  TIME = 'time',
  /** JSON object data */
  OBJECT = 'object',
  /** Array of values */
  ARRAY = 'array',
  /** Binary data/files */
  BINARY = 'binary',
  /** UUID values */
  UUID = 'uuid',
  /** Email addresses */
  EMAIL = 'email',
  /** URL values */
  URL = 'url',
  /** Phone numbers */
  PHONE = 'phone',
  /** Rich text/HTML content */
  RICH_TEXT = 'rich_text',
  /** Markdown content */
  MARKDOWN = 'markdown',
  /** JSON data */
  JSON = 'json',
  /** Geographic coordinates */
  GEOLOCATION = 'geolocation',
  /** Color values */
  COLOR = 'color',
  /** Encrypted data */
  ENCRYPTED = 'encrypted',
}

/**
 * HTTP methods for API operations
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

/**
 * View types for displaying data
 */
export enum ViewType {
  /** Tabular data display */
  TABLE = 'table',
  /** Form for data entry */
  FORM = 'form',
  /** Chart/graph visualization */
  CHART = 'chart',
  /** Card-based layout */
  CARD = 'card',
  /** List view */
  LIST = 'list',
  /** Grid layout */
  GRID = 'grid',
  /** Calendar view */
  CALENDAR = 'calendar',
  /** Kanban board */
  KANBAN = 'kanban',
  /** Timeline view */
  TIMELINE = 'timeline',
  /** Map view */
  MAP = 'map',
}

/**
 * Field input types for forms and data entry
 */
export enum FieldInputType {
  /** Single-line text input */
  TEXT = 'text',
  /** Multi-line text area */
  TEXTAREA = 'textarea',
  /** Number input */
  NUMBER = 'number',
  /** Email input */
  EMAIL = 'email',
  /** Password input */
  PASSWORD = 'password',
  /** URL input */
  URL = 'url',
  /** Phone number input */
  PHONE = 'phone',
  /** Date picker */
  DATE = 'date',
  /** Date and time picker */
  DATETIME = 'datetime',
  /** Time picker */
  TIME = 'time',
  /** Checkbox */
  CHECKBOX = 'checkbox',
  /** Radio buttons */
  RADIO = 'radio',
  /** Select dropdown */
  SELECT = 'select',
  /** Multi-select */
  MULTISELECT = 'multiselect',
  /** File upload */
  FILE = 'file',
  /** Image upload */
  IMAGE = 'image',
  /** Rich text editor */
  RICH_TEXT = 'rich_text',
  /** Markdown editor */
  MARKDOWN = 'markdown',
  /** JSON editor */
  JSON = 'json',
  /** Color picker */
  COLOR = 'color',
  /** Range slider */
  RANGE = 'range',
  /** Switch/toggle */
  SWITCH = 'switch',
  /** Tags input */
  TAGS = 'tags',
  /** Geolocation picker */
  GEOLOCATION = 'geolocation',
  /** Rating input */
  RATING = 'rating',
  /** Code editor */
  CODE = 'code',
}

/**
 * Chart types for data visualization
 */
export enum ChartType {
  /** Line chart */
  LINE = 'line',
  /** Bar chart */
  BAR = 'bar',
  /** Pie chart */
  PIE = 'pie',
  /** Doughnut chart */
  DOUGHNUT = 'doughnut',
  /** Area chart */
  AREA = 'area',
  /** Scatter plot */
  SCATTER = 'scatter',
  /** Histogram */
  HISTOGRAM = 'histogram',
  /** Heatmap */
  HEATMAP = 'heatmap',
  /** Gauge chart */
  GAUGE = 'gauge',
  /** Funnel chart */
  FUNNEL = 'funnel',
}

/**
 * Relationship types between entities
 */
export enum RelationshipType {
  /** One-to-one relationship */
  ONE_TO_ONE = 'one_to_one',
  /** One-to-many relationship */
  ONE_TO_MANY = 'one_to_many',
  /** Many-to-one relationship */
  MANY_TO_ONE = 'many_to_one',
  /** Many-to-many relationship */
  MANY_TO_MANY = 'many_to_many',
}

/**
 * Permission levels for access control
 */
export enum PermissionLevel {
  /** No access */
  NONE = 'none',
  /** Read-only access */
  READ = 'read',
  /** Read and write access */
  WRITE = 'write',
  /** Full administrative access */
  ADMIN = 'admin',
}

/**
 * Validation rule types
 */
export enum ValidationType {
  /** Required field validation */
  REQUIRED = 'required',
  /** Minimum length validation */
  MIN_LENGTH = 'min_length',
  /** Maximum length validation */
  MAX_LENGTH = 'max_length',
  /** Minimum value validation */
  MIN_VALUE = 'min_value',
  /** Maximum value validation */
  MAX_VALUE = 'max_value',
  /** Regular expression pattern validation */
  PATTERN = 'pattern',
  /** Email format validation */
  EMAIL = 'email',
  /** URL format validation */
  URL = 'url',
  /** Phone number format validation */
  PHONE = 'phone',
  /** Custom validation function */
  CUSTOM = 'custom',
  /** Unique value validation */
  UNIQUE = 'unique',
  /** Foreign key validation */
  FOREIGN_KEY = 'foreign_key',
}

import { AuditableDocument, SoftDeletable, ValidationResult } from './shared';
import { PermissionLevel } from './type';

/**
 * Template Builder System Types
 *
 * This module defines types for a comprehensive drag-and-drop template builder
 * that supports landing pages, email templates, forms, dashboards, and reports.
 *
 * Architecture follows component tree structure with JSON serialization,
 * responsive design support, and data binding capabilities.
 */

/**
 * Template definition - the root container for all builder content
 */
export interface Template extends AuditableDocument, SoftDeletable {
  /** Template name */
  name: string;
  /** Template display title */
  title: string;
  /** Template description */
  description?: string;
  /** Template type */
  type: TemplateType;
  /** Template category for organization */
  category?: string;
  /** Template tags */
  tags?: string[];
  /** Root component tree */
  root_component: Component;
  /** Template configuration */
  config: TemplateConfig;
  /** Template permissions */
  permissions?: TemplatePermissions;
  /** Template validation results */
  validation?: ValidationResult;
  /** Whether template is published */
  published?: boolean;
  /** Template version */
  template_version?: string;
  /** Preview image URL */
  preview_image?: string;
}

/**
 * Template types supported by the builder
 */
export enum TemplateType {
  /** Landing page template */
  LANDING_PAGE = 'landing_page',
  /** Email template */
  EMAIL = 'email',
  /** Form layout template */
  FORM = 'form',
  /** Dashboard layout template */
  DASHBOARD = 'dashboard',
  /** Report template */
  REPORT = 'report',
  /** Blog post template */
  BLOG_POST = 'blog_post',
  /** Product page template */
  PRODUCT_PAGE = 'product_page',
  /** Custom template */
  CUSTOM = 'custom',
}

/**
 * Template configuration
 */
export interface TemplateConfig {
  /** Canvas settings */
  canvas: CanvasConfig;
  /** Responsive breakpoints */
  breakpoints: ResponsiveBreakpoints;
  /** Global styles */
  global_styles?: GlobalStyles;
  /** Data sources */
  data_sources?: DataSource[];
  /** SEO settings */
  seo?: SeoConfig;
  /** Performance settings */
  performance?: PerformanceConfig;
}

/**
 * Canvas configuration
 */
export interface CanvasConfig {
  /** Canvas width */
  width: number | 'auto';
  /** Canvas height */
  height: number | 'auto';
  /** Background settings */
  background?: BackgroundConfig;
  /** Canvas padding */
  padding?: SpacingConfig;
  /** Canvas margin */
  margin?: SpacingConfig;
  /** Grid settings */
  grid?: GridConfig;
}

/**
 * Responsive breakpoints configuration
 */
export interface ResponsiveBreakpoints {
  /** Mobile breakpoint */
  mobile: number;
  /** Tablet breakpoint */
  tablet: number;
  /** Desktop breakpoint */
  desktop: number;
  /** Large desktop breakpoint */
  large_desktop?: number;
  /** Custom breakpoints */
  custom?: Record<string, number>;
}

/**
 * Global styles configuration
 */
export interface GlobalStyles {
  /** Typography settings */
  typography?: TypographyConfig;
  /** Color palette */
  colors?: ColorPalette;
  /** Spacing scale */
  spacing?: SpacingScale;
  /** Border radius scale */
  border_radius?: BorderRadiusScale;
  /** Shadow presets */
  shadows?: ShadowPresets;
  /** Custom CSS variables */
  css_variables?: Record<string, string>;
}

/**
 * Component - the building block of templates
 */
export interface Component {
  /** Unique component ID */
  id: string;
  /** Component type */
  type: ComponentType;
  /** Component name/label */
  name?: string;
  /** Component properties */
  props: ComponentProps;
  /** Component styling */
  styles: ComponentStyles;
  /** Child components */
  children?: Component[];
  /** Component data binding */
  data_binding?: DataBinding;
  /** Component conditions */
  conditions?: ComponentCondition[];
  /** Component animations */
  animations?: ComponentAnimation[];
  /** Component events */
  events?: ComponentEvent[];
  /** Whether component is locked */
  locked?: boolean;
  /** Whether component is hidden */
  hidden?: boolean;
}

/**
 * Component types available in the builder
 */
export enum ComponentType {
  // Layout components
  CONTAINER = 'container',
  ROW = 'row',
  COLUMN = 'column',
  GRID = 'grid',
  FLEX = 'flex',

  // Content components
  TEXT = 'text',
  HEADING = 'heading',
  PARAGRAPH = 'paragraph',
  IMAGE = 'image',
  VIDEO = 'video',
  ICON = 'icon',

  // Interactive components
  BUTTON = 'button',
  LINK = 'link',
  FORM = 'form',
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',

  // Data components
  TABLE = 'table',
  LIST = 'list',
  CHART = 'chart',
  METRIC = 'metric',

  // Media components
  GALLERY = 'gallery',
  CAROUSEL = 'carousel',
  SLIDER = 'slider',

  // Navigation components
  NAVBAR = 'navbar',
  MENU = 'menu',
  BREADCRUMB = 'breadcrumb',
  PAGINATION = 'pagination',

  // Advanced components
  MAP = 'map',
  CALENDAR = 'calendar',
  TIMELINE = 'timeline',
  ACCORDION = 'accordion',
  TABS = 'tabs',
  MODAL = 'modal',

  // Custom components
  CUSTOM = 'custom',
  WIDGET = 'widget',
}

/**
 * Component properties - varies by component type
 */
export type ComponentProps = Record<string, unknown>;

/**
 * Component styling with responsive support
 */
export interface ComponentStyles {
  /** Default styles */
  default: StyleProperties;
  /** Responsive styles */
  responsive?: Record<string, StyleProperties>;
  /** Hover styles */
  hover?: StyleProperties;
  /** Active styles */
  active?: StyleProperties;
  /** Focus styles */
  focus?: StyleProperties;
  /** Custom CSS classes */
  css_classes?: string[];
  /** Custom CSS */
  custom_css?: string;
}

/**
 * Style properties
 */
export interface StyleProperties {
  // Layout
  display?: string;
  position?: string;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  width?: string | number;
  height?: string | number;
  min_width?: string | number;
  max_width?: string | number;
  min_height?: string | number;
  max_height?: string | number;

  // Flexbox
  flex_direction?: string;
  justify_content?: string;
  align_items?: string;
  flex_wrap?: string;
  flex_grow?: number;
  flex_shrink?: number;
  flex_basis?: string | number;

  // Grid
  grid_template_columns?: string;
  grid_template_rows?: string;
  grid_gap?: string | number;
  grid_column?: string;
  grid_row?: string;

  // Spacing
  margin?: SpacingConfig;
  padding?: SpacingConfig;

  // Typography
  font_family?: string;
  font_size?: string | number;
  font_weight?: string | number;
  line_height?: string | number;
  text_align?: string;
  text_decoration?: string;
  text_transform?: string;
  letter_spacing?: string | number;

  // Colors
  color?: string;
  background_color?: string;
  background_image?: string;
  background_size?: string;
  background_position?: string;
  background_repeat?: string;

  // Borders
  border?: string;
  border_radius?: string | number;
  border_width?: string | number;
  border_style?: string;
  border_color?: string;

  // Effects
  box_shadow?: string;
  opacity?: number;
  transform?: string;
  transition?: string;
  filter?: string;

  // Overflow
  overflow?: string;
  overflow_x?: string;
  overflow_y?: string;

  // Z-index
  z_index?: number;

  // Custom properties
  [key: string]: unknown;
}

/**
 * Spacing configuration
 */
export interface SpacingConfig {
  /** Top spacing */
  top?: string | number;
  /** Right spacing */
  right?: string | number;
  /** Bottom spacing */
  bottom?: string | number;
  /** Left spacing */
  left?: string | number;
  /** All sides (shorthand) */
  all?: string | number;
}

/**
 * Background configuration
 */
export interface BackgroundConfig {
  /** Background color */
  color?: string;
  /** Background image */
  image?: string;
  /** Background size */
  size?: 'cover' | 'contain' | 'auto' | string;
  /** Background position */
  position?: string;
  /** Background repeat */
  repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
  /** Background attachment */
  attachment?: 'scroll' | 'fixed' | 'local';
  /** Gradient */
  gradient?: GradientConfig;
}

/**
 * Gradient configuration
 */
export interface GradientConfig {
  /** Gradient type */
  type: 'linear' | 'radial' | 'conic';
  /** Gradient direction (for linear) */
  direction?: string;
  /** Gradient stops */
  stops: GradientStop[];
}

/**
 * Gradient stop
 */
export interface GradientStop {
  /** Color */
  color: string;
  /** Position (0-100%) */
  position: number;
}

/**
 * Grid configuration
 */
export interface GridConfig {
  /** Whether to show grid */
  enabled?: boolean;
  /** Grid size */
  size?: number;
  /** Grid color */
  color?: string;
  /** Grid opacity */
  opacity?: number;
  /** Snap to grid */
  snap?: boolean;
}

/**
 * Typography configuration
 */
export interface TypographyConfig {
  /** Font families */
  font_families?: FontFamily[];
  /** Font sizes */
  font_sizes?: FontSizeScale;
  /** Font weights */
  font_weights?: FontWeightScale;
  /** Line heights */
  line_heights?: LineHeightScale;
  /** Letter spacings */
  letter_spacings?: LetterSpacingScale;
}

/**
 * Font family definition
 */
export interface FontFamily {
  /** Font name */
  name: string;
  /** Font family CSS value */
  value: string;
  /** Font source (web font URL) */
  source?: string;
  /** Font weights available */
  weights?: number[];
}

/**
 * Font size scale
 */
export interface FontSizeScale {
  /** Extra small */
  xs?: string | number;
  /** Small */
  sm?: string | number;
  /** Medium */
  md?: string | number;
  /** Large */
  lg?: string | number;
  /** Extra large */
  xl?: string | number;
  /** 2x large */
  '2xl'?: string | number;
  /** 3x large */
  '3xl'?: string | number;
  /** Custom sizes */
  [key: string]: string | number | undefined;
}

/**
 * Font weight scale
 */
export interface FontWeightScale {
  /** Thin */
  thin?: number;
  /** Light */
  light?: number;
  /** Normal */
  normal?: number;
  /** Medium */
  medium?: number;
  /** Semibold */
  semibold?: number;
  /** Bold */
  bold?: number;
  /** Extra bold */
  extrabold?: number;
  /** Black */
  black?: number;
}

/**
 * Line height scale
 */
export interface LineHeightScale {
  /** Tight */
  tight?: string | number;
  /** Normal */
  normal?: string | number;
  /** Relaxed */
  relaxed?: string | number;
  /** Loose */
  loose?: string | number;
  /** Custom line heights */
  [key: string]: string | number | undefined;
}

/**
 * Letter spacing scale
 */
export interface LetterSpacingScale {
  /** Tight */
  tight?: string | number;
  /** Normal */
  normal?: string | number;
  /** Wide */
  wide?: string | number;
  /** Wider */
  wider?: string | number;
  /** Widest */
  widest?: string | number;
}

/**
 * Color palette
 */
export interface ColorPalette {
  /** Primary colors */
  primary?: ColorShades;
  /** Secondary colors */
  secondary?: ColorShades;
  /** Accent colors */
  accent?: ColorShades;
  /** Neutral colors */
  neutral?: ColorShades;
  /** Success colors */
  success?: ColorShades;
  /** Warning colors */
  warning?: ColorShades;
  /** Error colors */
  error?: ColorShades;
  /** Info colors */
  info?: ColorShades;
  /** Custom color groups */
  [key: string]: ColorShades | undefined;
}

/**
 * Color shades
 */
export interface ColorShades {
  /** Lightest shade */
  50?: string;
  /** Light shade */
  100?: string;
  /** Light-medium shade */
  200?: string;
  /** Medium-light shade */
  300?: string;
  /** Medium shade */
  400?: string;
  /** Base shade */
  500?: string;
  /** Medium-dark shade */
  600?: string;
  /** Dark-medium shade */
  700?: string;
  /** Dark shade */
  800?: string;
  /** Darkest shade */
  900?: string;
  /** Custom shades */
  [key: string]: string | undefined;
}

/**
 * Spacing scale
 */
export interface SpacingScale {
  /** Extra small */
  xs?: string | number;
  /** Small */
  sm?: string | number;
  /** Medium */
  md?: string | number;
  /** Large */
  lg?: string | number;
  /** Extra large */
  xl?: string | number;
  /** 2x large */
  '2xl'?: string | number;
  /** 3x large */
  '3xl'?: string | number;
  /** Custom spacings */
  [key: string]: string | number | undefined;
}

/**
 * Border radius scale
 */
export interface BorderRadiusScale {
  /** None */
  none?: string | number;
  /** Small */
  sm?: string | number;
  /** Medium */
  md?: string | number;
  /** Large */
  lg?: string | number;
  /** Extra large */
  xl?: string | number;
  /** Full */
  full?: string | number;
  /** Custom radius */
  [key: string]: string | number | undefined;
}

/**
 * Shadow presets
 */
export interface ShadowPresets {
  /** Small shadow */
  sm?: string;
  /** Medium shadow */
  md?: string;
  /** Large shadow */
  lg?: string;
  /** Extra large shadow */
  xl?: string;
  /** 2x large shadow */
  '2xl'?: string;
  /** Inner shadow */
  inner?: string;
  /** Custom shadows */
  [key: string]: string | undefined;
}

/**
 * Data source configuration
 */
export interface DataSource {
  /** Data source ID */
  id: string;
  /** Data source name */
  name: string;
  /** Data source type */
  type: 'static' | 'api' | 'database' | 'file' | 'form';
  /** Data source configuration */
  config: DataSourceConfig;
  /** Data transformation */
  transform?: DataTransform;
  /** Cache settings */
  cache?: CacheConfig;
}

/**
 * Data source configuration
 */
export type DataSourceConfig =
  | StaticDataConfig
  | ApiDataConfig
  | DatabaseDataConfig
  | FileDataConfig
  | FormDataConfig;

/**
 * Static data configuration
 */
export interface StaticDataConfig {
  /** Static data */
  data: unknown;
}

/**
 * API data configuration
 */
export interface ApiDataConfig {
  /** API endpoint */
  endpoint: string;
  /** HTTP method */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** Request headers */
  headers?: Record<string, string>;
  /** Request body */
  body?: unknown;
  /** Authentication */
  auth?: ApiAuth;
}

/**
 * API authentication
 */
export interface ApiAuth {
  /** Auth type */
  type: 'none' | 'basic' | 'bearer' | 'api_key';
  /** Auth credentials */
  credentials?: Record<string, string>;
}

/**
 * Database data configuration
 */
export interface DatabaseDataConfig {
  /** Database connection */
  connection: string;
  /** SQL query */
  query: string;
  /** Query parameters */
  parameters?: Record<string, unknown>;
}

/**
 * File data configuration
 */
export interface FileDataConfig {
  /** File URL */
  url: string;
  /** File format */
  format: 'json' | 'csv' | 'xml' | 'yaml';
  /** File options */
  options?: Record<string, unknown>;
}

/**
 * Form data configuration
 */
export interface FormDataConfig {
  /** Form ID */
  form_id: string;
  /** Field mappings */
  field_mappings?: Record<string, string>;
}

/**
 * Data transformation
 */
export interface DataTransform {
  /** Transform operations */
  operations: TransformOperation[];
}

/**
 * Transform operation
 */
export interface TransformOperation {
  /** Operation type */
  type: 'filter' | 'map' | 'sort' | 'group' | 'aggregate';
  /** Operation configuration */
  config: Record<string, unknown>;
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  /** Cache enabled */
  enabled: boolean;
  /** Cache TTL in seconds */
  ttl?: number;
  /** Cache key */
  key?: string;
}

/**
 * SEO configuration
 */
export interface SeoConfig {
  /** Page title */
  title?: string;
  /** Meta description */
  description?: string;
  /** Meta keywords */
  keywords?: string[];
  /** Open Graph settings */
  og?: OpenGraphConfig;
  /** Twitter Card settings */
  twitter?: TwitterCardConfig;
  /** Canonical URL */
  canonical?: string;
  /** Robots meta */
  robots?: string;
}

/**
 * Open Graph configuration
 */
export interface OpenGraphConfig {
  /** OG title */
  title?: string;
  /** OG description */
  description?: string;
  /** OG image */
  image?: string;
  /** OG type */
  type?: string;
  /** OG URL */
  url?: string;
}

/**
 * Twitter Card configuration
 */
export interface TwitterCardConfig {
  /** Card type */
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Twitter title */
  title?: string;
  /** Twitter description */
  description?: string;
  /** Twitter image */
  image?: string;
  /** Twitter site */
  site?: string;
  /** Twitter creator */
  creator?: string;
}

/**
 * Performance configuration
 */
export interface PerformanceConfig {
  /** Lazy loading */
  lazy_loading?: boolean;
  /** Image optimization */
  image_optimization?: ImageOptimizationConfig;
  /** Code splitting */
  code_splitting?: boolean;
  /** Minification */
  minification?: boolean;
  /** Compression */
  compression?: CompressionConfig;
}

/**
 * Image optimization configuration
 */
export interface ImageOptimizationConfig {
  /** Auto WebP conversion */
  webp?: boolean;
  /** Quality settings */
  quality?: number;
  /** Responsive images */
  responsive?: boolean;
  /** Placeholder strategy */
  placeholder?: 'blur' | 'empty' | 'data_url';
}

/**
 * Compression configuration
 */
export interface CompressionConfig {
  /** Gzip compression */
  gzip?: boolean;
  /** Brotli compression */
  brotli?: boolean;
  /** Compression level */
  level?: number;
}

/**
 * Data binding configuration
 */
export interface DataBinding {
  /** Data source ID */
  source_id: string;
  /** Data path */
  path: string;
  /** Binding type */
  type: 'text' | 'html' | 'attribute' | 'style' | 'class' | 'src' | 'href';
  /** Target property */
  target?: string;
  /** Data formatter */
  formatter?: DataFormatter;
  /** Fallback value */
  fallback?: unknown;
}

/**
 * Data formatter
 */
export interface DataFormatter {
  /** Formatter type */
  type: 'date' | 'number' | 'currency' | 'percentage' | 'text' | 'custom';
  /** Formatter options */
  options?: Record<string, unknown>;
  /** Custom formatter function */
  custom_function?: string;
}

/**
 * Component condition
 */
export interface ComponentCondition {
  /** Condition ID */
  id: string;
  /** Condition expression */
  expression: string;
  /** Action when true */
  action_true: ConditionAction;
  /** Action when false */
  action_false?: ConditionAction;
}

/**
 * Condition action
 */
export interface ConditionAction {
  /** Action type */
  type: 'show' | 'hide' | 'enable' | 'disable' | 'style' | 'class';
  /** Action value */
  value?: unknown;
}

/**
 * Component animation
 */
export interface ComponentAnimation {
  /** Animation ID */
  id: string;
  /** Animation type */
  type: 'entrance' | 'exit' | 'emphasis' | 'motion_path';
  /** Animation name */
  name: string;
  /** Animation duration */
  duration?: number;
  /** Animation delay */
  delay?: number;
  /** Animation easing */
  easing?: string;
  /** Animation trigger */
  trigger: AnimationTrigger;
  /** Animation options */
  options?: Record<string, unknown>;
}

/**
 * Animation trigger
 */
export interface AnimationTrigger {
  /** Trigger type */
  type: 'load' | 'scroll' | 'hover' | 'click' | 'focus' | 'viewport';
  /** Trigger options */
  options?: Record<string, unknown>;
}

/**
 * Component event
 */
export interface ComponentEvent {
  /** Event ID */
  id: string;
  /** Event type */
  type: 'click' | 'hover' | 'focus' | 'blur' | 'change' | 'submit' | 'load';
  /** Event handler */
  handler: EventHandler;
  /** Event options */
  options?: Record<string, unknown>;
}

/**
 * Event handler
 */
export interface EventHandler {
  /** Handler type */
  type:
    | 'navigate'
    | 'submit_form'
    | 'open_modal'
    | 'close_modal'
    | 'scroll_to'
    | 'custom';
  /** Handler configuration */
  config: Record<string, unknown>;
}

/**
 * Template permissions
 */
export interface TemplatePermissions {
  /** Default permission level */
  default?: PermissionLevel;
  /** Role-based permissions */
  roles?: Record<string, TemplatePermissionLevel>;
  /** User-specific permissions */
  users?: Record<string, TemplatePermissionLevel>;
  /** Whether template is public */
  public?: boolean;
}

/**
 * Template permission level
 */
export interface TemplatePermissionLevel {
  /** Can view template */
  view?: boolean;
  /** Can edit template */
  edit?: boolean;
  /** Can duplicate template */
  duplicate?: boolean;
  /** Can delete template */
  delete?: boolean;
  /** Can publish template */
  publish?: boolean;
  /** Can share template */
  share?: boolean;
}

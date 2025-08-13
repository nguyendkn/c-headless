/**
 * Base document interface that all entities extend from
 * Provides common fields for tracking, versioning, and metadata
 */
export interface Document {
  /** Unique identifier for the document */
  id: string;
  /** ISO 8601 timestamp when the document was created */
  created_at: string;
  /** ISO 8601 timestamp when the document was last updated */
  updated_at: string;
  /** Version number for optimistic locking and change tracking */
  version: number;
  /** Optional metadata for additional context */
  metadata?: Record<string, unknown>;
}

/**
 * Audit information for tracking who made changes
 */
export interface AuditInfo {
  /** User ID who created the document */
  created_by?: string;
  /** User ID who last updated the document */
  updated_by?: string;
  /** IP address of the client that made the change */
  client_ip?: string;
  /** User agent string of the client */
  user_agent?: string;
}

/**
 * Extended document with audit information
 */
export interface AuditableDocument extends Document {
  audit: AuditInfo;
}

/**
 * Soft delete capability
 */
export interface SoftDeletable {
  /** ISO 8601 timestamp when the document was deleted, null if not deleted */
  deleted_at?: string | null;
  /** User ID who deleted the document */
  deleted_by?: string;
}

/**
 * Publishable content with draft/published states
 */
export interface Publishable {
  /** Current publication status */
  status: 'draft' | 'published' | 'archived';
  /** ISO 8601 timestamp when the document was published */
  published_at?: string | null;
  /** User ID who published the document */
  published_by?: string;
}

/**
 * Localization support
 */
export interface Localizable {
  /** Language/locale code (e.g., 'en', 'vi', 'en-US') */
  locale: string;
  /** Reference to the original document if this is a translation */
  original_id?: string;
}

/**
 * Common validation result structure
 */
export interface ValidationResult {
  /** Whether the validation passed */
  valid: boolean;
  /** Array of validation error messages */
  errors: string[];
  /** Array of validation warning messages */
  warnings?: string[];
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
  /** Whether the request was successful */
  success: boolean;
  /** Response data */
  data?: T;
  /** Error message if request failed */
  error?: string;
  /** Additional metadata about the response */
  meta?: {
    /** Total count for paginated responses */
    total?: number;
    /** Current page number */
    page?: number;
    /** Number of items per page */
    limit?: number;
    /** Whether there are more pages */
    has_more?: boolean;
  };
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  /** Page number (1-based) */
  page?: number;
  /** Number of items per page */
  limit?: number;
  /** Field to sort by */
  sort_by?: string;
  /** Sort direction */
  sort_order?: 'asc' | 'desc';
}

/**
 * Search and filter parameters
 */
export interface SearchParams extends PaginationParams {
  /** Search query string */
  query?: string;
  /** Fields to search in */
  search_fields?: string[];
  /** Additional filters */
  filters?: Record<string, unknown>;
}

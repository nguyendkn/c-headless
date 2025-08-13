import { DataType } from './type';

import {
  AuditableDocument,
  Document,
  Localizable,
  SoftDeletable,
  ValidationResult,
} from './shared';

/**
 * Entity represents a data record/instance in a table
 * Contains the actual data values for fields defined in the table schema
 */
export interface Entity extends AuditableDocument, SoftDeletable, Localizable {
  /** Entity name/title (optional, for display purposes) */
  name?: string;
  /** Entity description (optional) */
  description?: string;
  /** Table this entity belongs to */
  table_id: string;
  /** Entity data values */
  data: EntityData;
  /** Entity relationships */
  relationships?: EntityRelationship[];
  /** Entity tags */
  tags?: string[];
  /** Entity permissions */
  permissions?: EntityPermissions;
  /** Entity validation results */
  validation?: ValidationResult;
  /** Entity workflow state */
  workflow_state?: string;
  /** Entity priority */
  priority?: number;
  /** Entity status */
  status?: EntityStatus;
}

/**
 * Entity data - key-value pairs where keys are field IDs
 */
export type EntityData = Record<string, EntityValue>;

/**
 * Entity value types
 */
export type EntityValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined
  | EntityValue[]
  | EntityObject
  | EntityFile
  | EntityLocation
  | EntityReference;

/**
 * Entity object for complex data
 */
export interface EntityObject {
  [key: string]: EntityValue;
}

/**
 * Entity file reference
 */
export interface EntityFile {
  /** File ID */
  id: string;
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** File MIME type */
  type: string;
  /** File URL */
  url: string;
  /** File metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Entity location data
 */
export interface EntityLocation {
  /** Latitude */
  lat: number;
  /** Longitude */
  lng: number;
  /** Address */
  address?: string;
  /** Additional location metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Entity reference to another entity
 */
export interface EntityReference {
  /** Referenced entity ID */
  id: string;
  /** Referenced table ID */
  table_id: string;
  /** Display value */
  display_value?: string;
  /** Reference metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Entity relationship
 */
export interface EntityRelationship {
  /** Relationship ID */
  id: string;
  /** Relationship type */
  type: 'one_to_one' | 'one_to_many' | 'many_to_one' | 'many_to_many';
  /** Related table ID */
  table_id: string;
  /** Related entity IDs */
  entity_ids: string[];
  /** Relationship metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Entity permissions
 */
export interface EntityPermissions {
  /** Who can read this entity */
  read?: string[];
  /** Who can update this entity */
  update?: string[];
  /** Who can delete this entity */
  delete?: string[];
  /** Role-based permissions */
  roles?: Record<string, EntityPermissionLevel>;
  /** Whether the entity is public */
  public?: boolean;
}

/**
 * Entity permission level
 */
export interface EntityPermissionLevel {
  /** Can read the entity */
  read?: boolean;
  /** Can update the entity */
  update?: boolean;
  /** Can delete the entity */
  delete?: boolean;
  /** Can share the entity */
  share?: boolean;
}

/**
 * Entity status
 */
export enum EntityStatus {
  /** Entity is active */
  ACTIVE = 'active',
  /** Entity is inactive */
  INACTIVE = 'inactive',
  /** Entity is pending */
  PENDING = 'pending',
  /** Entity is archived */
  ARCHIVED = 'archived',
  /** Entity is deleted */
  DELETED = 'deleted',
}

/**
 * Entity history record
 */
export interface EntityHistory extends Document {
  /** Entity ID */
  entity_id: string;
  /** Table ID */
  table_id: string;
  /** Change type */
  change_type: 'create' | 'update' | 'delete' | 'restore';
  /** Changed fields */
  changed_fields?: string[];
  /** Previous values */
  previous_values?: EntityData;
  /** New values */
  new_values?: EntityData;
  /** Change reason */
  reason?: string;
  /** User who made the change */
  changed_by: string;
  /** Change timestamp */
  changed_at: string;
}

/**
 * Entity comment
 */
export interface EntityComment extends Document {
  /** Entity ID */
  entity_id: string;
  /** Table ID */
  table_id: string;
  /** Comment content */
  content: string;
  /** Comment author */
  author: string;
  /** Parent comment ID (for replies) */
  parent_id?: string;
  /** Comment mentions */
  mentions?: string[];
  /** Comment attachments */
  attachments?: EntityFile[];
}

/**
 * Entity attachment
 */
export interface EntityAttachment extends Document {
  /** Entity ID */
  entity_id: string;
  /** Table ID */
  table_id: string;
  /** Attachment file */
  file: EntityFile;
  /** Attachment description */
  description?: string;
  /** Attachment category */
  category?: string;
  /** Uploaded by */
  uploaded_by: string;
}

/**
 * Entity activity log
 */
export interface EntityActivity extends Document {
  /** Entity ID */
  entity_id: string;
  /** Table ID */
  table_id: string;
  /** Activity type */
  activity_type: 'view' | 'edit' | 'comment' | 'share' | 'export' | 'print';
  /** Activity description */
  description?: string;
  /** Activity metadata */
  metadata?: Record<string, unknown>;
  /** User who performed the activity */
  user_id: string;
  /** Activity timestamp */
  timestamp: string;
}

/**
 * Entity search result
 */
export interface EntitySearchResult {
  /** Entity */
  entity: Entity;
  /** Search score */
  score: number;
  /** Highlighted fields */
  highlights?: Record<string, string>;
  /** Search metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Entity bulk operation
 */
export interface EntityBulkOperation {
  /** Operation type */
  type: 'create' | 'update' | 'delete' | 'export' | 'import';
  /** Target entities */
  entity_ids?: string[];
  /** Operation data */
  data?: Record<string, unknown>;
  /** Operation options */
  options?: BulkOperationOptions;
}

/**
 * Bulk operation options
 */
export interface BulkOperationOptions {
  /** Whether to validate data */
  validate?: boolean;
  /** Whether to skip errors */
  skip_errors?: boolean;
  /** Batch size */
  batch_size?: number;
  /** Progress callback */
  progress_callback?: string;
}

/**
 * Entity import/export configuration
 */
export interface EntityImportExport {
  /** Format */
  format: 'csv' | 'json' | 'excel' | 'xml';
  /** Field mappings */
  field_mappings?: Record<string, string>;
  /** Import/export options */
  options?: ImportExportOptions;
}

/**
 * Import/export options
 */
export interface ImportExportOptions {
  /** Include headers */
  include_headers?: boolean;
  /** Date format */
  date_format?: string;
  /** Number format */
  number_format?: string;
  /** Encoding */
  encoding?: string;
  /** Delimiter (for CSV) */
  delimiter?: string;
}

export interface Attribute {
  id: string;
  name: string;
  type: DataType;
  required: boolean;
}

export interface Value {
  id: string;
  entityId: string;
  attributeId: string;
  value: string | number | boolean | Date | object | [];
}

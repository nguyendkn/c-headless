-- CreateTable
CREATE TABLE "public"."audit_info" (
    "id" TEXT NOT NULL,
    "created_by" TEXT,
    "updated_by" TEXT,
    "client_ip" TEXT,
    "user_agent" TEXT,

    CONSTRAINT "audit_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "config" JSONB NOT NULL DEFAULT '{}',
    "permissions" JSONB,
    "settings" JSONB,
    "integrations" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tables" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "config" JSONB NOT NULL DEFAULT '{}',
    "permissions" JSONB,
    "display" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "published_by" TEXT,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."table_indexes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fields" TEXT[],
    "unique" BOOLEAN NOT NULL DEFAULT false,
    "partial" BOOLEAN NOT NULL DEFAULT false,
    "condition" TEXT,
    "comment" TEXT,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "table_indexes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."table_relationships" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "related_table" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "local_field" TEXT[],
    "foreign_field" TEXT[],
    "join_table" TEXT,
    "cascade_delete" BOOLEAN NOT NULL DEFAULT false,
    "constraints" JSONB,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "table_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."fields" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "input_type" TEXT,
    "description" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "unique" BOOLEAN NOT NULL DEFAULT false,
    "indexed" BOOLEAN NOT NULL DEFAULT false,
    "default_value" JSONB,
    "validation" JSONB,
    "options" JSONB,
    "relationship" JSONB,
    "constraints" JSONB,
    "display" JSONB,
    "system" BOOLEAN NOT NULL DEFAULT false,
    "encrypted" BOOLEAN NOT NULL DEFAULT false,
    "permissions" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."entities" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "data" JSONB NOT NULL DEFAULT '{}',
    "relationships" JSONB,
    "tags" TEXT[],
    "permissions" JSONB,
    "validation" JSONB,
    "workflow_state" TEXT,
    "priority" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "original_id" TEXT,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."entity_history" (
    "id" TEXT NOT NULL,
    "change_type" TEXT NOT NULL,
    "changed_fields" TEXT[],
    "previous_values" JSONB,
    "new_values" JSONB,
    "reason" TEXT,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "entity_id" TEXT NOT NULL,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "entity_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."entity_comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "parent_id" TEXT,
    "mentions" TEXT[],
    "attachments" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "entity_id" TEXT NOT NULL,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "entity_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."entity_attachments" (
    "id" TEXT NOT NULL,
    "file" JSONB NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "uploaded_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "entity_id" TEXT NOT NULL,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "entity_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."entity_activities" (
    "id" TEXT NOT NULL,
    "activity_type" TEXT NOT NULL,
    "description" TEXT,
    "user_id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "entity_id" TEXT NOT NULL,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "entity_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."views" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "permissions" JSONB,
    "filters" JSONB,
    "sorting" JSONB,
    "grouping" JSONB,
    "aggregations" JSONB,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "project_id" TEXT NOT NULL,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."forms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "method" TEXT NOT NULL,
    "action" TEXT,
    "fields" JSONB NOT NULL DEFAULT '[]',
    "validation" JSONB,
    "layout" JSONB,
    "submission" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "project_id" TEXT NOT NULL,
    "table_id" TEXT,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."filters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "conditions" JSONB NOT NULL DEFAULT '[]',
    "logic" JSONB,
    "default_active" BOOLEAN NOT NULL DEFAULT false,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "project_id" TEXT NOT NULL,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "filters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."filter_presets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "filter" JSONB NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "last_used" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "table_id" TEXT NOT NULL,

    CONSTRAINT "filter_presets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reports" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "tags" TEXT[],
    "data_sources" JSONB NOT NULL DEFAULT '[]',
    "sections" JSONB NOT NULL DEFAULT '[]',
    "parameters" JSONB,
    "filters" JSONB,
    "permissions" JSONB,
    "schedule" JSONB,
    "export_settings" JSONB,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "layout" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "project_id" TEXT NOT NULL,
    "table_id" TEXT,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."features" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "dependencies" TEXT[],
    "permissions" JSONB,
    "settings" JSONB,
    "feature_version" TEXT,
    "author" TEXT,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_models" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "provider" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    "model_version" TEXT,
    "capabilities" JSONB NOT NULL DEFAULT '{}',
    "config" JSONB NOT NULL DEFAULT '{}',
    "pricing" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,

    CONSTRAINT "ai_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_provider_configs" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "config" JSONB NOT NULL DEFAULT '{}',
    "models" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_health_check" TIMESTAMP(3),
    "priority" INTEGER,
    "rate_limit" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,

    CONSTRAINT "ai_provider_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_agents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "capabilities" JSONB NOT NULL DEFAULT '{}',
    "permissions" JSONB,
    "status" TEXT NOT NULL DEFAULT 'active',
    "tags" TEXT[],
    "parent_agent_id" TEXT,
    "child_agents" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "model_id" TEXT NOT NULL,

    CONSTRAINT "ai_agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_workflows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "steps" JSONB NOT NULL DEFAULT '[]',
    "config" JSONB NOT NULL DEFAULT '{}',
    "triggers" JSONB,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "permissions" JSONB,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "model_id" TEXT,
    "agent_id" TEXT,

    CONSTRAINT "ai_workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_prompts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "content" TEXT NOT NULL,
    "variables" JSONB,
    "config" JSONB NOT NULL DEFAULT '{}',
    "permissions" JSONB,
    "tags" TEXT[],
    "usage_stats" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "model_id" TEXT,
    "agent_id" TEXT,

    CONSTRAINT "ai_prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_usage" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "agent_id" TEXT,
    "provider" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tokens" JSONB,
    "request" JSONB,
    "response" JSONB,
    "cost" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,
    "model_id" TEXT NOT NULL,

    CONSTRAINT "ai_usage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cost_budgets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "scope" JSONB NOT NULL,
    "alerts" JSONB,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,

    CONSTRAINT "cost_budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "category" TEXT,
    "tags" TEXT[],
    "root_component" JSONB NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "permissions" JSONB,
    "validation" JSONB,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "template_version" TEXT,
    "preview_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,
    "deleted_at" TIMESTAMP(3),
    "deleted_by" TEXT,

    CONSTRAINT "templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mcp_servers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "endpoint" TEXT NOT NULL,
    "transport" TEXT NOT NULL,
    "capabilities" JSONB NOT NULL DEFAULT '{}',
    "config" JSONB NOT NULL DEFAULT '{}',
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_health_check" TIMESTAMP(3),
    "server_version" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "audit_id" TEXT,

    CONSTRAINT "mcp_servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."system_configs" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "encrypted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,

    CONSTRAINT "system_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."validation_results" (
    "id" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL,
    "errors" TEXT[],
    "warnings" TEXT[],
    "context" TEXT,
    "entity_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,

    CONSTRAINT "validation_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "avatar" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "permissions" TEXT[],
    "system" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_roles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "system" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."api_keys" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key_hash" TEXT NOT NULL,
    "key_prefix" TEXT NOT NULL,
    "permissions" TEXT[],
    "expires_at" TIMESTAMP(3),
    "last_used_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."audit_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resource_id" TEXT,
    "user_id" TEXT,
    "session_id" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "changes" JSONB,
    "old_values" JSONB,
    "new_values" JSONB,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."file_storage" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "stored_name" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "bucket" TEXT,
    "url" TEXT,
    "checksum" TEXT,
    "uploaded_by" TEXT NOT NULL,
    "category" TEXT,
    "tags" TEXT[],
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "file_storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."data_sources" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "credentials" JSONB,
    "status" TEXT NOT NULL DEFAULT 'active',
    "last_sync" TIMESTAMP(3),
    "sync_status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "data_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workflow_executions" (
    "id" TEXT NOT NULL,
    "workflow_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "triggered_by" TEXT,
    "trigger_data" JSONB,
    "current_step" TEXT,
    "step_results" JSONB,
    "error_message" TEXT,
    "retry_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,

    CONSTRAINT "workflow_executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."prompt_versions" (
    "id" TEXT NOT NULL,
    "prompt_id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "variables" JSONB,
    "config" JSONB,
    "changelog" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "prompt_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."component_libraries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "components" JSONB NOT NULL DEFAULT '[]',
    "category" TEXT,
    "tags" TEXT[],
    "public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version_num" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,

    CONSTRAINT "component_libraries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'info',
    "user_id" TEXT,
    "channel" TEXT NOT NULL DEFAULT 'app',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "read_at" TIMESTAMP(3),
    "sent_at" TIMESTAMP(3),
    "data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."webhooks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "events" TEXT[],
    "secret" TEXT,
    "headers" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "retry_count" INTEGER NOT NULL DEFAULT 3,
    "timeout" INTEGER NOT NULL DEFAULT 30,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "project_id" TEXT,

    CONSTRAINT "webhooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."webhook_deliveries" (
    "id" TEXT NOT NULL,
    "webhook_id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "response" JSONB,
    "status" TEXT NOT NULL,
    "status_code" INTEGER,
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "next_retry" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "webhook_deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."cache_entries" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "ttl" INTEGER,
    "expires_at" TIMESTAMP(3),
    "tags" TEXT[],
    "size" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cache_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."search_indexes" (
    "id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT,
    "summary" TEXT,
    "keywords" TEXT[],
    "boost" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "language" TEXT NOT NULL DEFAULT 'en',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "search_indexes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."analytics_events" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "user_id" TEXT,
    "session_id" TEXT,
    "entity_type" TEXT,
    "entity_id" TEXT,
    "properties" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" TEXT,
    "user_agent" TEXT,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."backup_jobs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "size" INTEGER,
    "location" TEXT,
    "checksum" TEXT,
    "error_message" TEXT,
    "config" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "backup_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."migrations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT,
    "up_sql" TEXT NOT NULL,
    "down_sql" TEXT,
    "checksum" TEXT NOT NULL,
    "applied_at" TIMESTAMP(3),
    "applied_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "migrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_key" ON "public"."projects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tables_project_id_name_key" ON "public"."tables"("project_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "table_indexes_table_id_name_key" ON "public"."table_indexes"("table_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "table_relationships_table_id_name_key" ON "public"."table_relationships"("table_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "fields_table_id_name_key" ON "public"."fields"("table_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "views_table_id_name_key" ON "public"."views"("table_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "filters_table_id_name_key" ON "public"."filters"("table_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "features_project_id_name_key" ON "public"."features"("project_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ai_models_name_key" ON "public"."ai_models"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ai_provider_configs_provider_name_key" ON "public"."ai_provider_configs"("provider", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ai_agents_name_key" ON "public"."ai_agents"("name");

-- CreateIndex
CREATE UNIQUE INDEX "mcp_servers_name_key" ON "public"."mcp_servers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "system_configs_key_key" ON "public"."system_configs"("key");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_session_id_key" ON "public"."user_sessions"("session_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "public"."roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_id_role_id_key" ON "public"."user_roles"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "public"."permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_resource_action_key" ON "public"."permissions"("resource", "action");

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_key_hash_key" ON "public"."api_keys"("key_hash");

-- CreateIndex
CREATE INDEX "audit_logs_resource_resource_id_idx" ON "public"."audit_logs"("resource", "resource_id");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "public"."audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "public"."audit_logs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "file_storage_stored_name_key" ON "public"."file_storage"("stored_name");

-- CreateIndex
CREATE INDEX "file_storage_uploaded_by_idx" ON "public"."file_storage"("uploaded_by");

-- CreateIndex
CREATE INDEX "file_storage_category_idx" ON "public"."file_storage"("category");

-- CreateIndex
CREATE INDEX "file_storage_mime_type_idx" ON "public"."file_storage"("mime_type");

-- CreateIndex
CREATE UNIQUE INDEX "data_sources_name_key" ON "public"."data_sources"("name");

-- CreateIndex
CREATE INDEX "workflow_executions_workflow_id_idx" ON "public"."workflow_executions"("workflow_id");

-- CreateIndex
CREATE INDEX "workflow_executions_status_idx" ON "public"."workflow_executions"("status");

-- CreateIndex
CREATE INDEX "workflow_executions_started_at_idx" ON "public"."workflow_executions"("started_at");

-- CreateIndex
CREATE INDEX "prompt_versions_prompt_id_active_idx" ON "public"."prompt_versions"("prompt_id", "active");

-- CreateIndex
CREATE UNIQUE INDEX "prompt_versions_prompt_id_version_key" ON "public"."prompt_versions"("prompt_id", "version");

-- CreateIndex
CREATE UNIQUE INDEX "component_libraries_name_key" ON "public"."component_libraries"("name");

-- CreateIndex
CREATE INDEX "notifications_user_id_status_idx" ON "public"."notifications"("user_id", "status");

-- CreateIndex
CREATE INDEX "notifications_type_idx" ON "public"."notifications"("type");

-- CreateIndex
CREATE INDEX "notifications_created_at_idx" ON "public"."notifications"("created_at");

-- CreateIndex
CREATE INDEX "webhook_deliveries_webhook_id_status_idx" ON "public"."webhook_deliveries"("webhook_id", "status");

-- CreateIndex
CREATE INDEX "webhook_deliveries_event_idx" ON "public"."webhook_deliveries"("event");

-- CreateIndex
CREATE UNIQUE INDEX "cache_entries_key_key" ON "public"."cache_entries"("key");

-- CreateIndex
CREATE INDEX "cache_entries_expires_at_idx" ON "public"."cache_entries"("expires_at");

-- CreateIndex
CREATE INDEX "cache_entries_tags_idx" ON "public"."cache_entries"("tags");

-- CreateIndex
CREATE INDEX "search_indexes_entity_type_idx" ON "public"."search_indexes"("entity_type");

-- CreateIndex
CREATE INDEX "search_indexes_keywords_idx" ON "public"."search_indexes"("keywords");

-- CreateIndex
CREATE UNIQUE INDEX "search_indexes_entity_type_entity_id_key" ON "public"."search_indexes"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "analytics_events_event_idx" ON "public"."analytics_events"("event");

-- CreateIndex
CREATE INDEX "analytics_events_user_id_idx" ON "public"."analytics_events"("user_id");

-- CreateIndex
CREATE INDEX "analytics_events_timestamp_idx" ON "public"."analytics_events"("timestamp");

-- CreateIndex
CREATE INDEX "analytics_events_entity_type_entity_id_idx" ON "public"."analytics_events"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "backup_jobs_status_idx" ON "public"."backup_jobs"("status");

-- CreateIndex
CREATE INDEX "backup_jobs_started_at_idx" ON "public"."backup_jobs"("started_at");

-- CreateIndex
CREATE UNIQUE INDEX "migrations_name_key" ON "public"."migrations"("name");

-- CreateIndex
CREATE INDEX "migrations_version_idx" ON "public"."migrations"("version");

-- CreateIndex
CREATE INDEX "migrations_applied_at_idx" ON "public"."migrations"("applied_at");

-- AddForeignKey
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tables" ADD CONSTRAINT "tables_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tables" ADD CONSTRAINT "tables_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."table_indexes" ADD CONSTRAINT "table_indexes_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."table_relationships" ADD CONSTRAINT "table_relationships_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fields" ADD CONSTRAINT "fields_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."entities" ADD CONSTRAINT "entities_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."entities" ADD CONSTRAINT "entities_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."entity_history" ADD CONSTRAINT "entity_history_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "public"."entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."entity_comments" ADD CONSTRAINT "entity_comments_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "public"."entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."entity_comments" ADD CONSTRAINT "entity_comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."entity_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."entity_attachments" ADD CONSTRAINT "entity_attachments_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "public"."entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."entity_activities" ADD CONSTRAINT "entity_activities_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "public"."entities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."views" ADD CONSTRAINT "views_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."views" ADD CONSTRAINT "views_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."forms" ADD CONSTRAINT "forms_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."forms" ADD CONSTRAINT "forms_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."filters" ADD CONSTRAINT "filters_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."filters" ADD CONSTRAINT "filters_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reports" ADD CONSTRAINT "reports_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reports" ADD CONSTRAINT "reports_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."features" ADD CONSTRAINT "features_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_models" ADD CONSTRAINT "ai_models_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_provider_configs" ADD CONSTRAINT "ai_provider_configs_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_agents" ADD CONSTRAINT "ai_agents_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_agents" ADD CONSTRAINT "ai_agents_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "public"."ai_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_agents" ADD CONSTRAINT "ai_agents_parent_agent_id_fkey" FOREIGN KEY ("parent_agent_id") REFERENCES "public"."ai_agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_workflows" ADD CONSTRAINT "ai_workflows_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_workflows" ADD CONSTRAINT "ai_workflows_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "public"."ai_models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_workflows" ADD CONSTRAINT "ai_workflows_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "public"."ai_agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_prompts" ADD CONSTRAINT "ai_prompts_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_prompts" ADD CONSTRAINT "ai_prompts_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "public"."ai_models"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_prompts" ADD CONSTRAINT "ai_prompts_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "public"."ai_agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_usage" ADD CONSTRAINT "ai_usage_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_usage" ADD CONSTRAINT "ai_usage_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "public"."ai_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_usage" ADD CONSTRAINT "ai_usage_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "public"."ai_agents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cost_budgets" ADD CONSTRAINT "cost_budgets_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."templates" ADD CONSTRAINT "templates_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mcp_servers" ADD CONSTRAINT "mcp_servers_audit_id_fkey" FOREIGN KEY ("audit_id") REFERENCES "public"."audit_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."api_keys" ADD CONSTRAINT "api_keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."data_sources" ADD CONSTRAINT "data_sources_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workflow_executions" ADD CONSTRAINT "workflow_executions_workflow_id_fkey" FOREIGN KEY ("workflow_id") REFERENCES "public"."ai_workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."prompt_versions" ADD CONSTRAINT "prompt_versions_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "public"."ai_prompts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."webhooks" ADD CONSTRAINT "webhooks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."webhook_deliveries" ADD CONSTRAINT "webhook_deliveries_webhook_id_fkey" FOREIGN KEY ("webhook_id") REFERENCES "public"."webhooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

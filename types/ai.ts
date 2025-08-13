import {
  ApiResponse,
  AuditableDocument,
  SoftDeletable,
  ValidationResult,
} from './shared';
import { PermissionLevel } from './type';

/**
 * AI System Types
 *
 * This module defines a comprehensive AI integration system for the Headless CMS.
 * Features include:
 * - Multi-provider abstraction layer (OpenAI, Anthropic, AWS Bedrock, Google AI, etc.)
 * - Agent-to-agent communication system
 * - Model Context Protocol (MCP) implementation
 * - Configuration-driven AI services
 * - AI workflow automation
 * - Prompt management and versioning
 * - Cost tracking and usage monitoring
 */

// ============================================================================
// CORE AI PROVIDER ABSTRACTION
// ============================================================================

/**
 * Supported AI providers
 */
export type AIProvider =
  | 'openai'
  | 'anthropic'
  | 'aws-bedrock'
  | 'google-ai'
  | 'google-vertex'
  | 'azure-openai'
  | 'cohere'
  | 'huggingface'
  | 'ollama'
  | 'xai-grok'
  | 'custom';

/**
 * AI model capabilities
 */
export interface ModelCapabilities {
  /** Supports text generation */
  text_generation?: boolean;
  /** Supports image generation */
  image_generation?: boolean;
  /** Supports image analysis */
  image_analysis?: boolean;
  /** Supports audio processing */
  audio_processing?: boolean;
  /** Supports video processing */
  video_processing?: boolean;
  /** Supports code generation */
  code_generation?: boolean;
  /** Supports function calling */
  function_calling?: boolean;
  /** Supports streaming responses */
  streaming?: boolean;
  /** Supports embeddings */
  embeddings?: boolean;
  /** Supports fine-tuning */
  fine_tuning?: boolean;
  /** Maximum context length */
  max_context_length?: number;
  /** Maximum output tokens */
  max_output_tokens?: number;
  /** Supported file formats */
  supported_formats?: string[];
}

/**
 * AI model configuration
 */
export interface AIModel extends AuditableDocument {
  /** Model name/identifier */
  name: string;
  /** Display name */
  display_name: string;
  /** Model description */
  description?: string;
  /** AI provider */
  provider: AIProvider;
  /** Provider-specific model ID */
  model_id: string;
  /** Model version (different from document version) */
  model_version?: string;
  /** Model capabilities */
  capabilities: ModelCapabilities;
  /** Model configuration */
  config: ModelConfig;
  /** Model pricing */
  pricing?: ModelPricing;
  /** Whether model is active */
  active?: boolean;
  /** Model tags */
  tags?: string[];
}

/**
 * Model configuration
 */
export interface ModelConfig {
  /** Default temperature */
  temperature?: number;
  /** Default max tokens */
  max_tokens?: number;
  /** Default top_p */
  top_p?: number;
  /** Default frequency penalty */
  frequency_penalty?: number;
  /** Default presence penalty */
  presence_penalty?: number;
  /** Default stop sequences */
  stop?: string[];
  /** Custom parameters */
  custom_params?: Record<string, unknown>;
}

/**
 * Model pricing information
 */
export interface ModelPricing {
  /** Input token cost per 1K tokens */
  input_cost_per_1k?: number;
  /** Output token cost per 1K tokens */
  output_cost_per_1k?: number;
  /** Image analysis cost per image */
  image_cost?: number;
  /** Audio processing cost per minute */
  audio_cost_per_minute?: number;
  /** Currency */
  currency?: string;
}

// ============================================================================
// AI PROVIDER CONFIGURATION
// ============================================================================

/**
 * AI provider configuration
 */
export interface AIProviderConfig extends AuditableDocument {
  /** Provider type */
  provider: AIProvider;
  /** Provider name */
  name: string;
  /** Provider description */
  description?: string;
  /** Provider configuration */
  config: ProviderConfig;
  /** Available models */
  models: string[];
  /** Provider status */
  status: 'active' | 'inactive' | 'error';
  /** Last health check */
  last_health_check?: string;
  /** Provider priority for fallback */
  priority?: number;
  /** Rate limiting configuration */
  rate_limit?: RateLimit;
}

/**
 * Provider-specific configuration
 */
export type ProviderConfig =
  | OpenAIConfig
  | AnthropicConfig
  | AWSBedrockConfig
  | GoogleAIConfig
  | AzureOpenAIConfig
  | CohereConfig
  | HuggingFaceConfig
  | OllamaConfig
  | XAIConfig
  | CustomProviderConfig;

/**
 * OpenAI provider configuration
 */
export interface OpenAIConfig {
  /** API key */
  api_key: string;
  /** Organization ID */
  organization_id?: string;
  /** Base URL */
  base_url?: string;
  /** Default model */
  default_model?: string;
}

/**
 * Anthropic provider configuration
 */
export interface AnthropicConfig {
  /** API key */
  api_key: string;
  /** Base URL */
  base_url?: string;
  /** Default model */
  default_model?: string;
}

/**
 * AWS Bedrock configuration
 */
export interface AWSBedrockConfig {
  /** AWS region */
  region: string;
  /** AWS access key ID */
  access_key_id?: string;
  /** AWS secret access key */
  secret_access_key?: string;
  /** AWS session token */
  session_token?: string;
  /** AWS profile */
  profile?: string;
}

/**
 * Google AI configuration
 */
export interface GoogleAIConfig {
  /** API key */
  api_key: string;
  /** Project ID */
  project_id?: string;
  /** Base URL */
  base_url?: string;
}

/**
 * Azure OpenAI configuration
 */
export interface AzureOpenAIConfig {
  /** API key */
  api_key: string;
  /** Endpoint */
  endpoint: string;
  /** API version */
  api_version?: string;
  /** Deployment name */
  deployment_name?: string;
}

/**
 * Cohere configuration
 */
export interface CohereConfig {
  /** API key */
  api_key: string;
  /** Base URL */
  base_url?: string;
}

/**
 * Hugging Face configuration
 */
export interface HuggingFaceConfig {
  /** API key */
  api_key: string;
  /** Base URL */
  base_url?: string;
  /** Model repository */
  model_repo?: string;
}

/**
 * Ollama configuration
 */
export interface OllamaConfig {
  /** Base URL */
  base_url: string;
  /** Model name */
  model_name?: string;
}

/**
 * xAI Grok configuration
 */
export interface XAIConfig {
  /** API key */
  api_key: string;
  /** Base URL */
  base_url?: string;
}

/**
 * Custom provider configuration
 */
export interface CustomProviderConfig {
  /** Base URL */
  base_url: string;
  /** Authentication */
  auth?: {
    type: 'api_key' | 'bearer' | 'basic' | 'custom';
    credentials: Record<string, string>;
  };
  /** Custom headers */
  headers?: Record<string, string>;
  /** Request format */
  request_format?: 'openai' | 'anthropic' | 'custom';
  /** Response format */
  response_format?: 'openai' | 'anthropic' | 'custom';
}

/**
 * Rate limiting configuration
 */
export interface RateLimit {
  /** Requests per minute */
  requests_per_minute?: number;
  /** Requests per hour */
  requests_per_hour?: number;
  /** Requests per day */
  requests_per_day?: number;
  /** Tokens per minute */
  tokens_per_minute?: number;
  /** Concurrent requests */
  concurrent_requests?: number;
}

// ============================================================================
// AGENT SYSTEM
// ============================================================================

/**
 * AI Agent definition
 */
export interface AIAgent extends AuditableDocument, SoftDeletable {
  /** Agent name */
  name: string;
  /** Agent display name */
  display_name: string;
  /** Agent description */
  description?: string;
  /** Agent type */
  type: AgentType;
  /** Agent configuration */
  config: AgentConfig;
  /** Agent capabilities */
  capabilities: AgentCapabilities;
  /** Agent permissions */
  permissions?: AgentPermissions;
  /** Agent status */
  status: AgentStatus;
  /** Agent tags */
  tags?: string[];
  /** Parent agent (for hierarchical agents) */
  parent_agent_id?: string;
  /** Child agents */
  child_agents?: string[];
}

/**
 * Agent types
 */
export type AgentType =
  | 'conversational'
  | 'task_executor'
  | 'data_processor'
  | 'content_generator'
  | 'code_assistant'
  | 'workflow_orchestrator'
  | 'supervisor'
  | 'specialist'
  | 'custom';

/**
 * Agent status
 */
export type AgentStatus =
  | 'active'
  | 'inactive'
  | 'busy'
  | 'error'
  | 'maintenance';

/**
 * Agent configuration
 */
export interface AgentConfig {
  /** Primary AI model */
  primary_model: string;
  /** Fallback models */
  fallback_models?: string[];
  /** System prompt */
  system_prompt?: string;
  /** Agent personality */
  personality?: AgentPersonality;
  /** Communication settings */
  communication?: AgentCommunication;
  /** Tool access */
  tools?: AgentToolAccess;
  /** Memory configuration */
  memory?: AgentMemoryConfig;
  /** Learning configuration */
  learning?: AgentLearningConfig;
}

/**
 * Agent personality configuration
 */
export interface AgentPersonality {
  /** Tone of voice */
  tone?:
    | 'professional'
    | 'friendly'
    | 'casual'
    | 'formal'
    | 'humorous'
    | 'empathetic';
  /** Communication style */
  style?: 'concise' | 'detailed' | 'explanatory' | 'direct' | 'collaborative';
  /** Expertise level */
  expertise_level?: 'beginner' | 'intermediate' | 'expert' | 'adaptive';
  /** Language preferences */
  languages?: string[];
  /** Cultural context */
  cultural_context?: string;
}

/**
 * Agent communication settings
 */
export interface AgentCommunication {
  /** Can initiate conversations */
  can_initiate?: boolean;
  /** Can communicate with other agents */
  agent_to_agent?: boolean;
  /** Supported communication protocols */
  protocols?: CommunicationProtocol[];
  /** Message format preferences */
  message_format?: MessageFormat;
  /** Response time expectations */
  response_time?: ResponseTimeConfig;
}

/**
 * Communication protocols
 */
export type CommunicationProtocol =
  | 'direct_message'
  | 'broadcast'
  | 'request_response'
  | 'event_driven'
  | 'mcp'
  | 'webhook'
  | 'websocket';

/**
 * Message format
 */
export interface MessageFormat {
  /** Preferred format */
  format: 'text' | 'markdown' | 'json' | 'structured';
  /** Include metadata */
  include_metadata?: boolean;
  /** Include context */
  include_context?: boolean;
  /** Maximum message length */
  max_length?: number;
}

/**
 * Response time configuration
 */
export interface ResponseTimeConfig {
  /** Expected response time in seconds */
  expected_response_time?: number;
  /** Maximum response time in seconds */
  max_response_time?: number;
  /** Timeout behavior */
  timeout_behavior?: 'retry' | 'fallback' | 'error';
}

/**
 * Agent capabilities
 */
export interface AgentCapabilities {
  /** Can process text */
  text_processing?: boolean;
  /** Can process images */
  image_processing?: boolean;
  /** Can process audio */
  audio_processing?: boolean;
  /** Can process video */
  video_processing?: boolean;
  /** Can generate content */
  content_generation?: boolean;
  /** Can execute code */
  code_execution?: boolean;
  /** Can access external APIs */
  api_access?: boolean;
  /** Can manage files */
  file_management?: boolean;
  /** Can learn from interactions */
  learning?: boolean;
  /** Can collaborate with other agents */
  collaboration?: boolean;
  /** Supported file formats */
  supported_formats?: string[];
  /** Maximum concurrent tasks */
  max_concurrent_tasks?: number;
}

/**
 * Agent tool access configuration
 */
export interface AgentToolAccess {
  /** Available tools */
  available_tools?: string[];
  /** Restricted tools */
  restricted_tools?: string[];
  /** Tool permissions */
  tool_permissions?: Record<string, ToolPermission>;
  /** Can request new tools */
  can_request_tools?: boolean;
}

/**
 * Tool permission levels
 */
export type ToolPermission = 'read' | 'write' | 'execute' | 'admin' | 'none';

/**
 * Agent memory configuration
 */
export interface AgentMemoryConfig {
  /** Memory type */
  type: 'short_term' | 'long_term' | 'persistent' | 'hybrid';
  /** Memory capacity */
  capacity?: number;
  /** Memory retention period */
  retention_period?: string;
  /** Memory compression */
  compression?: boolean;
  /** Memory sharing with other agents */
  sharing?: MemorySharing;
}

/**
 * Memory sharing configuration
 */
export interface MemorySharing {
  /** Can share memory */
  enabled?: boolean;
  /** Agents to share with */
  share_with?: string[];
  /** What to share */
  share_types?: MemoryShareType[];
  /** Privacy level */
  privacy_level?: 'public' | 'restricted' | 'private';
}

/**
 * Memory share types
 */
export type MemoryShareType =
  | 'conversations'
  | 'learned_patterns'
  | 'user_preferences'
  | 'task_history'
  | 'knowledge_base';

/**
 * Agent learning configuration
 */
export interface AgentLearningConfig {
  /** Learning enabled */
  enabled?: boolean;
  /** Learning methods */
  methods?: LearningMethod[];
  /** Learning rate */
  learning_rate?: number;
  /** Feedback processing */
  feedback_processing?: boolean;
  /** Pattern recognition */
  pattern_recognition?: boolean;
  /** Adaptation speed */
  adaptation_speed?: 'slow' | 'medium' | 'fast' | 'adaptive';
}

/**
 * Learning methods
 */
export type LearningMethod =
  | 'reinforcement'
  | 'supervised'
  | 'unsupervised'
  | 'feedback_based'
  | 'pattern_matching'
  | 'experience_replay';

/**
 * Agent permissions
 */
export interface AgentPermissions {
  /** Default permission level */
  default?: PermissionLevel;
  /** Role-based permissions */
  roles?: Record<string, AgentPermissionLevel>;
  /** User-specific permissions */
  users?: Record<string, AgentPermissionLevel>;
  /** Whether agent is public */
  public?: boolean;
}

/**
 * Agent permission level
 */
export interface AgentPermissionLevel {
  /** Can interact with agent */
  interact?: boolean;
  /** Can configure agent */
  configure?: boolean;
  /** Can view agent metrics */
  view_metrics?: boolean;
  /** Can manage agent */
  manage?: boolean;
  /** Can delete agent */
  delete?: boolean;
}

// ============================================================================
// MODEL CONTEXT PROTOCOL (MCP) IMPLEMENTATION
// ============================================================================

/**
 * MCP Server configuration
 */
export interface MCPServer extends AuditableDocument {
  /** Server name */
  name: string;
  /** Server description */
  description?: string;
  /** Server URL or command */
  endpoint: string;
  /** Transport type */
  transport: MCPTransport;
  /** Server capabilities */
  capabilities: MCPCapabilities;
  /** Server configuration */
  config: MCPServerConfig;
  /** Server status */
  status: 'active' | 'inactive' | 'error';
  /** Last health check */
  last_health_check?: string;
  /** Server version */
  server_version?: string;
}

/**
 * MCP transport types
 */
export type MCPTransport = 'stdio' | 'http' | 'websocket' | 'custom';

/**
 * MCP server capabilities
 */
export interface MCPCapabilities {
  /** Supports prompts */
  prompts?: boolean;
  /** Supports resources */
  resources?: boolean;
  /** Supports tools */
  tools?: boolean;
  /** Supports logging */
  logging?: boolean;
  /** Supports completion */
  completion?: boolean;
  /** Supports roots */
  roots?: boolean;
  /** Supports sampling */
  sampling?: boolean;
}

/**
 * MCP server configuration
 */
export interface MCPServerConfig {
  /** Environment variables */
  env?: Record<string, string>;
  /** Command arguments (for stdio transport) */
  args?: string[];
  /** Working directory */
  cwd?: string;
  /** Timeout settings */
  timeout?: MCPTimeout;
  /** Retry settings */
  retry?: MCPRetry;
  /** Authentication */
  auth?: MCPAuth;
}

/**
 * MCP timeout configuration
 */
export interface MCPTimeout {
  /** Connection timeout in ms */
  connection?: number;
  /** Request timeout in ms */
  request?: number;
  /** Idle timeout in ms */
  idle?: number;
}

/**
 * MCP retry configuration
 */
export interface MCPRetry {
  /** Maximum retry attempts */
  max_attempts?: number;
  /** Retry delay in ms */
  delay?: number;
  /** Exponential backoff */
  exponential_backoff?: boolean;
}

/**
 * MCP authentication
 */
export interface MCPAuth {
  /** Authentication type */
  type: 'none' | 'api_key' | 'bearer' | 'basic' | 'custom';
  /** Authentication credentials */
  credentials?: Record<string, string>;
}

/**
 * MCP Resource
 */
export interface MCPResource {
  /** Resource URI */
  uri: string;
  /** Resource name */
  name: string;
  /** Resource description */
  description?: string;
  /** Resource MIME type */
  mime_type?: string;
  /** Resource metadata */
  metadata?: Record<string, unknown>;
}

/**
 * MCP Tool
 */
export interface MCPTool {
  /** Tool name */
  name: string;
  /** Tool description */
  description?: string;
  /** Tool input schema */
  input_schema: Record<string, unknown>;
  /** Tool metadata */
  metadata?: Record<string, unknown>;
}

/**
 * MCP Prompt
 */
export interface MCPPrompt {
  /** Prompt name */
  name: string;
  /** Prompt description */
  description?: string;
  /** Prompt arguments */
  arguments?: MCPPromptArgument[];
  /** Prompt metadata */
  metadata?: Record<string, unknown>;
}

/**
 * MCP Prompt argument
 */
export interface MCPPromptArgument {
  /** Argument name */
  name: string;
  /** Argument description */
  description?: string;
  /** Whether argument is required */
  required?: boolean;
  /** Argument type */
  type?: string;
}

// ============================================================================
// AI WORKFLOW SYSTEM
// ============================================================================

/**
 * AI Workflow definition
 */
export interface AIWorkflow extends AuditableDocument, SoftDeletable {
  /** Workflow name */
  name: string;
  /** Workflow description */
  description?: string;
  /** Workflow type */
  type: WorkflowType;
  /** Workflow steps */
  steps: WorkflowStep[];
  /** Workflow configuration */
  config: WorkflowConfig;
  /** Workflow triggers */
  triggers?: WorkflowTrigger[];
  /** Workflow status */
  status: WorkflowStatus;
  /** Workflow permissions */
  permissions?: WorkflowPermissions;
  /** Workflow tags */
  tags?: string[];
}

/**
 * Workflow types
 */
export type WorkflowType =
  | 'sequential'
  | 'parallel'
  | 'conditional'
  | 'loop'
  | 'event_driven'
  | 'human_in_loop'
  | 'custom';

/**
 * Workflow status
 */
export type WorkflowStatus =
  | 'draft'
  | 'active'
  | 'paused'
  | 'completed'
  | 'failed'
  | 'cancelled';

/**
 * Workflow step
 */
export interface WorkflowStep {
  /** Step ID */
  id: string;
  /** Step name */
  name: string;
  /** Step description */
  description?: string;
  /** Step type */
  type: WorkflowStepType;
  /** Step configuration */
  config: WorkflowStepConfig;
  /** Step dependencies */
  dependencies?: string[];
  /** Step conditions */
  conditions?: WorkflowCondition[];
  /** Step timeout */
  timeout?: number;
  /** Step retry configuration */
  retry?: WorkflowRetry;
}

/**
 * Workflow step types
 */
export type WorkflowStepType =
  | 'ai_generation'
  | 'agent_task'
  | 'data_processing'
  | 'api_call'
  | 'human_approval'
  | 'condition_check'
  | 'loop'
  | 'delay'
  | 'webhook'
  | 'custom';

/**
 * Workflow step configuration
 */
export type WorkflowStepConfig =
  | AIGenerationStepConfig
  | AgentTaskStepConfig
  | DataProcessingStepConfig
  | APICallStepConfig
  | HumanApprovalStepConfig
  | ConditionCheckStepConfig
  | LoopStepConfig
  | DelayStepConfig
  | WebhookStepConfig
  | CustomStepConfig;

/**
 * AI Generation step configuration
 */
export interface AIGenerationStepConfig {
  /** AI model to use */
  model: string;
  /** Generation prompt */
  prompt: string;
  /** Generation parameters */
  parameters?: Record<string, unknown>;
  /** Output format */
  output_format?: 'text' | 'json' | 'markdown' | 'html';
}

/**
 * Agent Task step configuration
 */
export interface AgentTaskStepConfig {
  /** Agent ID */
  agent_id: string;
  /** Task description */
  task: string;
  /** Task parameters */
  parameters?: Record<string, unknown>;
  /** Expected output format */
  output_format?: string;
}

/**
 * Data Processing step configuration
 */
export interface DataProcessingStepConfig {
  /** Processing type */
  type: 'transform' | 'filter' | 'aggregate' | 'validate' | 'custom';
  /** Processing rules */
  rules: Record<string, unknown>;
  /** Input data source */
  input_source?: string;
  /** Output destination */
  output_destination?: string;
}

/**
 * API Call step configuration
 */
export interface APICallStepConfig {
  /** API endpoint */
  endpoint: string;
  /** HTTP method */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** Request headers */
  headers?: Record<string, string>;
  /** Request body */
  body?: Record<string, unknown>;
  /** Authentication */
  auth?: Record<string, unknown>;
}

/**
 * Human Approval step configuration
 */
export interface HumanApprovalStepConfig {
  /** Approval message */
  message: string;
  /** Approvers */
  approvers: string[];
  /** Approval deadline */
  deadline?: string;
  /** Auto-approve after deadline */
  auto_approve?: boolean;
}

/**
 * Condition Check step configuration
 */
export interface ConditionCheckStepConfig {
  /** Condition expression */
  condition: string;
  /** True branch */
  true_branch?: string;
  /** False branch */
  false_branch?: string;
}

/**
 * Loop step configuration
 */
export interface LoopStepConfig {
  /** Loop type */
  type: 'for' | 'while' | 'foreach';
  /** Loop condition or iterator */
  condition: string;
  /** Loop body steps */
  body_steps: string[];
  /** Maximum iterations */
  max_iterations?: number;
}

/**
 * Delay step configuration
 */
export interface DelayStepConfig {
  /** Delay duration in seconds */
  duration: number;
  /** Delay reason */
  reason?: string;
}

/**
 * Webhook step configuration
 */
export interface WebhookStepConfig {
  /** Webhook URL */
  url: string;
  /** HTTP method */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** Webhook payload */
  payload?: Record<string, unknown>;
  /** Webhook headers */
  headers?: Record<string, string>;
}

/**
 * Custom step configuration
 */
export interface CustomStepConfig {
  /** Custom step type */
  custom_type: string;
  /** Custom configuration */
  config: Record<string, unknown>;
}

/**
 * Workflow condition
 */
export interface WorkflowCondition {
  /** Condition expression */
  expression: string;
  /** Condition type */
  type: 'javascript' | 'jsonpath' | 'regex' | 'custom';
  /** Condition parameters */
  parameters?: Record<string, unknown>;
}

/**
 * Workflow retry configuration
 */
export interface WorkflowRetry {
  /** Maximum retry attempts */
  max_attempts: number;
  /** Retry delay in seconds */
  delay: number;
  /** Exponential backoff */
  exponential_backoff?: boolean;
  /** Retry conditions */
  retry_on?: string[];
}

/**
 * Workflow configuration
 */
export interface WorkflowConfig {
  /** Workflow timeout in seconds */
  timeout?: number;
  /** Parallel execution limit */
  parallel_limit?: number;
  /** Error handling strategy */
  error_handling?: 'stop' | 'continue' | 'retry' | 'skip';
  /** Logging level */
  logging_level?: 'none' | 'basic' | 'detailed' | 'debug';
  /** Notification settings */
  notifications?: WorkflowNotifications;
}

/**
 * Workflow notifications
 */
export interface WorkflowNotifications {
  /** Notify on completion */
  on_completion?: boolean;
  /** Notify on failure */
  on_failure?: boolean;
  /** Notification channels */
  channels?: NotificationChannel[];
}

/**
 * Notification channel
 */
export interface NotificationChannel {
  /** Channel type */
  type: 'email' | 'slack' | 'webhook' | 'sms' | 'custom';
  /** Channel configuration */
  config: Record<string, unknown>;
}

/**
 * Workflow trigger
 */
export interface WorkflowTrigger {
  /** Trigger type */
  type: TriggerType;
  /** Trigger configuration */
  config: TriggerConfig;
  /** Whether trigger is active */
  active?: boolean;
}

/**
 * Trigger types
 */
export type TriggerType =
  | 'manual'
  | 'schedule'
  | 'webhook'
  | 'event'
  | 'file_change'
  | 'data_change'
  | 'api_call'
  | 'custom';

/**
 * Trigger configuration
 */
export type TriggerConfig =
  | ScheduleTriggerConfig
  | WebhookTriggerConfig
  | EventTriggerConfig
  | FileChangeTriggerConfig
  | DataChangeTriggerConfig
  | APICallTriggerConfig
  | CustomTriggerConfig;

/**
 * Schedule trigger configuration
 */
export interface ScheduleTriggerConfig {
  /** Cron expression */
  cron: string;
  /** Timezone */
  timezone?: string;
  /** Start date */
  start_date?: string;
  /** End date */
  end_date?: string;
}

/**
 * Webhook trigger configuration
 */
export interface WebhookTriggerConfig {
  /** Webhook path */
  path: string;
  /** HTTP methods */
  methods: string[];
  /** Authentication required */
  auth_required?: boolean;
}

/**
 * Event trigger configuration
 */
export interface EventTriggerConfig {
  /** Event type */
  event_type: string;
  /** Event source */
  source?: string;
  /** Event filters */
  filters?: Record<string, unknown>;
}

/**
 * File change trigger configuration
 */
export interface FileChangeTriggerConfig {
  /** File path pattern */
  path_pattern: string;
  /** Change types */
  change_types: ('created' | 'modified' | 'deleted')[];
}

/**
 * Data change trigger configuration
 */
export interface DataChangeTriggerConfig {
  /** Table/collection name */
  table: string;
  /** Change types */
  change_types: ('insert' | 'update' | 'delete')[];
  /** Filters */
  filters?: Record<string, unknown>;
}

/**
 * API call trigger configuration
 */
export interface APICallTriggerConfig {
  /** API endpoint pattern */
  endpoint_pattern: string;
  /** HTTP methods */
  methods: string[];
  /** Request filters */
  filters?: Record<string, unknown>;
}

/**
 * Custom trigger configuration
 */
export interface CustomTriggerConfig {
  /** Custom trigger type */
  custom_type: string;
  /** Custom configuration */
  config: Record<string, unknown>;
}

/**
 * Workflow permissions
 */
export interface WorkflowPermissions {
  /** Default permission level */
  default?: PermissionLevel;
  /** Role-based permissions */
  roles?: Record<string, WorkflowPermissionLevel>;
  /** User-specific permissions */
  users?: Record<string, WorkflowPermissionLevel>;
  /** Whether workflow is public */
  public?: boolean;
}

/**
 * Workflow permission level
 */
export interface WorkflowPermissionLevel {
  /** Can view workflow */
  view?: boolean;
  /** Can execute workflow */
  execute?: boolean;
  /** Can edit workflow */
  edit?: boolean;
  /** Can delete workflow */
  delete?: boolean;
  /** Can manage workflow */
  manage?: boolean;
}

// ============================================================================
// PROMPT MANAGEMENT SYSTEM
// ============================================================================

/**
 * AI Prompt template
 */
export interface AIPrompt extends AuditableDocument, SoftDeletable {
  /** Prompt name */
  name: string;
  /** Prompt description */
  description?: string;
  /** Prompt category */
  category?: string;
  /** Prompt content */
  content: string;
  /** Prompt variables */
  variables?: PromptVariable[];
  /** Prompt configuration */
  config: PromptConfig;
  /** Prompt permissions */
  permissions?: PromptPermissions;
  /** Prompt tags */
  tags?: string[];
  /** Prompt usage statistics */
  usage_stats?: PromptUsageStats;
}

/**
 * Prompt variable
 */
export interface PromptVariable {
  /** Variable name */
  name: string;
  /** Variable description */
  description?: string;
  /** Variable type */
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  /** Whether variable is required */
  required?: boolean;
  /** Default value */
  default_value?: unknown;
  /** Validation rules */
  validation?: VariableValidation;
}

/**
 * Variable validation
 */
export interface VariableValidation {
  /** Minimum length/value */
  min?: number;
  /** Maximum length/value */
  max?: number;
  /** Regular expression pattern */
  pattern?: string;
  /** Allowed values */
  enum?: unknown[];
  /** Custom validation function */
  custom?: string;
}

/**
 * Prompt configuration
 */
export interface PromptConfig {
  /** Prompt format */
  format: 'text' | 'markdown' | 'json' | 'yaml' | 'custom';
  /** Template engine */
  template_engine?: 'handlebars' | 'mustache' | 'jinja2' | 'custom';
  /** Prompt versioning */
  versioning?: PromptVersioning;
  /** A/B testing */
  ab_testing?: PromptABTesting;
  /** Prompt optimization */
  optimization?: PromptOptimization;
}

/**
 * Prompt versioning
 */
export interface PromptVersioning {
  /** Enable versioning */
  enabled?: boolean;
  /** Version strategy */
  strategy?: 'semantic' | 'incremental' | 'timestamp';
  /** Auto-versioning */
  auto_version?: boolean;
  /** Version retention */
  retention_count?: number;
}

/**
 * Prompt A/B testing
 */
export interface PromptABTesting {
  /** Enable A/B testing */
  enabled?: boolean;
  /** Test variants */
  variants?: PromptVariant[];
  /** Traffic split */
  traffic_split?: Record<string, number>;
  /** Success metrics */
  success_metrics?: string[];
}

/**
 * Prompt variant
 */
export interface PromptVariant {
  /** Variant ID */
  id: string;
  /** Variant name */
  name: string;
  /** Variant content */
  content: string;
  /** Variant weight */
  weight?: number;
}

/**
 * Prompt optimization
 */
export interface PromptOptimization {
  /** Enable optimization */
  enabled?: boolean;
  /** Optimization goals */
  goals?: OptimizationGoal[];
  /** Optimization strategy */
  strategy?: 'genetic' | 'gradient' | 'random' | 'manual';
  /** Optimization frequency */
  frequency?: string;
}

/**
 * Optimization goal
 */
export interface OptimizationGoal {
  /** Goal type */
  type: 'accuracy' | 'speed' | 'cost' | 'user_satisfaction' | 'custom';
  /** Target value */
  target?: number;
  /** Weight */
  weight?: number;
}

/**
 * Prompt permissions
 */
export interface PromptPermissions {
  /** Default permission level */
  default?: PermissionLevel;
  /** Role-based permissions */
  roles?: Record<string, PromptPermissionLevel>;
  /** User-specific permissions */
  users?: Record<string, PromptPermissionLevel>;
  /** Whether prompt is public */
  public?: boolean;
}

/**
 * Prompt permission level
 */
export interface PromptPermissionLevel {
  /** Can view prompt */
  view?: boolean;
  /** Can use prompt */
  use?: boolean;
  /** Can edit prompt */
  edit?: boolean;
  /** Can delete prompt */
  delete?: boolean;
  /** Can manage prompt */
  manage?: boolean;
}

/**
 * Prompt usage statistics
 */
export interface PromptUsageStats {
  /** Total usage count */
  total_uses?: number;
  /** Usage by user */
  usage_by_user?: Record<string, number>;
  /** Usage by model */
  usage_by_model?: Record<string, number>;
  /** Average response time */
  avg_response_time?: number;
  /** Success rate */
  success_rate?: number;
  /** Last used */
  last_used?: string;
}

// ============================================================================
// COST TRACKING AND USAGE MONITORING
// ============================================================================

/**
 * AI Usage tracking
 */
export interface AIUsage extends AuditableDocument {
  /** User ID */
  user_id?: string;
  /** Agent ID */
  agent_id?: string;
  /** Model used */
  model: string;
  /** Provider used */
  provider: AIProvider;
  /** Usage type */
  type: UsageType;
  /** Token usage */
  tokens?: TokenUsage;
  /** Request details */
  request?: UsageRequest;
  /** Response details */
  response?: UsageResponse;
  /** Cost information */
  cost?: UsageCost;
  /** Usage metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Usage types
 */
export type UsageType =
  | 'text_generation'
  | 'image_generation'
  | 'image_analysis'
  | 'audio_processing'
  | 'video_processing'
  | 'embeddings'
  | 'fine_tuning'
  | 'function_calling'
  | 'custom';

/**
 * Token usage
 */
export interface TokenUsage {
  /** Input tokens */
  input_tokens?: number;
  /** Output tokens */
  output_tokens?: number;
  /** Total tokens */
  total_tokens?: number;
  /** Cached tokens */
  cached_tokens?: number;
}

/**
 * Usage request details
 */
export interface UsageRequest {
  /** Request timestamp */
  timestamp: string;
  /** Request size in bytes */
  size?: number;
  /** Request parameters */
  parameters?: Record<string, unknown>;
  /** Request source */
  source?: string;
}

/**
 * Usage response details
 */
export interface UsageResponse {
  /** Response timestamp */
  timestamp: string;
  /** Response size in bytes */
  size?: number;
  /** Response time in ms */
  response_time?: number;
  /** Response status */
  status: 'success' | 'error' | 'timeout' | 'cancelled';
  /** Error details */
  error?: string;
}

/**
 * Usage cost
 */
export interface UsageCost {
  /** Input cost */
  input_cost?: number;
  /** Output cost */
  output_cost?: number;
  /** Total cost */
  total_cost?: number;
  /** Currency */
  currency?: string;
  /** Cost calculation method */
  calculation_method?: string;
}

/**
 * Cost budget
 */
export interface CostBudget extends AuditableDocument {
  /** Budget name */
  name: string;
  /** Budget description */
  description?: string;
  /** Budget amount */
  amount: number;
  /** Currency */
  currency: string;
  /** Budget period */
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  /** Budget scope */
  scope: BudgetScope;
  /** Budget alerts */
  alerts?: BudgetAlert[];
  /** Budget status */
  status: 'active' | 'exceeded' | 'paused';
}

/**
 * Budget scope
 */
export interface BudgetScope {
  /** Scope type */
  type: 'global' | 'user' | 'agent' | 'model' | 'provider' | 'custom';
  /** Scope targets */
  targets?: string[];
  /** Scope filters */
  filters?: Record<string, unknown>;
}

/**
 * Budget alert
 */
export interface BudgetAlert {
  /** Alert threshold percentage */
  threshold: number;
  /** Alert type */
  type: 'email' | 'webhook' | 'notification' | 'custom';
  /** Alert configuration */
  config: Record<string, unknown>;
  /** Whether alert is active */
  active?: boolean;
}

// ============================================================================
// INTEGRATION WITH EXISTING TYPES
// ============================================================================

/**
 * AI-powered Table features
 */
export interface AITableFeatures {
  /** Auto-generate table schema from description */
  schema_generation?: boolean;
  /** Smart data validation */
  smart_validation?: boolean;
  /** Auto-categorization */
  auto_categorization?: boolean;
  /** Data quality scoring */
  quality_scoring?: boolean;
  /** Anomaly detection */
  anomaly_detection?: boolean;
  /** Smart suggestions */
  smart_suggestions?: boolean;
}

/**
 * AI-powered Field features
 */
export interface AIFieldFeatures {
  /** Auto-generate field options */
  option_generation?: boolean;
  /** Smart validation rules */
  smart_validation?: boolean;
  /** Data type inference */
  type_inference?: boolean;
  /** Content suggestions */
  content_suggestions?: boolean;
  /** Format standardization */
  format_standardization?: boolean;
}

/**
 * AI-powered Form features
 */
export interface AIFormFeatures {
  /** Auto-generate form from description */
  form_generation?: boolean;
  /** Smart field ordering */
  smart_ordering?: boolean;
  /** Dynamic field visibility */
  dynamic_visibility?: boolean;
  /** Auto-completion */
  auto_completion?: boolean;
  /** Smart validation */
  smart_validation?: boolean;
  /** Form optimization */
  form_optimization?: boolean;
}

/**
 * AI-powered View features
 */
export interface AIViewFeatures {
  /** Auto-generate views */
  view_generation?: boolean;
  /** Smart filtering */
  smart_filtering?: boolean;
  /** Intelligent sorting */
  intelligent_sorting?: boolean;
  /** Data insights */
  data_insights?: boolean;
  /** Visualization recommendations */
  viz_recommendations?: boolean;
}

/**
 * AI-powered Report features
 */
export interface AIReportFeatures {
  /** Auto-generate reports */
  report_generation?: boolean;
  /** Smart data analysis */
  smart_analysis?: boolean;
  /** Insight generation */
  insight_generation?: boolean;
  /** Natural language summaries */
  nl_summaries?: boolean;
  /** Trend detection */
  trend_detection?: boolean;
  /** Predictive analytics */
  predictive_analytics?: boolean;
}

/**
 * AI-powered Builder features
 */
export interface AIBuilderFeatures {
  /** Auto-generate templates */
  template_generation?: boolean;
  /** Smart component suggestions */
  component_suggestions?: boolean;
  /** Layout optimization */
  layout_optimization?: boolean;
  /** Content generation */
  content_generation?: boolean;
  /** Design assistance */
  design_assistance?: boolean;
  /** Accessibility optimization */
  accessibility_optimization?: boolean;
}

// ============================================================================
// AI API TYPES
// ============================================================================

/**
 * AI Service configuration
 */
export interface AIServiceConfig extends AuditableDocument {
  /** Service name */
  name: string;
  /** Service description */
  description?: string;
  /** Service type */
  type: AIServiceType;
  /** Service configuration */
  config: AIServiceSettings;
  /** Service status */
  status: 'active' | 'inactive' | 'maintenance';
  /** Service permissions */
  permissions?: AIServicePermissions;
}

/**
 * AI Service types
 */
export type AIServiceType =
  | 'text_generation'
  | 'content_creation'
  | 'data_analysis'
  | 'code_generation'
  | 'image_processing'
  | 'workflow_automation'
  | 'smart_suggestions'
  | 'custom';

/**
 * AI Service settings
 */
export interface AIServiceSettings {
  /** Default model */
  default_model?: string;
  /** Fallback models */
  fallback_models?: string[];
  /** Service parameters */
  parameters?: Record<string, unknown>;
  /** Rate limiting */
  rate_limit?: RateLimit;
  /** Caching */
  caching?: CachingConfig;
  /** Monitoring */
  monitoring?: MonitoringConfig;
}

/**
 * Caching configuration
 */
export interface CachingConfig {
  /** Enable caching */
  enabled?: boolean;
  /** Cache TTL in seconds */
  ttl?: number;
  /** Cache key strategy */
  key_strategy?: 'content_hash' | 'parameter_hash' | 'custom';
  /** Cache storage */
  storage?: 'memory' | 'redis' | 'database' | 'custom';
}

/**
 * Monitoring configuration
 */
export interface MonitoringConfig {
  /** Enable monitoring */
  enabled?: boolean;
  /** Metrics to track */
  metrics?: MonitoringMetric[];
  /** Alert thresholds */
  alert_thresholds?: Record<string, number>;
  /** Monitoring frequency */
  frequency?: string;
}

/**
 * Monitoring metrics
 */
export type MonitoringMetric =
  | 'response_time'
  | 'error_rate'
  | 'throughput'
  | 'cost'
  | 'token_usage'
  | 'user_satisfaction'
  | 'custom';

/**
 * AI Service permissions
 */
export interface AIServicePermissions {
  /** Default permission level */
  default?: PermissionLevel;
  /** Role-based permissions */
  roles?: Record<string, AIServicePermissionLevel>;
  /** User-specific permissions */
  users?: Record<string, AIServicePermissionLevel>;
  /** API access permissions */
  api?: AIServiceAPIPermissions;
}

/**
 * AI Service permission level
 */
export interface AIServicePermissionLevel {
  /** Can use service */
  use?: boolean;
  /** Can configure service */
  configure?: boolean;
  /** Can view metrics */
  view_metrics?: boolean;
  /** Can manage service */
  manage?: boolean;
}

/**
 * AI Service API permissions
 */
export interface AIServiceAPIPermissions {
  /** API access enabled */
  enabled?: boolean;
  /** Require API key */
  require_api_key?: boolean;
  /** Rate limiting */
  rate_limit?: RateLimit;
  /** Allowed endpoints */
  allowed_endpoints?: string[];
  /** IP whitelist */
  ip_whitelist?: string[];
}

/**
 * AI API Request
 */
export interface AIAPIRequest {
  /** Request ID */
  id: string;
  /** Service type */
  service: AIServiceType;
  /** Request parameters */
  parameters: Record<string, unknown>;
  /** Request context */
  context?: AIRequestContext;
  /** Request options */
  options?: AIRequestOptions;
}

/**
 * AI Request context
 */
export interface AIRequestContext {
  /** User ID */
  user_id?: string;
  /** Session ID */
  session_id?: string;
  /** Request source */
  source?: string;
  /** Request metadata */
  metadata?: Record<string, unknown>;
}

/**
 * AI Request options
 */
export interface AIRequestOptions {
  /** Streaming response */
  stream?: boolean;
  /** Response format */
  format?: 'text' | 'json' | 'markdown' | 'html';
  /** Timeout in seconds */
  timeout?: number;
  /** Priority */
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  /** Callback URL */
  callback_url?: string;
}

/**
 * AI API Response
 */
export interface AIAPIResponse<T = unknown> extends ApiResponse<T> {
  /** Request ID */
  request_id: string;
  /** Model used */
  model?: string;
  /** Provider used */
  provider?: AIProvider;
  /** Token usage */
  usage?: TokenUsage;
  /** Response time in ms */
  response_time?: number;
  /** Cost information */
  cost?: UsageCost;
}

/**
 * AI Streaming Response
 */
export interface AIStreamingResponse {
  /** Response chunk */
  chunk: string;
  /** Whether this is the final chunk */
  final?: boolean;
  /** Chunk metadata */
  metadata?: Record<string, unknown>;
}

/**
 * AI Error Response
 */
export interface AIErrorResponse {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Error details */
  details?: Record<string, unknown>;
  /** Retry information */
  retry?: {
    /** Whether retry is possible */
    possible: boolean;
    /** Retry delay in seconds */
    delay?: number;
    /** Maximum retry attempts */
    max_attempts?: number;
  };
}

// ============================================================================
// CONFIGURATION SCHEMA
// ============================================================================

/**
 * AI System configuration schema
 */
export interface AISystemConfig extends AuditableDocument {
  /** Configuration name */
  name: string;
  /** Configuration description */
  description?: string;
  /** Provider configurations */
  providers: AIProviderConfig[];
  /** Model configurations */
  models: AIModel[];
  /** Agent configurations */
  agents: AIAgent[];
  /** Workflow configurations */
  workflows: AIWorkflow[];
  /** Prompt configurations */
  prompts: AIPrompt[];
  /** Service configurations */
  services: AIServiceConfig[];
  /** Global settings */
  global_settings: AIGlobalSettings;
  /** Configuration validation */
  validation?: ValidationResult;
}

/**
 * AI Global settings
 */
export interface AIGlobalSettings {
  /** Default provider */
  default_provider?: string;
  /** Default model */
  default_model?: string;
  /** Global rate limits */
  global_rate_limits?: RateLimit;
  /** Global cost budget */
  global_budget?: CostBudget;
  /** Security settings */
  security?: AISecuritySettings;
  /** Logging settings */
  logging?: AILoggingSettings;
  /** Feature flags */
  feature_flags?: Record<string, boolean>;
}

/**
 * AI Security settings
 */
export interface AISecuritySettings {
  /** Enable content filtering */
  content_filtering?: boolean;
  /** Enable PII detection */
  pii_detection?: boolean;
  /** Enable audit logging */
  audit_logging?: boolean;
  /** Encryption settings */
  encryption?: EncryptionSettings;
  /** Access control */
  access_control?: AccessControlSettings;
}

/**
 * Encryption settings
 */
export interface EncryptionSettings {
  /** Encrypt data at rest */
  at_rest?: boolean;
  /** Encrypt data in transit */
  in_transit?: boolean;
  /** Encryption algorithm */
  algorithm?: string;
  /** Key management */
  key_management?: string;
}

/**
 * Access control settings
 */
export interface AccessControlSettings {
  /** Enable RBAC */
  rbac_enabled?: boolean;
  /** Default permissions */
  default_permissions?: PermissionLevel;
  /** Session timeout */
  session_timeout?: number;
  /** Multi-factor authentication */
  mfa_required?: boolean;
}

/**
 * AI Logging settings
 */
export interface AILoggingSettings {
  /** Log level */
  level?: 'debug' | 'info' | 'warn' | 'error';
  /** Log destinations */
  destinations?: LogDestination[];
  /** Log retention */
  retention?: string;
  /** Log format */
  format?: 'json' | 'text' | 'structured';
}

/**
 * Log destination
 */
export interface LogDestination {
  /** Destination type */
  type: 'file' | 'database' | 'elasticsearch' | 'cloudwatch' | 'custom';
  /** Destination configuration */
  config: Record<string, unknown>;
}

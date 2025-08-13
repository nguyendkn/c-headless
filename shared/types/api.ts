export interface APIResponse<TData = unknown> {
  data?: TData;
  code?: string;
  status?: number;
  message?: string;
  success: boolean;
  timestamp?: string;
  details?: Record<string, unknown>;
}

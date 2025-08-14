import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { APIResponse } from '../shared/types';
import { uuidv7 } from './uuid';

const DEFAULT_CONFIG: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
};

export const apiClient: AxiosInstance = axios.create(DEFAULT_CONFIG);

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const correlationId = uuidv7();
    config.headers['X-Correlation-ID'] = correlationId;

    // Auto-attach access token if available
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    // Log request
    console.debug(
      {
        type: 'HTTP_REQUEST',
        correlationId,
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        headers: {
          ...config.headers,
          // Mask sensitive headers
          Authorization: config.headers.Authorization ? '[MASKED]' : undefined,
        },
        timestamp: new Date().toISOString(),
      },
      'Outgoing HTTP request'
    );

    return config;
  },
  (error: AxiosError) => {
    console.error(
      {
        type: 'HTTP_REQUEST_ERROR',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      'Request interceptor error'
    );

    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const correlationId = response.config.headers['X-Correlation-ID'];

    console.debug(
      {
        type: 'HTTP_RESPONSE',
        correlationId,
        status: response.status,
        statusText: response.statusText,
        url: response.config.url,
        method: response.config.method?.toUpperCase(),
        responseTime: response.headers['x-response-time'],
        timestamp: new Date().toISOString(),
      },
      'HTTP response received'
    );

    return response;
  },
  async (error: AxiosError) => {
    const correlationId = error.config?.headers?.['X-Correlation-ID'];

    console.error(
      {
        type: 'HTTP_RESPONSE_ERROR',
        correlationId,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        message: error.message,
        responseData: error.response?.data,
        timestamp: new Date().toISOString(),
      },
      'HTTP response error'
    );

    // Handle 401 Unauthorized - token refresh logic
    if (error.response?.status === 401 && !error.config?._retry) {
      error.config!._retry = true;

      if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          try {
            // Try to refresh token
            const refreshResponse = await apiClient.post('/auth/refresh', {
              refreshToken,
            });

            if (refreshResponse.data.success && refreshResponse.data.data) {
              const { accessToken, refreshToken: newRefreshToken } =
                refreshResponse.data.data;
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', newRefreshToken);

              // Retry original request with new token
              error.config!.headers.Authorization = `Bearer ${accessToken}`;
              return apiClient.request(error.config!);
            }
          } catch (refreshError) {
            // Refresh failed, clear tokens and redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/auth/sign-in';
            return Promise.reject(createApiError(error));
          }
        } else {
          // No refresh token, redirect to login
          window.location.href = '/auth/sign-in';
          return Promise.reject(createApiError(error));
        }
      }
    }

    if (shouldRetry(error) && !error.config?._retry) {
      error.config!._retry = true;

      console.info(
        {
          type: 'HTTP_RETRY',
          correlationId,
          url: error.config?.url,
          attempt: 1,
          timestamp: new Date().toISOString(),
        },
        'Retrying failed request'
      );

      await new Promise(resolve => setTimeout(resolve, 1000));

      return apiClient.request(error.config!);
    }

    return Promise.reject(createApiError(error));
  }
);

function shouldRetry(error: AxiosError): boolean {
  return (
    !error.response ||
    (error.response.status >= 500 && error.response.status < 600) ||
    error.code === 'ECONNABORTED' ||
    error.code === 'NETWORK_ERROR'
  );
}

function createApiError(error: AxiosError): APIResponse {
  const apiError: APIResponse = {
    success: false,
    message: error.message || 'An unexpected error occurred',
    status: error.response?.status,
  };

  if (error.response?.data) {
    const responseData = error.response.data as Record<string, unknown>;
    apiError.message =
      (responseData.message as string) ||
      (responseData.error as string) ||
      apiError.message;
    apiError.code = responseData.code as string;
    apiError.details = responseData.details as Record<string, unknown>;
  }

  return apiError;
}

export const api = {
  get: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> => {
    const response = await apiClient.get<APIResponse<T>>(url, config);
    return response.data;
  },

  post: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> => {
    const response = await apiClient.post<APIResponse<T>>(url, data, config);
    return response.data;
  },

  put: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> => {
    const response = await apiClient.put<APIResponse<T>>(url, data, config);
    return response.data;
  },

  patch: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> => {
    const response = await apiClient.patch<APIResponse<T>>(url, data, config);
    return response.data;
  },

  delete: async <T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> => {
    const response = await apiClient.delete<APIResponse<T>>(url, config);
    return response.data;
  },
};

export const swrFetcher = async <T = unknown>(url: string): Promise<T> => {
  const response = await api.get<T>(url);
  if (response.data === undefined) {
    throw new Error('Response data is undefined');
  }
  return response.data;
};

export const swrFetcherWithConfig =
  (config?: AxiosRequestConfig) =>
  async <T = unknown>(url: string): Promise<T> => {
    const response = await api.get<T>(url, config);
    if (response.data === undefined) {
      throw new Error('Response data is undefined');
    }
    return response.data;
  };

export const createAuthenticatedFetcher =
  (token?: string) =>
  async <T = unknown>(url: string): Promise<T> => {
    const config: AxiosRequestConfig = {};

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await api.get<T>(url, config);
    if (response.data === undefined) {
      throw new Error('Response data is undefined');
    }
    return response.data;
  };

export default apiClient;

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

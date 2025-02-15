export const API_BASE_URL = 'https://api.github.com';

export const STATUS_MESSAGES: Record<number, string> = {
  204: 'Request successful.',
  304: 'No changes detected since the last request.',
  401: 'Authentication required.',
  403: 'Access denied. You do not have permission to access this resource.',
  404: 'Resource not found. The requested item does not exist.',
  422: 'Invalid request. Please check your input and try again.',
  503: 'Service unavailable. GitHub servers are temporarily down. Please try again later.',
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const getHeaders = (authenticated: boolean = false) => ({
  'Content-Type': 'application/json',
  ...(authenticated && { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}` }),
});

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    if (response.status === 204) {
      return null as T;
    }
    return response.json();
  }
  const message = STATUS_MESSAGES[response.status] || 'An unexpected error occurred';
  throw new ApiError(message, response.status);
}
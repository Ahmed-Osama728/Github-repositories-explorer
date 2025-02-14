import { useStore } from '../store/store';
import { Repository } from '../types';

const API_BASE_URL = 'https://api.github.com';

const STATUS_MESSAGES: Record<number, string> = {
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

const getHeaders = (authenticated: boolean = false) => ({
  'Content-Type': 'application/json',
  ...(authenticated && { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}` }),
});

async function handleApiResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    if (response.status === 204) {
      return null as T;
    }
    return response.json();
  }
  const message = STATUS_MESSAGES[response.status] || 'An unexpected error occurred';
  throw new ApiError(message, response.status);
}

export const fetchStarredRepositories = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/user/starred`, {
    headers: getHeaders(true),
  });
  const starredRepos = await handleApiResponse<Repository[]>(response);
  return starredRepos.map((repo) => repo.full_name);
};

export async function searchRepositories(query: string): Promise<Repository[]> {
  const response = await fetch(
    `${API_BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&per_page=10`,
    { headers: getHeaders() }
  );

  
  const data = await handleApiResponse<{ items: Repository[] }>(response);
  const starredRepos = useStore.getState().starredRepos;
  const mappedData = data?.items?.map((repo) => ({
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    owner: {
      login: repo.owner.login,
      avatar_url: repo.owner.avatar_url,
    },
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    isStarred: starredRepos.has(repo.full_name),
  }))
  return mappedData || [];
}

export async function toggleStar(
  owner: string,
  repo: string,
  isStarred: boolean
): Promise<void> {
  const method = isStarred ? 'DELETE' : 'PUT';
  const response = await fetch(
    `${API_BASE_URL}/user/starred/${owner}/${repo}`,
    {
      method,
      headers: getHeaders(true),
    }
  );

  await handleApiResponse<void>(response);
}
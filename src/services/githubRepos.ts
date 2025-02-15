import { useStore } from '../store/store';
import { Repository } from '../types';
import { API_BASE_URL, getHeaders, handleApiResponse } from './utils';

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